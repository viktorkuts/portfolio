package com.viktorkuts.portfolio_be.work.presentationlayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.images.datalayer.ImageRepository;
import com.viktorkuts.portfolio_be.work.datalayer.Project;
import com.viktorkuts.portfolio_be.work.logiclayer.ProjectService;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ProjectRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import javax.swing.*;

@RestController
@RequestMapping("/api/v1/projects")
public class ProjectController {
    private final ProjectService projectService;
    private final ImageRepository imageRepository;

    public ProjectController(ProjectService projectService, ImageRepository imageRepository) {
        this.projectService = projectService;
        this.imageRepository = imageRepository;
    }

    @GetMapping
    public Flux<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/link-icons")
    public Flux<Image> getIcons(){
        return imageRepository.getAllImagesInBucket("link-icons");
    }

    @GetMapping("/{projectId}")
    public Mono<Project> getProjectById(@PathVariable String projectId) {
        return projectService.getProjectById(projectId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping
    public Mono<Project> createProject(@RequestBody ProjectRequest projectRequest) {
        return projectService.addProject(projectRequest);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/{projectId}")
    public Mono<Project> updateProject(@PathVariable String projectId , @RequestBody ProjectRequest projectRequest) {
        return projectService.updateProject(projectId, projectRequest);
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/{projectId}")
    public Mono<Void> deleteProject(@PathVariable String projectId) {
        return projectService.removeProject(projectId);
    }
}
