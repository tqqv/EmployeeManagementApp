package com.workingmanagement.model;

import com.workingmanagement.model.Role;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

@Entity
@Table(name = "employee")
public class Employee implements UserDetails, Serializable  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String email;
    private LocalDate dob;

    @Enumerated(EnumType.ORDINAL)
    private Role role;
    @Column(name = "department_id")
    private Long departmentId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "department_id", referencedColumnName = "department_id", insertable = false, updatable = false)
    private Department department;
    /////

    public Department getDepartment() {
        return department;
    }

    private String fullname;


    public Employee() {
    }

    public Employee(String username, String password, String email, LocalDate dob, Role role, String fullname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dob = dob;
        this.role = role;
        this.fullname = fullname;
    }
    public Employee(String username, String password, String email, LocalDate dob, Role role, String fullname, Long departmentId) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dob = dob;
        this.role = role;
        this.fullname = fullname;
        this.departmentId = departmentId;
    }

    public Employee(int id, String username, String password, String email, LocalDate dob, Role role, String fullname) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.dob = dob;
        this.role = role;
        this.fullname = fullname;
    }

    public Employee(String username, String password, String email, LocalDate dob, String fullname) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.dob = dob;
        this.fullname = fullname;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(new SimpleGrantedAuthority(role.name()));
    }

    public void setUsername(String username) {
        this.username = username;
    }


    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
//
//    public void assignDepartment(Department department) {
//        this.department = department;
//    }


    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void assignDepartment(Long departmentId) {
        this.departmentId = departmentId;
    }

    public void deleteDepartment(long departmentId) {
        this.departmentId = null;
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", dob=" + dob +
                ", role=" + role +
                ", departmentId=" + departmentId +
                ", department=" + department +
                ", fullname='" + fullname + '\'' +
                '}';
    }
}
