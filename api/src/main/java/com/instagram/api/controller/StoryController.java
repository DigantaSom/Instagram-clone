package com.instagram.api.controller;

import com.instagram.api.config.SecurityContext;
import com.instagram.api.exception.StoryException;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.Story;
import com.instagram.api.model.User;
import com.instagram.api.service.StoryService;
import com.instagram.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stories")
public class StoryController {
  @Autowired
  private StoryService storyService;

  @Autowired
  private UserService userService;

  @PostMapping("/create")
  public ResponseEntity<Story> createStoryHandler(@RequestBody Story story, @RequestHeader(SecurityContext.HEADER) String token) throws UserException {
    User user = userService.findUserProfile(token);
    Story createdStory = storyService.createStory(story, user.getId());
    return new ResponseEntity<>(createdStory, HttpStatus.OK);
  }

  @GetMapping("/{userId}")
  public ResponseEntity<List<Story>> findStoriesByUserIdHandler(@PathVariable Integer userId) throws StoryException, UserException {
    List<Story> stories = storyService.findStoriesByUserId(userId);
    return new ResponseEntity<>(stories, HttpStatus.OK);
  }
}
