package com.viktorkuts.portfolio_be.work.logiclayer;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.work.datalayer.Skill;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface SkillService {
    Flux<Skill> getAllSkills();
    Mono<Skill> getSkillById(String id);
    Mono<Skill> addSkill(String name, Image image);
    Mono<Skill> updateSkill(String skillId, String name, Image image);
    Mono<Void> removeSkill(String skillId);
}
