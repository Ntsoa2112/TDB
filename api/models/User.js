/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcryptjs'); //include bcryptjs

///Modele user, ilaina am authentification s inscription
module.exports = {
  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'r_personnel', // nom du table qui est associé avec le modele Test
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,

  attributes: { //attribut user
    id: { //id du personnel
      type: 'integer',
      required: true,
      unique: true,
      primaryKey: true,
      columnName:'id_pers'
    },
    email: { //email
      type: 'string',
      required: true,
      unique: true,
      columnName:'matricule'
    },
    password: { //mot de passe
      type: 'string',
      required: true,
      columnName:'mdp'
    },
    nom: { //nom du personnel
      type: 'string',
      required: true,
      columnName:'nom'
    },
    prenom: { //prenom du personnel
      type: 'string',
      required: true,
      columnName:'prenom'
    },
    appelation: { //prenom du personnel
      type: 'string',
      required: true,
      columnName:'appelation'
    },
    adresse: { //prenom du personnel
      type: 'string',
      required: true,
      columnName:'adresse'
    },
    ldap_name: { //prenom du personnel
      type: 'string',
      required: true,
      columnName:'ldap_name'
    },
    id_droit: { //prenom du personnel
      type: 'integer',
      required: true,
      columnName:'id_droit'
    },
    id_departement: { //prenom du personnel
      type: 'integer',
      required: true,
      columnName:'id_departement'
    },
    toJSON: function() { // User avadika Json
      var obj = this.toObject(); //avadika o object lou le User
      //delete obj.password;// fafana n password-any fa ts tokony aseho refa any am affichage
      return obj; // retour obj
    }
  },
  // get liste des personnel par Specialité
  getCongeParDateId: function(option, callback){

    var sql = "SELECT " +
      " p_affectation.id_pers" +
      " FROM p_affectation" +
      " JOIN p_dossier ON p_affectation.id_dossier = p_dossier.id_dossier" +
      " JOIN r_personnel ON r_personnel.id_pers=p_affectation.id_pers" +
      " JOIN tb_lien_sp_dossier ON p_dossier.id_dossier=tb_lien_sp_dossier.id_dossier" +
      " JOIN tb_specialite ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec" +
      " WHERE  tb_specialite.id_spec = "+option.idSpec+" AND (r_personnel.id_droit=1)" +
      " GROUP BY p_affectation.id_pers" +
      " ORDER BY p_affectation.id_pers ASC";

    User.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  //Getting actif r_personnel
  getActifRpers: function(option, callback){

    var sql = "SELECT " +
      " id_pers,appelation " +
      " FROM r_personnel" +
      " WHERE  actif = true " +
      " ORDER BY id_pers ASC";

    User.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getRpersById: function(option, callback){

    var sql = "SELECT " +
      " appelation,r_departement.libelle " +
      " FROM r_personnel JOIN r_departement ON id = id_departement " +
      " WHERE  actif = true AND id_pers = " + option.id_pers ;

    User.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0]);
    });
  },
 /* attributes: { //attribut user
    email: { //email
      type: 'email',
      required: true,
      unique: true
    },
    password: { //mot de passe
      type: 'string',
      minLength: 6,
      required: true
    },
    toJSON: function() { // User avadika Json
      var obj = this.toObject(); //avadika o object lou le User
      delete obj.password;// fafana n password-any fa ts tokony aseho refa any am affichage
      return obj; // retour obj
    }
  },*/

  ///avant de creer User
  /*
  beforeCreate: function(user, cb) {
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function(err, hash) { // hacher-na le mot de passe
        if (err) {
          console.log(err); // afficher erreur s'il y en a
          cb(err);
        } else { //sinon
          user.password = hash; //soloina an le mot de passe voa-hacher le password an le user
          cb();
        }
      });
    });
  }*/


};


