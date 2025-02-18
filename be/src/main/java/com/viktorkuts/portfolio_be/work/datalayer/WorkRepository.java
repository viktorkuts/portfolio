package com.viktorkuts.portfolio_be.work.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface WorkRepository extends ReactiveMongoRepository<Work, String> {
    Flux<Work> getWorksByResumeId(String resumeId);
}
