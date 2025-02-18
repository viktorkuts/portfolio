package com.viktorkuts.portfolio_be.blog.logiclayer;

import com.viktorkuts.portfolio_be.blog.datalayer.Post;
import com.viktorkuts.portfolio_be.blog.presentationlayer.models.BlogPostRequest;
import com.viktorkuts.portfolio_be.blog.presentationlayer.models.BlogPostResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface BlogService {
    Flux<BlogPostResponse> allBlogPosts();
    Mono<BlogPostResponse> createBlogPost(Mono<BlogPostRequest> request);
}
