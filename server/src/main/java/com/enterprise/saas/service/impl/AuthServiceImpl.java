package com.enterprise.saas.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.enterprise.saas.dto.request.LoginRequest;
import com.enterprise.saas.dto.request.RegisterRequest;
import com.enterprise.saas.dto.response.LoginResponse;
import com.enterprise.saas.dto.response.UserResponse;
import com.enterprise.saas.entity.User;
import com.enterprise.saas.mapper.UserMapper;
import com.enterprise.saas.security.JwtTokenProvider;
import com.enterprise.saas.service.AuthService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public void register(RegisterRequest request) {
        // 检查邮箱是否已存在
        User existingUser = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getEmail, request.getEmail()));
        if (existingUser != null) {
            throw new RuntimeException("邮箱已被注册");
        }

        // 创建新用户
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setName(request.getName());
        user.setAvatar("https://picsum.photos/seed/" + request.getEmail() + "/200");

        userMapper.insert(user);
    }

    @Override
    public LoginResponse login(LoginRequest request) {
        // 查找用户
        User user = userMapper.selectOne(
                new LambdaQueryWrapper<User>().eq(User::getEmail, request.getEmail()));
        if (user == null) {
            throw new RuntimeException("用户不存在");
        }

        // 验证密码
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("密码错误");
        }

        // 生成 Token
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getId());

        // 构建响应
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(user, userResponse);

        return new LoginResponse(token, userResponse);
    }
}
