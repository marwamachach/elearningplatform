package com.elearning.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "modules")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Module {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false, unique = true, length = 20)
    private String code;        // ex: INF301

    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "filiere_id", nullable = false)
    private Filiere filiere;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "professeur_id")
    private User professeur;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private List<Document> documents;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL)
    private List<Annonce> annonces;
}
