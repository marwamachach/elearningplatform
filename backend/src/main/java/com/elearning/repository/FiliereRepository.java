package com.elearning.repository;

import com.elearning.model.Filiere;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface FiliereRepository extends JpaRepository<Filiere, Long> {
    Optional<Filiere> findBySigle(String sigle);
    boolean existsBySigle(String sigle);
}
