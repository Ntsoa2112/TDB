/**
 * SuiviEcoute.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'almerys_user_new',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {

  },

  //
  getSuiviEcoute: function(option, callback){
    console.log(option.optionDate+ "  ======> ****************** "+option.optionCq);

    var sqlDate = "";
    var sqlCq = "";


    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      sqlDate = " and deb_ecoute::timestamp::date = '"+ option.optionDate + "' " ;
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      sqlDate = " and deb_ecoute::timestamp::date = '"+ option.optionDate + "' " ;
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      sqlDate = " and (deb_ecoute)::timestamp::date BETWEEN ('" + option.optionDate + " ')::timestamp and('" + option.optionDate2 + " ')::timestamp ";
    }

    if(option.optionCq != ""){
      sqlCq = " and id_pers_ecoute = '"+ option.optionCq + "' ";
    }

    var sqlFiltre = sqlDate + sqlCq;
    var sql = "select count(id_ecoute), ms_ecoute.deb_ecoute::timestamp::date, ms_ecoute.id_pers_ecoute, "+
              " sum(get_difference_timestamp(ms_ecoute.fin_ecoute::timestamp, ms_ecoute.deb_ecoute::timestamp)) as somme_date_ecoute, "+
              " sum(ms_ecoute.duree_appel::decimal) as somme_duree_appel, "+
              " (sum(get_difference_timestamp(ms_ecoute.fin_ecoute::timestamp, ms_ecoute.deb_ecoute::timestamp)) / count(id_ecoute)) as moyenne_temps_ecoute, "+
              " ms_ecoute.commentaire_suivi_ecoute, r_personnel.appelation from ms_ecoute "+
              " join r_personnel on ms_ecoute.id_pers_ecoute = r_personnel.id_pers "+ 
              " where ms_ecoute.id_pers_ecoute in (1007,974,745, 748, 766 ) "+sqlFiltre+" group by "+ 
              " ms_ecoute.deb_ecoute::timestamp::date, ms_ecoute.id_pers_ecoute, ms_ecoute.commentaire_suivi_ecoute , "+
              " r_personnel.appelation order by ms_ecoute.id_pers_ecoute desc";

    Ecoute.query(sql, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      console.log(sql);
      return callback(null, res.rows);
      }
    });
  },

   //
  getSuiviEcouteSemaine: function(option, callback){
    console.log("  ======> ****************** "+option.optionCq); //
    //var sql = "select count(id_ecoute), ms_ecoute.deb_ecoute::timestamp::date, ms_ecoute.id_pers_ecoute from ms_ecoute where id_pers_ecoute = '"+ option.optionCq + "' and ms_ecoute.numero_semaine = (select extract('week' from current_date)) group by ms_ecoute.deb_ecoute::timestamp::date, ms_ecoute.id_pers_ecoute, ms_ecoute.commentaire_suivi_ecoute order by ms_ecoute.deb_ecoute::timestamp::date asc";

    var sqlDate = "";

    if(option.optionDate != "" && option.optionDate != null && option.optionDate2 == ""){
      sqlDate = " and deb_ecoute::timestamp::date = '"+ option.optionDate + "' " ;
    }
    if(option.optionDate2 != "" && option.optionDate2 != null  && option.optionDate == ""){
      sqlDate = " and deb_ecoute::timestamp::date = '"+ option.optionDate + "' " ;
    }
    if(option.optionDate != "" && option.optionDate2 != ""){
      sqlDate = " and (deb_ecoute)::timestamp::date BETWEEN ('" + option.optionDate + " ')::timestamp and('" + option.optionDate2 + " ')::timestamp ";
    }

    var sql = "select count(id_ecoute), ms_ecoute.deb_ecoute::timestamp::date, ms_ecoute.id_pers_ecoute from ms_ecoute where id_pers_ecoute = '"+ option.optionCq + "'  "+sqlDate+" group by ms_ecoute.deb_ecoute::timestamp::date, ms_ecoute.id_pers_ecoute, ms_ecoute.commentaire_suivi_ecoute order by ms_ecoute.deb_ecoute::timestamp::date asc";
    
    console.log("*********************************"+sql);

    Ecoute.query(sql, function(err, res){
      if(err) {
        sails.log(err);
        return callback(err);
      }else{
      console.log(sql);
      return callback(null, res.rows);
      }
    });
  },
};

