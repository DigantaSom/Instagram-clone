package com.instagram.api.service;

import com.instagram.api.exception.StoryException;
import com.instagram.api.exception.UserException;
import com.instagram.api.model.Story;

import java.util.List;

public interface StoryService {
  Story createStory(Story story, Integer userId) throws UserException;
  List<Story> findStoriesByUserId(Integer userId) throws UserException, StoryException;
}
