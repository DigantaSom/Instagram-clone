package com.instagram.api.service;

import com.instagram.api.exception.UserException;
import com.instagram.api.exception.PostException;
import com.instagram.api.model.Post;

import java.util.List;

public interface PostService {
  Post findPostById(Integer postId) throws PostException;
  List<Post> findPostsByUserId(Integer userId) throws UserException;
  List<Post> findAllPostsByUserIds(List<Integer> userIds) throws PostException;
  Post createPost(Post post, Integer userId) throws UserException;
  String deletePost(Integer postId, Integer userId) throws UserException, PostException;
  String savePost(Integer postId, Integer userId) throws PostException, UserException;
  String unsavePost(Integer postId, Integer userId) throws PostException, UserException;
  Post likePost(Integer postId, Integer userId) throws PostException, UserException;
  Post unlikePost(Integer postId, Integer userId) throws PostException, UserException;
}
