package Bokaro.Backend.JWT;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.exceptions.JWTVerificationException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Component
public class JwtUtils {

    @Value("${app.jwtSecret}")
    private String jwtSecret;

    @Value("${app.jwtExpirationMs}")
    private long jwtExpirationMs;

    private Algorithm getAlgorithm() {
        return Algorithm.HMAC256(jwtSecret);
    }

    public String generateToken(UserDetails userDetails) {
        Date now = new Date();
        Date exp = new Date(now.getTime() + jwtExpirationMs);
        List<String> roles = userDetails.getAuthorities().stream()
                .map(ga -> ga.getAuthority()).collect(Collectors.toList());

        return JWT.create()
                .withSubject(userDetails.getUsername())
                .withClaim("roles", roles)
                .withIssuedAt(now)
                .withExpiresAt(exp)
                .sign(getAlgorithm());
    }

    public boolean validateJwtToken(String token) {
        try {
            JWT.require(getAlgorithm()).build().verify(token);
            return true;
        } catch (JWTVerificationException ex) {
            return false;
        }
    }

    public String getUserNameFromJwtToken(String token) {
        DecodedJWT jwt = JWT.require(getAlgorithm()).build().verify(token);
        return jwt.getSubject();
    }
}
