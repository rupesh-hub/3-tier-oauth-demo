package com.alfarays.controller;

import com.alfarays.entity.AppUser;
import com.alfarays.model.RegisterRequest;
import com.alfarays.model.RegisterResponse;
import com.alfarays.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:4200")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@RequestBody RegisterRequest request) {
        try {
            AppUser user = authService.registerUser(
                    request.getEmail(),
                    request.getPassword()
            );

            RegisterResponse response = new RegisterResponse();
            response.setId(user.getId());
            response.setEmail(user.getEmail());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
