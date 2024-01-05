package com.instagram.api.config;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class JwtTokenGeneratorFilter extends OncePerRequestFilter {
  @Override
  protected void doFilterInternal(HttpServletRequest request,
                                  HttpServletResponse response,
                                  FilterChain filterChain) throws ServletException, IOException {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

    if (authentication != null) {
      SecretKey key = Keys.hmacShaKeyFor(SecurityContext.JWT_KEY.getBytes());

      String jwt = Jwts.builder()
          .issuer("instagram")
          .issuedAt(new Date())
          .claim("authorities", populateAuthorities(authentication.getAuthorities()))
          .claim("username", authentication.getName())
          .expiration(new Date(new Date().getTime() + (7 * 24 * 60 * 60 * 1000)))
          .signWith(key)
          .compact();

      response.setHeader(SecurityContext.HEADER, jwt);
    }

    filterChain.doFilter(request, response); // kinda like next() in nodejs
  }

  // filters if the servlet path matches "/signin", i.e., token gets generated and gets sent with http header
  protected boolean shouldNotFilter(HttpServletRequest req) throws ServletException {
    return !req.getServletPath().equals("/signin");
  }

  private String populateAuthorities(Collection<? extends GrantedAuthority> collection) {
    Set<String> authorities = new HashSet<>();

    for (GrantedAuthority authority: collection) {
      authorities.add(authority.getAuthority());
    }

    return String.join(",", authorities);
  }
}
