package com.viktorkuts.portfolio_be.comment.presentationlayer.models;

import com.viktorkuts.portfolio_be.comment.datalayer.Comment;
import com.viktorkuts.portfolio_be.comment.datalayer.CommentStatus;
import com.viktorkuts.portfolio_be.comment.datalayer.CommentType;
import com.viktorkuts.portfolio_be.shared.Visibility;
import com.viktorkuts.portfolio_be.users.presentationlayer.models.UserResponseModel;
import com.viktorkuts.portfolio_be.work.datalayer.Resume;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentResponseModel {
    private String id;
    private UserResponseModel user;
    private String title;
    private String comment;
    private CommentType commentType;
    private CommentStatus status;
    private Visibility visibility;

    public static CommentResponseModel from(Comment comment) {
        CommentResponseModel commentResponse = new CommentResponseModel();
        BeanUtils.copyProperties(comment, commentResponse);
        return commentResponse;
    }
}
