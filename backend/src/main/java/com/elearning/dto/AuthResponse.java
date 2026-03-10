package com.elearning.dto;
import lombok.Data;
@Data
public class AuthResponse {
    private String token;
    private Long   id;
    private String prenom;
    private String nom;
    private String email;
    private String role;
}
