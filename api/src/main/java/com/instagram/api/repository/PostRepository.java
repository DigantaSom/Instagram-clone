package com.instagram.api.repository;

import com.instagram.api.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Integer> {

  @Query("SELECT p FROM Post p WHERE p.user.id = ?1")
  List<Post> findByUserId(Integer userId);

  @Query("SELECT p FROM Post p WHERE p.user.id IN :userIds ORDER BY p.createdAt DESC")
  List<Post> findAllPostsByUserIds(@Param("userIds") List<Integer> userIds);
}
