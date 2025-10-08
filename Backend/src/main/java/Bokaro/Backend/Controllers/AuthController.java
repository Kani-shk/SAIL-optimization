package Bokaro.Backend.Controllers;

import Bokaro.Backend.Requests.LoginRequest;
import Bokaro.Backend.Requests.RegisterRequest;
import Bokaro.Backend.Responses.AuthResponse;
import Bokaro.Backend.Services.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    public AuthController(AuthService authService) { this.authService = authService; }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        authService.registerUser(req);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest req) {
        AuthResponse resp = authService.authenticate(req);
        return ResponseEntity.ok(resp);
    }
}
