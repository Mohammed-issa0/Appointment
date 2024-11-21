import { useState } from "react";
import AppointmentForm from "./components/AppointmentForm";
import PatientList from "./components/PatientList";

export default function App() {
  const [patients, setPatients] = useState([]);

  const addAppointment = (newPatient) => {
    setPatients([...patients, newPatient]);
  };

  const moveToWaiting = (patient) => {
    setPatients(
      patients.map((p) =>
        p.id === patient.id ? { ...p, status: "waiting" } : p
      )
    );
  };

  const moveToTreatment = (patient) => {
    // First, set any current treatment patient back to waiting
    const updatedPatients = patients.map((p) =>
      p.status === "treatment" ? { ...p, status: "done" } : p
    );
    // Then set the selected patient to treatment
    setPatients(
      updatedPatients.map((p) =>
        p.id === patient.id ? { ...p, status: "treatment" } : p
      )
    );
  };

  const deleteAppointment = (patientId) => {
    setPatients(patients.filter((p) => p.id !== patientId));
  };

  const upcomingPatients = patients.filter((p) => p.status === "upcoming");
  const waitingPatients = patients.filter((p) => p.status === "waiting");
  const currentPatient = patients.find((p) => p.status === "treatment");
  const donePatient = patients.filter((p) => p.status === "done");

  return (
    <div className="min-h-screen bg-url  p-6 bg-gradient-to-t from-blue-300 to-transparent  bg-blend-overlay bg-contain bg-center bg-no-repeat">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl  font-bold mb-8 text-center text-white bg-blue-500 w-full h-20 flex justify-center items-center rounded-md ">
          نظام إدارة الحجوزات
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <AppointmentForm onAddAppointment={addAppointment} />

          {currentPatient && (
            <PatientList title="المريض الحالي" patients={[currentPatient]} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <PatientList
            title="المرضى القادمون"
            patients={upcomingPatients}
            actionLabel="نقل إلى الانتظار"
            onAction={moveToWaiting}
            onDelete={deleteAppointment}
          />

          <PatientList
            title="المرضى في الانتظار"
            patients={waitingPatients}
            actionLabel="بدء المعالجة"
            onAction={moveToTreatment}
          />
          <PatientList
            title="المرضى التي تمت معالجتهم "
            patients={donePatient}
          />
        </div>
      </div>
    </div>
  );
}
