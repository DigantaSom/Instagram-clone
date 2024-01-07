package com.instagram.api.controller;

import com.instagram.api.config.SecurityContext;
import com.instagram.api.exception.CommentException;
import com.instagram.api.exception.PostException;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.Comment;
import com.instagram.api.model.User;
import com.instagram.api.service.CommentService;
import com.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
  @Autowired
  private CommentService commentService;

  @Autowired
  private UserService userService;

  @PostMapping("/create/{postId}")
  public ResponseEntity<Comment> createCommentHandler(
      @RequestBody Comment comment,
      @PathVariable Integer postId,
      @RequestHeader(SecurityContext.HEADER) String token) throws UserException, PostException {
    User user = userService.findUserProfile(token);
    Comment createdComment = commentService.createComment(comment, postId, user.getId());
    return new ResponseEntity<>(createdComment, HttpStatus.OK);
  }

  @PutMapping("/like/{commentId}")
  public ResponseEntity<Comment> likeCommentHandler(@PathVariable Integer commentId, @RequestHeader(SecurityContext.HEADER) String token) throws UserException, CommentException {
    User user = userService.findUserProfile(token);
    Comment likedComment = commentService.likeComment(commentId, user.getId());
    return new ResponseEntity<>(likedComment, HttpStatus.OK);
  }

  @PutMapping("/unlike/{commentId}")
  public ResponseEntity<Comment> unlikeCommentHandler(@PathVariable Integer commentId, @RequestHeader(SecurityContext.HEADER) String token) throws UserException, CommentException {
    User user = userService.findUserProfile(token);
    Comment unlikedComment = commentService.unlikeComment(commentId, user.getId());
    return new ResponseEntity<>(unlikedComment, HttpStatus.OK);
  }
}
