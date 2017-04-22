package by.kohanova.model;

import java.io.Serializable;

public class Token implements Serializable {
    public String token;
    public User user;

    public Token(String token, User user) {
        this.token = token;
        this.user = user;
    }
}