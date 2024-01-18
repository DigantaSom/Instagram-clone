package com.instagram.api.controller;

import com.instagram.api.exception.UserException;
import com.instagram.api.model.User;
import com.instagram.api.repository.UserRepository;
import com.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
public class AuthController {
  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @PostMapping("/signup")
  public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException {
    User createdUser = userService.registerUser(user);
    return new ResponseEntity<>(createdUser, HttpStatus.OK);
  }

  @GetMapping("/signin")
  public ResponseEntity<User> signInHandler(Authentication auth) throws BadCredentialsException {
    Optional<User> opt = userRepository.findByEmail(auth.getName());

    if (opt.isPresent()) {
      return new ResponseEntity<>(opt.get(), HttpStatus.ACCEPTED);
    }
    throw new BadCredentialsException("Invalid credentials");
  }
}
