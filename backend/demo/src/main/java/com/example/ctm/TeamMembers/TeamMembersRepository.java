package com.example.ctm.TeamMembers;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamMembersRepository extends JpaRepository<TeamMembers, Long> {
    List<TeamMembers> findByTeamId(Long teamId);
    Optional<TeamMembers> findByTeamIdAndUserId(Long teamId, Long userId);
}
