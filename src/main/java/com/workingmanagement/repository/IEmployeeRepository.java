package com.workingmanagement.repository;

import com.workingmanagement.model.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.ResultSet;
import java.util.List;
import java.util.Optional;



@Repository
public interface IEmployeeRepository extends JpaRepository<Employee, Integer> {

    List<Employee> findAllByDepartmentId(Long departmentId);
    Optional<Employee> findByUsername(String username);
    Optional<Employee> findByEmail(String email);
    Page<Employee> findByFullnameContainingIgnoreCase(String keyword, Pageable pageable);
    List<Employee> findByFullnameContains(String keyword);



    @Modifying
    @Transactional
    @Query(value = "UPDATE employee SET department_id = NULL WHERE department_id = :id", nativeQuery = true)
    void setNullDepartmentField(@Param("id") int id);


}
