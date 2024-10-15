package com.example.ctm.TeamMembers;

import com.example.ctm.team.Team;
import com.example.ctm.team.TeamRepository;
import com.example.ctm.user.User;
import com.example.ctm.user.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TeamMembersService {
    private final TeamMembersRepository teamMembersRepository;
    private final TeamRepository teamRepository;
    private final UserRepository userRepository;

    public TeamMembersService(TeamMembersRepository teamMembersRepository, TeamRepository teamRepository, UserRepository userRepository) {
        this.teamMembersRepository = teamMembersRepository;
        this.teamRepository = teamRepository;
        this.userRepository = userRepository;
    }

    public List<TeamMembers> getMembersByTeamId(Long teamId) {
        return teamMembersRepository.findByTeamId(teamId);
    }
    public Optional<TeamMembers> getMemberOfTeamById(Long teamId, Long userId) {
        return teamMembersRepository.findByTeamIdAndUserId(teamId, userId);
    }
    public TeamMembers addMemberToTeam(Long teamId, Long userId, String role) {
        Optional<Team> team = teamRepository.findById(teamId);
        Optional<User> member = userRepository.findById(userId);

        if (team.isPresent() && member.isPresent()) {

            TeamMembers newMember = new TeamMembers();
            newMember.setTeam(team.get());
            newMember.setUser(member.get());
            newMember.setRole(role);
            newMember.setJoinedAt(LocalDateTime.now());

            return teamMembersRepository.save(newMember);
        } else {
            throw new RuntimeException("Team or user not found");
        }
    }
    public Optional<TeamMembers> deleteTeamMember(Long teamId, Long userId) {
        Optional<TeamMembers> teamMember = teamMembersRepository.findByTeamIdAndUserId(teamId, userId);

        if (teamMember.isPresent()) {
            teamMembersRepository.delete(teamMember.get());
        }
        return teamMember;
    }
    public Optional<TeamMembers> updateMemberRole(Long teamId, Long userId, String newRole) {

        Optional<TeamMembers> member = teamMembersRepository.findByTeamIdAndUserId(teamId, userId);
        if (member.isPresent()) {
            TeamMembers existingMember = member.get();
            existingMember.setRole(newRole);
            teamMembersRepository.save(existingMember);
            return Optional.of(existingMember);
        }

        Optional<Team> team = teamRepository.findById(teamId);
        if (team.isPresent() && team.get().getTeamLeader().getId().equals(userId)) {
            Optional<User> user = userRepository.findById(userId);
            if (user.isPresent()) {
                TeamMembers teamLeaderAsMember = new TeamMembers();
                teamLeaderAsMember.setTeam(team.get());
                teamLeaderAsMember.setUser(user.get());
                teamLeaderAsMember.setRole(newRole);
                return Optional.of(teamLeaderAsMember);
            }
        }
        return Optional.empty();
    }


}
