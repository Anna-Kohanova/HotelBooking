package by.kohanova.service;

import by.kohanova.model.Friends;
import by.kohanova.model.User;

import java.util.List;

public interface FriendsService {

    /**
     * Find all {@link Friends} from database
     */
    List<Friends> findAll();

    /**
     * Create and save {@link Friends} in database
     */
    Friends create(Friends friends);

    /**
     * Find list of {@link Friends} by current {@link User} id
     */
    List<Friends> findById(Integer id);

    /**
     * Find list of {@link Friends} by friend id in database
     */
    List<Friends> findByFriendId(Integer id);

    /**
     * Find {@link Friends} by current {@link User} id and friend id
     */
    Friends findFriendByFriendId(Integer id1, Integer id2);

    /**
     * Update {@link Friends} in database
     */
    Friends update(Friends friends);
}
