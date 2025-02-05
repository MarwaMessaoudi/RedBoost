const express = require('express'); 
const mongoose = require('mongoose');
const Activity = require('../../database/models/ActivitySchema');
const Task = require('../../database/models/TaskSchema');
const TaskType = require('../../database/models/TaskType');
const User = require('../../database/models/UserSchema'); // Import User model
const Kpi = require('../../database/models/KpiSchema'); // Import Kpi model
// Create a router instance
const router = express.Router();

// Helper function to calculate task status based on dates
function calculateTaskStatus(startDate, endDate) {
  const currentDate = new Date();
  if (currentDate < startDate) {
    return "notStarted";
  } else if (currentDate >= startDate && currentDate <= endDate) {
    return "inProgress";
  } else if (currentDate > endDate) {
    return "completed";
  }
  return "expired"; // Default status if none of the conditions match
}























//this fct works!!!!!!!!!!!!!!!

router.put("/updateTask/:taskId", async (req, res) => {
  try {
    const { taskId } = req.params;
    const taskData = req.body;

    // Fetch the current task from the database
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Determine the new status
    let newStatus = task.status; // Default to the existing status

    if (taskData.status === "completed") {
      // If the user explicitly marks the task as completed
      newStatus = "completed";
    } else if (!taskData.status) {
      // Dynamically calculate status based on the date only if no status is provided
      const currentDate = new Date();
      if (currentDate < new Date(task.startDate)) {
        newStatus = "notStarted";
      } else if (currentDate >= new Date(task.startDate) && currentDate <= new Date(task.endDate)) {
        newStatus = "inProgress";
      }
    } else {
      // Use the provided status if it's not "completed"
      newStatus = taskData.status;
    }

    // Update the task data with the new status and other fields from the request body
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { ...taskData, status: newStatus }, // Merge the request body with the updated status
      { new: true } // Return the updated document
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


router.put("/updateAllTasksStatus", async (req, res) => {
  try {
    // Fetch all tasks from the database
    const tasks = await Task.find({});

    // Get the current date
    const currentDate = new Date();

    // Loop through all tasks and update their statuses
    for (const task of tasks) {
      let newStatus = task.status;

      // Determine the new status based on the current date and task dates
      if (currentDate < new Date(task.startDate)) {
        newStatus = "notStarted";
      } else if (
        currentDate >= new Date(task.startDate) &&
        currentDate <= new Date(task.endDate)
      ) {
        newStatus = "inProgress";
      } else if (currentDate > new Date(task.endDate)) {
        newStatus = "completed";
      }

      // Update the task status in the database
      await Task.findByIdAndUpdate(
        task._id,
        { status: newStatus }, // Update only the status
        { new: true } // Return the updated document
      );
    }

    // Send a success response
    res.status(200).json({ message: "All tasks statuses updated successfully" });
  } catch (error) {
    console.error("Error updating tasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});






// Create and add a new task to an activity
router.post('/addtask', async (req, res) => {
  const { activityId, taskName, startDate, endDate, userId, xpPoints, typeId } = req.body;

  console.log("Request Body:", req.body); // Log the incoming request body

  try {
    // Validate if userId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log("Invalid userId format:", userId); // Log invalid userId
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    console.log("Valid userId format:", userId); // Log valid userId

    // Check if userId exists in the database
    console.log("Checking if userId exists in the database..."); // Log before query
    const user = await User.findById(userId).exec(); // Use .exec() to ensure the query is executed
    if (!user) {
      console.log("User not found for userId:", userId); // Log missing user
      return res.status(404).json({ message: 'User not found' });
    }

    console.log("User found:", user); // Log the found user

    // Validate if activityId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(activityId)) {
      console.log("Invalid activityId format:", activityId); // Log invalid activityId
      return res.status(400).json({ message: 'Invalid activityId format' });
    }

    console.log("Valid activityId format:", activityId); // Log valid activityId

    // Check if activityId exists in the database
    console.log("Checking if activityId exists in the database..."); // Log before query
    const activity = await Activity.findById(activityId).exec(); // Use .exec() to ensure the query is executed
    if (!activity) {
      console.log("Activity not found for activityId:", activityId); // Log missing activity
      return res.status(404).json({ message: 'Activity not found' });
    }

    console.log("Activity found:", activity); // Log the found activity

    // Check if startDate is earlier than endDate
    if (new Date(startDate) >= new Date(endDate)) {
      console.log("Invalid date range - startDate must be earlier than endDate"); // Log invalid date range
      return res.status(400).json({ message: 'Start date must be earlier than end date' });
    }

    console.log("Valid date range - startDate is earlier than endDate"); // Log valid date range

    // Find the task type
    console.log("Finding task type..."); // Log before query
    const taskType = await TaskType.findById(typeId).exec(); // Use .exec() to ensure the query is executed
    if (!taskType) {
      console.log("Invalid TaskType ID:", typeId); // Log invalid TaskType ID
      return res.status(400).json({ message: 'Invalid TaskType ID' });
    }

    console.log("TaskType found:", taskType); // Log the found TaskType

    // Create the task with associated KPIs
    const kpis = taskType.kpis.map(kpi => ({
      kpiId: kpi._id,
      count: 0,
    }));

    const status = calculateTaskStatus(new Date(startDate), new Date(endDate));

    const task = new Task({
      taskName,
      startDate,
      endDate,
      status,
      xpPoints,
      userId: user._id, // Use the user's _id
      activityId: activity._id,
      typeId,
      kpis,
    });

    // Save the task and update the activity
    console.log("Saving task..."); // Log before saving
    const savedTask = await task.save();
    activity.tasks.push(savedTask._id);
    await activity.save();

    console.log("Task created successfully:", savedTask); // Log successful task creation
    return res.status(201).json({
      message: 'Task created successfully',
      task: savedTask,
    });
  } catch (error) {
    console.error("Error in /addtask route:", error); // Log the full error
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Update a specific task
router.put('/:taskId', async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  try {
    // Calculate new status if dates are updated
    if (updates.startDate || updates.endDate) {
      const status = calculateTaskStatus(
        new Date(updates.startDate || updates.startDate),
        new Date(updates.endDate || updates.endDate)
      );
      updates.status = status;
    }

    const task = await Task.findByIdAndUpdate(taskId, updates, { new: true });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Task updated successfully', task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});





// Get all task types
router.get('/tasktypes', async (req, res) => {
  try {
    const taskTypes = await TaskType.find(); // Fetch all task types from the database
    if (!taskTypes || taskTypes.length === 0) {
      return res.status(404).json({ message: 'No task types found' });
    }

    return res.status(200).json({ taskTypes });
  } catch (error) {
    console.error("Error in /tasktypes route:", error); // Log the full error
    return res.status(500).json({ message: 'Server error', error });
  }
});




// Add resources to a task
router.put('/:taskId/resources', async (req, res) => {
  const { taskId } = req.params;
  const { resources } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $push: { resources: { $each: resources } } },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Resources added successfully', task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Add deliverables to a task
router.put('/:taskId/deliverables', async (req, res) => {
  const { taskId } = req.params;
  const { deliverables } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $push: { deliverables: { $each: deliverables } } },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Deliverables added successfully', task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

//delete deliverables 




/////////////////////////////////////
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

////////////////////////







//add reports to a task
router.put("/:taskId/reports", async (req, res) => {
  try {
    const { taskId } = req.params;
    const { reports } = req.body;

    // Validate input
    if (!Array.isArray(reports) || reports.length === 0) {
      return res.status(400).json({ error: "Reports must be a non-empty array" });
    }

    // Check if the task exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    // Append new reports to the existing reports array
    task.reports.push(...reports);

    // Save the updated task
    await task.save();

    res.status(200).json({ message: "Reports added successfully", task });
  } catch (error) {
    console.error("Error updating task reports:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});





// Get all tasks for a specific activity
router.get('/loadTasksByActivityId/:activityId', async (req, res) => {
  const { activityId } = req.params;

  try {
    const activity = await Activity.findById(activityId).populate('tasks');
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    return res.status(200).json({ tasks: activity.tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});




// Route to load all tasks
router.get("/loadTasks", async (req, res) => {
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



// Route to load tasks by user ID
router.post("/tasksByUser", async (req, res) => {
  try {
    const { userId } = req.body; // Retrieve userId from request body

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const tasks = await Task.find({ userId: userId });

    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ error: "No tasks found for this user" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    console.error("Error loading tasks by user ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// Get a specific task by its ID
router.get('/taskbyid/:taskId', async (req, res) => {
  const { taskId } = req.params;

  // Validate taskId
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }

  try {
    // Find the task by ID and populate references
    const task = await Task.findById(taskId)
      .populate('kpis.kpiId',); // Populate KPI fields selectively

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Respond with the task
    return res.status(200).json({ task });
  } catch (error) {
    console.error("Error in /taskbyid/:taskId route:", error);
    return res.status(500).json({ message: 'Server error', error });
  }
});



// Delete a task from an activity
router.delete('/deleteTask/:taskId', async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findByIdAndDelete(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const activity = await Activity.findById(task.activityId);
    if (activity) {
      activity.tasks.pull(taskId);
      await activity.save();
    }

    return res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Add comments to a task
router.put('/:taskId/comments', async (req, res) => {
  const { taskId } = req.params;
  const { comments } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      taskId,
      { $push: { comments: { $each: comments } } },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    return res.status(200).json({ message: 'Comments added successfully', task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error', error });
  }
});


/************************************* reset kpi values  */
// Backend route to reset KPI count
// Route to reset KPI count in the task and subtract the erased value from the global KPI count
router.put('/:taskId/kpis/reset', async (req, res) => {
  const { taskId } = req.params;
  const { kpiId } = req.body;

  try {
    // Find the task by ID
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Find the KPI in the task's KPIs array
    const kpiIndex = task.kpis.findIndex((kpi) => kpi.kpiId.toString() === kpiId);

    if (kpiIndex === -1) {
      return res.status(404).json({ message: 'KPI not found in task' });
    }

    // Get the current count of the KPI in the task
    const erasedCount = task.kpis[kpiIndex].count;

    // Reset the KPI count in the task to 0
    task.kpis[kpiIndex].count = 0;

    // Save the updated task
    await task.save();

    // Subtract the erased count from the global KPI count
    const globalKpi = await Kpi.findById(kpiId);

    if (!globalKpi) {
      return res.status(404).json({ message: 'Global KPI not found' });
    }

    // Subtract the erased count from the global KPI count
    globalKpi.count -= erasedCount;

    // Ensure the global KPI count does not go below 0
    if (globalKpi.count < 0) {
      globalKpi.count = 0;
    }

    // Save the updated global KPI
    await globalKpi.save();

    res.status(200).json({ message: 'KPI count reset successfully', task });
  } catch (error) {
    console.error('Error resetting KPI count:', error);
    res.status(500).json({ message: 'Internal server error' });
  }


});


//adding KPis 

router.put('/:taskId/kpis', async (req, res) => {
  const { taskId } = req.params;
  const { kpis } = req.body; // Array of KPI objects: [{ kpiId: '...', count: 5 }, ...]

  try {
    // Find the task to ensure it exists
    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Validate the KPIs
    if (!Array.isArray(kpis)) {
      return res.status(400).json({ message: 'KPIs must be provided as an array' });
    }

    // Update or add new KPIs to the task
for (const kpiUpdate of kpis) {
  const { kpiId, count } = kpiUpdate;


  if (!mongoose.Types.ObjectId.isValid(kpiId) || typeof count !== 'number') {
    return res.status(400).json({ message: `Invalid or non-existent KPI ID: ${kpiId}` });
  }
  // Validate KPI ID and check if it exists in the task's KPI list
  const kpiIndex = task.kpis.findIndex(kpi => kpi.kpiId.toString() === kpiId);
  let previousCount = 0;
  if (kpiIndex !== -1) {
    previousCount = task.kpis[kpiIndex].count; // Get previous count
    task.kpis[kpiIndex].count = count; // Replace old value with new one
  } else {
    task.kpis.push({ kpiId, count });
  }

  // Update the global KPI count
  await Kpi.findByIdAndUpdate(
    kpiId,
    { $inc: { count: count - previousCount } }, // Adjust by removing old value and adding new one
    { new: true }
  );
}

const updatedTask = await task.save();
const populatedTask = await Task.findById(updatedTask._id).populate('kpis.kpiId');

return res.status(200).json({
  message: 'KPIs updated successfully',
  task: populatedTask,

});
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
});








/*************************** */
module.exports = router;
