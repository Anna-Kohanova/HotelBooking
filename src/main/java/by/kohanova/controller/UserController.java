package by.kohanova.controller;

import by.kohanova.model.Friends;
import by.kohanova.model.Role;
import by.kohanova.model.Token;
import by.kohanova.model.User;
import by.kohanova.security.TokenService;
import by.kohanova.service.FriendsService;
import by.kohanova.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Iterator;
import java.util.List;
import java.util.Objects;

/**
 * User Controller for {@link UserService}
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;
    private final TokenService tokenService;
    private final FriendsService friendsService;

    final static Logger LOGGER = Logger.getLogger(UserController.class);

    @Autowired
    public UserController(UserService userService, FriendsService friendsService,
                          TokenService tokenService) {
        this.tokenService = tokenService;
        this.userService = userService;
        this.friendsService = friendsService;
    }

    /**
     * Create {@link User} in database from registration form
     *
     * @return http response with http status code
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> createUser(@RequestBody User user) {
        try {
            LOGGER.info("Start createUser method");
            String token = addUser(user);
            user.password = "";
            return new ResponseEntity<>(new Token(token, user), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Failed createUser method with " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Return list of all users from database
     */
    @RequestMapping("/all")
    public List<User> loadAllUsers() {
        try {
            LOGGER.info("Start loadAllUsers method");
            return userService.findAll();
        } catch (NullPointerException e) {
            LOGGER.error("Failed loadAllUsers method with NPE");
            return null;
        }
    }

    /**
     * Return list of users excluding admin, current user and confirmed friends
     */
    @RequestMapping(value = "/friends/{id}", method = RequestMethod.GET)
    public List<User> loadPossibleFriends(@PathVariable Integer id) {
        try {
            LOGGER.info("Start loadPossibleFriends method");
            List<Friends> friendsListByCurrentUser = friendsService.findById(id);
            List<Friends> friendsListByRequestedUser = friendsService.findByFriendId(id);
            List<User> allUsers = userService.findAll();

            for (Friends friends : friendsListByCurrentUser) {
                allUsers.remove(friends.userBeta);
            }
            for (Friends friends : friendsListByRequestedUser) {
                allUsers.remove(friends.userAlfa);
            }

            for (Iterator<User> iter = allUsers.listIterator(); iter.hasNext(); ) {
                User user = iter.next();
                if (Objects.equals(user.id, id) ||user.roles.get(0).id != 2){
                    iter.remove();
                }
            }
            return allUsers;
        } catch (NullPointerException e) {
            LOGGER.error("Failed loadPossibleFriends method with NPE");
            return null;
        }
    }

    /**
     * Update {@link User} info in database
     *
     * @return http response with http status code
     */
    @RequestMapping(value = "/update", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@RequestBody User user) {
        try {
            LOGGER.info("Start updateUser method");
            Role role = new Role();
            role.id = 2;
            user.roles.add(role);
            return new ResponseEntity<>(userService.update(user), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("Failed updateUser method with " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Find {@link User} by username in database
     */
    @RequestMapping(value = "/username/{username}", method = RequestMethod.GET)
    public ResponseEntity<?> loadUserByUsername(@PathVariable String username) {
        try {
            LOGGER.info("Start loadUserByUsername method");
            return new ResponseEntity<>(userService.findByUsername(username), HttpStatus.OK);
        } catch (NullPointerException e) {
            LOGGER.error("Failed loadUserByUsername method with " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Delete {@link User} by id from database
     *
     * @return http response with http status code
     */
    @RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> deleteUser(@PathVariable("id") Integer id) {
        try {
            LOGGER.info("Start deleteUser method");
            userService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (NullPointerException e) {
            LOGGER.error("Failed deleteUser method with " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Add {@link User} object to database with base user role
     */
    private String addUser(User user) {
        user.photo = "";
        Role role = new Role();
        role.id = 2;
        user.roles.add(role);
        List<User> users = loadAllUsers();
        for (User userFromDB : users) {
            if (userFromDB.username.equals(user.username)) {
                return null;
            }
        }
        userService.create(user);
        return tokenService.generate(user, user.password);
    }
}
