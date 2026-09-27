const express = require("express")
const router = express.Router()
const pool = require("../db")

// GET all applications
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM applications ORDER BY created_at DESC",
    )
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to fetch applications" })
  }
})

// POST create new application
router.post("/", async (req, res) => {
  const { company, role, status, applied_date, ctc_discussed, notes } = req.body
  if (!company || !role) {
    return res.status(400).json({ error: "Company and role are required" })
  }
  try {
    const [result] = await pool.query(
      `INSERT INTO applications (company, role, status, applied_date, ctc_discussed, notes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        company,
        role,
        status || "Applied",
        applied_date || null,
        ctc_discussed || null,
        notes || null,
      ],
    )
    res.status(201).json({ id: result.insertId, ...req.body })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to create application" })
  }
})

// PUT update an existing application
router.put("/:id", async (req, res) => {
  const { company, role, status, applied_date, ctc_discussed, notes } = req.body
  try {
    const [result] = await pool.query(
      `UPDATE applications
       SET company = ?, role = ?, status = ?, applied_date = ?, ctc_discussed = ?, notes = ?
       WHERE id = ?`,
      [
        company,
        role,
        status,
        applied_date,
        ctc_discussed,
        notes,
        req.params.id,
      ],
    )
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Application not found" })
    }
    res.json({ id: req.params.id, ...req.body })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to update application" })
  }
})

// DELETE an application
router.delete("/:id", async (req, res) => {
  try {
    const [result] = await pool.query("DELETE FROM applications WHERE id = ?", [
      req.params.id,
    ])
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Application not found" })
    }
    res.status(204).send()
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Failed to delete application" })
  }
})

module.exports = router
