package de.santax.dashboard.teacher;

import de.santax.dashboard.student.exception.BadRequestException;
import de.santax.dashboard.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class TeacherService {

    private final TeacherRepository teacherRepository;

    public List<Teacher> getAllTeacher() {
        return teacherRepository.findAll();
    }

    public Teacher getTeacherById(Long id) {
        return teacherRepository.findById(id).orElseThrow(() ->
                new BadRequestException("Cannot find Teacher with ID: " + id));
    }

    public void addTeacher(Teacher teacher) {
        boolean existingTeacher = teacherRepository.existingEmail(teacher.getEmail());
        if (existingTeacher) {
            throw new BadRequestException("Email " + teacher.getEmail() + " is already taken");
        }
        teacherRepository.save(teacher);
    }

    public void deleteTeacher(Long id) {
        Optional<Teacher> existingTeacher = teacherRepository.findById(id);
        if (existingTeacher.isEmpty()) {
            throw new StudentNotFoundException("Teacher with ID: " + id + " not found.");
        }
        teacherRepository.deleteById(id);
    }

    public void updateTeacher(Teacher teacher) {
        Teacher updatedTeacher = teacherRepository.findById(teacher.getId()).orElseThrow(() ->
                new BadRequestException("Cannot update Teacher" + teacher.getName())
        );
        updatedTeacher.setName(teacher.getName());
        updatedTeacher.setEmail(teacher.getEmail());
        updatedTeacher.setGender(teacher.getGender());

        teacherRepository.save(updatedTeacher);
    }
}
