package com.viktorkuts.portfolio_be.work.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface ResumeRepository extends ReactiveMongoRepository<Resume, String> {
    Mono<Resume> getResumeById(String resumeId);
    Mono<Resume> getResumeByUserId(String userId);
    Mono<Resume> getResumeByUserIdAndStatus(String userId, ResumeStatus status);
}
