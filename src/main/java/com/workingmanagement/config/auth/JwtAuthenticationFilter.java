package com.workingmanagement.config.auth;

import com.workingmanagement.service.auth.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;


import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain
            ) throws ServletException, IOException
    {
        System.out.println("request: " + request.getHeaderNames());
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        final String username;
//         validate header
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
//         get token from header
        jwt = authHeader.substring(7);
//         extract username from token
        username = jwtService.extractUsername(jwt);


//              check valid username + have not authenticated
        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//            1st fetch DB
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(username);

//            2nd: start validate token mechanism (token, user)
            if (jwtService.isTokenValid(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
//                 3nd: update Security context // tell spring this user now authenticated
                SecurityContextHolder.getContext().setAuthentication(authenticationToken);
            }
        }

//         token invalid || username invalid || authenticated
        filterChain.doFilter(request, response);

    }

}
