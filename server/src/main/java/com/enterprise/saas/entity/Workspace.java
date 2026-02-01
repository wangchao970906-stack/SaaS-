package com.enterprise.saas.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("workspaces")
public class Workspace {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private String name;
    
    private String logo;
    
    private String status; // active, pending_kyc, suspended
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime createdAt;
    
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private LocalDateTime updatedAt;
    
    @TableLogic
    private Integer deleted;
}
