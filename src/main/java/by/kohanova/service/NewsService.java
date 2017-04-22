package by.kohanova.service;

import by.kohanova.model.News;
import by.kohanova.model.User;

import java.util.List;

/**
 * Service for {@link News}
 */
public interface NewsService {

    /**
     * Find all {@link News} from database
     */
    List<News> findAll();

    /**
     * Edit {@link News} in database
     */
    News update(News news);

    /**
     * Find list of {@link News} by {@link User} id in database
     */
    List<News> findById(Integer id);

    /**
     * Create and save {@link News} in database
     */
    News create(News news);

    /**
     * Delete {@link News} by id from database
     */
    void delete(Integer id);
}

