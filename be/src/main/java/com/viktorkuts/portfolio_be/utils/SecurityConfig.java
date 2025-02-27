package com.viktorkuts.portfolio_be.utils;

import com.viktorkuts.portfolio_be.users.logiclayer.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.core.env.Environment;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {
    @Value("${spring.security.oauth2.client.provider.okta.issuer-uri}")
    private String issuer;
    @Value("${portfolio.frontend.url}")
    private String frontend;
    @Autowired
    private Environment env;
    private final UserService userService;

    public SecurityConfig(UserService userService) {
        this.userService = userService;
    }

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
                .authorizeExchange(ex -> ex.anyExchange()
                        .permitAll())
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .cors(cors -> cors.configurationSource(corsConfig()))
                .oauth2ResourceServer(server -> server.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtMonoConverter())));
        return http.build();
    }

    private Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtMonoConverter(){
        ReactiveJwtAuthenticationConverter converter = new ReactiveJwtAuthenticationConverter();
        converter.setJwtGrantedAuthoritiesConverter(jwtFluxConverter());
        return converter;
    }

    private Converter<Jwt, Flux<GrantedAuthority>> jwtFluxConverter() {
        return (jwt) -> userService.getUserByJwt(jwt)
                .map(user -> (GrantedAuthority) new SimpleGrantedAuthority(user.getType().name()))
                .flux();
    }

    @Bean
    public CorsWebFilter corsWebFilter(){
        return new CorsWebFilter(corsConfig());
    }

    @Bean
    public UrlBasedCorsConfigurationSource corsConfig(){
        String deploymentBranch = env.getProperty("COOLIFY_BRANCH");
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin(frontend);
        config.addAllowedOrigin(issuer.substring(0, issuer.length() - 1));
        if(deploymentBranch != null && deploymentBranch.split("/").length > 1 && deploymentBranch.split("/")[1].matches("\\d+")){
            config.addAllowedOrigin(frontend.replace("://", "://" + deploymentBranch.split("/")[1] + "."));
        }
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);

        config.addAllowedOriginPattern("*");

        UrlBasedCorsConfigurationSource src = new UrlBasedCorsConfigurationSource();
        src.registerCorsConfiguration("/**", config);
        return src;
    }
}
