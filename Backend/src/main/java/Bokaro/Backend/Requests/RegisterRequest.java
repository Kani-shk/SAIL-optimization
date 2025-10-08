package Bokaro.Backend.Requests;

import jakarta.validation.constraints.*;

public class RegisterRequest {
    @NotBlank
    @Size(min=3, max=50)
    private String username;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Size(min=6, max=100)
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
