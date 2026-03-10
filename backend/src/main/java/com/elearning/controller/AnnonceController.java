package com.elearning.controller;

import com.elearning.model.Annonce;
import com.elearning.repository.AnnonceRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/annonces")
public class AnnonceController {

    private final AnnonceRepository annonceRepo;

    public AnnonceController(AnnonceRepository annonceRepo) {
        this.annonceRepo = annonceRepo;
    }

    @GetMapping
    public List<Annonce> getAll() { return annonceRepo.findAllOrderByDate(); }

    @GetMapping("/recent")
    public List<Annonce> getRecent() {
        return annonceRepo.findAllOrderByDate().stream().limit(5).toList();
    }

    @GetMapping("/module/{moduleId}")
    public List<Annonce> getByModule(@PathVariable Long moduleId) {
        return annonceRepo.findByModuleId(moduleId);
    }

    @PostMapping
    public Annonce create(@RequestBody Annonce annonce) {
        return annonceRepo.save(annonce);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Annonce> update(@PathVariable Long id, @RequestBody Annonce req) {
        return annonceRepo.findById(id).map(a -> {
            a.setTitre(req.getTitre());
            a.setContenu(req.getContenu());
            a.setIsUrgent(req.getIsUrgent());
            return ResponseEntity.ok(annonceRepo.save(a));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!annonceRepo.existsById(id)) return ResponseEntity.notFound().build();
        annonceRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
