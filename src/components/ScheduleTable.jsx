function ScheduleTable({
  schedules,
  onEdit,
  onDelete,
}) {
  return (
    <section className="table-card">
      <div className="table-header">
        <div>
          <h3>Consultation Schedule List</h3>
          <p>
            View and manage all faculty consultation schedules.
          </p>
        </div>

        <div className="record-count">
          {schedules.length}{" "}
          {schedules.length === 1
            ? "Record"
            : "Records"}
        </div>
      </div>

      {schedules.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📅</div>

          <h3>No schedules found</h3>

          <p>
            Add a faculty consultation schedule using
            the form above.
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Faculty Name</th>
                <th>Day</th>
                <th>Time</th>
                <th>Room</th>
                <th>Subject</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={schedule.id}>
                  <td>{index + 1}</td>

                  <td>
                    <div className="faculty-cell">
                      <div className="faculty-avatar">
                        {schedule.facultyName
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <span>
                        {schedule.facultyName}
                      </span>
                    </div>
                  </td>

                  <td>
                    <span className="day-badge">
                      {schedule.day}
                    </span>
                  </td>

                  <td>
                    <span className="time-text">
                      🕐 {schedule.time}
                    </span>
                  </td>

                  <td>
                    <span className="room-badge">
                      🏫 {schedule.room}
                    </span>
                  </td>

                  <td>
                    {schedule.subject}
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="btn-edit"
                        onClick={() =>
                          onEdit(schedule)
                        }
                        title="Edit schedule"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() =>
                          onDelete(schedule.id)
                        }
                        title="Delete schedule"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ScheduleTable;