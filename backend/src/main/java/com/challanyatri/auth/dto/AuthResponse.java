package com.challanyatri.auth.dto;

import com.challanyatri.auth.model.Role;

public record AuthResponse(String token, String tokenType, Long userId, String name, String email, Role role) {}
