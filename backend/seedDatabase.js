const mongoose = require('mongoose');
const KPICategory = require('./database/models/KpiCategory');
const KPI = require('./database/models/KpiSchema');
const TaskType = require('./database/models/TaskType');

async function seedDatabase() {
  await mongoose.connect('mongodb://localhost:27017/mongo');

  // Categories
  const categories = [
    { name: 'Mobilisation et engagement des participantes' },
    { name: 'Avancement des projets' },
    { name: 'Participation et satisfaction' },
    { name: 'Évaluation des compétences' },
    { name: 'Profil des participantes' },
    { name: 'Partenariats et écosystème' },
    { name: 'Logistique et organisation' },
    { name: 'Les médias' },
  ];

  const createdCategories = await KPICategory.insertMany(categories);

  // KPIs
  const kpis = [
    { label: 'Nombre de femmes entrepreneures mobilisées', category: createdCategories[0]._id },
    { label: 'Nombre de confirmations reçues', category: createdCategories[0]._id },
    { label: 'Nombre de participantes présentes', category: createdCategories[0]._id },
    { label: 'Pourcentage de participantes retenues par rapport aux candidatures', category: createdCategories[0]._id },
    { label: 'Taux des participantes qui arrêtent la formation avant la fin', category: createdCategories[0]._id },
    { label: 'Nombre d\'idées de projets', category: createdCategories[1]._id },
    { label: 'Nombre de projets en phase de démarrage', category: createdCategories[1]._id },
    { label: 'Nombre de projets en phase de développement', category: createdCategories[1]._id },
    { label: 'Nombre de participantes ayant affiné ou clarifié leurs idées/projets grâce à la formation', category: createdCategories[1]._id },
    { label: 'Nombre de participantes qui contribuent aux discussions ou réalisent les tâches demandées', category: createdCategories[2]._id },
    { label: 'Taux d\’interactions dans les activités', category: createdCategories[2]._id },
    { label: 'Taux de satisfaction des participants', category: createdCategories[2]._id },
    { label: 'Moyenne des scores de satisfaction à la fin de la formation', category: createdCategories[2]._id },
    { label: 'Taux de satisfaction sur les aspects logistiques', category: createdCategories[2]._id },
    { label: 'Taux de Pré-test rempli', category: createdCategories[3]._id },
    { label: 'Taux de post-test rempli', category: createdCategories[3]._id },
    { label: 'Nombre de femmes', category: createdCategories[4]._id },
    { label: 'Nombre d\'hommes', category: createdCategories[4]._id },
    { label: 'Moyenne d\'âge des participants', category: createdCategories[4]._id },
    { label: 'Nombre d\'invités de l\'écosystème', category: createdCategories[5]._id },
    { label: 'Nombre de structures présentes', category: createdCategories[5]._id },
    { label: 'Taux de présence écosystème', category: createdCategories[5]._id },
    { label: 'Nombre de représentants d\'ONG présents', category: createdCategories[5]._id },
    { label: 'Nombre de représentants du secteur étatique présents', category: createdCategories[5]._id },
    { label: 'Nombre de représentants du secteur privé présents', category: createdCategories[5]._id },
    { label: 'Nombre de devis demandés', category: createdCategories[6]._id },
    { label: 'Nombre de devis reçus', category: createdCategories[6]._id },
    { label: 'Nombre de médias invités', category: createdCategories[7]._id },
    { label: 'Nombre de médias présents', category: createdCategories[7]._id },
    { label: 'Nombre d\'articles publiés / reportages réalisés après l\'événement', category: createdCategories[7]._id },
    { label: 'Portée des publications médiatiques (audience estimée)', category: createdCategories[7]._id },
  ];

  const createdKPIs = await KPI.insertMany(kpis);

  // Task Types
  const taskTypesData = [
    {
      name: 'Entrepreneur Engagement',
      description: 'Tasks focused on engaging and mobilizing participants, ensuring high attendance and retention.',
      kpis: [
        createdKPIs.find(kpi => kpi.label === 'Nombre de femmes entrepreneures mobilisées')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de confirmations reçues')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de participantes présentes')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de participantes qui contribuent aux discussions ou réalisent les tâches demandées')._id,
        createdKPIs.find(kpi => kpi.label === 'Taux d\’interactions dans les activités')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de devis demandés')._id,
      ],
    },
    {
      name: 'Project Development',
      description: 'Tasks related to the progress and development of entrepreneurial projects.',
      kpis: [
        createdKPIs.find(kpi => kpi.label === 'Nombre d\'idées de projets')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de projets en phase de démarrage')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de projets en phase de développement')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de femmes')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre d\'hommes')._id,
        createdKPIs.find(kpi => kpi.label === 'Taux de satisfaction des participants')._id,
      ],
    },
    {
      name: 'Skill Assessment',
      description: 'Tasks that evaluate the participants\' skills through tests and assessments.',
      kpis: [
        createdKPIs.find(kpi => kpi.label === 'Taux de Pré-test rempli')._id,
        createdKPIs.find(kpi => kpi.label === 'Taux de post-test rempli')._id,
        createdKPIs.find(kpi => kpi.label === 'Moyenne des scores de satisfaction à la fin de la formation')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de participantes ayant affiné ou clarifié leurs idées/projets grâce à la formation')._id,
      ],
    },
    {
      name: 'Media & Ecosystem Engagement',
      description: 'Tasks related to engaging media and ecosystem partners to enhance visibility and support.',
      kpis: [
        createdKPIs.find(kpi => kpi.label === 'Nombre de médias invités')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de médias présents')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre d\'articles publiés / reportages réalisés après l\'événement')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre d\'invités de l\'écosystème')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de structures présentes')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de représentants du secteur privé présents')._id,
      ],
    },
    {
      name: 'Project Impact Measurement',
      description: 'Tasks focused on measuring the impact of the training program on the participants and their projects.',
      kpis: [
        createdKPIs.find(kpi => kpi.label === 'Nombre de projets en phase de développement')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de participantes ayant affiné ou clarifié leurs idées/projets grâce à la formation')._id,
        createdKPIs.find(kpi => kpi.label === 'Taux des participantes qui arrêtent la formation avant la fin')._id,
        createdKPIs.find(kpi => kpi.label === 'Taux de satisfaction sur les aspects logistiques')._id,
      ],
    },
    {
      name: 'Ecosystem & Logistics Coordination',
      description: 'Tasks focused on coordinating ecosystem partners and managing logistical aspects of the program.',
      kpis: [
        createdKPIs.find(kpi => kpi.label === 'Nombre de représentants d\'ONG présents')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de représentants du secteur étatique présents')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de devis reçus')._id,
        createdKPIs.find(kpi => kpi.label === 'Nombre de devis demandés')._id,
        createdKPIs.find(kpi => kpi.label === 'Portée des publications médiatiques (audience estimée)')._id,
      ],
    },
  ];

  await TaskType.insertMany(taskTypesData);

  console.log('Database seeded successfully');
  mongoose.connection.close();
}

seedDatabase();
