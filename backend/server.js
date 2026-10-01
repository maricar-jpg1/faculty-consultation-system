const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==========================================
// HOME
// ==========================================
app.get("/", (req, res) => {
  res.json({
    message: "Faculty Consultation Schedule API is running!",
  });
});

// ==========================================
// GET ALL CONSULTATION SCHEDULES
// ==========================================
app.get("/api/schedules", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT *
       FROM consultation_schedules
       ORDER BY id ASC`
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching schedules:", error);

    res.status(500).json({
      message: "Failed to fetch schedules",
      error: error.message,
    });
  }
});

// ==========================================
// GET ONE SCHEDULE
// ==========================================
app.get("/api/schedules/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT *
       FROM consultation_schedules
       WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching schedule:", error);

    res.status(500).json({
      message: "Failed to fetch schedule",
      error: error.message,
    });
  }
});

// ==========================================
// ADD NEW CONSULTATION SCHEDULE
// ==========================================
app.post("/api/schedules", async (req, res) => {
  try {
    const {
      faculty_name,
      day,
      time,
      room,
      subject,
    } = req.body;

    // Validation
    if (!faculty_name || !day || !time || !room || !subject) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `INSERT INTO consultation_schedules
       (faculty_name, day, time, room, subject)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        faculty_name,
        day,
        time,
        room,
        subject,
      ]
    );

    res.status(201).json({
      message: "Schedule added successfully",
      schedule: result.rows[0],
    });
  } catch (error) {
    console.error("Error adding schedule:", error);

    res.status(500).json({
      message: "Failed to add schedule",
      error: error.message,
    });
  }
});

// ==========================================
// UPDATE CONSULTATION SCHEDULE
// ==========================================
app.put("/api/schedules/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      faculty_name,
      day,
      time,
      room,
      subject,
    } = req.body;

    // Validation
    if (!faculty_name || !day || !time || !room || !subject) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const result = await pool.query(
      `UPDATE consultation_schedules
       SET faculty_name = $1,
           day = $2,
           time = $3,
           room = $4,
           subject = $5
       WHERE id = $6
       RETURNING *`,
      [
        faculty_name,
        day,
        time,
        room,
        subject,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    res.json({
      message: "Schedule updated successfully",
      schedule: result.rows[0],
    });
  } catch (error) {
    console.error("Error updating schedule:", error);

    res.status(500).json({
      message: "Failed to update schedule",
      error: error.message,
    });
  }
});

// ==========================================
// DELETE CONSULTATION SCHEDULE
// ==========================================
app.delete("/api/schedules/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `DELETE FROM consultation_schedules
       WHERE id = $1
       RETURNING *`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Schedule not found",
      });
    }

    res.json({
      message: "Schedule deleted successfully",
      schedule: result.rows[0],
    });
  } catch (error) {
    console.error("Error deleting schedule:", error);

    res.status(500).json({
      message: "Failed to delete schedule",
      error: error.message,
    });
  }
});

// ==========================================
// START SERVER
// ==========================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Faculty Consultation backend running on http://localhost:${PORT}`
  );
});