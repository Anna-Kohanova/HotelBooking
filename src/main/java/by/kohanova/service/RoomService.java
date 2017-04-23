package by.kohanova.service;

import by.kohanova.model.News;
import by.kohanova.model.Room;
import by.kohanova.model.User;

import java.util.List;

public interface RoomService {
    /**
     * Find all {@link Room} from database
     */
    List<Room> findAll();

    /**
     * Edit {@link Room} in database
     */
    Room update(Room room);

    /**
     * Find list of {@link Room} by id in database
     */
    List<Room> findById(Integer id);

    /**
     * Create and save {@link Room} in database
     */
    Room create(Room room);

    /**
     * Delete {@link Room} by id from database
     */
    void delete(Integer id);
}
