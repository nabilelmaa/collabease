package com.example.ctm.task;

import com.example.ctm.team.TeamRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final TeamRepository teamRepository;

    public TaskService(TaskRepository taskRepository, TeamRepository teamRepository) {
        this.taskRepository = taskRepository;
        this.teamRepository = teamRepository;
    }

    public Task createTask(Task task) {

        if (!teamRepository.existsById(task.getTeamId())) {
            throw new IllegalArgumentException("Team ID does not exist");
        }

        task.setCreatedAt(LocalDateTime.now());
        task.setUpdatedAt(LocalDateTime.now());

        return taskRepository.save(task);
    }
}
