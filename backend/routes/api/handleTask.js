const express = require("express");
const router = express.Router();
const Task = require("../../database/models/TaskSchema");
const Activity = require("../../database/models/ActivitySchema");
const mongoose = require('mongoose');

// Middleware to parse request body
router.use(express.json());

// Route to add a task
router.post("/addTask", async (req, res) => {
  try {
    // Validate incoming data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Invalid task data" });
    }

    const { activityId, ...taskData } = req.body;

    // Find the activity by its ID
    const activity = await Activity.findById(activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    // Create a new task instance and link it to the activity
    const newTask = new Task({ ...taskData, activityId: activity._id });

    // Save task to the database
    const savedTask = await newTask.save();

    // Update the activity with the new task
    await Activity.findByIdAndUpdate(
      activityId,
      { $push: { tasks: savedTask._id } },
      { new: true, useFindAndModify: false }
    );

    // Respond with data
    res.status(200).json(savedTask);
  } catch (error) {
    // Handle errors
    console.error("Failed to create task:", error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Route to update a task
router.put("/updateTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const taskData = req.body;

    const task = await Task.findByIdAndUpdate(taskId, taskData, { new: true });
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to load all tasks
router.post("/loadTasks", async (req, res) => {
  try {
    // Fetch tasks from the database
    const tasks = await Task.find();

    if (!tasks) {
      return res.status(404).json({ error: "Tasks not found" });
    }

    // Respond with the tasks
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Route to load a task by ID
router.post("/loadTaskById", async (req, res) => {
  try {
    const { taskId } = req.body; // Extract taskId from request body

    if (!taskId) {
      return res.status(400).json({ error: "Task ID is required" });
    }

    // Find the Task by its ID
    const task = await Task.findById(taskId);

    // Check if task is found
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Return success response with task data
    res.status(200).json(task);
  } catch (error) {
    console.error("Error loading task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//Route to load tasks by activity id
router.post("/loadTasksByActivityId/:activityId", async (req, res) => {
  try {
    const { activityId } = req.params;
    // Find the Task by its ID
    const tasks = await Task.find({ activityId });

    // Check if task is found
    if (!tasks) {
      return res.status(404).json({ error: "Tasks not found" });
    }

    // Return success response
    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error loading tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to delete a task
router.delete("/deleteTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Find the activity associated with the task
    const activity = await Activity.findById(task.activityId);
    if (!activity) {
      return res.status(404).json({ error: "Activity not found" });
    }

    await activity.tasks.pull(taskId);
    await activity.save();

    res.status(200).json(taskId);
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to load tasks by user ID
router.post("/tasksByUser", async (req, res) => {
  try {
    const { userId } = req.body; // Retrieve userId from request body

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await Task.find({ taskOwner: userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found for this user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error loading tasks by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE /deleteDeliverable/:taskId/deliverables/:deliverableId
router.delete('/deleteDeliverable/:taskId/deliverables/:deliverableId', async (req, res) => {
  try {
    const { taskId, deliverableId } = req.params;

    // Log the incoming parameters for debugging
    console.log(`Received request to delete deliverable: taskId=${taskId}, deliverableId=${deliverableId}`);

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ message: 'Invalid task ID format' });
    }

    // Find the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Ensure deliverables exist
    if (!task.deliverables || !Array.isArray(task.deliverables)) {
      return res.status(400).json({ message: 'No deliverables to delete' });
    }

    // Filter out the deliverable with the matching ID
    const initialLength = task.deliverables.length;
    task.deliverables = task.deliverables.filter(deliverable => deliverable._id.toString() !== deliverableId);

    if (task.deliverables.length === initialLength) {
      return res.status(404).json({ message: 'Deliverable not found' });
    }

    // Save the updated task
    await task.save();

    res.status(200).json({ message: 'Deliverable deleted successfully', task });
  } catch (error) {
    // Log the error for debugging
    console.error('Error deleting deliverable:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message }); // Include error message in response
  }
});



module.exports = router;
