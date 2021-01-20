/**
 * Vague.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'ms_vague',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_vague: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id_vague'
    },

    libelle: {
      type: 'string',
      required: true,
      columnName:'libelle'
    },
  },
/*
  //Fonction find application by id
  findApplicationById: function(idApplication, next) {
    Application.findOne({id_application:idApplication}).exec(function (err, app) {
      if(err) next(err);
      next(null, app);
    });
  },

  //Fonction get liste application par utilisteur connecté
  getApplicationByUser: function(idUser, next) {
    var requeteApplicationUser = 'SELECT p_affectation.id_dossier,p_dossier.num_dossier,p_dossier.id_dossier,fr_application.* FROM p_affectation ' +
      'LEFT JOIN p_dossier ON p_affectation.id_dossier = p_dossier.id_dossier ' +
      'JOIN fr_application ON fr_application.id_dossier = p_dossier.id_dossier ' +
      'WHERE id_pers='+idUser+' AND id_etat = 0 AND fr_application.id_dossier = p_dossier.id_dossier AND fr_application.suppr = false ' +
      'ORDER BY fr_application.id_application desc'; // order by fr_application.date_ajout desc
    Application.query(requeteApplicationUser, function(err, listeApplication){
      if(err) next(err);
      next(null, listeApplication);
    });
  },

  //Fonction get liste application non testé par utilisteur connecté
  getApplicationNotTestedByUser: function(idUser, next) {
    Application.query('SELECT p_affectation.id_dossier,p_dossier.num_dossier,p_dossier.id_dossier,fr_application.* FROM p_affectation LEFT JOIN p_dossier ON p_affectation.id_dossier = p_dossier.id_dossier JOIN fr_application ON fr_application.id_dossier = p_dossier.id_dossier WHERE id_pers='+idUser+' AND id_etat = 0 AND fr_application.id_dossier = p_dossier.id_dossier AND fr_application.suppr = false ORDER BY  fr_application.id_application ASC', function(err, listeApplication){
      if(err) next(err);
      next(null, listeApplication);
    });
  },

  //Fonction get liste application testé par utilisteur connecté
  getApplicationTestedByUser: function(idUser, next) {
    Application.query('SELECT p_affectation.id_dossier,p_dossier.num_dossier,p_dossier.id_dossier,fr_application.* FROM p_affectation LEFT JOIN p_dossier ON p_affectation.id_dossier = p_dossier.id_dossier JOIN fr_application ON fr_application.id_dossier = p_dossier.id_dossier WHERE id_pers='+idUser+' AND id_etat = 0 AND fr_application.id_dossier = p_dossier.id_dossier AND fr_application.suppr = false ORDER BY  fr_application.id_application ASC', function(err, listeApplication){
      if(err) next(err);
      next(null, listeApplication);
    });
  },

  //Fonction find application PDF
  findApplicationForPDF: function(next) {
    Application.query('select fr_application.nom_application,fr_application.id_application, p_dossier.num_dossier from fr_application join p_dossier on fr_application.id_dossier = p_dossier.id_dossier where fr_application.suppr = false', function(err, application){
      if(err) next(err);
      next(null, application);
    });
  },
*/
};

