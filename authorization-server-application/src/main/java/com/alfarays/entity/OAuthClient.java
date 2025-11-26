package com.alfarays.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Table(name = "oauth_clients")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OAuthClient {

    @Id
    private String id;

    @Column(nullable = false, unique = true)
    private String clientId;

    @Column(nullable = false)
    private String clientSecret;

    @Column(nullable = false)
    private String clientName;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "oauth_client_auth_methods", joinColumns = @JoinColumn(name = "client_id"))
    @Column(name = "auth_method")
    private Set<String> authenticationMethods;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "oauth_client_grant_types", joinColumns = @JoinColumn(name = "client_id"))
    @Column(name = "grant_type")
    private Set<String> grantTypes;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "oauth_client_redirect_uris", joinColumns = @JoinColumn(name = "client_id"))
    @Column(name = "redirect_uri")
    private Set<String> redirectUris;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "oauth_client_scopes", joinColumns = @JoinColumn(name = "client_id"))
    @Column(name = "scope")
    private Set<String> scopes;

    @Column(name = "access_token_ttl_minutes", nullable = false)
    private Integer accessTokenTtlMinutes;

    @Column(name = "refresh_token_ttl_hours")
    private Integer refreshTokenTtlHours;

    @Column(name = "require_proof_key")
    private Boolean requireProofKey;

    @Column(name = "token_format")
    private String tokenFormat; // SELF_CONTAINED or REFERENCE

    @Column(name = "reuse_refresh_tokens")
    private Boolean reuseRefreshTokens;

    @Column(name = "authorization_consent_required")
    private Boolean authorizationConsentRequired; // Default: false - whether user consent is required

    @Column(name = "jwks_url")
    private String jwksUrl; // JWKS endpoint URL for external key validation

    @Column(name = "token_revocation_authenticated")
    private Boolean tokenRevocationAuthenticated; // Default: false - require auth for token revocation

    @Column(name = "id_token_ttl_minutes")
    private Integer idTokenTtlMinutes; // Default: 15 minutes

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(
            name = "oauth_client_post_logout_uris",
            joinColumns = @JoinColumn(name = "client_id")
    )
    @Column(name = "post_logout_uri")
    private Set<String> postLogoutRedirectUris;


    @Column(name = "is_active")
    private Boolean isActive;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
        if (authorizationConsentRequired == null) {
            authorizationConsentRequired = false;
        }
        if (tokenRevocationAuthenticated == null) {
            tokenRevocationAuthenticated = false;
        }
        if (idTokenTtlMinutes == null) {
            idTokenTtlMinutes = 15;
        }
    }
}

