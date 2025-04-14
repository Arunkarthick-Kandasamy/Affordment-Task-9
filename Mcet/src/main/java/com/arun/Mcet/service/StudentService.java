package com.arun.Mcet.service;

import com.arun.Mcet.model.Student;
import com.arun.Mcet.repository.StudentRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    @Autowired
    StudentRepo studentRepo;

    public List<Student> getStudent() {
        return studentRepo.findAll();
    }

    public String addStudent(Student student) {
        studentRepo.save(student);
        return "Student added successfully..!!";
    }

    public String deleteStudent(Student student) {
        studentRepo.delete(student);
        return "Student details deleted successfully..!!";
    }

    public String updateStudent(Student student) {
        studentRepo.save(student);
        return "Student details updated successfully..!!";
    }
}
