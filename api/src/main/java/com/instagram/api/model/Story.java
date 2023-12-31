package com.instagram.api.model;

import com.instagram.api.dto.UserDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;

@Entity
@Table(name = "stories")
public class Story {
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

  @NotNull
  private String image;
  private String caption;
  private LocalDateTime timestamp;

  public Story() {
  }

  public Story(Integer id, UserDTO user, String image, String caption, LocalDateTime timestamp) {
    this.id = id;
    this.user = user;
    this.image = image;
    this.caption = caption;
    this.timestamp = timestamp;
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

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getCaption() {
    return caption;
  }

  public void setCaption(String caption) {
    this.caption = caption;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }
}
