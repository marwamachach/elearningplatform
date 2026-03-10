package com.elearning.dto;
import com.elearning.model.User;
import lombok.Data;
@Data
public class RegisterRequest {
    private String prenom;
    private String nom;
    private String email;
    private String motDePasse;
    private User.Role role;
    private Long filiereId;
}
