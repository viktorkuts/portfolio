package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class InfoPatch {
    String title;
    String description;
    String avatar;
}
