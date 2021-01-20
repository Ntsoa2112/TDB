/**
 * GestionHS.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',
  tableName: 'r_heure_sup',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {

  },
  /*
  *Get HS by id_pers et date
  * */
  getHSByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "SELECT * " +
      " FROM r_heure_sup where date='"+option.date+"' and id_pers = "+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHS.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getHSPJByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
 /*   var sql = "SELECT * " +
      " FROM r_pointage_jour " +
      " LEFt JOIN  r_heure_sup on (to_date(pdate,'YYYY/MM/DD')=to_date(date,'DD/MM/YYYY') and id_pers = id_util) " +
      "where to_date(pdate,'YYYY/MM/DD')=to_date('"+option.date+"','DD/MM/YYYY') and id_util = "+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '
*/
    var sql = "SELECT * " +
      " FROM r_heure_sup " +
      " LEFt JOIN  r_pointage_jour on (to_date(pdate,'YYYY/MM/DD')=to_date(date,'DD/MM/YYYY') and id_pers = id_util) " +
      "where to_date(pdate,'YYYY/MM/DD')=to_date('"+option.date+"','DD/MM/YYYY') and id_util = "+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHS.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  updateHSByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "UPDATE  " +
      "  r_heure_sup SET is_valide="+option.is_valide+", heure_sup='"+option.value+"' ,heure_sup_40='"+option.value_40+"'" +
      " ,maj_nuit= '"+option.value_maj_nuit+"' " +
      "   ,heure_deduit= '"+option.value_heure_deduit+"' " +
      " ,heure_sup_100='"+option.value_100+"' where date='"+option.date+"' and id_pers ="+option.id_pers+" "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHS.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);
    });
  },

  insertHSByPersDate: function(option, callback){ // AND p_ldt.id_pers = "+option.idPers+"
    var sql = "INSERT INTO " +
      "  r_heure_sup (date,id_pers,heure_sup,is_valide,heure_sup_40,heure_sup_100,heure_deduit,maj_nuit) values ('"+option.date+"', "+option.id_pers+",'"+option.value+"',"+option.is_valide+",'"+option.value_40+"','"+option.value_100+"','"+option.value_heure_deduit+"','"+option.value_maj_nuit+"') "; // where r_personnel.id_pers = '" + option.matricule + " '

    //sails.log(sql);
    GestionHS.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);
    });
  },
};

