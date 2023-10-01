package com.workingmanagement.service;


import com.workingmanagement.model.Department;
import com.workingmanagement.model.Employee;
import com.workingmanagement.repository.IDepartmentRepository;
import com.workingmanagement.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService {
    IDepartmentRepository dRepo;
    IEmployeeRepository eRepo;

    @Autowired
    public DepartmentService(IDepartmentRepository dRepo, IEmployeeRepository eRepo) {
        this.dRepo = dRepo;
        this.eRepo = eRepo;
    }

    public List<Department> getAllDepartmentService(String keyword) {
//        return dRepo.findAll();
        return dRepo.findByNameContains(keyword);

    }


    public void deleteDepartmentService(int departmentId) {
        this.eRepo.setNullDepartmentField(departmentId);
        this.dRepo.deleteById(departmentId);
    }


    public Department getById(int departmentId) {
        return dRepo.findById(departmentId).get();
    }

    public Department newDepartmentService(Department department) {
        return dRepo.save(department);
    }


    public Department updateDepartmentService(int departmentId, Department updateDepartment) {
        Department department = dRepo.findById(departmentId).get();
        // check income id != updatedEmployee id
        if (departmentId != updateDepartment.getId())  {
            System.out.println(departmentId);
            System.out.println(updateDepartment.getId());
            throw new Error("department ID has been change during updating process!");
        }

        // check exist departname
        if (department.getName() != null && !department.getName().equals(updateDepartment.getName())
                && eRepo.findByUsername(updateDepartment.getName()).isPresent())
            throw new Error("Exist username!");
        System.out.println(updateDepartment);
        return dRepo.save(updateDepartment);
    }

    public List<Department> getAllDepartmentsPaging(Integer pageNo, Integer pageSize, String sortBy, String keyword) {
        Pageable paging = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));


        Page<Department> pagedResult;
        if (keyword == null)  pagedResult = dRepo.findAll(paging);
        else  pagedResult = dRepo.findByNameContainingIgnoreCase(keyword, paging);


        if (pagedResult.hasContent()) {
            return pagedResult.getContent();
        } else {
            return new ArrayList<Department>();
        }
    }


}
