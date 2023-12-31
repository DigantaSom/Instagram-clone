package com.instagram.api.model;

import com.instagram.api.dto.UserDTO;
import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "comments")
public class Comment {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  // Many to One ; @Embedded is used because UserDTO is not an Entity
  @Embedded
  @AttributeOverrides({
      @AttributeOverride(name = "id", column = @Column(name = "user_id")),
      @AttributeOverride(name = "email", column = @Column(name = "user_column"))
  })
  private UserDTO user;

  private String content;

  // Many to Many ; @Embedded is used because UserDTO is not an Entity
  @Embedded
  @ElementCollection // to create a separate table for this
  private Set<UserDTO> likedByUsers = new HashSet<>();

  private LocalDateTime createdAt;

  public Comment() {
  }

  public Comment(Integer id, UserDTO user, String content, Set<UserDTO> likedByUsers, LocalDateTime createdAt) {
    this.id = id;
    this.user = user;
    this.content = content;
    this.likedByUsers = likedByUsers;
    this.createdAt = createdAt;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public UserDTO getUser() {
    return user;
  }

  public void setUser(UserDTO user) {
    this.user = user;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Set<UserDTO> getLikedByUsers() {
    return likedByUsers;
  }

  public void setLikedByUsers(Set<UserDTO> likedByUsers) {
    this.likedByUsers = likedByUsers;
  }

  public LocalDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(LocalDateTime createdAt) {
    this.createdAt = createdAt;
  }
}
