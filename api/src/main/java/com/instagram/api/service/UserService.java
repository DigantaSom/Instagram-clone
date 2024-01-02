package com.instagram.api.service;

import com.instagram.api.exception.UserException;
import com.instagram.api.model.User;

import java.util.List;

public interface UserService {
  User registerUser(User user) throws UserException;
  User findUserById(Integer userId) throws UserException;
  User findUserProfile(String token) throws UserException;
  User findUserByUsername(String username) throws UserException;
  String followUser(Integer reqUserId, Integer followUserId) throws UserException;
  String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException;
  List<User> findUsersByIds(List<Integer> userIds);
  List<User> searchUsers(String query) throws UserException;
  User updateUserDetails(User existingUser, User updatedUser) throws UserException;
}
