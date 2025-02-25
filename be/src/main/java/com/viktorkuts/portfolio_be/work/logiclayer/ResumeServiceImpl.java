package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.datalayer.UserRepository;
import com.viktorkuts.portfolio_be.work.datalayer.Resume;
import com.viktorkuts.portfolio_be.work.datalayer.ResumeRepository;
import com.viktorkuts.portfolio_be.work.datalayer.ResumeStatus;
import com.viktorkuts.portfolio_be.work.datalayer.WorkRepository;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.InfoPatch;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeRequest;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.ResumeResponse;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class ResumeServiceImpl implements ResumeService {
    private final ResumeRepository resumeRepository;
    private final WorkRepository workRepository;
    private final UserRepository userRepository;

    public ResumeServiceImpl(ResumeRepository resumeRepository, WorkRepository workRepository, UserRepository userRepository) {
        this.resumeRepository = resumeRepository;
        this.workRepository = workRepository;
        this.userRepository = userRepository;
    }

    public Mono<ResumeResponse> prepare(Resume resume) {
        return Mono.just(resume)
                .map(ResumeResponse::from)
                .flatMap(r -> workRepository.getWorksByResumeId(resume.getId())
                        .collectList()
                        .map(w -> {
                            r.setWorks(w);
                            return r;
                        }))
                .flatMap(r -> userRepository.findUserById(resume.getUserId())
                        .map(u -> {
                            r.setUser(u.getUserInfo());
                            return r;
                        })
                );

    }

    @Override
    public Mono<Resume> getResumeById(String id) {
        return resumeRepository.findById(id);
    }

    @Override
    public Flux<Resume> getResumesByUserId(String userId) {
        return null;
    }

    @Override
    public Mono<Resume> getMainResumeByUserId(String userId) {
        return resumeRepository.getResumeByUserIdAndStatus(userId, ResumeStatus.MAIN);
    }

    @Override
    public Mono<Resume> addResume(Mono<ResumeRequest> resume, String userId) {
        return resume
                .flatMap(r -> {
                    Resume newResume = new Resume();
                    BeanUtils.copyProperties(r, newResume);
                    newResume.setUserId(userId);
                    return resumeRepository.save(newResume);
                });
    }

    @Override
    public Mono<Resume> getMainResume() {
        return getMainResumeByUserId("1");
    }

    @Override
    public Mono<Resume> patchInfo(InfoPatch patch) {
        return getMainResume()
                .map(r -> {
                    r.setTitle(patch.getTitle());
                    r.setDescription(patch.getDescription());
                    r.setAvatar(patch.getAvatar());
                    return r;
                })
                .flatMap(resumeRepository::save);
    }
}
