package com.viktorkuts.portfolio_be.blog.presentationlayer;

import com.viktorkuts.portfolio_be.blog.logiclayer.BlogService;
import com.viktorkuts.portfolio_be.blog.presentationlayer.models.BlogPostRequest;
import com.viktorkuts.portfolio_be.blog.presentationlayer.models.BlogPostResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/blog")
public class BlogController {
    private final BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @GetMapping("/posts")
    public Flux<BlogPostResponse> getAllPosts() {
        return blogService.allBlogPosts();
    }

    @PostMapping("/posts")
    public Mono<BlogPostResponse> createPost(@RequestBody Mono<BlogPostRequest> blogPostRequest) {
        return blogService.createBlogPost(blogPostRequest);
    }
}
