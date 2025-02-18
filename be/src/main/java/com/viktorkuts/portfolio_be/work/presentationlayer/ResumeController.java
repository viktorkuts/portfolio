package com.viktorkuts.portfolio_be.work.presentationlayer;

import com.viktorkuts.portfolio_be.users.logiclayer.UserService;
import com.viktorkuts.portfolio_be.work.logiclayer.ResumeService;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeRequest;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeResponse;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/resumes")
public class ResumeController {
    private final UserService userService;
    private final ResumeService resumeService;

    public ResumeController(UserService userService, ResumeService resumeService) {
        this.userService = userService;
        this.resumeService = resumeService;
    }

    @GetMapping("/{userId}")
    public Mono<ResumeResponse> getResume(@PathVariable String userId) {
        return resumeService.getResumeById(userId)
                .flatMap(resumeService::prepare);
    }

    @GetMapping("/main")
    public Mono<ResumeResponse> getMainResume(){
        return resumeService.getMainResume()
                .flatMap(resumeService::prepare);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public Mono<ResumeResponse> addResume(@RequestBody Mono<ResumeRequest> requestMono, @AuthenticationPrincipal JwtAuthenticationToken jwt) {
        return userService.getUserByJwt(jwt.getToken())
                .switchIfEmpty(Mono.error(new AuthenticationCredentialsNotFoundException("Could not find user with token")))
                .flatMap(user -> resumeService.addResume(requestMono, user.getId()))
                .flatMap(resumeService::prepare);
    }
}
