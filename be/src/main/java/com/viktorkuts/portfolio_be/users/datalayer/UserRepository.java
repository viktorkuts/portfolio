package com.viktorkuts.portfolio_be.users.datalayer;

import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeResponse;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Mono;

public interface UserRepository extends ReactiveMongoRepository<User, String> {
    Mono<User> findUserByAssociatedId(String associatedId);
    Mono<User> findUserByEmail(String email);

    Mono<User> findUserById(String id);
}
