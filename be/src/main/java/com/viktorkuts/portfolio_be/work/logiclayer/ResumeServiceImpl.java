package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.datalayer.UserRepository;
import com.viktorkuts.portfolio_be.work.datalayer.*;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.*;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.stream.Collectors;

@Service
public class ResumeServiceImpl implements ResumeService {
    private final ResumeRepository resumeRepository;
    private final WorkRepository workRepository;
    private final UserRepository userRepository;
    private final SkillService skillService;
    private final ProjectService projectService;

    public ResumeServiceImpl(ResumeRepository resumeRepository, WorkRepository workRepository, UserRepository userRepository, SkillService skillService, ProjectService projectService) {
        this.resumeRepository = resumeRepository;
        this.workRepository = workRepository;
        this.userRepository = userRepository;
        this.skillService = skillService;
        this.projectService = projectService;
    }

    public Mono<ResumeResponse> prepare(Resume resume) {
        return Mono.just(resume)
                .map(ResumeResponse::from)
                .flatMap(r -> workRepository.getWorksByResumeId(resume.getId())
                        .flatMap(w -> Flux.fromIterable(w.getSkills())
                                .flatMap(skillService::getSkillById)
                                .collectList()
                                .map(s -> {
                                    WorkResponse workResponse = new WorkResponse();
                                    BeanUtils.copyProperties(w, workResponse);
                                    workResponse.setSkills(s);
                                    return workResponse;
                                })
                        )
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
                )
                .flatMap(r -> skillService.getAllSkills()
                        .collectList()
                        .map(s -> {
                            r.setSkills(s);
                            return r;
                        })
                )
                .flatMap(r -> projectService.getAllProjects()
                        .flatMap(p -> Flux.fromIterable(p.getSkills())
                        .flatMap(skillService::getSkillById)
                        .collectList()
                        .map(s -> {
                            ProjectResponse projectResponse = new ProjectResponse();
                            BeanUtils.copyProperties(p, projectResponse);
                            projectResponse.setSkills(s);
                            return projectResponse;
                        }))
                        .collectList()
                        .map(p -> {
                            r.setProjects(p);
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
                    r.setTitleFr(patch.getTitleFr());
                    r.setDescription(patch.getDescription());
                    r.setDescriptionFr(patch.getDescriptionFr());
                    r.setLinks(patch.getLinks());
                    return r;
                })
                .flatMap(resumeRepository::save);
    }
}
