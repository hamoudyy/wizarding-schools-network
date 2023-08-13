import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom'; // Import useHistory
import axios from 'axios';

export default function UpdateWizardingSchoolForm() {
  // Get wizardingSchoolId from URL parameters
  const { wizardingSchoolId } = useParams();

  // Get the history object
  const history = useHistory();

  // State for form inputs
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  // Fetch wizarding school details on component mount
  useEffect(() => {
    async function fetchSchoolDetails() {
      try {
        const response = await axios.get(`/api/wizarding-schools/${wizardingSchoolId}`);
        const schoolData = response.data;

        // Set form inputs with fetched data
        setName(schoolData.name);
        setLocation(schoolData.location);
      } catch (error) {
        console.error('Error fetching wizarding school details:', error);
      }
    }
    fetchSchoolDetails();
  }, [wizardingSchoolId]);

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send updated data to server
      await axios.put(`/api/wizarding-schools/${wizardingSchoolId}`, {
        name,
        location,
      });

      // Display success alert
      alert('Wizarding School updated successfully!');

      // Redirect to the wizarding school's details page
      // history.push(`/wizarding-schools/${wizardingSchoolId}`); 

    } catch (error) {
      console.error('Error updating wizarding school:', error);
    }
  };

  return (
    <div>
      <h2>Edit Wizarding School</h2>
      <form onSubmit={handleSubmit}>
        {/* Input fields for wizarding school details */}
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
        <button type="submit">Update School</button>
      </form>
    </div>
  );
}
