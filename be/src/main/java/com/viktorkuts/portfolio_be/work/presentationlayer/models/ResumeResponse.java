package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.work.datalayer.Resume;
import com.viktorkuts.portfolio_be.work.datalayer.ResumeStatus;
import com.viktorkuts.portfolio_be.work.datalayer.Work;
import lombok.Data;
import org.springframework.beans.BeanUtils;
import reactor.core.publisher.Flux;

import java.util.List;

@Data
public class ResumeResponse {
    private UserInfo user;
    private String userId;
    private List<Work> works;
    private ResumeStatus status;
    private String title;
    private String description;
    private String avatar;

    public static ResumeResponse from(Resume resume) {
        ResumeResponse resumeResponse = new ResumeResponse();
        BeanUtils.copyProperties(resume, resumeResponse);
        return resumeResponse;
    }
}
