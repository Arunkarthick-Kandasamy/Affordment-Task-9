package com.arun.Mcet.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String rollnum;
    private String email;
    private String mobile;

    public Student(String name, String rollNum, String email, String mobile) {
        this.name = name;
        this.rollnum = rollNum;
        this.email = email;
        this.mobile = mobile;
    }
}
