package com.instagram.api.controller;

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
  public ResponseEntity<User> findUserProfileHandler(@RequestHeader("Authorization") String token) {
    // TODO:
    return null;
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

  @PutMapping("/update")
  public ResponseEntity<User> updateUserDetailsHandler(@RequestHeader("Authorization") String token, @RequestBody User updatedUser) {
    // TODO:
    return null;
  }

  @PutMapping("/follow/{followUserId}")
  public ResponseEntity<MessageResponse> followUserHandler(@PathVariable Integer followUserId) {
    // TODO:
//    MessageResponse res = userService.followUser(123, followUserId);
    return null;
  }

  @PutMapping("/unfollow/{unfollowUserId}")
  public ResponseEntity<MessageResponse> unfollowUserHandler(@PathVariable Integer unfollowUserId) {
    // TODO:
//    MessageResponse res = userService.unfollowUser(123, unfollowUserId);
    return null;
  }
}
