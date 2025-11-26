CREATE TABLE IF NOT EXISTS oauth_clients
(
    id                             VARCHAR(36) PRIMARY KEY,
    client_id                      VARCHAR(255) NOT NULL UNIQUE,
    client_secret                  VARCHAR(255),
    client_name                    VARCHAR(255) NOT NULL,

    access_token_ttl_minutes       INT          NOT NULL DEFAULT 10,
    refresh_token_ttl_hours        INT,

    require_proof_key              BOOLEAN               DEFAULT FALSE,
    token_format                   VARCHAR(50)  NOT NULL DEFAULT 'SELF_CONTAINED',
    reuse_refresh_tokens           BOOLEAN               DEFAULT TRUE,

    authorization_consent_required BOOLEAN               DEFAULT FALSE,
    jwks_url                       VARCHAR(500),
    token_revocation_authenticated BOOLEAN               DEFAULT FALSE,
    id_token_ttl_minutes           INT                   DEFAULT 15,

    is_active                      BOOLEAN               DEFAULT TRUE,
    created_at                     TIMESTAMP             DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_client_id ON oauth_clients(client_id);

-- OAuth2 Client Authentication Methods
CREATE TABLE IF NOT EXISTS oauth_client_auth_methods
(
    client_id   VARCHAR(36),
    auth_method VARCHAR(50),
    FOREIGN KEY (client_id) REFERENCES oauth_clients (id) ON DELETE CASCADE
);

-- OAuth2 Client Grant Types
CREATE TABLE IF NOT EXISTS oauth_client_grant_types
(
    client_id  VARCHAR(36),
    grant_type VARCHAR(50),
    FOREIGN KEY (client_id) REFERENCES oauth_clients (id) ON DELETE CASCADE
);

-- OAuth2 Client Redirect URIs
CREATE TABLE IF NOT EXISTS oauth_client_redirect_uris
(
    client_id    VARCHAR(36),
    redirect_uri VARCHAR(500),
    FOREIGN KEY (client_id) REFERENCES oauth_clients (id) ON DELETE CASCADE
);

-- OAuth2 Client Scopes
CREATE TABLE IF NOT EXISTS oauth_client_scopes
(
    client_id VARCHAR(36),
    scope     VARCHAR(100),
    FOREIGN KEY (client_id) REFERENCES oauth_clients (id) ON DELETE CASCADE
);

-- Application Users Table
CREATE TABLE IF NOT EXISTS users
(
    id       VARCHAR(36) PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    email    VARCHAR(255) NOT NULL UNIQUE
);


-- User Roles Table
CREATE TABLE IF NOT EXISTS roles
(
    user_id VARCHAR(36),
    role    VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);


CREATE TABLE IF NOT EXISTS oauth_client_post_logout_uris (
                                               client_id VARCHAR(255) NOT NULL,
                                               post_logout_uri VARCHAR(1024) NOT NULL,
                                               FOREIGN KEY (client_id) REFERENCES oauth_clients (id) ON DELETE CASCADE
);

-- ----------------------------------------
-- CLIENT 1 – CLIENT CREDENTIALS CLIENT --
-- ----------------------------------------

INSERT INTO oauth_clients (id,
                           client_id,
                           client_secret,
                           client_name,
                           access_token_ttl_minutes,
                           refresh_token_ttl_hours,
                           require_proof_key,
                           token_format,
                           reuse_refresh_tokens,
                           authorization_consent_required,
                           jwks_url,
                           token_revocation_authenticated,
                           id_token_ttl_minutes,
                           is_active,
                           created_at)
VALUES ('client-1',
        'purely-goods-cc',
        '$2a$12$ZCdlGvC3mZnwvjCa/A0Jjuwlg8a0qF8Dt41kALyLfAq54H14Dk/ge',
        'Purely Goods Client Credentials Client',
        10,
        NULL,
        FALSE,
        'SELF_CONTAINED',
        TRUE,
        FALSE,
        NULL,
        FALSE,
        15,
        TRUE,
        NOW());

INSERT INTO oauth_client_auth_methods (client_id, auth_method)
VALUES ('client-1', 'client_secret_post');

INSERT INTO oauth_client_grant_types (client_id, grant_type)
VALUES ('client-1', 'client_credentials');

INSERT INTO oauth_client_scopes (client_id, scope)
VALUES ('client-1', 'openid'),
       ('client-1', 'email'),
       ('client-1', 'profile');

-- -------------------------------------
-- CLIENT 2 – AUTHORIZATION CODE APP --
-- -------------------------------------

INSERT INTO oauth_clients (id,
                           client_id,
                           client_secret,
                           client_name,
                           access_token_ttl_minutes,
                           refresh_token_ttl_hours,
                           require_proof_key,
                           token_format,
                           reuse_refresh_tokens,
                           authorization_consent_required,
                           jwks_url,
                           token_revocation_authenticated,
                           id_token_ttl_minutes,
                           is_active,
                           created_at)
VALUES ('client-2', 'purely-goods-ac', '$2a$12$38uzPvksuDveWCgcvjXacu4tpmviyFlahRpfE/e/tfLQ51KGD.pP6',
        'Purely Goods Authorization Code Client', 10, 8, FALSE, 'SELF_CONTAINED', TRUE, FALSE, NULL, FALSE, 15, TRUE,
        NOW());

INSERT INTO oauth_client_auth_methods (client_id, auth_method)
VALUES ('client-2', 'client_secret_post'),
       ('client-2', 'client_secret_basic');

INSERT INTO oauth_client_grant_types (client_id, grant_type)
VALUES ('client-2', 'authorization_code'),
       ('client-2', 'refresh_token');

INSERT INTO oauth_client_redirect_uris (client_id, redirect_uri)
VALUES ('client-2', 'https://oauth.pstmn.io/v1/callback'),
       ('client-2', 'http://localhost:4200/callback');

INSERT INTO oauth_client_scopes (client_id, scope)
VALUES ('client-2', 'openid'),
       ('client-2', 'email'),
       ('client-2', 'profile');

-- --------------------------------
-- CLIENT 3 – PKCE PUBLIC CLIENT --
-- --------------------------------

INSERT INTO oauth_clients (
    id, client_id, client_secret, client_name,
    access_token_ttl_minutes, refresh_token_ttl_hours,
    require_proof_key, token_format, reuse_refresh_tokens, authorization_consent_required,
    jwks_url, token_revocation_authenticated, id_token_ttl_minutes, is_active, created_at
) VALUES (
             'client-3', 'purely-goods-ac-pkce', NULL, 'Purely Goods PKCE Client',
             10, 8,
             TRUE, 'SELF_CONTAINED', TRUE, FALSE,
             NULL, FALSE, 15, TRUE, NOW()
         );

INSERT INTO oauth_client_auth_methods (client_id, auth_method)
VALUES ('client-3', 'none');

INSERT INTO oauth_client_grant_types (client_id, grant_type)
VALUES ('client-3', 'authorization_code'),
       ('client-3', 'refresh_token');

INSERT INTO oauth_client_redirect_uris (client_id, redirect_uri)
VALUES ('client-3', 'http://localhost:4200/callback'),
       ('client-3', 'http://localhost:8080/callback');

INSERT INTO oauth_client_post_logout_uris (client_id, post_logout_uri)
VALUES ('client-3', 'http://localhost:4200/login'),
       ('client-3', 'http://localhost:8080/login');

INSERT INTO oauth_client_scopes (client_id, scope)
VALUES ('client-3', 'openid'),
       ('client-3', 'email'),
       ('client-3', 'profile');



-- USER
INSERT INTO users(id, password, email)
values (1, '$2a$12$wju8zMmdj5wSKpQOIQcGqeIpozAVHBLA5XA6G2KiUoHNgskAeKJ7q', 'rupesh.dulal@gmail.com');
INSERT INTO roles(user_id, role)
values (1, 'USER');
