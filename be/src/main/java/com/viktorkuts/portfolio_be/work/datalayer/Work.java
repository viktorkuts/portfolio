package com.viktorkuts.portfolio_be.work.datalayer;

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
    private LocalizableString position;
    private WorkStatus status;
    private LocalizableString description;
    private Company company;
    private UserInfo contactPerson;
    private String resumeId;
}
