package com.workingmanagement.controller;

import com.workingmanagement.model.Department;
import com.workingmanagement.model.Employee;
import com.workingmanagement.service.DepartmentService;
import com.workingmanagement.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.RequestHeader;
@RestController()
@RequestMapping(path = "/api/v1/employee")
public class EmployeeController {

    EmployeeService eService;
    DepartmentService dService;


    @Autowired
    public EmployeeController(EmployeeService eService, DepartmentService dService) {
        this.eService = eService;
        this.dService = dService;
    }

    @GetMapping
    public List<Employee> getAllEmployees(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @RequestParam(required = false) String keyword
            ) {
        if (authorizationHeader != null) {
            // Authorization header exists
            System.out.println("Authorization header found: " + authorizationHeader);
        } else {
            // Authorization header does not exist
            System.out.println("Authorization header not found");
        }
        return eService.getAllEmployeeService(keyword);
    }


    @GetMapping(path = "{employeeId}")
    public Employee getEmployeeById(
            @RequestHeader(value = "Authorization", required = false) String authorizationHeader,
            @PathVariable int employeeId
    ){
        if (authorizationHeader != null) {
            // Authorization header exists
            System.out.println("Authorization header found: " + authorizationHeader);
        } else {
            // Authorization header does not exist
            System.out.println("Authorization header not found");
        }
        return eService.getById(employeeId);
    }

    @PostMapping
    public Employee newEmployee(
            @RequestBody Employee employee
    ) {
        return eService.newEmployeeService(employee);
    }

    @PutMapping(path = "{employeeId}")
    public ResponseEntity<String> updateEmployee(
            @PathVariable("employeeId") int employeeId,
            @RequestBody Employee updatedEmployee
    ) {
        eService.updateEmployeeService(employeeId, updatedEmployee);
        System.out.println(updatedEmployee);
        System.out.println(updatedEmployee.getDob());
        return ResponseEntity.ok("Updated success");
    }

    @DeleteMapping(path = "{employeeId}")
    public void deleteEmployee(
            @PathVariable int employeeId
    ) {
        eService.deleteEmployeeService(employeeId);
    }


    @PutMapping("/{employeeId}/department/{departmentId}/add")
    public Employee assignDepartmentToEmployee (
            @PathVariable int employeeId,
            @PathVariable int departmentId
    ) {
        Employee employee= eService.getById(employeeId);
        Department department= dService.getById(departmentId);
        System.out.println(departmentId);
        employee.assignDepartment((long) departmentId);
        return eService.newEmployeeService(employee);
    }

    @DeleteMapping("/{employeeId}/department/{departmentId}/remove")
    public Employee deleteDepartmentFromEmployee (
            @PathVariable int employeeId,
            @PathVariable int departmentId
    ) {
        Employee employee= eService.getById(employeeId);
        Department department= dService.getById(departmentId);
        System.out.println(departmentId);
        employee.deleteDepartment((long) departmentId);
        return eService.newEmployeeService(employee);
    }

    @GetMapping(path = "department/{departmentId}")
    public List<Employee> getEmployeeListByDepartment(
            @PathVariable Long departmentId
    ) {
        return eService.getAllEmployeeByDepartId(departmentId);
    }


    // pagination
    @GetMapping("paging")
    public ResponseEntity<List<Employee>> getAllEmployees(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "4") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy)
    {
        List<Employee> list = eService.getAllEmployeesPaging(pageNo, pageSize, sortBy, keyword);
        return new ResponseEntity<List<Employee>>(list, new HttpHeaders(), HttpStatus.OK);
    }




}
