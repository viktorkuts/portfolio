package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.work.datalayer.*;
import lombok.Data;
import org.springframework.beans.BeanUtils;
import reactor.core.publisher.Flux;

import java.util.List;

@Data
public class ResumeResponse {
    private UserInfo user;
    private String userId;
    private List<WorkResponse> works;
    private ResumeStatus status;
    private String title;
    private String description;
    private Image avatar;
    private List<Skill> skills;
    private List<Project> projects;

    public static ResumeResponse from(Resume resume) {
        ResumeResponse resumeResponse = new ResumeResponse();
        BeanUtils.copyProperties(resume, resumeResponse);
        return resumeResponse;
    }
}
