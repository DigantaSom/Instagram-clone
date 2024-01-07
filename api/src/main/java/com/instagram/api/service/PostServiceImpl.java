package com.instagram.api.service;

import com.instagram.api.dto.UserDTO;
import com.instagram.api.exception.UserException;
import com.instagram.api.exception.PostException;
import com.instagram.api.model.Post;
import com.instagram.api.model.User;
import com.instagram.api.repository.PostRepository;
import com.instagram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {
  @Autowired
  private PostRepository postRepository;

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @Override
  public Post findPostById(Integer postId) throws PostException {
    Optional<Post> opt = postRepository.findById(postId);

    if (opt.isPresent()) {
      return opt.get();
    }
    throw new PostException("Post not found with id " + postId);
  }

  @Override
  public List<Post> findPostsByUserId(Integer userId) throws UserException {
    List<Post> posts = postRepository.findByUserId(userId);

    if (posts.size() == 0) {
      throw new UserException("This user does not have any post");
    }
    return posts;
  }

  @Override
  public List<Post> findAllPostsByUserIds(List<Integer> userIds) throws PostException {
    List<Post> posts = postRepository.findAllPostsByUserIds(userIds);

    if (posts.size() == 0) {
      throw new PostException("No post available");
    }
    return posts;
  }

  @Override
  public Post createPost(Post post, Integer userId) throws UserException {
    User user = userService.findUserById(userId);

    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setUsername(user.getUsername());
    userDTO.setName(user.getName());
    userDTO.setUserImage(user.getImage());

    post.setUser(userDTO);
    post.setCreatedAt(LocalDateTime.now());

    return postRepository.save(post);
  }

  @Override
  public String deletePost(Integer postId, Integer userId) throws UserException, PostException {
    Post post = findPostById(postId);
    User user = userService.findUserById(userId);

    if (post.getUser().getId().equals(user.getId())) {
      postRepository.deleteById(post.getId());
      return "Post deleted successfully";
    }
    throw new PostException("You are unauthorized to delete this post");
  }

  @Override
  public String savePost(Integer postId, Integer userId) throws PostException, UserException {
    Post post = findPostById(postId);
    User user = userService.findUserById(userId);

    if (!user.getSavedPosts().contains(post)) {
      user.getSavedPosts().add(post);
      userRepository.save(user);
      return "Post saved successfully";
    }
    return "Post already saved";
  }

  @Override
  public String unsavePost(Integer postId, Integer userId) throws PostException, UserException {
    Post post = findPostById(postId);
    User user = userService.findUserById(userId);

    if (user.getSavedPosts().contains(post)) {
      user.getSavedPosts().remove(post);
      userRepository.save(user);
      return "Post unsaved successfully";
    }
    return "Post was not saved in the first place";
  }

  @Override
  public Post likePost(Integer postId, Integer userId) throws PostException, UserException {
    Post post = findPostById(postId);
    User user = userService.findUserById(userId);

    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setUsername(user.getUsername());
    userDTO.setName(user.getName());
    userDTO.setUserImage(user.getImage());

    if (!post.getLikedByUsers().contains(userDTO)) {
      post.getLikedByUsers().add(userDTO);
      return postRepository.save(post);
    }
    throw new PostException("Already liked");
  }

  @Override
  public Post unlikePost(Integer postId, Integer userId) throws PostException, UserException {
    Post post = findPostById(postId);
    User user = userService.findUserById(userId);

    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setUsername(user.getUsername());
    userDTO.setName(user.getName());
    userDTO.setUserImage(user.getImage());

    if (post.getLikedByUsers().contains(userDTO)) {
      post.getLikedByUsers().remove(userDTO);
      return postRepository.save(post);
    }
    throw new PostException("Post was not liked in the first place");
  }
}
