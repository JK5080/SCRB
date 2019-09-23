package com.example.polls.controller;

import com.example.polls.exception.AppException;
import com.example.polls.model.Role;
import com.example.polls.model.RoleName;
import com.example.polls.model.User;
import com.example.polls.payload.ApiResponse;
import com.example.polls.payload.JwtAuthenticationResponse;
import com.example.polls.payload.LoginRequest;
import com.example.polls.payload.Roleresponce;
import com.example.polls.payload.SignUpRequest;
import com.example.polls.repository.RoleRepository;
import com.example.polls.repository.UserRepository;
import com.example.polls.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtTokenProvider tokenProvider;

    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsernameOrEmail(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt = tokenProvider.generateToken(authentication);
        return ResponseEntity.ok(new JwtAuthenticationResponse(jwt));
    }
    @RequestMapping("/getr")
    public List<Role> getroles() {
    
    	
    	
    	return GetRoles();
    }
   // @RequestMapping("/getrank")
   // public List<Role> getrank() {
   	// 	return GetRoles();
   // }
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        if(userRepository.existsByUsername(signUpRequest.getUsername())) {
            return new ResponseEntity(new ApiResponse(false, "Username is already taken!"),
                    HttpStatus.BAD_REQUEST);
        }

        if(userRepository.existsByEmail(signUpRequest.getEmail())) {
            return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"),
                    HttpStatus.BAD_REQUEST);
        }
        
//        Date date = new Date(signUpRequest.getDob());  
//        SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");  
//        String strDate= formatter.format(date);  
//        System.out.println(strDate); 
        // Creating user's account
        User user = new User(signUpRequest.getName(), signUpRequest.getUsername(),
                signUpRequest.getPen(),signUpRequest.getRank(),signUpRequest.getUnit(),signUpRequest.getDob(),signUpRequest.getDoe(),signUpRequest.getEmail(), signUpRequest.getPassword());

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        Role userRole=null;
        if(signUpRequest.getUtype().compareTo("5")==0) {
         userRole = roleRepository.findByName(RoleName.GD_CHARGE)
        		
                .orElseThrow(() -> new AppException("User Role not set."));}
        else if(signUpRequest.getUtype().compareTo("4")==0) {
            userRole = roleRepository.findByName(RoleName.ISHO)
           		
                   .orElseThrow(() -> new AppException("User Role not set."));}
        else if(signUpRequest.getUtype().compareTo("3")==0) {
            userRole = roleRepository.findByName(RoleName.IO)
           		
                   .orElseThrow(() -> new AppException("User Role not set."));}
        else if(signUpRequest.getUtype().compareTo("2")==0) {
            userRole = roleRepository.findByName(RoleName.ROLE_ADMIN)
           		
                   .orElseThrow(() -> new AppException("User Role not set."));}
        
        else {
        	
        	 userRole = roleRepository.findByName(RoleName.ROLE_USER)
             		
                     .orElseThrow(() -> new AppException("User Role not set."));	
        }
        

        user.setRoles(Collections.singleton(userRole));

        User result = userRepository.save(user);

        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath().path("/api/users/{username}")
                .buildAndExpand(result.getUsername()).toUri();

        return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
    }
    
    public List<Role>GetRoles(){
    	List<Role> role = roleRepository.findAll();
    	//for(Role r:role){
    	//	
    	//}
    	return role;
    }
}

