package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.work.datalayer.ResumeRepository;
import com.viktorkuts.portfolio_be.work.datalayer.Work;
import com.viktorkuts.portfolio_be.work.datalayer.WorkRepository;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.WorkResponse;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;

@Service
public class WorkServiceImpl implements WorkService {
    private final WorkRepository workRepository;
    private final ResumeRepository resumeRepository;

    public WorkServiceImpl(WorkRepository workRepository, ResumeRepository resumeRepository) {
        this.workRepository = workRepository;
        this.resumeRepository = resumeRepository;
    }

    @Override
    public Flux<Work> getAllWorks() {
        return null;
    }

    @Override
    public Flux<Work> getAllWorksByUserId(String userId) {
        return resumeRepository.getResumeByUserId(userId)
                .flatMapMany(resume -> workRepository.getWorksByResumeId(resume.getId()));
    }

    @Override
    public Flux<Work> getAllPublicSelfWorks() {
        return getAllWorksByUserId("1");
    }
}
