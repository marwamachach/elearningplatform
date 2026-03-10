package com.elearning.dto;

import com.elearning.model.User;
import lombok.Data;

// ─── Auth Request ────────────────────────────────────────
@Data
class AuthRequest {
    private String email;
    private String motDePasse;
}

// ─── Register Request ────────────────────────────────────
@Data
class RegisterRequest {
    private String prenom;
    private String nom;
    private String email;
    private String motDePasse;
    private User.Role role;
    private Long filiereId;
}

// ─── Auth Response ───────────────────────────────────────
@Data
class AuthResponse {
    private String token;
    private Long   id;
    private String prenom;
    private String nom;
    private String email;
    private String role;
}
