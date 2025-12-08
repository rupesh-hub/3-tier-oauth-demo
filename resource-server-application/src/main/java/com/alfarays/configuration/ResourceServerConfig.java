package com.alfarays.configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class ResourceServerConfig {

    @Value("${application.jwk-set-uri:http://localhost:9000/oauth2/jwks}")
    private String JWK_SET_URI;

    @Value("${application.cors.origins}")
    private List<String> corsOrigins;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)
                .cors(
                        config -> config.configurationSource(
                                request -> {
                                    CorsConfiguration configuration = new CorsConfiguration();
                                    configuration.setAllowedOrigins(corsOrigins);
                                    configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"));
                                    configuration.setAllowedHeaders(Arrays.asList("*"));
                                    configuration.setAllowCredentials(true);
                                    configuration.setMaxAge(3600L);
                                    return configuration;
                                }
                        )
                )
                .authorizeHttpRequests((authorize) -> authorize
                        .requestMatchers("/h2-console/**")
                        .permitAll()
                        .anyRequest()
                        .authenticated())
                .headers(headers -> headers.frameOptions(frame -> frame.sameOrigin()))
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwkSetUri(JWK_SET_URI))
                );

        return http.build();
    }
}
