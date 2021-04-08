package de.santax.dashboard.student;

import de.santax.dashboard.student.exception.BadRequestException;
import de.santax.dashboard.student.exception.StudentNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        Boolean existsEmail = studentRepository
                .selectExistsEmail(student.getEmail());
        if (existsEmail) {
            throw new BadRequestException(
                    "Email " + student.getEmail() + " taken");
        }

        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if (!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException(
                    "Student with id " + studentId + " does not exists");
        }
        studentRepository.deleteById(studentId);
    }

    public Student getStudentById(Long studentId) {
        return studentRepository.findById(studentId).orElseThrow(() ->
                new StudentNotFoundException("Student with id " + studentId + " does not exists"));
    }

    public void updateStudent(Student student) {
        if (!studentRepository.existsById(student.getId())) {
            throw new StudentNotFoundException("Student with id " + student.getId() + " does not exists");
        }

        Student updatedStudent = studentRepository.findById(student.getId())
                .orElseThrow(() -> new StudentNotFoundException("Student with id " + student.getId() + " does not exists"));
        updatedStudent.setName(student.getName());
        updatedStudent.setEmail(student.getEmail());
        updatedStudent.setGender(student.getGender());

        studentRepository.save(updatedStudent);
    }
}

