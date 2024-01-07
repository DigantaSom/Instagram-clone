package com.instagram.api.service;

import com.instagram.api.exception.CommentException;
import com.instagram.api.exception.PostException;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.Comment;

public interface CommentService {
  Comment findCommentById(Integer commentId) throws CommentException;
  Comment createComment(Comment comment, Integer postId, Integer userId) throws PostException, UserException;
  Comment likeComment(Integer commentId, Integer userId) throws CommentException, UserException;
  Comment unlikeComment(Integer commentId, Integer userId) throws CommentException, UserException;
}
