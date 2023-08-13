import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function UpdateStudentForm() {
  // Get studentId from URL parameters
  const { studentId } = useParams();

  // State for form inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [magicalAbilityScore, setMagicalAbilityScore] = useState('');

  // Fetch student details on component mount
  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        const studentData = response.data;

        // Set form inputs with fetched data
        setFirstName(studentData.firstName);
        setLastName(studentData.lastName);
        setEmail(studentData.email);
        setMagicalAbilityScore(studentData.magicalAbilityScore);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    }
    fetchStudentDetails();
  }, [studentId]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated data to server
      await axios.put(`/api/students/${studentId}`, {
        firstName,
        lastName,
        email,
        magicalAbilityScore,
      });

      // Display success alert
      alert('Student updated successfully!');
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for student details */}
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
        <label>
          Magical Ability Score:
          <input type="number" value={magicalAbilityScore} onChange={(e) => setMagicalAbilityScore(e.target.value)} />
        </label>
        <br />
        <button type="submit">Update Student</button>
      </form>
    </div>
  );
}
