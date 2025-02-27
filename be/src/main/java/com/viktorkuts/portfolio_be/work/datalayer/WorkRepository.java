package com.viktorkuts.portfolio_be.work.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface WorkRepository extends ReactiveMongoRepository<Work, String> {
    Flux<Work> getWorksByResumeId(String resumeId);
    Mono<Work> getWorkById(String id);
    Mono<Work> getWorkBySkillsContaining(String skills);
}
