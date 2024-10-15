package com.example.ctm.task;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }
    @PostMapping(path = "/tasks/create")
    public ResponseEntity<Object> createTask(@RequestBody Task task) {
        if (task == null || task.getTitle() == null || task.getTeamId() == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid task data!");
            return ResponseEntity.badRequest().body(response);
        }

        try {
            Task createdTask = taskService.createTask(task);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTask);
        } catch (IllegalArgumentException e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "An error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    //        Create a task
    //        Update a task
    //        Delete a task
    //        Get all tasks for a team
    //        Assign a task to a team member
    //        Change task status (e.g., to-do, in progress, completed)
}
