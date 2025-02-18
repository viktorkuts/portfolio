package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.work.datalayer.Work;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.WorkResponse;
import reactor.core.publisher.Flux;

public interface WorkService {
    Flux<Work> getAllWorks();
    Flux<Work> getAllWorksByUserId(String userId);
    Flux<Work> getAllPublicSelfWorks();
}
