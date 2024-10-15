package com.example.ctm.team;

import com.example.ctm.user.User;
import com.example.ctm.user.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public TeamService(TeamRepository teamRepository, UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    public List<Team> getTeams() {
        return teamRepository.findAll();
    }
    public Team getTeamById(Long id) {
        return teamRepository.findById(id).orElse(null);
    }
    public Team createTeam(Team team) {
        team.setCreatedAt(LocalDateTime.now());
        return teamRepository.save(team);
    }
    public Team updateTeam(Team team) {
        return teamRepository.save(team);
    }
    public boolean deleteTeam(Long id) {
        Optional<Team> teamOptional = teamRepository.findById(id);
        if (teamOptional.isPresent()) {
            teamRepository.deleteById(id);
            return true;
        }
        return false;
    }
    public List<Team> getTeamsByUser(Long teamLeaderId)  {
        return teamRepository.findByTeamLeaderId(teamLeaderId);
    }
    public Team assignTeamLeader(Long teamId, Long teamLeaderId) {
        Team team = teamRepository.findById(teamId)
                .orElseThrow(() -> new EntityNotFoundException("Team not found with id " + teamId));

        User teamLeader = userRepository.findById(teamLeaderId)
                .orElseThrow(() -> new EntityNotFoundException("User not found with id " + teamLeaderId));
        team.setTeamLeader(teamLeader);
        return teamRepository.save(team);
    }
}
