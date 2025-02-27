package com.viktorkuts.portfolio_be.work.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ProjectRepository extends ReactiveMongoRepository<Project, String> {
    Mono<Project> findProjectById(String id);
}
