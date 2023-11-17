package com.foodistaws.exception;

public class UserLoginException extends RuntimeException {
    public UserLoginException() {
        super("wrong email or password.");
    }
}
