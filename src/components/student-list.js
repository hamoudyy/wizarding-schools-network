import React from 'react';
import { Link } from 'react-router-dom'; 
import { useStudentContext } from '../context/student-context';
import NewStudentForm from './new-student-form';
import axios from 'axios';

export default function StudentsList() {
  // Get all students and setStudents function from the context
  const { allStudents, setStudents } = useStudentContext();

  // Function to handle deleting a student
  const handleDeleteStudent = async (studentId) => {
    try {
      await axios.delete(`/api/students/${studentId}`);
      // Remove the deleted student from the list
      setStudents(allStudents.filter(student => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <h2>All Students</h2>
      <ul>
        {/* Map through all students and render each */}
        {allStudents.map(student => (
          <li key={student.id}>
            <Link to={`/students/${student.id}`}>{student.firstName}</Link><br />
            <button onClick={() => handleDeleteStudent(student.id)}>X</button>
          </li>
        ))}
      </ul>
      <h2>Form to Add Another Student</h2>
      {/* Render the new student form */}
      <NewStudentForm />
    </div>
  );
}
