package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.utils.exceptions.NotFoundException;
import com.viktorkuts.portfolio_be.work.datalayer.Project;
import com.viktorkuts.portfolio_be.work.datalayer.ProjectRepository;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ProjectRequest;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Mono<Void> removeProject(String projectId) {
        return projectRepository.findProjectById(projectId)
                .switchIfEmpty(Mono.error(new NotFoundException("Project not found")))
                .flatMap(projectRepository::delete);
    }

    @Override
    public Mono<Project> updateProject(String projectId, ProjectRequest projectRequest) {
        return projectRepository.findProjectById(projectId)
                .switchIfEmpty(Mono.error(new NotFoundException("Project not found")))
                .map(p -> {
                    p.setName(projectRequest.getName());
                    p.setDescription(projectRequest.getDescription());
                    p.setLinks(projectRequest.getLinks());
                    p.setImage(projectRequest.getImage());
                    return p;
                })
                .flatMap(projectRepository::save);
    }

    @Override
    public Mono<Project> addProject(ProjectRequest projectRequest) {
        return Mono.just(Project.builder())
                .map(p -> {
                    p.id(UUID.randomUUID().toString());
                    p.name(projectRequest.getName());
                    p.description(projectRequest.getDescription());
                    p.links(projectRequest.getLinks());
                    p.image(projectRequest.getImage());
                    return p.build();
                })
                .flatMap(projectRepository::save);
    }

    @Override
    public Mono<Project> getProjectById(String id) {
        return projectRepository.findProjectById(id)
                .switchIfEmpty(Mono.error(new NotFoundException("Project not found")));
    }

    @Override
    public Flux<Project> getAllProjects() {
        return projectRepository.findAll();
    }
}
