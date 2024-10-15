package com.example.ctm.team;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(path = "/api/v1")
public class TeamController {
    private final TeamService teamService;

    public TeamController(TeamService teamService) {
        this.teamService = teamService;
    }

    @GetMapping(path = "/teams")
    public ResponseEntity<List<Team>> getTeams() {
        List<Team> teams = teamService.getTeams();
        return ResponseEntity.ok(teams);
    }
    @GetMapping(path = "/teams/{id}")
    public ResponseEntity<Object> getTeamById(@PathVariable Long id) {
        Team team = teamService.getTeamById(id);
        if (team == null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Team doesn't exist!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(team);
    }
    @PostMapping(path = "/teams/create")
    public ResponseEntity<Team> createTeam(@RequestBody Team team) {
        if (team == null || team.getName() == null || team.getDescription() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        Team createdTeam = teamService.createTeam(team);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTeam);
    }

    @PutMapping(path = "/teams/update/{id}")
    public ResponseEntity<Team> updateTeam(@PathVariable Long id, @RequestBody Team updatedTeamData) {
        Team existingTeam = teamService.getTeamById(id);
        if (existingTeam == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        if (updatedTeamData.getName() != null) {
            existingTeam.setName(updatedTeamData.getName());
        }
        if (updatedTeamData.getDescription() != null) {
            existingTeam.setDescription(updatedTeamData.getDescription());
        }
        if (updatedTeamData.getTeamLeader() != null) {
            existingTeam.setTeamLeader(updatedTeamData.getTeamLeader());
        }
        Team updatedTeam = teamService.updateTeam(existingTeam);
        return ResponseEntity.ok(updatedTeam);
    }
    @DeleteMapping(path = "/teams/delete/{id}")
    public ResponseEntity<Void> deleteTeam(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        boolean isDeleted = teamService.deleteTeam(id);
        if (isDeleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @GetMapping(path = "/users/{userId}/teams")
    public ResponseEntity<List<Team>> getTeamsByUser(@PathVariable Long userId) {
        List<Team> teams = teamService.getTeamsByUser(userId);
        if (teams.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(teams);
    }
    @PutMapping(path = "/teams/{teamId}/assign-leader/{teamLeaderId}")
    public ResponseEntity<Team> assignTeamLeader(@PathVariable Long teamId, @PathVariable Long leaderTeamId) {
        Team updatedTeam = teamService.assignTeamLeader(teamId, leaderTeamId);
        return ResponseEntity.ok(updatedTeam);
    }
    // http://localhost:8080/api/v1/teams/teamId/team-leader
//    @GetMapping(path = "/teams/teamId/team-leader")
//    public ResponseEntity<Object> getTeamLeader() {
//
//    }

}
