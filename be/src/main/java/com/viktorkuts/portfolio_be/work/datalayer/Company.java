package com.viktorkuts.portfolio_be.work.datalayer;

import com.viktorkuts.portfolio_be.shared.Address;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("work_company")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Company {
    @Id
    private String id;
    private String name;
    private String phone;
    private String email;
    private Address address;
}
