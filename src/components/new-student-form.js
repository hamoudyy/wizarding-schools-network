import React, { useState } from 'react';
import axios from 'axios';
import { useStudentContext } from '../context/student-context';

export default function NewStudentForm() {
  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // Access student context and its functions
  const { students, setStudents } = useStudentContext();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to server and get response
      const response = await axios.post('/api/students', {
        firstName,
        lastName,
        email,
      });

      // Add the new student to the list
      const newStudent = response.data;
      setStudents([...students, newStudent]);

      // Clear form inputs after successful submission
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (error) {
      console.error('Error adding new student:', error);
    }
  };

  return (
    <div>
      <h2>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <br />
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add Student</button>
      </form>
    </div>
  );
}
