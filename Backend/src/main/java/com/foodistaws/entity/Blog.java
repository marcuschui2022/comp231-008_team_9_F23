package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Blog {
    private String blogID;
    private RegisteredUser user;
    private String title;
    private String description;
}
