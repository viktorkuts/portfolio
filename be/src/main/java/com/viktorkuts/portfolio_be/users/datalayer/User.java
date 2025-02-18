package com.viktorkuts.portfolio_be.users.datalayer;

import com.viktorkuts.portfolio_be.shared.UserInfo;
import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
@Data
@Builder
public class User {
    @Id
    private String id;
    private String email;
    private UserType type;
    private String associatedId;
    private UserInfo userInfo;
}
