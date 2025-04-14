package com.arun.Mcet.controller;

import com.arun.Mcet.model.Student;
import com.arun.Mcet.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://127.0.0.1:5500")
@RestController
public class StudentController {
    @Autowired
    StudentService studentService;
    @GetMapping("/add")
    public String greet(){
        return "Hello user...!!";
    }
    @PostMapping("/add")
    public String addStudent(@Param("name") String name ,
                             @Param("rollnum") String rollnum ,
                             @Param("email") String email ,
                             @Param("mobile") String mobile){
        return studentService.addStudent(new Student(name , rollnum , email , mobile));
    }
    @DeleteMapping("/delete")
    public String deleteStudent(@Param("name") String name ,
                                @Param("rollnum") String rollnum ,
                                @Param("email") String email ,
                                @Param("mobile") String mobile){
        return studentService.deleteStudent(new Student(name , rollnum , email , mobile));
    }

    @PutMapping("/update")
    public String updateStudent(@Param("name") String name ,
                                @Param("rollnum") String rollnum ,
                                @Param("email") String email ,
                                @Param("mobile") String mobile){
        return studentService.updateStudent(new Student(name , rollnum , email , mobile));
    }

    @GetMapping("/students")
    public List<Student> getStudent(){
        return studentService.getStudent();
    }
}
