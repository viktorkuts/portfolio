package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.work.datalayer.Project;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ProjectRequest;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ProjectResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ProjectService {
    Flux<Project> getAllProjects();
    Mono<Project> getProjectById(String id);
    Mono<Project> addProject(ProjectRequest projectRequest);
    Mono<Project> updateProject(String projectId, ProjectRequest projectRequest);
    Mono<Void> removeProject(String projectId);
}
