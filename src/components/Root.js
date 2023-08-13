import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import components and context providers
import Main from "./Main";
import { WizardingSchoolsProvider } from "../context/wizarding-school-context";
import { StudentsProvider } from "../context/student-context";
import School from "./School";
import Student from "./Student";
import StudentsList from "./StudentsList";
import WizardingSchoolsList from "./WizardingSchoolsList";
import Navbar from "./navbar";

// Define the Root component
const Root = () => {
  return (
    <div className="navigation">
      {/* Display the Navbar */}
      <Navbar />
      {/* Provide the WizardingSchools context */}
      <WizardingSchoolsProvider>
        {/* Provide the Students context */}
        <StudentsProvider>
          <Routes>
            {/* Route for the Main page */}
            <Route path="/" element={<Main />} />
            {/* Route for the list of wizarding schools */}
            <Route path="/wizarding-schools" element={<WizardingSchoolsList />} />
            {/* Route for a specific wizarding school */}
            <Route path="/wizarding-schools/:wizardingSchoolId" element={<School />} />
            {/* Route for the list of students */}
            <Route path="/students" element={<StudentsList />} />
            {/* Route for a specific student */}
            <Route path="/students/:studentId" element={<Student />} />
            {/* Redirect all other routes to the Main page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </StudentsProvider>
      </WizardingSchoolsProvider>
    </div>
  );
};

export default Root;
