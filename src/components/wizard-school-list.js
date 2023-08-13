import React from 'react';
import { Link } from 'react-router-dom';
import { useWizardingSchoolContext } from '../context/wizard-school-list';
import NewWizardingSchoolForm from './NewWizardingSchoolForm'; 
import axios from 'axios';

export default function WizardingSchoolsList() {
  // Get all wizarding schools and setWizardingSchools function from context
  const { allSchools, setWizardingSchools } = useWizardingSchoolContext();

  // Function to handle deleting a wizarding school
  const handleDeleteSchool = async (schoolId) => {
    try {
      await axios.delete(`/api/wizarding-schools/${schoolId}`);
      // Remove the deleted school from the list
      setWizardingSchools(allSchools.filter(school => school.id !== schoolId));
    } catch (error) {
      console.error('Error deleting wizarding school:', error);
    }
  };

  return (
    <div>
      <h2>All Wizarding Schools</h2>
      <ul>
        {/* Map through all schools and render each */}
        {allSchools.map(school => (
          <li key={school.id}>
            <Link to={`/wizarding-schools/${school.id}`}>
              <img src={school.imageUrl} alt={school.name} />
              {school.name}
            </Link>
            <button onClick={() => handleDeleteSchool(school.id)}>X</button>
          </li>
        ))}
      </ul>
      <h2>Form to Add Another Wizarding School</h2>
      {/* Render the new wizarding school form */}
      <NewWizardingSchoolForm />
    </div>
  );
}
