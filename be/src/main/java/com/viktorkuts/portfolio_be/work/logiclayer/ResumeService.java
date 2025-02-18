package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.work.datalayer.Resume;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeRequest;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface ResumeService {
    Mono<ResumeResponse> prepare(Resume resume);
    Flux<Resume> getResumesByUserId(String userId);
    Mono<Resume> getMainResumeByUserId(String userId);
    Mono<Resume> getResumeById(String id);
    Mono<Resume> getMainResume();
    Mono<Resume> addResume(Mono<ResumeRequest> resume, String userId);
}
