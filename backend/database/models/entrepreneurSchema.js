const mongoose = require('mongoose');
const { Schema } = mongoose;

const entrepreneurSchema = new Schema({
    nom: { type : String, required : true},
    prenom: { type : String, required : true},
    genre: { type : String, required : true}, 
    mobile: { type : String, required : true}, 
    email: { type : String, required : true}, 
    trancheAge: { type : String, required : true}, 
    diplome: { type : String, required : true}, 
    gouvernorat: { type : String, required : true}, 
    delegation: { type : String, required : true}, 
    star: { type : String}, 
    blacklisted: { type : Boolean}, 
    
    
    //-------------------------------------------
    startupType: { type : String},  // Startup type
    Label: { type : String},  //Label startup
    votreRole: { type : String}, // Your Role
    projName: { type : String}, // Project Name
    phaseDeProjet: { type : String}, // Project Phase
    entCapital: { type : String}, // Capitale d'entreprise
    entDate: { type : Date }, //Date de creation entreprise
    formeJuridique: { type : String}, // Legal Form
    descriptionActivite: { type : String}, // Activity Description
    secteurActivite: { type : String}, // Activity Sector
    empTot: { type : String}, // Number of Employees
    nbF: { type : String}, // Number of female employees
    projGouv: { type : String}, // Project governaurate
    projDel: { type : String}, // Project delegation
    prodMarch: { type : String},
    chiffreAf: { type : String},
    marche:{ type : [String]}, // Market (Array of Strings)
    
   
    //---------------------------------
    typeFinance: { type : [String]},
    montantFinance: { type : String},
    sourceFinance: { type : String},
    progAcc: { type : String},
    progAccNom: { type : String}, 
    typeAcc:{ type : [String]},
    besoinAppui: { type : String}, 
    socialMedia: { type : String},
    siteWeb: { type : String},


   //---------------------------------------
    typeFinanceRed:{ type : [String]},
    montantFinanceRed: { type : String},
    progAccRed: { type : String},
    redProg:{ type : [String]},
    typeAccRed:{ type : [String]},

    //----------------------------------------
    DateCre:{ type: Date, default: Date.now },
    CreePar:{ type : String}

});

const Entrepreneur = mongoose.model('Entrepreneur', entrepreneurSchema);

module.exports = Entrepreneur;
