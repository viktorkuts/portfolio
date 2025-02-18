package com.viktorkuts.portfolio_be.utils;

import com.viktorkuts.portfolio_be.shared.Address;
import com.viktorkuts.portfolio_be.shared.LocalizableString;
import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.datalayer.UserRepository;
import com.viktorkuts.portfolio_be.users.datalayer.UserType;
import com.viktorkuts.portfolio_be.work.datalayer.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;
    private final ResumeRepository resumeRepository;
    private final WorkRepository workRepository;

    public DataLoader(UserRepository userRepository, ResumeRepository resumeRepository, WorkRepository workRepository) {
        this.userRepository = userRepository;
        this.resumeRepository = resumeRepository;
        this.workRepository = workRepository;
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
                        .build()
        );

        ArrayList<Work> works = new ArrayList<>();

        works.add(
                Work.builder()
                        .id("1")
                        .position(LocalizableString.builder()
                                .original("Typer")
                                .french("Le tappeur")
                                .build()
                        )
                        .description(LocalizableString.builder()
                                .original("Learned how to type on a keyboard, how to use a computer")
                                .french("Appris comment utiliser un clavier et l'ordinateur")
                                .build())
                        .status(WorkStatus.PRESENT)
                        .company(
                                Company.builder()
                                        .name("BigTech")
                                        .email("info@bigtech.info")
                                        .phone("1234567890")
                                        .build()
                        )
                        .resumeId("1")
                        .build()
        );

        userRepository.saveAll(users).subscribe();
        resumeRepository.saveAll(resumes).subscribe();
        workRepository.saveAll(works).subscribe();

    }
}
