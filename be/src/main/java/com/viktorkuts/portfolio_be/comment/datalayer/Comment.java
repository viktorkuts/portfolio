package com.viktorkuts.portfolio_be.comment.datalayer;

import com.viktorkuts.portfolio_be.shared.Visibility;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("comments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment {
    @Id
    private String id;
    private String userId;
    private String title;
    private String comment;
    private CommentType commentType;
    private CommentStatus status;
    private Visibility visibility;
}
