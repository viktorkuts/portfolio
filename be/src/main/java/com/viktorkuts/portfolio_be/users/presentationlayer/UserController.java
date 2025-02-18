package com.viktorkuts.portfolio_be.users.presentationlayer;

import com.viktorkuts.portfolio_be.users.logiclayer.UserService;
import com.viktorkuts.portfolio_be.users.presentationlayer.models.UserRequestModel;
import com.viktorkuts.portfolio_be.users.presentationlayer.models.UserResponseModel;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PreAuthorize("isAuthenticated()")
    @GetMapping("/current-user")
    public Mono<UserResponseModel> getCurrentUser(@AuthenticationPrincipal JwtAuthenticationToken jwt) {
        return userService.getUserByJwt(jwt.getToken())
                .map(UserResponseModel::from);
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping()
    public Mono<UserResponseModel> addUser(@AuthenticationPrincipal JwtAuthenticationToken jwt, @RequestBody Mono<UserRequestModel> user) {
        return userService.addUser(user, jwt.getName())
                .map(UserResponseModel::from);
    }
}
