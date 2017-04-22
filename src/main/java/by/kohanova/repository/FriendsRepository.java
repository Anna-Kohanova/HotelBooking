package by.kohanova.repository;

import by.kohanova.model.Friends;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * JpaRepository for working with friends table
 */
public interface FriendsRepository extends JpaRepository<Friends, Integer> {
    /**
     * Find {@link Friends} by current user id
     */
    @Query("select f from Friends f where f.userAlfa.id = :id")
    List<Friends> findByCurrentUserId(@Param("id") Integer id);

    /**
     * Find {@link Friends} by friend id
     */
    @Query("select f from Friends f where f.userBeta.id = :id")
    List<Friends> findByFriendId(@Param("id") Integer id);

    /**
     * Find {@link Friends} by current user id and friend id
     */
    @Query("select f from Friends f where f.userAlfa.id = :id1 and f.userBeta.id = :id2")
    Friends findFriendByFriendId(@Param("id1") Integer id1, @Param("id2") Integer id2);
}
