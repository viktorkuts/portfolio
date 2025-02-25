package com.viktorkuts.portfolio_be.work.datalayer;

import com.viktorkuts.portfolio_be.shared.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("resumes")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Resume {
    @Id
    private String id;
    private UserInfo contactInfo;
    private String userId;
    private ResumeStatus status;
    private String title;
    private String description;
    private String avatar;
}
