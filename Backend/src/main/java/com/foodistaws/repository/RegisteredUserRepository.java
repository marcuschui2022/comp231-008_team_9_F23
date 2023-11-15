package com.foodistaws.repository;

import com.foodistaws.entity.RegisteredUser;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegisteredUserRepository extends MongoRepository<RegisteredUser,String> {}

