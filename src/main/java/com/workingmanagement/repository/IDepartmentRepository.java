package com.workingmanagement.repository;

import com.workingmanagement.model.Department;
import com.workingmanagement.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface IDepartmentRepository extends JpaRepository<Department, Integer> {
    Department findByName(String name);


    Page<Department> findByNameContainingIgnoreCase(String keyword, Pageable pageable);
    List<Department> findByNameContains(String keyword);
    
}
