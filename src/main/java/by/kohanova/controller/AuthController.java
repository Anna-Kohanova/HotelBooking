package by.kohanova.controller;

import by.kohanova.model.Token;
import by.kohanova.model.User;
import by.kohanova.security.TokenService;
import by.kohanova.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import static org.apache.commons.lang3.StringUtils.isNotEmpty;

/**
 * Controller for authentication realization
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
    private final TokenService tokenService;
    private final UserService userService;

    final static Logger LOGGER = Logger.getLogger(AuthController.class);

    @Autowired
    public AuthController(TokenService tokenService, UserService userService) {
        this.tokenService = tokenService;
        this.userService = userService;
    }

    /**
     * Find {@link User} by username and password in database and generate token by {@link TokenService}
     * @return {@link Token} and http response with http status code
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> authenticate(@RequestBody User requestUser) {
        if (isNotEmpty(requestUser.username) && isNotEmpty(requestUser.password)) {
            User user = userService.findByUsername(requestUser.username);
            String token = tokenService.generate(user, requestUser.password);
            if (token != null) {
                user.password = "";
                LOGGER.info("Autenticate method with token generating");
                return new ResponseEntity<>(new Token(token, user), HttpStatus.OK);
            }
        }
        LOGGER.error("Autenticate method failed with " + HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}
