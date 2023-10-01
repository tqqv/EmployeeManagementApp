package com.workingmanagement.service;

import com.workingmanagement.model.Department;
import com.workingmanagement.model.Employee;
import com.workingmanagement.repository.IDepartmentRepository;
import com.workingmanagement.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    IEmployeeRepository eRepo;
    PasswordEncoder passwordEncoder;
    IDepartmentRepository dRepo;


    @Autowired
    public EmployeeService(IEmployeeRepository eRepo, PasswordEncoder passwordEncoder, IDepartmentRepository dRepo) {
        this.eRepo = eRepo;
        this.passwordEncoder = passwordEncoder;
        this.dRepo = dRepo;
    }

    public List<Employee> getAllEmployeeService(String keyword) {
        return eRepo.findByFullnameContains(keyword);
    }

    public Employee newEmployeeService(Employee employee) {
        return eRepo.save(employee);
    }

    public void updateEmployeeService(int employeeId, Employee updatedEmployee) {
        System.out.println("hioooooooo: " + updatedEmployee.getDepartmentId());

        Employee employee = eRepo.findById(employeeId).get();
        // check income id != updatedEmployee id
        if (employeeId != updatedEmployee.getId())
            throw new Error("Employee ID has been change during updating process!");
        // check exist username
        if (!employee.getUsername().equals(updatedEmployee.getUsername())
                && eRepo.findByUsername(updatedEmployee.getUsername()).isPresent())
            throw new Error("Exist username!");
        if (!employee.getEmail().equals(updatedEmployee.getEmail())
                && eRepo.findByEmail(updatedEmployee.getEmail()).isPresent())
            throw new Error("Exist email!");
        // If password is new => encode
        if (!updatedEmployee.getPassword().equalsIgnoreCase(employee.getPassword()))
            updatedEmployee.setPassword(passwordEncoder.encode(updatedEmployee.getPassword()));
        // remain role + department id
        updatedEmployee.setRole(employee.getRole());
        if (updatedEmployee.getDepartmentId() == null)
            updatedEmployee.setDepartmentId(employee.getDepartmentId());

        // if dob change => + 1 date
        if (updatedEmployee.getDob() != (employee.getDob())) {
            LocalDate dob = updatedEmployee.getDob();
            dob = dob.plusDays(1);
            updatedEmployee.setDob(dob);
        }

        System.out.println("asjkdhkajsdkjasd   " + updatedEmployee.getDepartmentId());

        eRepo.save(updatedEmployee);
    }

    public void deleteEmployeeService(int employeeId) {
        eRepo.deleteById(employeeId);
    }

    @Transactional
    public void joinDepartmentService(int employeeId, int departmentId) {
        Employee e = eRepo.findById(employeeId).get();
    }

    public Employee getById(int employeeId) {
        return eRepo.findById(employeeId).get();
    }

    public List<Employee> getAllEmployeeByDepartId(Long departmentId) {
        return eRepo.findAllByDepartmentId(departmentId);
    }


    public List<Employee> getAllEmployeesPaging(Integer pageNo, Integer pageSize, String sortBy, String keyword) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));

        Page<Employee> pagedResult;
        if (keyword == null)  pagedResult = eRepo.findAll(paging);
        else  pagedResult = eRepo.findByFullnameContainingIgnoreCase(keyword, paging);

        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Employee>();
        }
    }


//    public Optional<Employee> searchByName(String name) {
//        return eRepo.findByUsername(name);
//    }


}
