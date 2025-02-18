package com.viktorkuts.portfolio_be.users.logiclayer;

import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.presentationlayer.models.UserRequestModel;
import org.springframework.security.oauth2.jwt.Jwt;
import reactor.core.publisher.Mono;

public interface UserService {
    Mono<User> getUserByJwt(final Jwt jwt);
    Mono<User> getUserByUserId(final String userId);
    Mono<User> addUser(Mono<UserRequestModel> model, String sub);
}
