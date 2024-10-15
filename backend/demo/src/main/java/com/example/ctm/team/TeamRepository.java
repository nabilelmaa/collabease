package com.example.ctm.team;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
   List<Team> findByTeamLeaderId(Long teamLeaderId);
   boolean existsById(Long id);
}
