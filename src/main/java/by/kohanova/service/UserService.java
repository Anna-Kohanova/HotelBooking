package by.kohanova.service;

import by.kohanova.model.User;

import java.util.List;

/**
 * Service for {@link User}
 */
public interface UserService {
    /**
     * Find all {@link User} from database
     */
    List<User> findAll();

    /**
     * Find first of {@link User} by username in database
     */
    User findByUsername(String username);

    /**
     * Create and save {@link User} in database
     */
    User create(User user);

    /**
     * Edit {@link User} in database
     */
    User update(User user);

    /**
     * Delete {@link User} by id
     */
    void delete(Integer id);

    /**
     * Find {@link User} by id
     */
    User findById(Integer id);
}