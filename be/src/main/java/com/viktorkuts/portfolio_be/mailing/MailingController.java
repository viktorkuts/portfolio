package com.viktorkuts.portfolio_be.mailing;

import com.viktorkuts.portfolio_be.users.logiclayer.UserService;
import com.viktorkuts.portfolio_be.utils.exceptions.NotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/mail")
public class MailingController {

    private final MailSender mailSender;
    private final SimpleMailMessage mailMessage;
    private final UserService userService;
    @Value("${MAIL_SMTP_USER}@hexstudios.xyz") String from;

    public MailingController(JavaMailSenderImpl mailSender, UserService userService) {
        this.mailSender = mailSender;
        this.mailMessage = new SimpleMailMessage();
        this.mailMessage.setFrom(from);
        this.userService = userService;
    }

    @PostMapping
    @PreAuthorize("hasAnyAuthority('GUEST', 'USER')")
    public Mono<Void> sendMail(@RequestBody String content, @AuthenticationPrincipal JwtAuthenticationToken jwt){
        SimpleMailMessage msg = new SimpleMailMessage(this.mailMessage);
        msg.setText(content);
        return userService.getUserByJwt(jwt.getToken())
                .switchIfEmpty(Mono.error(new NotFoundException("User was not found")))
                .flatMap(u -> {
                    msg.setTo(u.getEmail());
                    msg.setSubject("Portfolio - " + u.getUserInfo().getFirstName());
                    mailSender.send(msg);
                    return Mono.empty();
                });
    }
}
