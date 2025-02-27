package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.shared.LocalizableString;
import com.viktorkuts.portfolio_be.utils.exceptions.NotFoundException;
import com.viktorkuts.portfolio_be.work.datalayer.ResumeRepository;
import com.viktorkuts.portfolio_be.work.datalayer.Work;
import com.viktorkuts.portfolio_be.work.datalayer.WorkRepository;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.WorkRequest;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.WorkResponse;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

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
    @Override
    public Mono<Work> addWorkForMain(Mono<WorkRequest> workRequest){
        return workRequest
                .map(e -> {
                    Work work = new Work();
                    work.setCompany(e.getCompany());
                    work.setDescription(e.getDescription());
                    work.setDescriptionFr(e.getDescriptionFr());
                    work.setPosition(e.getPosition());
                    work.setPositionFr(e.getPositionFr());
                    work.setResumeId("1");
                    work.setImage(e.getImage());
                    return work;
                })
                .flatMap(workRepository::save);
    }
    @Override
    public Mono<Void> deleteWork(String workId){
        return workRepository.getWorkById(workId)
                .switchIfEmpty(Mono.error(new NotFoundException("Work not found")))
                .flatMap(workRepository::delete);
    }

    @Override
    public Mono<Work> updateWorkForMain(String workId, WorkRequest workRequest) {
        return workRepository.getWorkById(workId)
                .switchIfEmpty(Mono.error(new NotFoundException("Work not found")))
                .map(work -> {
                    work.setCompany(workRequest.getCompany());
                    work.setDescription(workRequest.getDescription());
                    work.setPosition(workRequest.getPosition());
                    work.setPositionFr(workRequest.getPositionFr());
                    work.setDescriptionFr(workRequest.getDescriptionFr());
                    work.setSkills(workRequest.getSkills());
                    work.setImage(workRequest.getImage());
                    return work;
                })
                .flatMap(workRepository::save);
    }
}
