package de.santax.dashboard.teacher;

import de.santax.dashboard.student.exception.BadRequestException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public List<Teacher> getAllTeacher() {
        return teacherRepository.findAll();
    }

    public void addTeacher(Teacher teacher) {
        boolean existingTeacher = teacherRepository.existingEmail(teacher.getEmail());
        if(existingTeacher) {
            throw new BadRequestException("Email " + teacher.getEmail() + " is already taken");
        }
        teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        teacherRepository.deleteById(id);
    }

}
