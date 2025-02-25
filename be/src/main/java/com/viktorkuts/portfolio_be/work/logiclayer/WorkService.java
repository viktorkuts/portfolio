package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.work.datalayer.Work;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.WorkRequest;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.WorkResponse;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface WorkService {
    Flux<Work> getAllWorks();
    Flux<Work> getAllWorksByUserId(String userId);
    Flux<Work> getAllPublicSelfWorks();
    Mono<Work> addWorkForMain(Mono<WorkRequest> workRequest);
    Mono<Work> updateWorkForMain(String workId, WorkRequest workRequest);
    Mono<Void> deleteWork(String workId);
}
