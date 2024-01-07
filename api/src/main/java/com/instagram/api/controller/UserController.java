package com.instagram.api.controller;

import com.instagram.api.config.SecurityContext;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.User;
import com.instagram.api.response.MessageResponse;
import com.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping("/id/{id}")
  public ResponseEntity<User> findUserByIdHandler(@PathVariable Integer id) throws UserException {
    User user = userService.findUserById(id);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/username/{username}")
  public ResponseEntity<User> findUserByUsernameHandler(@PathVariable String username) throws UserException {
    User user = userService.findUserByUsername(username);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/req")
  public ResponseEntity<User> findUserProfileHandler(@RequestHeader(SecurityContext.HEADER) String token) throws UserException {
    User user = userService.findUserProfile(token);
    return new ResponseEntity<>(user, HttpStatus.OK);
  }

  @GetMapping("/m/{userIds}")
  public ResponseEntity<List<User>> findUsersByUserIdsHandler(@PathVariable List<Integer> userIds) {
    List<User> users = userService.findUsersByIds(userIds);
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @GetMapping("/search")
  public ResponseEntity<List<User>> searchUsersHandler(@RequestParam("q") String query) throws UserException {
    List<User> users = userService.searchUsers(query);
    return new ResponseEntity<>(users, HttpStatus.OK);
  }

  @PutMapping("/account/edit")
  public ResponseEntity<User> updateUserDetailsHandler(@RequestHeader(SecurityContext.HEADER) String token, @RequestBody User user) throws UserException {
    User reqUser = userService.findUserProfile(token);
    User updatedUser = userService.updateUserDetails(reqUser, user);
    return new ResponseEntity<>(updatedUser, HttpStatus.OK);
  }

  @PutMapping("/follow/{followUserId}")
  public ResponseEntity<MessageResponse> followUserHandler(@RequestHeader(SecurityContext.HEADER) String token, @PathVariable Integer followUserId) throws UserException {
    User user = userService.findUserProfile(token);
    String message = userService.followUser(user.getId(), followUserId);
    MessageResponse res = new MessageResponse(message);
    return new ResponseEntity<>(res, HttpStatus.OK);
  }

  @PutMapping("/unfollow/{unfollowUserId}")
  public ResponseEntity<MessageResponse> unfollowUserHandler(@RequestHeader(SecurityContext.HEADER) String token, @PathVariable Integer unfollowUserId) throws UserException {
    User user = userService.findUserProfile(token);
    String message = userService.unfollowUser(user.getId(), unfollowUserId);
    MessageResponse res = new MessageResponse(message);
    return new ResponseEntity<>(res, HttpStatus.OK);
  }
}
