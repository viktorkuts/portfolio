package com.viktorkuts.portfolio_be.comment.presentationlayer;

import com.viktorkuts.portfolio_be.comment.datalayer.CommentStatus;
import com.viktorkuts.portfolio_be.comment.logiclayer.CommentService;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentPatchRequestModel;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentRequestModel;
import com.viktorkuts.portfolio_be.comment.presentationlayer.models.CommentResponseModel;
import com.viktorkuts.portfolio_be.users.logiclayer.UserService;
import com.viktorkuts.portfolio_be.utils.exceptions.InvalidInputException;
import com.viktorkuts.portfolio_be.utils.exceptions.NotFoundException;
import org.springframework.security.access.prepost.PostAuthorize;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/comments")
public class CommentController {
    private final CommentService commentService;
    private final UserService userService;

    public CommentController(CommentService commentService, UserService userService) {
        this.commentService = commentService;
        this.userService = userService;
    }

    @PreAuthorize("hasAnyAuthority('GUEST', 'USER')")
    @PostMapping
    public Mono<CommentResponseModel> createComment(@RequestBody CommentRequestModel comment, @AuthenticationPrincipal JwtAuthenticationToken  jwt) {
        if(comment.getBlogId().isEmpty()){
            return Mono.error(new InvalidInputException("Field 'blogId' is mandatory for leaving Blog comments!"));
        }
        return userService.getUserByJwt(jwt.getToken())
                .switchIfEmpty(Mono.error(new NotFoundException("User was not found")))
                .flatMap(u -> commentService.leaveComment(u, comment))
                .flatMap(commentService::prepare);
    }

    @PreAuthorize("hasAnyAuthority('GUEST', 'USER')")
    @PostMapping("/testimonials")
    public Mono<CommentResponseModel> createTestimonial(@RequestBody CommentRequestModel comment, @AuthenticationPrincipal JwtAuthenticationToken  jwt) {
        return userService.getUserByJwt(jwt.getToken())
                .switchIfEmpty(Mono.error(new NotFoundException("User was not found")))
                .flatMap(u -> commentService.leaveTestimonial(u, comment))
                .flatMap(commentService::prepare);
    }

    @PreAuthorize("hasAuthority('USER') or #status == T(com.viktorkuts.portfolio_be.comment.datalayer.CommentStatus).APPROVED")
    @GetMapping("/testimonials")
    public Flux<CommentResponseModel> testimonials(@RequestParam(name = "status", defaultValue = "APPROVED") CommentStatus status){
        return commentService.getTestimonials(status)
                .flatMap(commentService::prepare);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PatchMapping("/{commentId}/status")
    public Mono<CommentResponseModel> updateCommentStatus(@PathVariable String commentId, @RequestBody CommentPatchRequestModel req){
        return commentService.updateCommentStatus(commentId, req)
                .flatMap(commentService::prepare);
    }
}
