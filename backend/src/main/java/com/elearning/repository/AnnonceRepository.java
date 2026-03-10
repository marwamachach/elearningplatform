package com.elearning.repository;

import com.elearning.model.Annonce;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AnnonceRepository extends JpaRepository<Annonce, Long> {
    List<Annonce> findByModuleId(Long moduleId);
    List<Annonce> findByAuteurId(Long auteurId);

    @Query("SELECT a FROM Annonce a ORDER BY a.createdAt DESC")
    List<Annonce> findAllOrderByDate();
}
