package com.viktorkuts.portfolio_be.work.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface SkillRepository extends ReactiveMongoRepository<Skill, String> {
    Mono<Skill> getSkillById(String id);
}
