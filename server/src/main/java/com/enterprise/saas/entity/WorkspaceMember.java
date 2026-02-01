package com.enterprise.saas.entity;

import com.baomidou.mybatisplus.annotation.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@TableName("workspace_members")
public class WorkspaceMember {
    @TableId(type = IdType.AUTO)
    private Long id;
    
    private Long workspaceId;
    
    private Long userId;
    
    private String role; // Owner, Admin, Operator, Finance
    
    @TableField(fill = FieldFill.INSERT)
    private LocalDateTime joinedAt;
    
    @TableLogic
    private Integer deleted;
}
