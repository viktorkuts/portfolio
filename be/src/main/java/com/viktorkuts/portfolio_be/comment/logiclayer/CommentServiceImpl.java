package com.viktorkuts.portfolio_be.comment.logiclayer;

import com.viktorkuts.portfolio_be.comment.datalayer.Comment;
import com.viktorkuts.portfolio_be.comment.datalayer.CommentRepository;
import com.viktorkuts.portfolio_be.comment.datalayer.CommentStatus;
import com.viktorkuts.portfolio_be.comment.datalayer.CommentType;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentPatchRequestModel;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentRequestModel;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentResponseModel;
import com.viktorkuts.portfolio_be.shared.Visibility;
import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.logiclayer.UserService;
import com.viktorkuts.portfolio_be.users.presentationlayer.models.UserResponseModel;
import com.viktorkuts.portfolio_be.utils.exceptions.NotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class CommentServiceImpl implements CommentService{
    private final CommentRepository commentRepository;
    private final UserService userService;

    public CommentServiceImpl(CommentRepository commentRepository, UserService userService) {
        this.commentRepository = commentRepository;
        this.userService = userService;
    }

    public Mono<CommentResponseModel> prepare(Comment comment){
        return Mono.just(comment)
                .map(CommentResponseModel::from)
                .flatMap(response -> userService.getUserByUserId(comment.getUserId())
                        .map(user -> {
                            response.setUser(UserResponseModel.from(user));
                            return response;
                        }));
    }

    @Override
    public Mono<Comment> leaveComment(User user, CommentRequestModel model) {
        return null;
    }

    @Override
    public Mono<Comment> leaveTestimonial(User user, CommentRequestModel model) {
        return Mono.just(Comment.builder())
                .map(c -> {
                    c.title(model.getTitle());
                    c.comment(model.getComment());
                    c.commentType(CommentType.TESTIMONIALS);
                    c.visibility(Visibility.PUBLIC);
                    c.status(CommentStatus.PENDING);
                    c.userId(user.getId());
                    return c.build();
                })
                .flatMap(commentRepository::save);
    }

    @Override
    public Flux<Comment> getTestimonials(CommentStatus status) {
        return commentRepository.findCommentsByCommentType(CommentType.TESTIMONIALS)
                .filter(comment -> comment.getVisibility().equals(Visibility.PUBLIC))
                .filter(comment -> comment.getStatus().equals(status));
    }

    @Override
    public Mono<Comment> updateCommentStatus(String commentId, CommentPatchRequestModel status) {
        return commentRepository.findById(commentId)
                .switchIfEmpty(Mono.error(new NotFoundException("Comment not found")))
                .map(comment -> {
                    comment.setStatus(status.getStatus());
                    return comment;
                })
                .flatMap(commentRepository::save);
    }

    @Override
    public Flux<Comment> getCommentsForBlog(String blogId) {
        return null;
    }

    @Override
    public Flux<Comment> getCommentsForUser(String userId) {
        return null;
    }
}
