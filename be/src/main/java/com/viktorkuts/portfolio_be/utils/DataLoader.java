package com.viktorkuts.portfolio_be.utils;

import com.viktorkuts.portfolio_be.images.datalayer.Image;
import com.viktorkuts.portfolio_be.shared.Address;
import com.viktorkuts.portfolio_be.shared.LocalizableString;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.datalayer.UserRepository;
import com.viktorkuts.portfolio_be.users.datalayer.UserType;
import com.viktorkuts.portfolio_be.work.datalayer.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Profile("!production")
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final WorkRepository workRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;

    public DataLoader(UserRepository userRepository, ResumeRepository resumeRepository, WorkRepository workRepository, SkillRepository skillRepository, ProjectRepository projectRepository) {
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.workRepository = workRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
    }

    @Override
    public void run(String... args) {
        ArrayList<User> users = new ArrayList<>();

        users.add(
                User.builder()
                        .id("1")
                        .email("vik.kuts@hotmail.com")
                        .type(UserType.USER)
                        .associatedId("auth0|67b4b660b5bdf73d9a1f401b")
                        .userInfo(
                                UserInfo.builder()
                                        .firstName("Viktor")
                                        .lastName("Kuts")
                                        .email("vik.kuts@hotmail.com")
                                        .phone("514-709-7180")
                                        .address(
                                                Address.builder()
                                                        .street("170 rue Lansdowne")
                                                        .city("Granby")
                                                        .state("QC")
                                                        .postal("J2G4P4")
                                                        .country("Canada")
                                                        .build()
                                        )
                                        .build()
                        )
                        .build()
        );

        ArrayList<Resume> resumes = new ArrayList<>();

        resumes.add(
                Resume.builder()
                        .id("1")
                        .userId("1")
                        .status(ResumeStatus.MAIN)
                        .contactInfo(
                                UserInfo.builder()
                                        .email("vik.kuts@hotmail.com")
                                        .phone("514-709-7180")
                                        .firstName("Viktor")
                                        .lastName("Kuts")
                                        .build()
                        )
                        .title("3rd year studento")
                        .description("Hi, I'm Viktor.")
                        .avatar(Image.builder()
                                .id("IMG_0060.jpeg").bucket("portfolio").build())
                        .links(List.of(
                                ProfileLink.builder()
                                        .url("https://github.com/viktorkuts")
                                        .label("GitHub")
                                        .icon(
                                                new Image("GitHub.svg", "portfolio")
                                        )
                                        .build()
                        ))
                        .build()
        );

        ArrayList<Work> works = new ArrayList<>();

        works.add(
                Work.builder()
                        .id("1")
                        .position("Typer")
                        .description("Learned how to type on a keyboard, how to use a computer")
                        .status(WorkStatus.PRESENT)
                        .company(
                                Company.builder()
                                        .name("BigTech")
                                        .email("info@bigtech.info")
                                        .phone("1234567890")
                                        .build()
                        )
                        .image(Image.builder().bucket("portfolio").id("John_Cena.webp").build())
                        .resumeId("1")
                        .skills(List.of("1"))
                        .build()
        );

        ArrayList<Skill> skills = new ArrayList<>();

        skills.add(
                Skill.builder()
                        .id("1")
                        .name("Lua")
                        .icon(Image.builder()
                                .bucket("portfolio")
                                .id("Lua-Logo.svg")
                                .build())
                        .build()
        );

        ArrayList<Project> projects = new ArrayList<>();

        projects.add(
                Project.builder()
                        .id("1")
                        .name("Java")
                        .description("Hello")
                        .image(
                                Image.builder()
                                        .bucket("portfolio")
                                        .id("Lua-Logo.svg")
                                        .build()
                        )
                        .links(
                                List.of(
                                ProfileLink
                                        .builder()
                                        .url("https://google.com")
                                        .label("Google")
                                        .icon(
                                                Image.builder()
                                                        .bucket("portfolio")
                                                        .id("Lua-Logo.svg")
                                                        .build()
                                        )
                                        .build()
                                )
                        )
                        .skills(List.of(skills.get(0).getId()))
                        .build()
        );

        userRepository.saveAll(users).subscribe();
        resumeRepository.saveAll(resumes).subscribe();
        workRepository.saveAll(works).subscribe();
        skillRepository.saveAll(skills).subscribe();
        projectRepository.saveAll(projects).subscribe();

    }
}
