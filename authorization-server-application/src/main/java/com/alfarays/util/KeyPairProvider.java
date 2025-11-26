package com.alfarays.util;

import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.ImmutableJWKSet;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.KeyFactory;
import java.security.KeyPair;
import java.security.PrivateKey;
import java.security.PublicKey;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class KeyPairProvider {

    private final ResourceLoader resourceLoader;

    @Value("${oauth2.rsa.private-key-path:classpath:keys/private_key.pem}")
    private String privateKeyPath;

    @Value("${oauth2.rsa.public-key-path:classpath:keys/public_key.pem}")
    private String publicKeyPath;

    public JWKSource<SecurityContext> getJwkSource() {
        try {
            KeyPair keyPair = loadKeyPair();
            RSAPublicKey publicKey = (RSAPublicKey) keyPair.getPublic();
            RSAPrivateKey privateKey = (RSAPrivateKey) keyPair.getPrivate();

            RSAKey rsaKey = new RSAKey.Builder(publicKey)
                    .privateKey(privateKey)
                    .keyID(UUID.randomUUID().toString())
                    .build();

            JWKSet jwkSet = new JWKSet(rsaKey);
            return new ImmutableJWKSet<>(jwkSet);
        } catch (Exception e) {
            log.error("Failed to load key pair from classpath", e);
            throw new IllegalStateException("Unable to load RSA key pair", e);
        }
    }

    private KeyPair loadKeyPair() throws Exception {
        String privateKeyContent = loadKeyContent(privateKeyPath);
        PrivateKey privateKey = loadPrivateKey(privateKeyContent);

        String publicKeyContent = loadKeyContent(publicKeyPath);
        PublicKey publicKey = loadPublicKey(publicKeyContent);

        return new KeyPair(publicKey, privateKey);
    }

    private String loadKeyContent(String keyPath) throws IOException {
        if (keyPath.startsWith("classpath:")) {
            String resourcePath = keyPath.replace("classpath:", "");
            Resource resource = resourceLoader.getResource("classpath:" + resourcePath);
            String content = Files.readString(Paths.get(resource.getURI()));
            return content.replace("-----BEGIN PRIVATE KEY-----", "")
                    .replace("-----END PRIVATE KEY-----", "")
                    .replace("-----BEGIN PUBLIC KEY-----", "")
                    .replace("-----END PUBLIC KEY-----", "")
                    .replaceAll("\\s", "");
        }
        return Files.readString(Paths.get(keyPath))
                .replaceAll("-----BEGIN PRIVATE KEY-----", "")
                .replaceAll("-----END PRIVATE KEY-----", "")
                .replaceAll("-----BEGIN PUBLIC KEY-----", "")
                .replaceAll("-----END PUBLIC KEY-----", "")
                .replaceAll("\\s", "");
    }

    private PrivateKey loadPrivateKey(String key) throws Exception {
        byte[] decodedKey = Base64.getDecoder().decode(key);
        PKCS8EncodedKeySpec spec = new PKCS8EncodedKeySpec(decodedKey);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePrivate(spec);
    }

    private PublicKey loadPublicKey(String key) throws Exception {
        byte[] decodedKey = Base64.getDecoder().decode(key);
        X509EncodedKeySpec spec = new X509EncodedKeySpec(decodedKey);
        KeyFactory keyFactory = KeyFactory.getInstance("RSA");
        return keyFactory.generatePublic(spec);
    }
}
