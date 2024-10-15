package com.example.ctm.TeamMembers;

import com.example.ctm.team.TeamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1")
public class TeamMembersController {

    private final TeamMembersService teamMembersService;
    private final TeamService teamService;

    public TeamMembersController(TeamMembersService teamMembersService, TeamService teamService) {
        this.teamMembersService = teamMembersService;
        this.teamService = teamService;
    }
    @GetMapping(path = "/teams/{teamId}/members")
    public ResponseEntity<Object> getMembersByTeamId(@PathVariable("teamId") Long teamId) {
        List<TeamMembers> teamMembers = teamMembersService.getMembersByTeamId(teamId);
        if (teamMembers.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "No team members found in this team or team doesn't exist!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok(teamMembers);
    }
    @PostMapping(path = "/teams/{teamId}/members/add")
    public ResponseEntity<Object> addMemberToTeam(
            @PathVariable Long teamId,
            @RequestParam Long userId,
            @RequestParam String role) {

        if (teamId == null || userId == null || role == null || role.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Please provide all the required inputs: teamId, userId, and role.");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
        }

        try {
            TeamMembers newMember = teamMembersService.addMemberToTeam(teamId, userId, role);
            return ResponseEntity.ok(newMember);
        } catch (Exception e) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "An error occurred while adding the member to the team.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    @DeleteMapping(path = "/teams/{teamId}/members/{userId}/delete")
    public ResponseEntity<Object> deleteTeamMember(@PathVariable Long teamId, @PathVariable Long userId) {
        Optional<TeamMembers> deletedMember = teamMembersService.deleteTeamMember(teamId, userId);
        if (deletedMember.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Team member not found or could not be deleted.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
        return ResponseEntity.ok().build();
    }

    @GetMapping(path = "/teams/{teamId}/{userId}")
    public ResponseEntity<Object> getMemberOfTeamById(@PathVariable Long teamId, @PathVariable Long userId) {
        Optional<TeamMembers> member = teamMembersService.getMemberOfTeamById(teamId, userId);

        if (member.isEmpty()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "User not found in this team!");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        return ResponseEntity.ok(member.get());
    }

    @PatchMapping(path = "/teams/{teamId}/members/{userId}/update-role")
    public ResponseEntity<Object> updateMemberRole(
            @PathVariable Long teamId,
            @PathVariable Long userId,
            @RequestParam String newRole) {

        Optional<TeamMembers> updatedMember = teamMembersService.updateMemberRole(teamId, userId, newRole);

        if (!updatedMember.isPresent()) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Member or team leader not found or could not be updated.");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }

        return ResponseEntity.ok(updatedMember.get());
    }



//    getTeamsByUserId

}
