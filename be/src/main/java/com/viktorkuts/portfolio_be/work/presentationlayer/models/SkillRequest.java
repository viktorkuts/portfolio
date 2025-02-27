package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SkillRequest {
    Image icon;
    String name;
}
