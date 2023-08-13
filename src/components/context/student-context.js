// Import necessary modules
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Create a context for student data
export const StudentContext = createContext();

// Custom hook to access the student context
export function useStudentContext(){
  return useContext(StudentContext);
}

// Component to provide student data to its children
export function StudentsProvider({ children }) {
  // State to store the list of students
  const [students, setStudents] = useState([]);

  // Effect hook to fetch student data when the component mounts
  useEffect(() => {
    // Function to fetch students and update the state
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    
    // Call the fetchStudents function
    fetchStudents();
  }, []);

  // Provide the student data to the components wrapped by this provider
  return (
    <StudentContext.Provider value={{ students, setStudents }}>
      {children}
    </StudentContext.Provider>
  );
}
