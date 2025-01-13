const express = require('express');
const router = express.Router();
const Entrepreneur = require('../../database/models/entrepreneurSchema');

// POST request to create a new entrepreneur
router.post('/createentrepreneurs', async (req, res) => {
  const {
    nom, // Last Name
    prenom, // First Name
    genre, // Gender
    mobile, // Mobile Number
    email, // Email
    trancheAge, // Date of Birth
    diplome, // Diploma/Formation
    gouvernorat, // Governorate
    delegation, // Delegation
    star, // Stars
    blacklisted, // Blacklisted
    
    
    //--------startup variables---------
    startupType,  // Startup type
    Label,  //Label startup
    votreRole, // Your Role
    projName, // Project Name
    phaseDeProjet, // Project Phase
    entCapital, // Capitale d'entreprise
    entDate, //Date de creation entreprise
    formeJuridique, // Legal Form
    descriptionActivite, // Activity Description
    secteurActivite, // Activity Sector
    empTot, // Number of Employees
    nbF, // Number of female employees
    projGouv, // Project governaurate
    projDel, // Project delegation
    prodMarch,
    chiffreAf,
    marche, // Market (Array of Strings)
    typeFinance,
    montantFinance,
    sourceFinance,
    progAcc,
    progAccNom, // Support Program
    typeAcc,
    besoinAppui, // Support Needs (Array of Strings)
    socialMedia,
    siteWeb,
    typeFinanceRed,
    montantFinanceRed,
    progAccRed,
    redProg,
    typeAccRed
  } = req.body;
  console.log('OVER HERE',req.body);

  // Check for required fields
  if (!nom || !prenom || !genre || !email || !diplome) {
    return res.status(400).json({ message: 'Please fill all required fields' });
  }

  try {
    // Check if email already exists
    const existingEntrepreneur = await Entrepreneur.findOne({ email });
    if (existingEntrepreneur) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Create a new entrepreneur
    const entrepreneur = new Entrepreneur({
      nom, // Last Name
      prenom, // First Name
      genre, // Gender
      mobile, // Mobile Number
      email, // Email
      trancheAge, // Date of Birth
      diplome, // Diploma/Formation
      gouvernorat, // Governorate
      delegation, // Delegation
      star, // Stars
      blacklisted, // Blacklisted
      
      
      //--------startup variables---------
      startupType,  // Startup type
      Label,  //Label startup
      votreRole, // Your Role
      projName, // Project Name
      phaseDeProjet, // Project Phase
      entCapital, // Capitale d'entreprise
      entDate, //Date de creation entreprise
      formeJuridique, // Legal Form
      descriptionActivite, // Activity Description
      secteurActivite, // Activity Sector
      empTot, // Number of Employees
      nbF, // Number of female employees
      projGouv, // Project governaurate
      projDel, // Project delegation
      prodMarch,
      chiffreAf,
      marche, // Market (Array of Strings)
      typeFinance,
      montantFinance,
      sourceFinance,
      progAcc,
      progAccNom, // Support Program
      typeAcc,
      besoinAppui, // Support Needs (Array of Strings)
      socialMedia,
      siteWeb,
      typeFinanceRed,
      montantFinanceRed,
      progAccRed,
      redProg,
      typeAccRed
    });

    // Save the entrepreneur to the database
    await entrepreneur.save();

    res.status(201).json({ message: 'Entrepreneur created successfully', entrepreneur });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
});

// Route to get all entrepreneurs
router.get('/loadAllEntrepreneurs', async (req, res) => {
  try {
    const entrepreneurs = await Entrepreneur.find();
    res.status(200).json(entrepreneurs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Route to get a single entrepreneur by ID
router.get('/entrepreneur/:id', async (req, res) => {
  try {
    const entrepreneur = await Entrepreneur.findById(req.params.id);
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }
    res.status(200).json(entrepreneur);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update an entrepreneur by ID
router.put('/updateEntrepreneur/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Find the existing entrepreneur by ID
    let entrepreneur = await Entrepreneur.findById(id);
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }

    // Update only the fields that were changed
    for (const key in req.body) {
      if (req.body[key] !== undefined && req.body[key] !== entrepreneur[key]) {
        entrepreneur[key] = req.body[key];
      }
    }

    // Save the updated entrepreneur
    entrepreneur = await entrepreneur.save();

    res.status(200).json(entrepreneur);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to get filtered entrepreneurs' emails by gender and region
router.get('/filterEntrepreneurs', async (req, res) => {
  const { gender, region } = req.query;

  try {
    let query = {};
    if (gender) query.gender = gender;
    if (region) query.region = region;

    const entrepreneurs = await Entrepreneur.find(query).select('email -_id');
    const emails = entrepreneurs.map(entrepreneur => entrepreneur.email);

    res.status(200).json(emails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// Route to delete an entrepreneur by ID
router.delete('/deleteEntrepreneur/:id', async (req, res) => {
  const { id } = req.params;
  console.log(`Received DELETE request for entrepreneur ID: ${id}`);
  try {
    const entrepreneur = await Entrepreneur.findByIdAndDelete(id);
    if (!entrepreneur) {
      return res.status(404).json({ message: 'Entrepreneur not found' });
    }
    res.status(200).json({ message: 'Entrepreneur deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }


});

module.exports = router;
