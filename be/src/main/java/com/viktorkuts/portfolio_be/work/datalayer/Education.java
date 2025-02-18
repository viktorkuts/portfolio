package com.viktorkuts.portfolio_be.work.datalayer;

import com.viktorkuts.portfolio_be.shared.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("work_education")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Education {
    @Id
    private String id;
    private Address address;
    private String schoolName;
    private Instant functionStart;
    private Instant functionEnd;
    private WorkStatus status;
    private String description;
    private String resumeId;
}
