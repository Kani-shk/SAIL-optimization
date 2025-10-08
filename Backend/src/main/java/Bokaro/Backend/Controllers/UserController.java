package Bokaro.Backend.Controllers;

import Bokaro.Backend.JWT.CustomUserDetails;
import Bokaro.Backend.Models.User;
import Bokaro.Backend.Repository.UserRepository;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserRepository userRepository;
    public UserController(UserRepository userRepository) { this.userRepository = userRepository; }

    @GetMapping("/me")
    public User getMe(@AuthenticationPrincipal CustomUserDetails currentUser) {
        return userRepository.findById(currentUser.getId()).orElseThrow();
    }
}

