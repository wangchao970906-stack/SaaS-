package com.enterprise.saas.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.enterprise.saas.entity.User;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper extends BaseMapper<User> {
}
