package Bokaro.Backend.Services;

import Bokaro.Backend.JWT.JwtUtils;
import Bokaro.Backend.Models.User;
import Bokaro.Backend.Repository.UserRepository;
import Bokaro.Backend.Requests.LoginRequest;
import Bokaro.Backend.Requests.RegisterRequest;
import Bokaro.Backend.Responses.AuthResponse;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Set;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtUtils jwtUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
    }

    public void registerUser(RegisterRequest req) {
        if (userRepository.existsByUsername(req.getUsername())) {
            throw new RuntimeException("Username already taken");
        }
        if (userRepository.existsByEmail(req.getEmail())) {
            throw new RuntimeException("Email already in use");
        }
        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(passwordEncoder.encode(req.getPassword()));
        user.setRoles(Set.of("ROLE_USER"));
        userRepository.save(user);
    }

    public AuthResponse authenticate(LoginRequest req) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.getUsernameOrEmail(), req.getPassword())
        );
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);
        return new AuthResponse(jwt);
    }
}
