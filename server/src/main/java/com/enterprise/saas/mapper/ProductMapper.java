package com.enterprise.saas.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.enterprise.saas.entity.Product;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {
}
