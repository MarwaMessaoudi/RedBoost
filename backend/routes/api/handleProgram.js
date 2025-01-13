const express = require("express");
const router = express.Router();
const Program = require("../../database/models/ProgramSchema");

// Middleware to parse request body
router.use(express.json());

// Route to add a program
router.post("/addProgram", async (req, res) => {
  try {
    // Validate incoming data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Invalid program data" });
    }

    const programData = req.body;

    // Create new program instance
    const newProgram = new Program(programData);

    // Save program to database
    await newProgram.save();

    // Respond with success message
    res.status(200).json(newProgram);
  } catch (error) {
    // Handle errors
    console.error("Failed to create Program:", error);
    res.status(500).json({ error: "Failed to create Program" });
  }
});

//route to delete program
router.delete("/deleteProgram/:programId", async (req, res) => {
  try {
    const { programId } = req.params;
    const program = await Program.findByIdAndDelete(programId);

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error("Error deleting program:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//route to update program
router.put("/updateProgram/:programId", async (req, res) => {
  try {
    const { programId } = req.params;
    const programData = req.body;

    const program = await Program.findByIdAndUpdate(programId, programData, {
      new: true,
    });

    if (!program) {
      return res.status(404).json({ error: "Program not found" });
    }

    res.status(200).json({ message: "Program updated successfully" });
  } catch (error) {
    console.error("Error updating program:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to load programs
router.post("/loadPrograms", async (req, res) => {
  try {
    // Fetch programs from the database
    const programs = await Program.find();

    // Respond with the programs
    res.status(200).json(programs);
  } catch (error) {
    console.error("Error loading programs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;