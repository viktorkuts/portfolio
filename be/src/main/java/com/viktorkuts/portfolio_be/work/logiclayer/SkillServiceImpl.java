package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.images.datalayer.ImageRepository;
import com.viktorkuts.portfolio_be.utils.exceptions.NotFoundException;
import com.viktorkuts.portfolio_be.work.datalayer.Skill;
import com.viktorkuts.portfolio_be.work.datalayer.SkillRepository;
import com.viktorkuts.portfolio_be.work.datalayer.WorkRepository;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
public class SkillServiceImpl implements SkillService {

    private final SkillRepository skillRepository;
    private final ImageRepository imageRepository;
    private final WorkRepository workRepository;

    public SkillServiceImpl(SkillRepository skillRepository, ImageRepository imageRepository, WorkRepository workRepository) {
        this.skillRepository = skillRepository;
        this.imageRepository = imageRepository;
        this.workRepository = workRepository;
    }

    @Override
    public Mono<Void> removeSkill(String skillId) {
        return skillRepository.getSkillById(skillId)
                .switchIfEmpty(Mono.error(new NotFoundException("Skill not found")))
                .flatMap(skill -> workRepository.getWorkBySkillsContaining(skill.getId())
                        .map(w -> {
                            w.getSkills().remove(skill.getId());
                            return w;
                        })
                        .flatMap(workRepository::save)
                        .then(Mono.just(skill))
                )
                .flatMap(skill -> imageRepository.deleteImage(skill.getIcon().getId())
                        .then(Mono.defer(() -> Mono.just(skill))))
                .flatMap(skillRepository::delete);
    }

    @Override
    public Mono<Skill> updateSkill(String skillId, String name, Image image) {
        return skillRepository.getSkillById(skillId)
                .switchIfEmpty(Mono.error(new NotFoundException("Skill not found")))
                .map(s -> {
                    s.setName(name);
                    s.setIcon(image);
                    return s;
                })
                .flatMap(skillRepository::save);
    }

    @Override
    public Mono<Skill> addSkill(String name, Image image) {
        return Mono.just(Skill.builder())
                .map(s -> {
                    s.name(name);
                    s.icon(image);
                    return s.build();
                })
                .flatMap(skillRepository::save);
    }

    @Override
    public Mono<Skill> getSkillById(String id) {
        return skillRepository.getSkillById(id)
                .switchIfEmpty(Mono.error(new NotFoundException("Skill not found")));
    }

    @Override
    public Flux<Skill> getAllSkills() {
        return skillRepository.findAll();
    }
}
