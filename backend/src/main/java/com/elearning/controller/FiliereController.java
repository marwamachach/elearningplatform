package com.elearning.controller;

import com.elearning.model.Filiere;
import com.elearning.repository.FiliereRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/filieres")
public class FiliereController {

    private final FiliereRepository filiereRepo;

    public FiliereController(FiliereRepository filiereRepo) {
        this.filiereRepo = filiereRepo;
    }

    // GET /api/filieres
    @GetMapping
    public List<Filiere> getAll() {
        return filiereRepo.findAll();
    }

    // GET /api/filieres/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Filiere> getById(@PathVariable Long id) {
        return filiereRepo.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/filieres
    @PostMapping
    public Filiere create(@RequestBody Filiere filiere) {
        return filiereRepo.save(filiere);
    }

    // PUT /api/filieres/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Filiere> update(@PathVariable Long id, @RequestBody Filiere req) {
        return filiereRepo.findById(id).map(f -> {
            f.setSigle(req.getSigle());
            f.setIntitule(req.getIntitule());
            return ResponseEntity.ok(filiereRepo.save(f));
        }).orElse(ResponseEntity.notFound().build());
    }

    // DELETE /api/filieres/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!filiereRepo.existsById(id)) return ResponseEntity.notFound().build();
        filiereRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
