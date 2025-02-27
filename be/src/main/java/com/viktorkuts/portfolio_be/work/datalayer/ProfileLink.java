package com.viktorkuts.portfolio_be.work.datalayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileLink {
    private String url;
    private String label;
    private Image icon;
}
