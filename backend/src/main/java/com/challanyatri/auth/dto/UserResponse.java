package com.challanyatri.auth.dto;

import com.challanyatri.auth.model.Role;

public record UserResponse(Long id, String name, String email, String phone, Role role) {}
