package com.elearning.controller;

import com.elearning.model.Document;
import com.elearning.repository.DocumentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final DocumentRepository documentRepo;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public DocumentController(DocumentRepository documentRepo) {
        this.documentRepo = documentRepo;
    }

    @GetMapping
    public List<Document> getAll() { return documentRepo.findAll(); }

    @GetMapping("/module/{moduleId}")
    public List<Document> getByModule(@PathVariable Long moduleId) {
        return documentRepo.findByModuleId(moduleId);
    }

    // POST /api/documents/upload  (multipart)
    @PostMapping("/upload")
    public ResponseEntity<Document> upload(
            @RequestParam("file")     MultipartFile file,
            @RequestParam("nom")      String nom,
            @RequestParam("moduleId") Long moduleId) throws IOException {

        // Save file to disk
        Path dir = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(dir);
        String filename = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Files.copy(file.getInputStream(), dir.resolve(filename));

        // Detect type
        String originalName = file.getOriginalFilename();
        String ext = originalName != null && originalName.contains(".")
                ? originalName.substring(originalName.lastIndexOf('.') + 1).toUpperCase()
                : "FILE";

        Document doc = Document.builder()
                .nom(nom)
                .nomFichier(filename)
                .type(ext)
                .taille(file.getSize())
                .build();
        return ResponseEntity.ok(documentRepo.save(doc));
    }

    // GET /api/documents/{id}/download
    @GetMapping("/{id}/download")
    public ResponseEntity<Resource> download(@PathVariable Long id) throws IOException {
        Document doc = documentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Document introuvable"));
        Path filePath = Paths.get(uploadDir).resolve(doc.getNomFichier()).normalize();
        Resource resource = new UrlResource(filePath.toUri());
        if (!resource.exists()) return ResponseEntity.notFound().build();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + doc.getNom() + "\"")
                .body(resource);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!documentRepo.existsById(id)) return ResponseEntity.notFound().build();
        documentRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
