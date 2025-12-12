import "./App.css";
import GeneralInfo from "./components/Education/GeneralInfo";
import Education from "./components/Education/Education";
import Experience from "./components/WorkExperience/Experience";

function App() {
  return (
    <div className="app-container">
      <GeneralInfo />
      <Education />
      <Experience />
    </div>
  );
}

export default App;
