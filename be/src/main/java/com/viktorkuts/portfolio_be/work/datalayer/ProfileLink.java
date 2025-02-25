package com.viktorkuts.portfolio_be.work.datalayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProfileLink {
    private String platform;
    private String url;
    private String icon;
}
