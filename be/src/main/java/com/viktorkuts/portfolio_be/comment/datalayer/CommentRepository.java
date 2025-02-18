package com.viktorkuts.portfolio_be.comment.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import reactor.core.publisher.Flux;

public interface CommentRepository extends ReactiveMongoRepository<Comment, String> {
    Flux<Comment> findCommentsByCommentType(CommentType commentType);
}
