package com.viktorkuts.portfolio_be.blog.datalayer;

import com.viktorkuts.portfolio_be.shared.Visibility;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("blog_posts")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {
    @Id
    private String id;
    private String postId;
    private String title;
    private String content;
    private String authorId;
    private Instant publicationDate;
    private Visibility visibility;
}
