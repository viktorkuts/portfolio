package com.viktorkuts.portfolio_be.work.presentationlayer.models;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.work.datalayer.ProfileLink;
import com.viktorkuts.portfolio_be.work.datalayer.Project;
import com.viktorkuts.portfolio_be.work.datalayer.Skill;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProjectResponse {
    private String id;
    private String name;
    private String description;
    private String descriptionFr;
    private List<ProfileLink> links;
    private List<Skill> skills;
    private Image image;

    public static ProjectResponse from(Project project) {
        ProjectResponse projectResponse = new ProjectResponse();
        BeanUtils.copyProperties(project, projectResponse);
        return projectResponse;
    }
}
