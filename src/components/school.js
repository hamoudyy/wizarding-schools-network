import React, { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';  
import { useWizardingSchoolContext } from '../context/wizard-school-context';
import { StudentContext } from '../context/student-context';
import UpdateWizardingSchoolForm from './update-wizard-school-form';  

function School() {
  // State to hold school details
  const [school, setSchool] = useState(null);

  // Get wizarding school and student contexts
  const { wizardingSchools } = useWizardingSchoolContext();
  const { students, setStudents } = useContext(StudentContext);

  // Get wizarding school id from URL parameters
  const { wizardingSchoolId } = useParams();

  // Find the wizarding school based on the id
  const wizardingSchool = wizardingSchools.find(school => school.id === wizardingSchoolId);

  // Filter students who belong to this school
  const studentsInSchool = students.filter(student => student.schoolId === wizardingSchoolId);

  // Fetch school details on component mount
  useEffect(() => {
    async function fetchSchoolDetails() {
      try {
        const response = await axios.get(`/api/wizarding-schools/${wizardingSchoolId}`);
        setSchool(response.data);
      } catch (error) {
        console.error('Error fetching school details:', error);
      }
    }

    fetchSchoolDetails();
  }, [wizardingSchoolId]);

  // Function to handle unenrolling a student
  const handleUnenrollStudent = async (studentId) => {
    try {
      await axios.put(`/api/students/${studentId}`, {
        schoolId: null,
      });

      setStudents(prevStudents => prevStudents.map(student =>
        student.id === studentId ? { ...student, schoolId: null } : student
      ));
    } catch (error) {
      console.error('Error unenrolling student:', error);
    }
  };

  // Render the school details and students
  if (!school) {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      <h2>{school.name}</h2>
      <img src={school.imageUrl} alt={school.name} />
      <p>Location: {school.location}</p>
      <p>{school.description}</p>

      <h3>Students in {school.name}</h3>
      {studentsInSchool.length === 0 ? (
        <p>No students in this school yet.</p>
      ) : (
        <ul>
          {studentsInSchool.map(student => (
            <li key={student.id}>
              <Link to={`/students/${student.id}`}>{student.fullName}</Link>
              <button onClick={() => handleUnenrollStudent(student.id)}>Unenroll</button>
            </li>
          ))}
        </ul>
      )}

      {/* Render the update school form */}
      <div>
        <h2>Updating School Form</h2>
        <update-wizard-school-form />
      </div>
    </div>
  );
}

export default school;
