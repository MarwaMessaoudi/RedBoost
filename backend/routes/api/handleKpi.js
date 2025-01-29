const express = require("express");
const router = express.Router();
const Kpi = require("../../database/models/KpiSchema.js");
const Task = require("../../database/models/TaskSchema.js");

// Middleware to parse request body
router.use(express.json());



router.post("/AddKpi", async (req, res) => {
  try {
      const kpiData = req.body;

      if (!kpiData || Object.keys(kpiData).length === 0) {
          return res.status(400).json({ error: "Invalid KPI data" });
      }

      // Validate that 'count' and 'label' are provided and of correct type
      if (typeof kpiData.count !== 'number' || !kpiData.count) {
          return res.status(400).json({ error: "'count' must be a number and is required" });
      }

      if (typeof kpiData.label !== 'string' || !kpiData.label) {
          return res.status(400).json({ error: "'label' must be a non-empty string and is required" });
      }

      // Create the KPI without the task reference initially
      const newKpi = new Kpi(kpiData);
      const savedKpi = await newKpi.save();

      // Return the saved KPI (without task reference yet)
      res.status(200).json(savedKpi);
  } catch (error) {
      console.error("Failed to create KPI:", error);
      res.status(500).json({ error: "Failed to create KPI" });
  }
});

// Route to add a KPI
/* router.post("/addKpi", async (req, res) => {
    try {
      const kpiData = req.body;
  
      if (!kpiData || Object.keys(kpiData).length === 0) {
        return res.status(400).json({ error: "Invalid KPI data" });
      }
  
      // Validate that 'count' and 'label' are provided and of correct type
      if (typeof kpiData.count !== 'number' || !kpiData.count) {
        return res.status(400).json({ error: "'count' must be a number and is required" });
      }
  
      if (typeof kpiData.label !== 'string' || !kpiData.label) {
        return res.status(400).json({ error: "'label' must be a non-empty string and is required" });
      }
  
      // Validate that the 'task' field is a valid ObjectId
      if (!mongoose.Types.ObjectId.isValid(kpiData.task)) {
        return res.status(400).json({ error: "Invalid 'task' ObjectId" });
      }
  
      const newKpi = new Kpi(kpiData);
      const savedKpi = await newKpi.save();
  
      res.status(200).json(savedKpi);
    } catch (error) {
      console.error("Failed to create KPI:", error);
      res.status(500).json({ error: "Failed to create KPI" });
    }
  }); */
  

// Route to update a KPI
router.put("/updateKpi/:kpiId", async (req, res) => {
  try {
    const { kpiId } = req.params;
    const kpiData = req.body;

    // Check if task references are updated
    if (kpiData.tasks && kpiData.tasks.length > 0) {
      // Update tasks that reference this KPI
      await Task.updateMany(
        { _id: { $in: kpiData.tasks } },
        { $push: { kpis: kpiId } }
      );
    }

    const updatedKpi = await Kpi.findByIdAndUpdate(kpiId, kpiData, { new: true });
    if (!updatedKpi) {
      return res.status(404).json({ error: "KPI not found" });
    }

    res.status(200).json(updatedKpi);
  } catch (error) {
    console.error("Error updating KPI:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to get all KPIs
router.get("/loadKpis", async (req, res) => {
  try {
    const kpis = await Kpi.find().populate("kpis");  // Populate tasks if needed
    res.status(200).json(kpis);
  } catch (error) {
    console.error("Error loading KPIs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// Route to load KPIs by task
router.get("/loadKpisByTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;

    // Find the task and populate the kpis field to get associated KPIs
    const task = await Task.findById(taskId).populate("kpis");

    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(task.kpis);  // Return the KPIs associated with the task
  } catch (error) {
    console.error("Error loading KPIs by task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.get("/allkpi", async (req, res) => {
  try {
    const kpis = await Kpi.find(); // Fetch all KPIs from the database
    res.status(200).json(kpis);
  } catch (error) {
    console.error("Error fetching KPIs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to delete a KPI
router.delete("/deleteKpi/:kpiId", async (req, res) => {
  try {
    const { kpiId } = req.params;

    // Remove references to this KPI in tasks
    await Task.updateMany(
      { kpis: kpiId },
      { $pull: { kpis: kpiId } }
    );

    const deletedKpi = await Kpi.findByIdAndDelete(kpiId);
    if (!deletedKpi) {
      return res.status(404).json({ error: "KPI not found" });
    }

    res.status(200).json({ message: "KPI deleted successfully" });
  } catch (error) {
    console.error("Error deleting KPI:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
