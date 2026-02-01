package com.enterprise.saas.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("settlement_orders")
public class SettlementOrder {
    @TableId(type = IdType.AUTO)
    private Long id;

    private Long workspaceId;

    private Long productId;

    private String productName;

    private BigDecimal amount;

    private String status; // pending, processing, completed, failed

    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;

    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;

    @TableLogic
    private Integer deleted;
}
