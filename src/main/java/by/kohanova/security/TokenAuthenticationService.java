package by.kohanova.security;

import by.kohanova.model.User;
import by.kohanova.model.UserAuthentication;
import by.kohanova.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;

@Service
public class TokenAuthenticationService {
    private final static String AUTH_HEADER_NAME = "x-auth-token";

    private final UserService userService;

    @Value("secret.token.key")
    private String secretKey;

    @Autowired
    public TokenAuthenticationService(UserService userService) {
        this.userService = userService;
    }

    public Authentication authenticate(HttpServletRequest request) {
        String token = request.getHeader(AUTH_HEADER_NAME);
        if (token != null) {
            final Jws<Claims> tokenData = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            User user = getUserFromToken(tokenData);
            if (checkPassword(tokenData, user)) {
                return new UserAuthentication(user);
            }
        }
        return null;
    }

    private User getUserFromToken(Jws<Claims> tokenData) {
        try {
            return userService.findByUsername(tokenData.getBody().get("username").toString());
        } catch (UsernameNotFoundException e) {
            System.out.println("Error getting user from token!");
            return null;
        }
    }

    private Boolean checkPassword(Jws<Claims> tokenData, User user) {
        if (user != null) {
            String tokenPassword = tokenData.getBody().get("password").toString();
            if (user.password.equals(tokenPassword)) {
                return true;
            }
        }
        return false;
    }
}
