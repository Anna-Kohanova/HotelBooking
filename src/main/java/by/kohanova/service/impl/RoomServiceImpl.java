package by.kohanova.service.impl;

import by.kohanova.model.Room;
import by.kohanova.repository.RoomRepository;
import by.kohanova.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {

    private final RoomRepository roomRepository;

    @Autowired
    public RoomServiceImpl(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @Override
    public List<Room> findAll() {
        return roomRepository.findAll();
    }

    @Override
    public Room update(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public List<Room> findById(Integer id) {
        return roomRepository.findById(id);
    }

    @Override
    public Room create(Room room) {
        return roomRepository.save(room);
    }

    @Override
    public void delete(Integer id) {
        roomRepository.delete(id);
    }
}
