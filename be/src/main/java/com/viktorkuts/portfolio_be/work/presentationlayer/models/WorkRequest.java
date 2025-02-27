package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.shared.Address;
import com.viktorkuts.portfolio_be.shared.LocalizableString;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.work.datalayer.Company;
import com.viktorkuts.portfolio_be.work.datalayer.WorkStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class WorkRequest {
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
    private List<String> skills;
}