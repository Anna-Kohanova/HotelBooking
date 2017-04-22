package by.kohanova.repository;

import by.kohanova.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * JpaRepository for working with users table
 */
public interface UserRepository extends JpaRepository<User, Integer> {
    /**
     * Find {@link User} by username
     */
    @Query("select u from User u where u.username = :username")
    User findByUsername(@Param("username") String username);

    /**
     * Find {@link User} by user id
     */
    @Query("select u from User u where u.id = :id")
    User findById(@Param("id") Integer id);
}
