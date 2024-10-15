package com.example.ctm.auth;

import com.example.ctm.auth.payload.JwtResponse;
import com.example.ctm.auth.payload.LoginRequest;
import com.example.ctm.security.JwtProvider;
import com.example.ctm.user.User;
import com.example.ctm.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtProvider jwtProvider;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private RestTemplate restTemplate;
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String clientSecret;

    public AuthController(AuthenticationManager authenticationManager, UserService userService, JwtProvider jwtProvider, BCryptPasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
    }
    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        try {


            System.out.println("Login attempt for email: " + loginRequest.getEmail());
            System.out.println("Provided password: " + loginRequest.getPassword());

            User user = userService.findByEmail(loginRequest.getEmail());
            if (user == null) {
                System.out.println("User not found for email: " + loginRequest.getEmail());
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }

            String storedHash = user.getPassword();
            System.out.println("Stored hash from database: " + storedHash);

            boolean passwordMatch = passwordEncoder.matches(loginRequest.getPassword(), storedHash);
            System.out.println("Password matches: " + passwordMatch);

            if (!passwordMatch) {
                System.out.println("Password mismatch. Returning unauthorized.");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
            }
//            String jwt = jwtProvider.generateToken(loginRequest.getEmail());
            return ResponseEntity.ok((JwtResponse) Map.of(
                    "token", "jwt",
                    "redirectUrl", "/dashboard" // Specify the redirect URL here
            ));
        } catch (Exception ex) {
            System.out.println("Authentication failed: " + ex.getMessage());
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }
    @GetMapping("/google")
    public ResponseEntity<?> googleLogin() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("https://accounts.google.com/o/oauth2/v2/auth?client_id=" + clientId +
                        "&redirect_uri=http://localhost:8080/api/v1/auth/google/callback" +
                        "&response_type=code&scope=email%20profile"))
                .build();
    }
    @GetMapping("/google/callback")
    public ResponseEntity<?> googleCallback(@RequestParam("code") String code) {
        try {

            String tokenUrl = "https://oauth2.googleapis.com/token";

            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("code", code);
            params.add("client_id", clientId);
            params.add("client_secret", clientSecret);
            params.add("redirect_uri", "http://localhost:8080/api/v1/auth/google/callback");
            params.add("grant_type", "authorization_code");

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

            HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(params, headers);
            ResponseEntity<Map> response = restTemplate.exchange(tokenUrl, HttpMethod.POST, request, Map.class);

            if (response.getStatusCode() != HttpStatus.OK) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to obtain access token");
            }

            String accessToken = (String) response.getBody().get("access_token");

            String userInfoUrl = "https://www.googleapis.com/oauth2/v2/userinfo?access_token=" + accessToken;
            ResponseEntity<Map> userInfoResponse = restTemplate.getForEntity(userInfoUrl, Map.class);
            Map<String, Object> userInfo = userInfoResponse.getBody();

            String email = (String) userInfo.get("email");
            User existingUser = userService.findByEmail(email);

            String jwt;
            String generatedPassword = UUID.randomUUID().toString();

            if (existingUser == null) {
                User newUser = new User();
                newUser.setEmail(email);
                newUser.setPassword(passwordEncoder.encode(generatedPassword));
                newUser.setFirstName((String) userInfo.get("given_name"));
                newUser.setLastName((String) userInfo.get("family_name"));
                newUser.setPicture((String) userInfo.get("picture"));
                newUser.setRole("User");
                newUser.setCreatedAt(LocalDateTime.now());
                userService.createUser(newUser);


                jwt = jwtProvider.generateToken(newUser.getEmail(), newUser.getFirstName(), newUser.getLastName(), newUser.getPicture());
            } else {

                jwt = jwtProvider.generateToken(existingUser.getEmail(), existingUser.getFirstName(), existingUser.getLastName(), existingUser.getPicture());
            }

            URI redirectUri = URI.create("http://localhost:5173/dashboard?token=" + jwt);
            return ResponseEntity.status(HttpStatus.FOUND)
                    .location(redirectUri)
                    .build();

        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Authentication failed: " + ex.getMessage());
        }
    }

}
