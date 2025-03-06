package com.viktorkuts.portfolio_be.users.logiclayer;

import com.viktorkuts.portfolio_be.shared.UserInfo;
import com.viktorkuts.portfolio_be.users.datalayer.User;
import com.viktorkuts.portfolio_be.users.datalayer.UserRepository;
import com.viktorkuts.portfolio_be.users.datalayer.UserType;
import com.viktorkuts.portfolio_be.users.presentationlayer.models.UserRequestModel;
import com.viktorkuts.portfolio_be.utils.exceptions.InvalidInputException;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    @Override
    public Mono<User> getUserByJwt(Jwt jwt){
        return userRepository.findUserByAssociatedId(jwt.getClaimAsString("sub"));
    }

    @Override
    public Mono<User> getUserByUserId(String userId) {
        return userRepository.findById(userId);
    }

    @Override
    public Mono<User> addUser(Mono<UserRequestModel> model, String sub){
        return model
                .map(req -> User.builder()
                        .id(UUID.randomUUID().toString())
                        .email(req.getEmail())
                        .type(UserType.GUEST)
                        .userInfo(UserInfo.builder()
                                .firstName(req.getFirstName())
                                .lastName(req.getLastName())
                                .phone(req.getPhone())
                                .address(req.getAddress())
                                .email(req.getEmail())
                                .build()
                        )
                        .associatedId(sub)
                        .build())
                .flatMap(user -> userRepository.findUserByEmail(user.getEmail())
                        .flatMap(e -> Mono.error(new InvalidInputException("Email is already in use")))
                        .then(Mono.just(user))
                        .switchIfEmpty(Mono.just(user)))
                .flatMap(user -> userRepository.findUserByAssociatedId(user.getAssociatedId())
                        .flatMap(e -> Mono.error(new InvalidInputException("Auth account is already in use")))
                        .then(Mono.just(user))
                        .switchIfEmpty(Mono.just(user)))
                .flatMap(userRepository::save);
    }
}
