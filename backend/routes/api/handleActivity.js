const express = require('express')
const router = express.Router()
const Program = require('../../database/models/ProgramSchema')
const Activity = require('../../database/models/ActivitySchema')

// Middleware to parse request body
router.use(express.json())

// Route to add an activity
router.post('/addActivity', async (req, res) => {
  try {
    // Validate incoming data
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Invalid activity data' })
    }

    const { programId, ...activityData } = req.body

    // Find the program by its ID
    const program = await Program.findById(programId)
    if (!program) {
      return res.status(404).json({ error: 'Program not found' })
    }

    // Create a new activity instance and link it to the program
    const newActivity = new Activity({ ...activityData, programId: program._id })

    // Save activity to the database
    await newActivity.save()

    // Add the new activity to the program's activities array
    program.activities.push(newActivity._id)
    await program.save()

    // Respond with data
    res.status(200).json(newActivity)
  } catch (error) {
    // Handle errors
    console.error('Failed to create Activity:', error)
    res.status(500).json({ error: 'Failed to create Activity' })
  }
})

// Route to delete an activity
router.delete('/deleteActivity/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params

    // Find the activity by its ID and remove it
    const activity = await Activity.findByIdAndDelete(activityId)
    if (!activity) {
      // If activity is not found, return 404 Not Found
      return res.status(404).json({ error: 'Activity not found' })
    }

    // Find the program associated with the activity
    const program = await Program.findOne({ activities: activityId })
    if (!program) {
      // If program is not found, return 404 Not Found
      return res.status(404).json({ error: 'Program not found' })
    }

    // Remove the activity ID from the activities array of the associated program
    program.activities.pull(activityId)
    await program.save()

    // Return success response
    res.status(200).json({ message: 'Activity deleted successfully' })
  } catch (error) {
    console.error('Error deleting activity:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to update an activity
router.put('/updateActivity/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params
    const activityData = req.body

    // Find the activity by its ID and update it
    const activity = await Activity.findByIdAndUpdate(activityId, activityData, { new: true })
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }

    // Return success response
    res.status(200).json({ message: 'Activity updated successfully', activity })
  } catch (error) {
    console.error('Error updating activity:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

// Route to load an activity by ID
router.post('/loadActivity/:activityId', async (req, res) => {
  try {
    const { activityId } = req.params
    // Find the Activity by its ID
    const activity = await Activity.findById(activityId)

    // Check if activity is found
    if (!activity) {
      return res.status(404).json({ error: 'Activity not found' })
    }

    // Respond with the found Activity
    res.status(200).json(activity)
  } catch (error) {
    console.error('Error loading Activity:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

//Route to load activities by program ID
router.post('/loadActivitiesByProgramId/:programId', async (req, res) => {
  try {
    const { programId } = req.params
    // Find Activities by program ID
    const activities = await Activity.find({ programId })

    // Check if activities are found
    if (!activities) {
      return res.status(404).json({ error: 'Activities not found' })
    }

    // Respond with the found Activities
    res.status(200).json(activities)
  } catch (error) {
    console.error('Error loading Activities:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
