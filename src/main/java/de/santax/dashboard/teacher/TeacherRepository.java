package de.santax.dashboard.teacher;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface TeacherRepository extends JpaRepository<Teacher, Long> {

    @Query("" +
            "SELECT CASE WHEN COUNT(t) > 0 THEN " +
            "TRUE ELSE FALSE END " +
            "FROM Teacher t " +
            "WHERE t.email = ?1"
    )
    boolean existingEmail(String email);
}
