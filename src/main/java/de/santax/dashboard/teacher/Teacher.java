package de.santax.dashboard.teacher;

import de.santax.dashboard.student.Gender;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@EqualsAndHashCode
@ToString
@Entity
@Table(name="teacher")
public class Teacher {

    @Id
    @SequenceGenerator(
            name = "teacher_sequence",
            sequenceName = "teacher_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator = "teacher_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    @Column(nullable = false, unique = true)
    private String email;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Gender gender;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @NotNull
    private Subject subject;

    public Teacher(String name,String email, Gender gender, Subject subject) {
        this.name = name;
        this.email = email;
        this.gender = gender;
        this.subject = subject;
    }
}
