import React, { useState } from 'react';
import axios from 'axios';
import { useWizardingSchoolContext } from '../context/wizarding-school-context';

export default function NewWizardingSchoolForm() {
  // State for form inputs
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  // Access wizarding school context and its functions
  const { wizardingSchools, setWizardingSchools } = useWizardingSchoolContext();

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send data to server and get response
      const response = await axios.post('/api/wizarding-schools', {
        name,
        location,
      });

      // Add the new school to the list
      const newSchool = response.data;
      setWizardingSchools([...wizardingSchools, newSchool]);

      // Clear form inputs after successful submission
      setName('');
      setLocation('');
    } catch (error) {
      console.error('Error adding new wizarding school:', error);
    }
  };

  return (
    <div>
      <h2>Add New Wizarding School</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Location:
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
        </label>
        <br />
        <button type="submit">Add School</button>
      </form>
    </div>
  );
}
