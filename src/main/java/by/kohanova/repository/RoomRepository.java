package by.kohanova.repository;

import by.kohanova.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Integer> {

    @Query("select r from Room r where r.id = :id")
    List<Room> findById(@Param("id") int id);
}
