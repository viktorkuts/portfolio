package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.shared.Address;
import com.viktorkuts.portfolio_be.shared.LocalizableString;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.work.datalayer.Company;
import com.viktorkuts.portfolio_be.work.datalayer.Skill;
import com.viktorkuts.portfolio_be.work.datalayer.Work;
import com.viktorkuts.portfolio_be.work.datalayer.WorkStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkResponse {
    private String id;
    private Address location;
    private Instant functionStart;
    private Instant functionEnd;
    private String position;
    private String positionFr;
    private WorkStatus status;
    private String description;
    private String descriptionFr;
    private Company company;
    private UserInfo contactPerson;
    private String resumeId;
    private Image image;
    private List<Skill> skills;

    public static WorkResponse from(Work work) {
        WorkResponse workResponse = new WorkResponse();
        BeanUtils.copyProperties(work, workResponse);
        return workResponse;
    }
}
