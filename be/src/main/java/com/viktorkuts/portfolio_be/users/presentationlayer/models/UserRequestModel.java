package com.viktorkuts.portfolio_be.users.presentationlayer.models;

import com.viktorkuts.portfolio_be.shared.Address;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.users.datalayer.UserType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserRequestModel {
    private String email;
    private String firstName;
    private String lastName;
    private String phone;
    private Address address;
}
