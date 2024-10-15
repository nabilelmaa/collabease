package com.example.ctm.auth.payload;

public class JwtResponse {
    private String token;
    private String email;

    public JwtResponse(String token) {
        this.token = token;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public String getEmail() {
        return email;
    }
}
