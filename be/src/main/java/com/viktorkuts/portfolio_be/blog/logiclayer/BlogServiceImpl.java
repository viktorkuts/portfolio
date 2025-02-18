package com.viktorkuts.portfolio_be.blog.logiclayer;

import com.viktorkuts.portfolio_be.blog.datalayer.BlogRepository;
import com.viktorkuts.portfolio_be.blog.datalayer.Post;
import com.viktorkuts.portfolio_be.blog.presentationlayer.models.BlogPostRequest;
import com.viktorkuts.portfolio_be.blog.presentationlayer.models.BlogPostResponse;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.time.Instant;
import java.util.UUID;

@Service
public class BlogServiceImpl implements BlogService {

    private final BlogRepository blogRepository;

    public BlogServiceImpl(BlogRepository blogRepository) {
        this.blogRepository = blogRepository;
    }

    @Override
    public Flux<BlogPostResponse> allBlogPosts() {
        return blogRepository.findAll()
                .map(BlogPostResponse::from);
    }

    @Override
    public Mono<BlogPostResponse> createBlogPost(Mono<BlogPostRequest> request) {
        return request
                .map(BlogPostRequest::from)
                .map(post -> {
                    post.setPostId(UUID.randomUUID().toString());
                    post.setPublicationDate(Instant.now());
                    return post;
                })
                .flatMap(blogRepository::save)
                .map(BlogPostResponse::from);

    }
}
