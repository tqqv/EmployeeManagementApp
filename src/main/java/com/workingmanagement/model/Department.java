package com.workingmanagement.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "department")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "department_id")
    private int id;
    private String name;

    ///////
    @JsonIgnore
    @OneToMany(mappedBy = "department")
    private Set<Employee> employee = new HashSet<>();
    //////
    public Set<Employee> getEmployee() {
        return employee;
    }

    public Department(int id, String name) {
        this.id = id;
        this.name = name;

    }  public Department(String name) {
        this.name = name;

    }


    public Department() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Department{" +
                "id=" + id +
                ", name='" + name + '\'' +
//                ", employee=" + employee +
                '}';
    }
}
