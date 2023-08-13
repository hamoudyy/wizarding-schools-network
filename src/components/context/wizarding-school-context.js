import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

export const WizardingSchoolContext = createContext();

export function useWizardingSchoolContext(){
  return useContext(WizardingSchoolContext);
}

export function WizardingSchoolsProvider({ children }) {
  const [wizardingSchools, setWizardingSchools] = useState([]);

  useEffect(() => {
    async function fetchWizardingSchools() {
      try {
        const response = await axios.get('/api/wizarding-schools');
        setWizardingSchools(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWizardingSchools();
  }, []);

  return (
    <WizardingSchoolContext.Provider value={{ wizardingSchools }}>
      {children}
    </WizardingSchoolContext.Provider>
  );
}
