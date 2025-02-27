package com.viktorkuts.portfolio_be.work.presentationlayer;

import com.viktorkuts.portfolio_be.users.logiclayer.UserService;
import com.viktorkuts.portfolio_be.work.datalayer.Work;
import com.viktorkuts.portfolio_be.work.logiclayer.ResumeService;
import com.viktorkuts.portfolio_be.work.logiclayer.WorkService;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/resumes")
public class ResumeController {
    private final UserService userService;
    private final ResumeService resumeService;
    private final WorkService workService;

    public ResumeController(UserService userService, ResumeService resumeService, WorkService workService) {
        this.userService = userService;
        this.resumeService = resumeService;
        this.workService = workService;
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

    @PostMapping("/main/works")
    @PreAuthorize("hasAuthority('USER')")
    public Mono<Work> addWorkToMainResume(@RequestBody Mono<WorkRequest> requestMono) {
        return workService.addWorkForMain(requestMono);
    }

    @DeleteMapping("/main/works/{workId}")
    @PreAuthorize("hasAuthority('USER')")
    public Mono<Void> deleteWorkFromMainResume(@PathVariable String workId) {
        return workService.deleteWork(workId);
    }

    @PutMapping("/main/works/{workId}")
    @PreAuthorize("hasAuthority('USER')")
    public Mono<Work> updateWorkToMainResume(@PathVariable String workId, @RequestBody WorkRequest requestMono) {
        return workService.updateWorkForMain(workId, requestMono);
    }

    @PatchMapping("/main/info")
    @PreAuthorize("hasAuthority('USER')")
    public Mono<ResumeResponse> patchInfo(@RequestBody InfoPatch rq){
        return resumeService.patchInfo(rq)
                .flatMap(resumeService::prepare);
    }
}
