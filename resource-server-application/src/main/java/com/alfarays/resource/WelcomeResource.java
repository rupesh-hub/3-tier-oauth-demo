package com.alfarays.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class WelcomeResource {

    @GetMapping("/welcome")
    public ResponseEntity<Map<String, String>> welcome(Authentication authentication) {
        Map<String,String> map = new HashMap<>();
        map.put("message",String.format("Welcome %s to Security System!!", authentication.getName()));
        return ResponseEntity.ok(map);
    }

}
