package com.enterprise.saas.service;

import com.enterprise.saas.dto.request.LoginRequest;
import com.enterprise.saas.dto.request.RegisterRequest;
import com.enterprise.saas.dto.response.LoginResponse;

public interface AuthService {
    void register(RegisterRequest request);

    LoginResponse login(LoginRequest request);
}
