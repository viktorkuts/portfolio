package com.viktorkuts.portfolio_be.work.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface EducationRepository extends ReactiveMongoRepository<Education, String> {
    Flux<Education> getEducationsByResumeId(String resumeId);
}
