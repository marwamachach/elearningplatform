package com.elearning.repository;

import com.elearning.model.Document;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DocumentRepository extends JpaRepository<Document, Long> {
    List<Document> findByModuleId(Long moduleId);
    List<Document> findByUploadedById(Long userId);
}
