package by.kohanova.service.impl;

import by.kohanova.model.News;
import by.kohanova.repository.NewsRepository;
import by.kohanova.service.NewsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Implementation of {@link NewsService} service
 */
@Service
public class NewsServiceImpl implements NewsService {

    private final NewsRepository newsRepository;

    @Autowired
    public NewsServiceImpl(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Override
    public List<News> findAll() {
        return newsRepository.findAll();
    }

    @Override
    public News update(News object) {
        return newsRepository.save(object);
    }

    @Override
    public List<News> findById(Integer id) {
        return newsRepository.findById(id);
    }

    @Override
    public News create(News news) {
        return newsRepository.save(news);
    }

    @Override
    public void delete(Integer id) {
        newsRepository.delete(id);
    }
}

