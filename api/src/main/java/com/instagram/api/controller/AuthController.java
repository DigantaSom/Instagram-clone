package com.instagram.api.controller;

import com.instagram.api.exception.UserException;
import com.instagram.api.model.User;
import com.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {
  @Autowired
  private UserService userService;

  @PostMapping("/signup")
  public ResponseEntity<User> registerUserHandler(@RequestBody User user) throws UserException {
    User createdUser = userService.registerUser(user);
    return new ResponseEntity<>(createdUser, HttpStatus.OK);
  }
}