package com.alfarays.service;

import com.alfarays.entity.OAuthClient;
import com.alfarays.repository.OAuthClientRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClient;
import org.springframework.security.oauth2.server.authorization.client.RegisteredClientRepository;
import org.springframework.security.oauth2.server.authorization.settings.ClientSettings;
import org.springframework.security.oauth2.server.authorization.settings.OAuth2TokenFormat;
import org.springframework.security.oauth2.server.authorization.settings.TokenSettings;
import org.springframework.stereotype.Service;
import java.time.Duration;

@Service
@RequiredArgsConstructor
@Slf4j
public class DatabaseRegisteredClientRepository implements RegisteredClientRepository {

    private final OAuthClientRepository oAuthClientRepository;

    @Override
    public void save(RegisteredClient registeredClient) {
        // Optional: implement if you want to save from RegisteredClient object
        throw new UnsupportedOperationException("Use OAuthClientRepository to save clients");
    }

    @Override
    public RegisteredClient findById(String id) {
        return oAuthClientRepository.findById(id)
                .map(this::convertToRegisteredClient)
                .orElse(null);
    }

    @Override
    public RegisteredClient findByClientId(String clientId) {
        return oAuthClientRepository.findByClientIdAndIsActiveTrue(clientId)
                .map(this::convertToRegisteredClient)
                .orElse(null);
    }

    private RegisteredClient convertToRegisteredClient(OAuthClient oAuthClient) {
        RegisteredClient.Builder builder = RegisteredClient.withId(oAuthClient.getId())
                .clientId(oAuthClient.getClientId())
                .clientSecret(oAuthClient.getClientSecret())
                .clientName(oAuthClient.getClientName());

        oAuthClient.getAuthenticationMethods().forEach(method ->
                builder.clientAuthenticationMethod(new ClientAuthenticationMethod(method))
        );

        oAuthClient.getGrantTypes().forEach(grantType ->
                builder.authorizationGrantType(new AuthorizationGrantType(grantType))
        );

        oAuthClient.getRedirectUris().forEach(builder::redirectUri);

        if (oAuthClient.getPostLogoutRedirectUris() != null && !oAuthClient.getPostLogoutRedirectUris().isEmpty()) {
            oAuthClient.getPostLogoutRedirectUris().forEach(builder::postLogoutRedirectUri);
        }

        oAuthClient.getScopes().forEach(builder::scope);

        TokenSettings.Builder tokenSettingsBuilder = TokenSettings.builder()
                .accessTokenTimeToLive(Duration.ofMinutes(oAuthClient.getAccessTokenTtlMinutes()))
               // .accessTokenFormat(OAuth2TokenFormat.valueOf(oAuthClient.getTokenFormat()))
                .reuseRefreshTokens(oAuthClient.getReuseRefreshTokens() != null && oAuthClient.getReuseRefreshTokens());

        // Only add optional fields if they are set
        if (oAuthClient.getRefreshTokenTtlHours() != null) {
            tokenSettingsBuilder.refreshTokenTimeToLive(Duration.ofHours(oAuthClient.getRefreshTokenTtlHours()));
        }

        if (oAuthClient.getIdTokenTtlMinutes() != null) {
            //tokenSettingsBuilder.idTokenTimeToLive(Duration.ofMinutes(oAuthClient.getIdTokenTtlMinutes()));
        }

        builder.tokenSettings(tokenSettingsBuilder.build());

        ClientSettings.Builder clientSettingsBuilder = ClientSettings.builder();

        if (oAuthClient.getRequireProofKey() != null && oAuthClient.getRequireProofKey()) {
            clientSettingsBuilder.requireProofKey(true);
        }

        if (oAuthClient.getAuthorizationConsentRequired() != null) {
            clientSettingsBuilder.requireAuthorizationConsent(oAuthClient.getAuthorizationConsentRequired());
        }

        if (oAuthClient.getJwksUrl() != null) {
            clientSettingsBuilder.jwkSetUrl(oAuthClient.getJwksUrl());
        }

        builder.clientSettings(clientSettingsBuilder.build());

        log.info("[v0] Successfully converted OAuthClient '{}' to RegisteredClient", oAuthClient.getClientId());
        return builder.build();
    }
}
