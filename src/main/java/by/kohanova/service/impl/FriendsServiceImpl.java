package by.kohanova.service.impl;

import by.kohanova.model.Friends;
import by.kohanova.repository.FriendsRepository;
import by.kohanova.service.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FriendsServiceImpl implements FriendsService {
    private final FriendsRepository friendsRepository;

    @Autowired
    public FriendsServiceImpl(FriendsRepository friendsRepository) {
        this.friendsRepository = friendsRepository;
    }

    @Override
    public List<Friends> findAll() {
        return friendsRepository.findAll();
    }

    @Override
    public Friends create(Friends friends) {
        return friendsRepository.save(friends);
    }

    @Override
    public List<Friends> findById(Integer id) {
        return friendsRepository.findByCurrentUserId(id);
    }

    @Override
    public List<Friends> findByFriendId(Integer id) {
        return friendsRepository.findByFriendId(id);
    }

    @Override
    public Friends findFriendByFriendId(Integer id1, Integer id2) {
        return friendsRepository.findFriendByFriendId(id1, id2);
    }

    @Override
    public Friends update(Friends friends) {
        return friendsRepository.save(friends);
    }
}
