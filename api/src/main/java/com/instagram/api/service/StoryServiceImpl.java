package com.instagram.api.service;

import com.instagram.api.dto.UserDTO;
import com.instagram.api.exception.StoryException;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.Story;
import com.instagram.api.model.User;
import com.instagram.api.repository.StoryRepository;
import com.instagram.api.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class StoryServiceImpl implements StoryService {
  @Autowired
  private StoryRepository storyRepository;

  @Autowired
  private UserService userService;

  @Autowired
  private UserRepository userRepository;

  @Override
  public Story createStory(Story story, Integer userId) throws UserException {
    User user = userService.findUserById(userId);

    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setEmail(user.getEmail());
    userDTO.setUsername(user.getUsername());
    userDTO.setName(user.getName());
    userDTO.setUserImage(user.getImage());

    story.setUser(userDTO);
    story.setTimestamp(LocalDateTime.now());

    user.getStories().add(story);
    userRepository.save(user);

    return storyRepository.save(story);
  }

  @Override
  public List<Story> findStoriesByUserId(Integer userId) throws UserException, StoryException {
    User user = userService.findUserById(userId);
    List<Story> stories = user.getStories();

    if (stories.size() == 0) {
      throw new StoryException("This user does not have any story");
    }
    return stories;
  }
}
