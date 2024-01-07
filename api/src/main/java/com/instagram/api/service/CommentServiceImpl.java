package com.instagram.api.service;

import com.instagram.api.dto.UserDTO;
import com.instagram.api.exception.CommentException;
import com.instagram.api.exception.PostException;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.Comment;
import com.instagram.api.model.Post;
import com.instagram.api.model.User;
import com.instagram.api.repository.CommentRepository;
import com.instagram.api.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class CommentServiceImpl implements CommentService {
  @Autowired
  private CommentRepository commentRepository;

  @Autowired
  private PostRepository postRepository;

  @Autowired
  private PostService postService;

  @Autowired
  private UserService userService;

  @Override
  public Comment findCommentById(Integer commentId) throws CommentException {
    Optional<Comment> opt = commentRepository.findById(commentId);

    if (opt.isPresent()) {
      return opt.get();
    }
    throw new CommentException("Comment not found with id " + commentId);
  }

  @Override
  public Comment createComment(Comment comment, Integer postId, Integer userId) throws PostException, UserException {
    User user = userService.findUserById(userId);
    Post post = postService.findPostById(postId);

    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setUsername(user.getUsername());
    userDTO.setName(user.getName());
    userDTO.setUserImage(user.getImage());

    comment.setUser(userDTO);
    comment.setCreatedAt(LocalDateTime.now());

    Comment createdComment = commentRepository.save(comment);
    post.getComments().add(createdComment);
    postRepository.save(post);

    return createdComment;
  }

  @Override
  public Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException {
    Comment comment = findCommentById(commentId);
    User user = userService.findUserById(userId);

    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setUsername(user.getUsername());
    userDTO.setName(user.getName());
    userDTO.setUserImage(user.getImage());

    if (comment.getLikedByUsers().contains(userDTO)) {
      throw new CommentException("Comment already liked");
    }
    comment.getLikedByUsers().add(userDTO);
    return commentRepository.save(comment);
  }

  @Override
  public Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException {
    Comment comment = findCommentById(commentId);
    User user = userService.findUserById(userId);

    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setUsername(user.getUsername());
    userDTO.setName(user.getName());
    userDTO.setUserImage(user.getImage());

    if (!comment.getLikedByUsers().contains(userDTO)) {
      throw new CommentException("Comment was not liked in the first place");
    }
    comment.getLikedByUsers().remove(userDTO);
    return commentRepository.save(comment);
  }
}
