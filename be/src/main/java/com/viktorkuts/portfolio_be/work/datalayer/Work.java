package com.viktorkuts.portfolio_be.work.datalayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.shared.Address;
import com.viktorkuts.portfolio_be.shared.LocalizableString;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Document("work_experience")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Work {
    @Id
    private String id;
    private Address location;
    private Instant functionStart;
    private Instant functionEnd;
    private String emoji;
    private String position;
    private String positionFr;
    private WorkStatus status;
    private String description;
    private String descriptionFr;
    private Company company;
    private UserInfo contactPerson;
    private String resumeId;
    private Image image;
    @Builder.Default
    private List<String> skills = new ArrayList<>();
}
