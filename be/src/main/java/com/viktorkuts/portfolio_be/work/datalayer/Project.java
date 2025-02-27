package com.viktorkuts.portfolio_be.work.datalayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("projects")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    private String id;
    private String name;
    private String description;
    private List<ProfileLink> links;
    private Image image;
}
