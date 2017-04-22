package by.kohanova.controller;

import by.kohanova.model.Friends;
import by.kohanova.model.FriendsIds;
import by.kohanova.model.User;
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
 * Controller for the {@link FriendsService}
 */
@RestController
@RequestMapping("/friends")
public class FriendsController {
    private final FriendsService friendsService;
    private final UserService userService;

    final static Logger LOGGER = Logger.getLogger(FriendsController.class);

    @Autowired
    public FriendsController(FriendsService friendsService, UserService userService) {
        this.friendsService = friendsService;
        this.userService = userService;
    }

    /**
     * Create {@link Friends} in database
     * @return http response with http status code
     */
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public ResponseEntity<?> createFriends(@RequestBody FriendsIds friendsIds) {
        try {
            LOGGER.info("Start createFriends method");
            Integer currentId = friendsIds.current_id;
            Integer friendId = friendsIds.friend_id;
            User currentUser = userService.findById(currentId);
            User friendUser = userService.findById(friendId);
            Friends friends = new Friends();
            friends.userAlfa = currentUser;
            friends.userBeta = friendUser;
            friends.status = false;
            friendsService.create(friends);

            return new ResponseEntity<>(new Friends(), HttpStatus.CREATED);
        } catch (Exception e) {
            LOGGER.info("CreateFriends method failed " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Load requested friends by current user id
     * @return http response with http status code
     */
    @RequestMapping(value = "/requested/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> loadRequestedFriendsById(@PathVariable("id") Integer id) {
        try {
            LOGGER.info("Start loadRequestedFriendsById method");
            List<Friends> requestedFriends = friendsService.findByFriendId(id);
            for (Iterator<Friends> iter = requestedFriends.listIterator(); iter.hasNext(); ) {
                Friends friends = iter.next();
                if (friends.status) {
                    iter.remove();
                }
            }
            return new ResponseEntity<>(requestedFriends, HttpStatus.OK);
        } catch (NullPointerException e) {
            LOGGER.error("LoadRequestedFriendsById method failed " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Confirmation adding user to friends list
     * @return http response with http status code
     */
    @RequestMapping(value = "/confirm", method = RequestMethod.PUT)
    public ResponseEntity<?> updateFriends(@RequestBody FriendsIds friendsIds) {
        try {
            LOGGER.info("Start updateFriends method");
            Integer id1 = friendsIds.current_id;
            Integer id2 = friendsIds.friend_id;
            Friends friends = friendsService.findFriendByFriendId(id1, id2);
            friends.status = true;
            return new ResponseEntity<>(friendsService.update(friends), HttpStatus.OK);
        } catch (Exception e) {
            LOGGER.error("UpdateFriends method failed " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Return list of all friends from database
     */
    @RequestMapping("/all")
    public List<Friends> loadAllFriends() {
        try {
            LOGGER.info("Start loadAllFriends method");
            return friendsService.findAll();
        } catch (NullPointerException e) {
            LOGGER.error("LoadAllFriends method failed " + HttpStatus.BAD_REQUEST);
            return null;
        }
    }

    /**
     * Find list of confirmed {@link Friends} by current user id
     */
    @RequestMapping(value = "/all/{id}", method = RequestMethod.GET)
    public ResponseEntity<?> loadFriendsById(@PathVariable("id") Integer id) {
        try {
            LOGGER.info("Start loadFriendsById method");
            List<Friends> confirmedFriends = friendsService.findById(id);
            for (Iterator<Friends> iter = confirmedFriends.listIterator(); iter.hasNext(); ) {
                Friends friends = iter.next();
                if (!friends.status) {
                    iter.remove();
                }
            }
            List<Friends> friendss = friendsService.findByFriendId(id);
            for (Iterator<Friends> iter = friendss.listIterator(); iter.hasNext(); ) {
                Friends friends = iter.next();
                if (!friends.status) {
                    iter.remove();
                }
            }

            for (Friends friends : friendss) {
                confirmedFriends.add(friends);
            }

            User tempUser;
            for (Friends friends : confirmedFriends) {
                if (Objects.equals(friends.userBeta.id, id)) {
                    tempUser = friends.userAlfa;
                    friends.userAlfa = friends.userBeta;
                    friends.userBeta = tempUser;
                }
            }
            return new ResponseEntity<>(confirmedFriends, HttpStatus.OK);
        } catch (NullPointerException e) {
            LOGGER.error("loadFriendsById method failed " + HttpStatus.BAD_REQUEST);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
