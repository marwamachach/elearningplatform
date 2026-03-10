package com.elearning.service;

import com.elearning.dto.AuthRequest;
import com.elearning.dto.AuthResponse;
import com.elearning.dto.RegisterRequest;
import com.elearning.model.User;
import com.elearning.repository.UserRepository;
import com.elearning.security.JwtUtil;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService implements UserDetailsService {

    private final UserRepository userRepo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authManager;

    public AuthService(UserRepository userRepo, PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil, AuthenticationManager authManager) {
        this.userRepo        = userRepo;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil         = jwtUtil;
        this.authManager     = authManager;
    }

    // ─── Login ────────────────────────────────────────────
    public AuthResponse login(AuthRequest req) {
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(req.getEmail(), req.getMotDePasse())
        );
        User user  = userRepo.findByEmail(req.getEmail())
                             .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable"));
        String jwt = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return buildResponse(user, jwt);
    }

    // ─── Register (used internally by admin) ──────────────
    public AuthResponse register(RegisterRequest req) {
        if (userRepo.existsByEmail(req.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé : " + req.getEmail());
        }
        User user = User.builder()
                .prenom(req.getPrenom())
                .nom(req.getNom())
                .email(req.getEmail())
                .motDePasse(passwordEncoder.encode(req.getMotDePasse()))
                .role(req.getRole())
                .build();
        userRepo.save(user);
        String jwt = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
        return buildResponse(user, jwt);
    }

    // ─── UserDetailsService impl ──────────────────────────
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepo.findByEmail(email)
                            .orElseThrow(() -> new UsernameNotFoundException("Email introuvable : " + email));
        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getMotDePasse())
                .roles(user.getRole().name())
                .build();
    }

    private AuthResponse buildResponse(User user, String token) {
        AuthResponse res = new AuthResponse();
        res.setToken(token);
        res.setId(user.getId());
        res.setPrenom(user.getPrenom());
        res.setNom(user.getNom());
        res.setEmail(user.getEmail());
        res.setRole(user.getRole().name());
        return res;
    }
}
