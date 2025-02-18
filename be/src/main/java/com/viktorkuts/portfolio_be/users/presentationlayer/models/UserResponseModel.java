package com.viktorkuts.portfolio_be.users.presentationlayer.models;

import com.viktorkuts.portfolio_be.shared.Address;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.datalayer.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseModel {
    private String email;
    private UserType type;
    private UserInfo userInfo;

    public static UserResponseModel from(User user) {
        UserResponseModel userResponseModel = new UserResponseModel();
        BeanUtils.copyProperties(user, userResponseModel);
        return userResponseModel;
    }
}
