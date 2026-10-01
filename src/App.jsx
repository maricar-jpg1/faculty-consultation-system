import { useState } from "react";
import ScheduleForm from "./components/ScheduleForm";
import ScheduleTable from "./components/ScheduleTable";
import "./style.css";

function App() {
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      facultyName: "Prof. Juan Dela Cruz",
      day: "Monday",
      time: "9:00 AM - 11:00 AM",
      room: "Room 201",
      subject: "Database Systems",
    },
    {
      id: 2,
      facultyName: "Prof. Maria Santos",
      day: "Wednesday",
      time: "1:00 PM - 3:00 PM",
      room: "Room 305",
      subject: "Web Development",
    },
  ]);

  const [editingSchedule, setEditingSchedule] = useState(null);

  // ADD or UPDATE
  const handleSubmit = (formData) => {
    if (editingSchedule) {
      setSchedules(
        schedules.map((schedule) =>
          schedule.id === editingSchedule.id
            ? {
                ...schedule,
                ...formData,
              }
            : schedule
        )
      );

      setEditingSchedule(null);
    } else {
      const newSchedule = {
        id: Date.now(),
        ...formData,
      };

      setSchedules([...schedules, newSchedule]);
    }
  };

  // EDIT
  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // DELETE
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (confirmDelete) {
      setSchedules(
        schedules.filter((schedule) => schedule.id !== id)
      );

      if (editingSchedule?.id === id) {
        setEditingSchedule(null);
      }
    }
  };

  // CANCEL EDIT
  const handleCancelEdit = () => {
    setEditingSchedule(null);
  };

  return (
    <div className="app">
      {/* HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="logo-area">
            <div className="logo-icon">📅</div>

            <div>
              <h1>Faculty Consultation</h1>
              <p>Schedule Management System</p>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="container">
        {/* PAGE TITLE */}
        <section className="page-heading">
          <div>
            <h2>Faculty Consultation Schedules</h2>
            <p>
              Manage faculty consultation schedules, subjects, rooms,
              and consultation times.
            </p>
          </div>

          <div className="total-card">
            <span>Total Schedules</span>
            <strong>{schedules.length}</strong>
          </div>
        </section>

        {/* FORM */}
        <ScheduleForm
          onSubmit={handleSubmit}
          editingSchedule={editingSchedule}
          onCancel={handleCancelEdit}
        />

        {/* TABLE */}
        <ScheduleTable
          schedules={schedules}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p>
          Faculty Consultation Schedule System © 2026
        </p>
      </footer>
    </div>
  );
}

export default App;