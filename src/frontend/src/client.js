import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    }
    // convert non-2xx HTTP responses into errors:
    const error = new Error(response.statusText);
    error.response = response;
    return Promise.reject(error);
}

export const getAllStudents = () =>
    fetch("api/v1/students")
        .then(checkStatus);

export const getStudentById = (studentId) =>
    fetch(`api/v1/students/${studentId}`, {
        method: 'GET'
    }).then(checkStatus)

export const addNewStudent = student =>
    fetch("api/v1/students", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(student)
        }
    ).then(checkStatus)

export const deleteStudent = studentId =>
    fetch(`api/v1/students/${studentId}`, {
        method: 'DELETE'
    }).then(checkStatus);

export const updateStudent = (student) =>
    fetch("api/v1/students", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(student)
    }).then(checkStatus);


export const getAllTeachers = () =>
    fetch("api/v1/teachers")
        .then(checkStatus);

export const getTeacherById = (teacherId) =>
    fetch(`api/v1/teachers/${teacherId}`, {
        method: 'GET'
    }).then(checkStatus)

export const addNewTeacher = teacher =>
    fetch("api/v1/teachers", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(teacher)
        }
    ).then(checkStatus)

export const deleteTeacher = teacherId =>
    fetch(`api/v1/teachers/${teacherId}`, {
        method: 'DELETE'
    }).then(checkStatus)

export const updateTeacher = teacher =>
    fetch("api/v1/teachers", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(teacher)
    }).then(checkStatus);