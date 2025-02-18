package com.viktorkuts.portfolio_be.comment.presentationlayer.models;

import com.viktorkuts.portfolio_be.comment.datalayer.CommentStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentPatchRequestModel {
    private CommentStatus status;
}