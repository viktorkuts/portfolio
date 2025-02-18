package com.viktorkuts.portfolio_be.blog.datalayer;

import org.springframework.data.mongodb.repository.ReactiveMongoRepository;

public interface BlogRepository extends ReactiveMongoRepository<Post, String> {

}
