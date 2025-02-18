package com.viktorkuts.portfolio_be.comment.logiclayer;

import com.viktorkuts.portfolio_be.comment.datalayer.Comment;
import com.viktorkuts.portfolio_be.comment.datalayer.CommentStatus;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentPatchRequestModel;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentRequestModel;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentResponseModel;
import com.viktorkuts.portfolio_be.users.datalayer.User;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface CommentService {
    Mono<CommentResponseModel> prepare(Comment comment);
    Flux<Comment> getCommentsForUser(String userId);
    Flux<Comment> getCommentsForBlog(String blogId);
    Flux<Comment> getTestimonials(CommentStatus status);
    Mono<Comment> leaveTestimonial(User user, CommentRequestModel model);
    Mono<Comment> leaveComment(User user, CommentRequestModel model);
    Mono<Comment> updateCommentStatus(String commentId, CommentPatchRequestModel status);
}
