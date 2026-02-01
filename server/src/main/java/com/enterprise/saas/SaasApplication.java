package com.enterprise.saas;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan("com.enterprise.saas.mapper")
public class SaasApplication {
    public static void main(String[] args) {
        SpringApplication.run(SaasApplication.class, args);
    }
}
