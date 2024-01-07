package com.instagram.api.service;

import com.instagram.api.dto.UserDTO;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.User;
import com.instagram.api.repository.UserRepository;
import com.instagram.api.security.JwtTokenClaims;
import com.instagram.api.security.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
  @Autowired
  private UserRepository userRepository;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtTokenProvider jwtTokenProvider;

  @Override
  public User registerUser(User user) throws UserException {
    Optional<User> doesEmailExist = userRepository.findByEmail(user.getEmail());

    if (doesEmailExist.isPresent()) {
      throw new UserException("Email already exists");
    }

    Optional<User> doesUsernameExist = userRepository.findByUsername(user.getUsername());

    if (doesUsernameExist.isPresent()) {
      throw new UserException("Username already taken");
    }

    if (user.getEmail() == null || user.getPassword() == null || user.getUsername() == null || user.getName() == null) {
       throw new UserException("All fields are required");
    }

    User newUser = new User();

    newUser.setEmail(user.getEmail());
    newUser.setPassword(passwordEncoder.encode(user.getPassword()));
    newUser.setUsername(user.getUsername());
    newUser.setName(user.getName());

    return userRepository.save(newUser);
  }

  @Override
  public User findUserById(Integer userId) throws UserException {
    Optional<User> user = userRepository.findById(userId);

    if (user.isEmpty()) {
      throw new UserException("User does not exist with id: " + userId);
    }
    return user.get();
  }

  @Override
  public User findUserProfile(String token) throws UserException {
    token = token.substring(7); // to get rid of "Bearer "
    JwtTokenClaims jwtTokenClaims = jwtTokenProvider.getClaimsFromToken(token);
    String email = jwtTokenClaims.getUsername();

    Optional<User> opt =  userRepository.findByEmail(email);

    if (opt.isPresent()) {
      return opt.get();
    }
    throw new UserException("Invalid token");
  }

  @Override
  public User findUserByUsername(String username) throws UserException {
    Optional<User> user = userRepository.findByUsername(username);

    if (user.isPresent()) {
      return user.get();
    }
    throw new UserException("User does not exist with the username: " + username);
  }

  @Override
  public String followUser(Integer reqUserId, Integer followUserId) throws UserException {
    // 'reqUser' wants to follow 'followUser'
    User reqUser = findUserById(reqUserId);
    User followUser = findUserById(followUserId);

    UserDTO follower = new UserDTO();
    follower.setId(reqUser.getId());
    follower.setEmail(reqUser.getEmail());
    follower.setUsername(reqUser.getUsername());
    follower.setName(reqUser.getName());
    follower.setUserImage(reqUser.getImage());

    UserDTO following = new UserDTO();
    following.setId(followUser.getId());
    following.setUsername(followUser.getUsername());
    following.setEmail(followUser.getEmail());
    following.setName(followUser.getName());
    following.setUserImage(followUser.getImage());

    reqUser.getFollowing().add(following);
    followUser.getFollowers().add(follower);

    userRepository.save(reqUser);
    userRepository.save(followUser);

    return "You are now following " + followUser.getUsername();
  }

  @Override
  public String unfollowUser(Integer reqUserId, Integer unfollowUserId) throws UserException {
    // 'reqUser' wants to unfollow 'unfollowUser'
    User reqUser = findUserById(reqUserId);
    User unfollowUser = findUserById(unfollowUserId);

    UserDTO unfollower = new UserDTO();
    unfollower.setId(reqUser.getId());
    unfollower.setUsername(reqUser.getUsername());
    unfollower.setEmail(reqUser.getEmail());
    unfollower.setName(reqUser.getName());
    unfollower.setUserImage(reqUser.getImage());

    UserDTO unfollowing = new UserDTO();
    unfollowing.setId(unfollowUser.getId());
    unfollowing.setUsername(unfollowUser.getUsername());
    unfollowing.setEmail(unfollowUser.getEmail());
    unfollowing.setName(unfollowUser.getName());
    unfollowing.setUserImage(unfollowUser.getImage());

    reqUser.getFollowing().remove(unfollowing);
    unfollowUser.getFollowers().remove(unfollower);

    userRepository.save(reqUser);
    userRepository.save(unfollowUser);

    return "You have unfollowed " + unfollowUser.getUsername();
  }

  @Override
  public List<User> findUsersByIds(List<Integer> userIds) {
    List<User> users = userRepository.findAllUsersByUserIds(userIds);
    return users;
  }

  @Override
  public List<User> searchUsers(String query) throws UserException {
    List<User> users = userRepository.findByQuery(query);

    if (users.size() == 0) {
      throw new UserException("Users not found");
    }
    return users;
  }

  @Override
  public User updateUserDetails(User existingUser, User updatedUser) throws UserException {
    if (!updatedUser.getId().equals(existingUser.getId())) {
      throw new UserException("You are not authorized to update this user");
    }

    if (updatedUser.getUsername() != null) {
      existingUser.setUsername(updatedUser.getUsername());
    }
    if (updatedUser.getEmail() != null) {
      existingUser.setEmail(updatedUser.getEmail());
    }
    if (updatedUser.getBio() != null) {
      existingUser.setBio(updatedUser.getBio());
    }
    if (updatedUser.getName() != null) {
      existingUser.setName(updatedUser.getName());
    }
    if (updatedUser.getMobile() != null) {
      existingUser.setMobile(updatedUser.getMobile());
    }
    if (updatedUser.getWebsite() != null) {
      existingUser.setWebsite(updatedUser.getWebsite());
    }
    if (updatedUser.getGender() != null) {
      existingUser.setGender(updatedUser.getGender());
    }
    if (updatedUser.getImage() != null) {
      existingUser.setImage(updatedUser.getImage());
    }
    return userRepository.save(existingUser);
  }
}
