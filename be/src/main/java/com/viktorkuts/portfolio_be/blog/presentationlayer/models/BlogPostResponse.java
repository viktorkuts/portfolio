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
public class BlogPostResponse {
    private String postId;
    private String title;
    private String content;
    private String authorId;
    private Instant publicationDate;
    private Visibility visibility;

    public static BlogPostResponse from(Post post) {
        BlogPostResponse res = new BlogPostResponse();
        BeanUtils.copyProperties(post, res);
        return res;
    }
}
