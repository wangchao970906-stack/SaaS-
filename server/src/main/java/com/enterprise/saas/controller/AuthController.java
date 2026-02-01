package com.enterprise.saas.controller;

import com.enterprise.saas.common.Result;
import com.enterprise.saas.dto.request.LoginRequest;
import com.enterprise.saas.dto.request.RegisterRequest;
import com.enterprise.saas.dto.response.LoginResponse;
import com.enterprise.saas.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    public Result<Void> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);
        return Result.success();
    }

    @PostMapping("/login")
    public Result<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return Result.success(response);
    }

    @PostMapping("/logout")
    public Result<Void> logout() {
        // JWT 是无状态的,前端删除 token 即可
        return Result.success();
    }
}
