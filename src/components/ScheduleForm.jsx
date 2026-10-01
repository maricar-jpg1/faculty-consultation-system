import { useEffect, useState } from "react";

function ScheduleForm({
  onSubmit,
  editingSchedule,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    facultyName: "",
    day: "",
    time: "",
    room: "",
    subject: "",
  });

  // Load selected schedule into the form when editing
  useEffect(() => {
    if (editingSchedule) {
      setFormData({
        facultyName: editingSchedule.facultyName,
        day: editingSchedule.day,
        time: editingSchedule.time,
        room: editingSchedule.room,
        subject: editingSchedule.subject,
      });
    } else {
      setFormData({
        facultyName: "",
        day: "",
        time: "",
        room: "",
        subject: "",
      });
    }
  }, [editingSchedule]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.facultyName ||
      !formData.day ||
      !formData.time ||
      !formData.room ||
      !formData.subject
    ) {
      alert("Please complete all fields.");
      return;
    }

    onSubmit(formData);

    if (!editingSchedule) {
      setFormData({
        facultyName: "",
        day: "",
        time: "",
        room: "",
        subject: "",
      });
    }
  };

  const handleCancel = () => {
    setFormData({
      facultyName: "",
      day: "",
      time: "",
      room: "",
      subject: "",
    });

    onCancel();
  };

  return (
    <section className="form-card">
      <div className="card-title">
        <div className="card-title-icon">
          {editingSchedule ? "✏️" : "➕"}
        </div>

        <div>
          <h3>
            {editingSchedule
              ? "Update Consultation Schedule"
              : "Add Consultation Schedule"}
          </h3>

          <p>
            {editingSchedule
              ? "Update the selected faculty schedule."
              : "Enter the faculty consultation schedule details."}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          {/* FACULTY NAME */}
          <div className="form-group">
            <label htmlFor="facultyName">
              Faculty Name
            </label>

            <input
              type="text"
              id="facultyName"
              name="facultyName"
              placeholder="Enter faculty name"
              value={formData.facultyName}
              onChange={handleChange}
            />
          </div>

          {/* DAY */}
          <div className="form-group">
            <label htmlFor="day">
              Day
            </label>

            <select
              id="day"
              name="day"
              value={formData.day}
              onChange={handleChange}
            >
              <option value="">
                Select day
              </option>

              <option value="Monday">
                Monday
              </option>

              <option value="Tuesday">
                Tuesday
              </option>

              <option value="Wednesday">
                Wednesday
              </option>

              <option value="Thursday">
                Thursday
              </option>

              <option value="Friday">
                Friday
              </option>

              <option value="Saturday">
                Saturday
              </option>
            </select>
          </div>

          {/* TIME */}
          <div className="form-group">
            <label htmlFor="time">
              Consultation Time
            </label>

            <input
              type="text"
              id="time"
              name="time"
              placeholder="Example: 9:00 AM - 11:00 AM"
              value={formData.time}
              onChange={handleChange}
            />
          </div>

          {/* ROOM */}
          <div className="form-group">
            <label htmlFor="room">
              Room
            </label>

            <input
              type="text"
              id="room"
              name="room"
              placeholder="Example: Room 201"
              value={formData.room}
              onChange={handleChange}
            />
          </div>

          {/* SUBJECT */}
          <div className="form-group full-width">
            <label htmlFor="subject">
              Subject
            </label>

            <input
              type="text"
              id="subject"
              name="subject"
              placeholder="Enter subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* BUTTONS */}
        <div className="form-actions">
          {editingSchedule && (
            <button
              type="button"
              className="btn btn-cancel"
              onClick={handleCancel}
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="btn btn-primary"
          >
            {editingSchedule
              ? "Update Schedule"
              : "Add Schedule"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ScheduleForm;