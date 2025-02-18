package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import com.viktorkuts.portfolio_be.shared.UserInfo;
import lombok.Data;

@Data
public class ResumeRequest {
    private String userId;
    private UserInfo contactInfo;
}
