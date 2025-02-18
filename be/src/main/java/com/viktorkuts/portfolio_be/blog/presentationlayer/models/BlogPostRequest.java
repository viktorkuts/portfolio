package com.viktorkuts.portfolio_be.blog.presentationlayer.models;

import com.viktorkuts.portfolio_be.blog.datalayer.Post;
import com.viktorkuts.portfolio_be.shared.Visibility;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.Instant;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BlogPostRequest {
    private String title;
    private String content;
    private Visibility visibility;

    public static Post from(BlogPostRequest post) {
        Post res = new Post();
        BeanUtils.copyProperties(post, res);
        return res;
    }
}
