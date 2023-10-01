package com.workingmanagement.controller;


import com.workingmanagement.model.Department;
import com.workingmanagement.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController()
@RequestMapping(path = "/api/v1/department")
public class DepartmentController {

    DepartmentService dService;

    @Autowired
    public DepartmentController(DepartmentService dService) {
        this.dService = dService;
    }


    @GetMapping
    public List<Department> getDepartment(
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
        return dService.getAllDepartmentService(keyword);
    }

    @GetMapping(path = "{departmentId}")
    public Department getDepartById(
            @PathVariable("departmentId") int departmentId) {
        return dService.getById(departmentId);
    }


    @PostMapping
    public Department newDepartment(
            @RequestBody Department department) {
        return dService.newDepartmentService(department);
    }

    @DeleteMapping(path = "{departmentId}")
    public void deleteDepartment(
            @PathVariable("departmentId") int departmentId
    ) {
        dService.deleteDepartmentService(departmentId);
    }


    @PutMapping(path = "{departId}")
    public ResponseEntity<String> updateDepartment(
            @PathVariable("departId") int employeeId,
            @RequestBody Department updatedDepartment
    ) {
        dService.updateDepartmentService(employeeId, updatedDepartment);
        return ResponseEntity.ok("Updated success");
    }


   
    // pagination
    @GetMapping("paging")
    public ResponseEntity<List<Department>> getAllDepartment(
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "4") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy)
    {
        List<Department> list = dService.getAllDepartmentsPaging(pageNo, pageSize, sortBy, keyword);
        return new ResponseEntity<List<Department>>(list, new HttpHeaders(), HttpStatus.OK);
    }


}
