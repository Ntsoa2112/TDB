/**
 * AlmerysUserNew.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'almerys_user_new',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id: {
      type: 'integer',
      unique: true,
      primaryKey: true,
      columnName:'id'
    },

    sat: {
      type: 'string',
      required: true,
      columnName:'sat'
    },

    matricule: {
      type: 'integer',
      required: true,
      columnName:'matricule'
    },

    id_vague: {
      type: 'integer',
      required: true,
      columnName:'id_vague'
    },

    pseudo: {
      type: 'string',
      required: true,
      columnName:'pseudo'
    },

    id_niveau: {
      type: 'integer',
      required: true,
      columnName:'id_niveau'
    },

    num_tel: {
      type: 'string',
      required: true,
      columnName:'num_tel'
    },
  },
  /*
   * Fonction pour recuperer la liste des TC avec les details
   * */
  getListeTC: function(option,callback){
    var sql = 'select r_personnel.matricule, r_personnel.nom, r_personnel.prenom, r_personnel.appelation, almerys_user_new.pseudo from r_personnel join almerys_user_new on r_personnel.id_pers = almerys_user_new.matricule where almerys_user_new.num_tel IS NOT null AND is_doctocare is NULL AND almerys_user_new.suppr is NULL AND is_briant is NULL ORDER BY almerys_user_new.pseudo';
    console.log(option.is_doctocare + "==================" + option.is_briant);

    if(option.is_doctocare){
      sql = 'select r_personnel.matricule, r_personnel.nom, r_personnel.prenom, r_personnel.appelation, almerys_user_new.pseudo from r_personnel join almerys_user_new on r_personnel.id_pers = almerys_user_new.matricule where almerys_user_new.num_tel IS NOT null AND is_doctocare = TRUE AND almerys_user_new.suppr is NULL ORDER BY almerys_user_new.pseudo';
    }
    if(option.is_briant){
      sql = 'select r_personnel.matricule, r_personnel.nom, r_personnel.prenom, r_personnel.appelation, almerys_user_new.pseudo from r_personnel join almerys_user_new on r_personnel.id_pers = almerys_user_new.matricule where almerys_user_new.num_tel IS NOT null AND is_briant = TRUE AND almerys_user_new.suppr is NULL ORDER BY almerys_user_new.pseudo';
    }
    if(option.is_tpmep){
      sql = 'select r_personnel.matricule, r_personnel.nom, r_personnel.prenom, r_personnel.appelation, almerys_user_new.pseudo from r_personnel join almerys_user_new on r_personnel.id_pers = almerys_user_new.matricule where almerys_user_new.num_tel IS NOT null AND is_tpmep = TRUE AND almerys_user_new.suppr is NULL ORDER BY almerys_user_new.pseudo';
    }
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeCRC: function(options,callback){
    var sql = "";
    if(options.id_type_call !== '' && options.id_type_call !== null  && typeof options.id_type_call !== 'undefined'){
      sql = 'select almerys_user_new_crc.*, ms_equipe_crc.* '+
      'from almerys_user_new_crc join ms_equipe_crc on almerys_user_new_crc.id_equipe_crc = ms_equipe_crc.id_equipe_crc '+
      'where almerys_user_new_crc.id_type_call ='+ options.id_type_call + ' ' +
      'ORDER BY nom,prenom ASC ';
    }
    if(options.is_css == "1"){
      sql = 'select almerys_user_new_crc.*, ms_equipe_crc.* '+
      'from almerys_user_new_crc join ms_equipe_crc on almerys_user_new_crc.id_equipe_crc = ms_equipe_crc.id_equipe_crc '+
      'where almerys_user_new_crc.is_css = true ' +
      'ORDER BY nom,prenom ASC ';
    }
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeEtatCQ: function(options,callback){
    var sql = 'select * from ms_etat_cq '+
      'where type ='+ options.id_type +' ' +
      'ORDER BY id ASC ';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeNumeroEnregistrement: function(option,callback){
    var sql = 'select id_ecoute, numero_enregistrement from ms_ecoute order by numero_enregistrement';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

   getListeChefEquipe: function(option,callback){
    var sql = 'select almerys_user_new.id_ce, r_personnel.nom, r_personnel.prenom, r_personnel.appelation from almerys_user_new join r_personnel on almerys_user_new.id_ce = r_personnel.id_pers where almerys_user_new.id_ce NOT IN (1019) group by almerys_user_new.id_ce, r_personnel.nom, r_personnel.prenom, r_personnel.appelation;';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeSq: function(option,callback){
    var sql = 'select ms_sq.matricule, r_personnel.appelation from ms_sq join r_personnel on ms_sq.matricule = r_personnel.id_pers;';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeSqAs: function(option,callback){
    var sql = 'select ms_sq.matricule, r_personnel.appelation from ms_sq join r_personnel on ms_sq.matricule = r_personnel.id_pers WHERE islistas;';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeCALL: function(option,callback){
    var sql = 'select * from ms_type_call order by id asc';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeTypeEtatCQ: function(option,callback){
    var sql = 'select * from ms_type_etat_cq order by id asc';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },

  getListeMutuelle: function(option,callback){
    var sql = 'select * from ms_mutuelle order by id asc';
    AlmerysUserNew.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);//
    });
  },
};
