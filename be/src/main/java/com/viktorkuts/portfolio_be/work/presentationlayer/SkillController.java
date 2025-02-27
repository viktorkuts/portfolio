package com.viktorkuts.portfolio_be.work.presentationlayer;

import com.viktorkuts.portfolio_be.work.datalayer.Skill;
import com.viktorkuts.portfolio_be.work.logiclayer.SkillService;
import com.viktorkuts.portfolio_be.work.presentationlayer.models.SkillRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/skills")
public class SkillController {
    private final SkillService skillService;

    public SkillController(SkillService skillService) {
        this.skillService = skillService;
    }

    @GetMapping()
    public Flux<Skill> getSkills() {
        return skillService.getAllSkills();
    }

    @GetMapping("/{skillId}")
    public Mono<Skill> getSkillById(@PathVariable("skillId") String skillId) {
        return skillService.getSkillById(skillId);
    }

    @PreAuthorize("hasAuthority('USER')")
    @PostMapping
    public Mono<Skill> createSkill(@RequestBody SkillRequest rq) {
        return skillService.addSkill(rq.getName(), rq.getIcon());
    }

    @PreAuthorize("hasAuthority('USER')")
    @PutMapping("/{skillId}")
    public Mono<Skill> updateSkill(@PathVariable("skillId") String skillId, @RequestBody SkillRequest req) {
        return skillService.updateSkill(skillId, req.getName(), req.getIcon());
    }

    @PreAuthorize("hasAuthority('USER')")
    @DeleteMapping("/{skillId}")
    public Mono<Void> deleteSkill(@PathVariable("skillId") String skillId) {
        return skillService.removeSkill(skillId);
    }
}
