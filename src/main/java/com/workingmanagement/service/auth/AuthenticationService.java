package com.workingmanagement.service.auth;


import com.workingmanagement.model.Employee;
import com.workingmanagement.model.Role;
import com.workingmanagement.model.auth.AuthenticateRequest;
import com.workingmanagement.model.auth.AuthenticationResponse;
import com.workingmanagement.model.auth.RegisterRequest;
import com.workingmanagement.repository.IEmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class AuthenticationService {

    private final IEmployeeRepository eRepo;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthenticationService(IEmployeeRepository eRepo, JwtService jwtService, AuthenticationManager authenticationManager, PasswordEncoder passwordEncoder) {
        this.eRepo = eRepo;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthenticationResponse register(RegisterRequest request) {

        // check exist username
        Optional<Employee> employee =eRepo.findByUsername(request.getUsername());
        if(employee.isPresent()) throw new Error("Exist username!");


        Employee newEmployee = new Employee();
        newEmployee.setUsername((request.getUsername()));
        newEmployee.setPassword(passwordEncoder.encode((request.getPassword())));
        newEmployee.setFullname((request.getName()));
        newEmployee.setEmail((request.getEmail()));
        newEmployee.setDob(LocalDate.parse((request.getDob())));
        newEmployee.setRole(Role.valueOf("USER"));

        eRepo.save(newEmployee);

        String jwtToken = jwtService.generateToken(newEmployee);
        return new AuthenticationResponse(jwtToken);
    }

    public AuthenticationResponse authenticate(AuthenticateRequest requestUser) {
//       Check not exist account => 500 No acc exist.
        Optional<Employee> employee = eRepo.findByUsername(requestUser.getUsername());
        if(!employee.isPresent()) throw new Error("No account exist!");
//       have default throw error: AuthenticationException
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        requestUser.getUsername(),
                        requestUser.getPassword()
                )
        );
//        if authenticated token
        String jwtToken = jwtService.generateToken(employee.get());
        return new AuthenticationResponse(jwtToken);
    }
}
