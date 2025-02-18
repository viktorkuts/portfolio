package com.viktorkuts.portfolio_be.comment.presentationlayer.models;

import com.viktorkuts.portfolio_be.comment.datalayer.CommentStatus;
import com.viktorkuts.portfolio_be.comment.datalayer.CommentType;
import com.viktorkuts.portfolio_be.shared.Visibility;
import com.viktorkuts.portfolio_be.users.presentationlayer.models.UserResponseModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequestModel {
    private String title;
    private String comment;
    private String blogId; // optional
}
