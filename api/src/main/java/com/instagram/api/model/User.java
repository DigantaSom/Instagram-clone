package com.instagram.api.model;

import com.instagram.api.dto.UserDTO;
import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "users")
public class User {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Integer id;

  private String username;
  private String email;
  private String name;
  private String mobile;
  private String website;
  private String bio;
  private String gender;
  private String image;
  private String password;

  // Many to Many ; @Embedded is used because UserDTO is not an Entity
  @Embedded
  @ElementCollection // to create a separate table for this
  private Set<UserDTO> followers = new HashSet<>();

  // Many to Many ; @Embedded is used because UserDTO is not an Entity
  @Embedded
  @ElementCollection // to create a separate table for this
  private Set<UserDTO> following = new HashSet<>();

  @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private List<Story> stories = new ArrayList<>();

  @ManyToMany
  private List<Post> savedPosts = new ArrayList<>();

  public User() {
  }

  public User(Integer id, String username, String email, String name, String mobile, String website, String bio, String gender, String image, String password, Set<UserDTO> followers, Set<UserDTO> following, List<Story> stories, List<Post> savedPosts) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.name = name;
    this.mobile = mobile;
    this.website = website;
    this.bio = bio;
    this.gender = gender;
    this.image = image;
    this.password = password;
    this.followers = followers;
    this.following = following;
    this.stories = stories;
    this.savedPosts = savedPosts;
  }

  public Integer getId() {
    return id;
  }

  public void setId(Integer id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getMobile() {
    return mobile;
  }

  public void setMobile(String mobile) {
    this.mobile = mobile;
  }

  public String getWebsite() {
    return website;
  }

  public void setWebsite(String website) {
    this.website = website;
  }

  public String getBio() {
    return bio;
  }

  public void setBio(String bio) {
    this.bio = bio;
  }

  public String getGender() {
    return gender;
  }

  public void setGender(String gender) {
    this.gender = gender;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<UserDTO> getFollowers() {
    return followers;
  }

  public void setFollowers(Set<UserDTO> followers) {
    this.followers = followers;
  }

  public Set<UserDTO> getFollowing() {
    return following;
  }

  public void setFollowing(Set<UserDTO> following) {
    this.following = following;
  }

  public List<Story> getStories() {
    return stories;
  }

  public void setStories(List<Story> stories) {
    this.stories = stories;
  }

  public List<Post> getSavedPosts() {
    return savedPosts;
  }

  public void setSavedPosts(List<Post> savedPosts) {
    this.savedPosts = savedPosts;
  }

  @Override
  public String toString() {
    return "User{" +
        "id=" + id +
        ", username='" + username + '\'' +
        ", email='" + email + '\'' +
        ", name='" + name + '\'' +
        ", mobile='" + mobile + '\'' +
        ", website='" + website + '\'' +
        ", bio='" + bio + '\'' +
        ", gender='" + gender + '\'' +
        ", image='" + image + '\'' +
        ", password='" + password + '\'' +
        ", followers=" + followers +
        ", following=" + following +
        ", stories=" + stories +
        ", savedPosts=" + savedPosts +
        '}';
  }
}
