package com.elearning.controller;

import com.elearning.model.Module;
import com.elearning.repository.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleRepository moduleRepo;
    private final FiliereRepository filiereRepo;
    private final UserRepository userRepo;

    public ModuleController(ModuleRepository moduleRepo, FiliereRepository filiereRepo, UserRepository userRepo) {
        this.moduleRepo  = moduleRepo;
        this.filiereRepo = filiereRepo;
        this.userRepo    = userRepo;
    }

    @GetMapping
    public List<Module> getAll() { return moduleRepo.findAll(); }

    @GetMapping("/{id}")
    public ResponseEntity<Module> getById(@PathVariable Long id) {
        return moduleRepo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/filiere/{filiereId}")
    public List<Module> getByFiliere(@PathVariable Long filiereId) {
        return moduleRepo.findByFiliereId(filiereId);
    }

    @GetMapping("/professor/{professeurId}")
    public List<Module> getByProfessor(@PathVariable Long professeurId) {
        return moduleRepo.findByProfesseurId(professeurId);
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Module req) {
        if (moduleRepo.existsByCode(req.getCode())) {
            return ResponseEntity.badRequest().body("Code module déjà existant : " + req.getCode());
        }
        return ResponseEntity.ok(moduleRepo.save(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Module> update(@PathVariable Long id, @RequestBody Module req) {
        return moduleRepo.findById(id).map(m -> {
            m.setNom(req.getNom());
            m.setDescription(req.getDescription());
            return ResponseEntity.ok(moduleRepo.save(m));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!moduleRepo.existsById(id)) return ResponseEntity.notFound().build();
        moduleRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
