package com.instagram.api.controller;

import com.instagram.api.config.SecurityContext;
import com.instagram.api.exception.UserException;
import com.instagram.api.exception.PostException;
import com.instagram.api.model.Post;
import com.instagram.api.model.User;
import com.instagram.api.response.MessageResponse;
import com.instagram.api.service.PostService;
import com.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
  @Autowired
  private PostService postService;

  @Autowired
  private UserService userService;

  @GetMapping("/{postId}")
  public ResponseEntity<Post> findPostByIdHandler(@PathVariable Integer postId) throws PostException {
    Post post = postService.findPostById(postId);
    return new ResponseEntity<>(post, HttpStatus.OK);
  }

  @GetMapping("/all/{userId}")
  public ResponseEntity<List<Post>> findPostsByUserIdHandler(@PathVariable Integer userId) throws UserException {
    List<Post> posts = postService.findPostsByUserId(userId);
    return new ResponseEntity<>(posts, HttpStatus.OK);
  }

  @GetMapping("/following/{ids}")
  public ResponseEntity<List<Post>> findAllPostsByUserIdsHandler(@PathVariable("ids") List<Integer> userIds) throws PostException {
    List<Post> posts = postService.findAllPostsByUserIds(userIds);
    return new ResponseEntity<>(posts, HttpStatus.OK);
  }

  @PostMapping("/create")
  public ResponseEntity<Post> createPostHandler(@RequestHeader(SecurityContext.HEADER) String token, @RequestBody Post post) throws UserException {
    User user = userService.findUserProfile(token);
    Post createdPost = postService.createPost(post, user.getId());
    return new ResponseEntity<>(createdPost, HttpStatus.OK);
  }

  @DeleteMapping("/delete/{postId}")
  public ResponseEntity<MessageResponse> deletePostHandler(@RequestHeader(SecurityContext.HEADER) String token, @PathVariable Integer postId) throws UserException, PostException {
    User user = userService.findUserProfile(token);
    String message = postService.deletePost(postId, user.getId());
    MessageResponse messageResponse = new MessageResponse(message);
    return new ResponseEntity<>(messageResponse, HttpStatus.ACCEPTED);
  }

  @PutMapping("/save/{postId}")
  public ResponseEntity<MessageResponse> savePostHandler(@RequestHeader(SecurityContext.HEADER) String token, @PathVariable Integer postId) throws UserException, PostException {
    User user = userService.findUserProfile(token);
    String message = postService.savePost(postId, user.getId());
    MessageResponse messageResponse = new MessageResponse(message);
    return new ResponseEntity<>(messageResponse, HttpStatus.ACCEPTED);
  }

  @PutMapping("/unsave/{postId}")
  public ResponseEntity<MessageResponse> unsavePostHandler(@RequestHeader(SecurityContext.HEADER) String token, @PathVariable Integer postId) throws UserException, PostException {
    User user = userService.findUserProfile(token);
    String message = postService.unsavePost(postId, user.getId());
    MessageResponse messageResponse = new MessageResponse(message);
    return new ResponseEntity<>(messageResponse, HttpStatus.ACCEPTED);
  }

  @PutMapping("/like/{postId}")
  public ResponseEntity<Post> likePostHandler(@RequestHeader(SecurityContext.HEADER) String token, @PathVariable Integer postId) throws UserException, PostException {
    User user = userService.findUserProfile(token);
    Post likedPost = postService.likePost(postId, user.getId());
    return new ResponseEntity<>(likedPost, HttpStatus.OK);
  }

  @PutMapping("/unlike/{postId}")
  public ResponseEntity<Post> unlikePostHandler(@RequestHeader(SecurityContext.HEADER) String token, @PathVariable Integer postId) throws UserException, PostException {
    User user = userService.findUserProfile(token);
    Post unlikedPost = postService.unlikePost(postId, user.getId());
    return new ResponseEntity<>(unlikedPost, HttpStatus.OK);
  }
}
