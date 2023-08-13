import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStudentContext } from '../context/student-context';
import { useWizardingSchoolContext } from '../context/wizard-school-context';
import axios from 'axios';
import UpdateStudentForm from './update-student-form'; 

function Student() {
  // Get single student context and wizarding school context
  const { singleStudent, setSingleStudent } = useStudentContext();
  const { wizardingSchools } = useWizardingSchoolContext();

  // Get studentId from URL parameters
  const { studentId } = useParams();

  // Find the school of the student
  const school = wizardingSchools.find(school => school.id === singleStudent.schoolId); 

  // Fetch student details on component mount
  useEffect(() => {
    async function fetchStudentDetails() {
      try {
        const response = await axios.get(`/api/students/${studentId}`);
        setSingleStudent(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching student details:', error);
      }
    }
    fetchStudentDetails();
  }, [studentId]);

  // Render student details
  if (!singleStudent) {
    return <div>Loading......</div>;
  }

  return (
    <div>
      <h2>{singleStudent.fullName}</h2>
      <img src={singleStudent.imageUrl} alt={singleStudent.fullName} />
      <p>Email: {singleStudent.email}</p>
      <p>Magical Ability Score: {singleStudent.magicalAbilityScore}</p>

      <h3>Wizarding School</h3>
      {school ? (
        <Link to={`/wizarding-schools/${school.id}`}>{school.name}</Link>
      ) : (
        <p>This student is not currently enrolled in any wizarding school.</p>
      )}

      {/* Render the update student form */}
      <div>
        <h2>Student Update Form</h2>
        <update-student-form />
      </div>
      
    </div>
  );
}

export default student;
