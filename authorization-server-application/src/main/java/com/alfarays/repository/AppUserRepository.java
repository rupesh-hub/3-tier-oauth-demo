package com.alfarays.repository;


import com.alfarays.entity.AppUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AppUserRepository extends JpaRepository<AppUser, String> {
    boolean existsByEmail(String email);

    @Query(value = "SELECT U FROM AppUser U WHERE lower(U.email)=lower(:email)")
    Optional<AppUser> finaByEmail(@Param("email") String email);
}
