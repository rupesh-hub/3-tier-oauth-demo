package com.alfarays.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="products")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private Double price;

    private String image;

    @Column(length = 255)
    private String shortDescription;

    @Column(length = 2000)
    private String longDescription;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}