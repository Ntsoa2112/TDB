/**
 * R_pointage.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'ConnexionPostgresql',
  tableName: 'r_pointage',
  autoCreatedAt: false,
  autoUpdatedAt: false,
  autoPK: false,
  attributes: {
    id : {
      type : 'integer',
      unique: true,
      primaryKey: true,
      columnName : 'id_pointage'
    },

    date :{
      type : 'string',
      columnName : 'pdate'
    },

    matricule : {
      type : 'integer',
      columnName : 'id_util'
    },

    heure : {
      type : 'string',
      columnName : 'sortie'
    },

    source : {
      type : 'string',
      columnName : 'source'
    }
  },

  //nombre de pointage distinct par utilisateur
  presence: function(req, callback){
    //construction de la requete
    var requete = "select distinct(id_util) from r_pointage inner join r_personnel on r_pointage.id_util = r_personnel.id_pers"
    requete += " where pdate = '" + (new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10) + "'";
    if(req != undefined && req.idDepartement != undefined){
      requete += " and r_personnel.id_departement = " + req.idDepartement;
    }
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows.length);
    });
  },

  //retourne les retards du jours
  //execution du procedure stocké getRetard('2016/02/23')
  retard: function(option, callback){
    var requete = "select getretard('" + (new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10) + "')";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows.length);
    });
  },

  //retourne les departements
  departement: function(option, callback){
    var requete = "select * from r_departement";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  //nombre de personne dans le departement
  //parametre idDepatement
  departementById: function(option, callback){
    var requete = "select * from r_personnel where actif = true AND id_departement="+option;
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows.length);
    });
  },

  listPersonnel: function(option, callback){
    var requete = "select * from r_personnel where actif = true";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows.length);
    });
  },

listPersonnelRows: function(option, callback){
    var requete = "select id_pers from r_personnel where actif = true";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },


  updatePointageJour: function(option, callback){
    var dt = new Date();
    dt.setDate(dt.getDate() - 1);
    var requete = "select updatepointagejour('" + (dt.toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10) + "')";

    //console.log(requete);
    Pointage.query(requete, function(err, res){
      if(err) return callback(false);
      return callback(null, true);
    });
  },
  statusPersonnel: function(option, callback){
    var requete = "Select r_personnel.id_pers,r_personnel.appelation,r_departement.libelle,(CASE WHEN ((now()-p_logon.last_connected_time) < '00:01:00') THEN true ELSE false END)  AS connected," +
      " (CASE WHEN (to_char(p_logon.last_connected_time, 'YYYY-MM-DD') = '" + (new Date().toISOString()).substr(0,10) + "') THEN to_char(p_logon.last_connected_time, 'HH24:MI:SS') ELSE '' END)  AS connecting, " +
      "(SELECT distinct(id_util) from r_pointage where id_util = r_personnel.id_pers  AND pdate = '" + (new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10) + "') as pt " +
      "from r_personnel " +
      "join r_departement on r_departement.id = r_personnel.id_departement " +
      "left join p_logon on p_logon.id_pers = r_personnel.id_pers " +
      "where actif = true  " +
      "GROUP by r_personnel.id_pers,r_personnel.appelation,r_departement.libelle,p_logon.connected,p_logon.last_connected_time " +
      "order by r_personnel.id_pers";
     // ////console.log(requete);
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  statusPersonnelById: function(option, callback){
    var requete = "Select (CASE WHEN ((now()-p_logon.last_connected_time) < '00:01:00') THEN true ELSE false END)  AS connected," +
      " (CASE WHEN (to_char(p_logon.last_connected_time, 'YYYY-MM-DD') = '" + (new Date().toISOString()).substr(0,10) + "') THEN to_char(p_logon.last_connected_time, 'HH24:MI:SS') ELSE '' END)  AS connecting " +
     " from p_logon " +
      "where p_logon.id_pers = " +option.id_pers;
    //////console.log(requete);
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);

      if(res.rows.length > 0){
        var retu = {};
        retu.stat = res.rows[0].connected;
        retu.heu = res.rows[0].connecting;
        retu.id = option.id_pers;
        return callback(null, retu);
      }else {
        var retu = {};
        retu.stat = false;
        retu.heu = null;
        retu.id = option.id_pers;
        return callback(null, retu);
      }
    });
  },
  //nombre de departement par id

  departementByID: function(option, callback){
    var requete = "select * from r_departement";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  //selection des attente ostie en rang

  getAttenteOstie: function(option, callback){
    var requete = "select id_pers from r_reservation_ostie where stat = 'en attente' AND date_reservation='"+(new Date().toISOString()).substr(0,10)+"' order by debut_reservation asc Limit 3";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getEncourOstie: function(option, callback){
    var requete = "select id_pers from r_reservation_ostie where stat = 'rendez vous en cours' AND date_reservation='"+(new Date().toISOString()).substr(0,10)+"' order by debut_reservation asc Limit 1";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows.length);
    });
  },


  //retard avec parametre date et departement
  //execution du procedure stocké getRetard('2016/02/23',1)
  retardParIdDepartement: function(option, callback){
    var requete = "select getretard('" + option.datecible + "',"+option.idDep+")";
   // ////console.log("option=========================>"+option);
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows.length);
    });
  },

  retardDetailParIdDepartement: function(option, callback){
    var requete = "select * from getheureretard('" + option.datecible + "',"+option.idDep+")";
    //////console.log("option=========================>"+requete);
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);

      var retour = {};

      for(var i = 0; i < res.rows.length; i++){
        var hms = res.rows[i].value;   // your input string
        var a = hms.split(':'); // split it at the colons

// minutes are worth 60 seconds. Hours are worth 60 minutes.
        var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);
        retour[res.rows[i].key] = seconds;
      }

      return callback(null, retour);
    });
  },

  //retourne nombre de dossier termine
  nbDossierByType: function(option, callback){
    var requete = "select * from p_ldt where id_dossier = " + option.dossier + " and to_date(date_deb_ldt,'yyyymmdd') between to_date('" + option.dateDebut + "','yyyymmdd') and to_date('" + option.dateFin + "','yyyymmdd') and id_etat = "+option.type+"";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows.length);
    });

  },

  //retourne tableau de quantité et de qualité deu dossier
  qualiteQuantiteByDossier: function(option, callback){
    var requete = "select sum(to_number('0'||quantite,'99999')) as qte,sum(to_number('0'||nbre_erreur,'99999'))as err,p_ldt.date_deb_ldt from p_ldt where id_dossier = " + option.dossier + " and date_deb_ldt='" + option.dateDebut + "' group by p_ldt.date_deb_ldt";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });

  },


  //retourne les retards du jours
  //execution du procedure stocké getretardpardepartement('2016/02/23')
  retardParDepartement: function(option, callback){
   // ////console.log("date=========================>"+option);
    var requete = "select * from getretardpardepartement('"+option+"')";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);

      var retour = {};

      for(var i = 0; i < res.rows.length; i++){
        retour[res.rows[i].libelle] = res.rows[i].retard;
      }

      return callback(null, retour);
    });
  },

  //insertion du dernier temps connecter dans p_logon
  updateLastConnectedTime: function(option, callback){
    var requete = "Update p_logon set last_connected_time = NOW() where id_pers ="+option+"";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      return callback(null, res);
    });
  },

  // recuperation du pointage journaliere par pers

  getPointageJournaliere: function(option, callback){
    var requete = "select id_util,entree,source,sortie,horaire_journaliere from r_pointage " +
      " join r_personnel on r_pointage.id_util = r_personnel.id_pers " +
      " join r_equipe on r_personnel.id_eq = r_equipe.id_equipe " +
      " where id_util="+option.idPers+" " +
      "AND pdate='"+option.date+"' AND (source like '%IN%' OR source like '%OUT%') " +
      " order by entree asc";
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      //////console.log(res.rows);
      return callback(null, res.rows);
    });
  },

  getPointagePB: function(option, callback){
    var requete = "select id_util,entree,source,sortie,horaire_journaliere,pdate from r_pointage " +
      " join r_personnel on r_pointage.id_util = r_personnel.id_pers " +
      " join r_equipe on r_personnel.id_eq = r_equipe.id_equipe " +
      " where id_util="+option.id_pers+" " +
      "AND to_date(pdate,'YYYY/MM/DD')=to_date('"+option.date+"','YYYYMMDD') AND (source like '%IN%' OR source like '%OUT%') " +
      " order by entree asc";
    ////console.log("===================="+requete);
    Pointage.query(requete, function(err, res){
      if(err) return callback(err);
      //////console.log(res.rows);
      return callback(null, res.rows);
    });
  },

  getAdressIp: function(option, callback){
    var requete = "select ip as address_ip from p_logon where id_pers = "+option;
    Pointage.query(requete, function(err, res){
      if(err){
        return callback(err);
      } else{
        if(res.rows.length>0){
          return callback(null, res.rows[0].address_ip);
        }else{
          return callback(null, '0.0.0.0');
        }

      }
      //////console.log(res.rows);

    });
  },

  getLsPointage: function(option, callback){
    var requete = "select * from r_pointage where id_util = "+option.id_pers+" and pdate='"+option.date+"' and (source like '%IN%' OR source like '%OUT%') " +
      " order by entree desc";
   // ////console.log(requete);
    Pointage.query(requete, function(err, res){
      if(err){
        return callback(err);
      } else{

          return callback(null, res.rows);


      }


    });
  },

  getAnomaliePointageMensuele: function(option, callback){

    var date_deb = "2016/"+(new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(5,2)+"/01";
    var date = new Date();
    date.setDate(date.getDate()-1);
    //var date_deb = "2016/11/01";

    var querie = "select * from r_periode_paie where to_date('"+(new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10)+"','YYYY/MM/DD') " +
      "between to_date(date_deb_prd,'YYYY/MM/DD') AND to_date(date_fin_prd,'YYYY/MM/DD') ";



    Pointage.query(querie, function(err, res){
      if(err){
        return callback(err);
      } else{
        if(res.rows.length!=0){
          var requete = "select DISTINCT id_util,commentaire,type_erreur,to_date(pdate,'yyyy/mm/dd') as dt,pdate,r_departement.libelle,r_departement.id as id_dep,nom,categorie,prenom,duree_total,duree_prod_gpao,duree_prod,duree_pause,duree_formation,duree_autre,horaire_journaliere, " +
            " (SELECT is_valide FROM r_flag_pointage_jour flag where flag.id_util = r_pointage_jour.id_util AND flag.pdate = r_pointage_jour.pdate order by id desc Limit 1 ) as validate " +
            " from r_pointage_jour " +
            "join r_personnel on id_util = r_personnel.id_pers " +
            "join r_equipe on r_equipe.id_equipe = r_personnel.id_eq " +
            "join r_departement on r_departement.id = r_personnel.id_departement "+
            " where id_util = "+option+" " +
            " AND to_date(pdate,'yyyy/mm/dd') " +
            "between to_date('"+res.rows[0].date_deb_prd+"','yyyy/mm/dd') " +
            "and to_date('"+res.rows[0].date_fin_prd+"','yyyy/mm/dd') order by to_date(pdate,'yyyy/mm/dd') desc ";
          console.log("VALEUR PERS"+requete);
          Pointage.query(requete, function(er, resu){
            if(er) return callback(er);
            //console.log(res.rows);
            return callback(null, resu.rows);
          });
        }else{
          var objet=[];
          return callback(null, objet);
        }
      }
      //////console.log(res.rows);


    });


  },

  getAnomaliePointageByCP: function(option, callback) {

    var querie = "select * from r_periode_paie where id_paie = "+option.id_paie+" ";

    Pointage.query(querie, function(errr, resu){
      if(errr){
        return callback(errr);
      } else {
        var requete = "select distinct(pdate),id_util,duree_prod,duree_total,duree_prod_gpao,anomalie from anomalie_pointage join r_groupe on id_util = id_pers" +
          " where id_cp = "+option.id_cp+" AND to_date(pdate,'yyyy/MM/dd') " +
          "between to_date('"+resu.rows[0].date_deb_prd+"','yyyy/MM/dd') AND to_date('"+resu.rows[0].date_fin_prd+"','yyyy/MM/dd')" +
          " order by id_util,anomalie asc";
       // ////console.log("reqqqq=="+requete);
        Pointage.query(requete, function(err, res) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, res.rows);

          }
        } );
      }

      //////console.log(res.rows);

    });
  },

  getHeurePointageByCP: function(option, callback) {

    var w_cp = "";
    var w_pers = "";
    if(option.id_cp!==''){
      w_cp = "AND id_cp = "+option.id_cp;
    }

    if(option.idpers!==''){
      w_pers = "AND id_util = "+Number(option.idpers);
    }
    var requete = "select DISTINCT duree_prod_gpao_rh,id_util,pdate,r_departement.libelle,r_departement.id as id_dep,nom,categorie,prenom,duree_total,duree_gpao_total,duree_prod_gpao,duree_prod,duree_pause,duree_formation,duree_autre,horaire_journaliere, " +
      " (SELECT is_valide FROM r_flag_pointage_jour flag where flag.id_util = r_pointage_jour.id_util AND flag.pdate = r_pointage_jour.pdate order by id desc Limit 1 ) as validate " +
      "from r_pointage_jour " +
      "left join r_groupe on id_util = r_groupe.id_pers " +
      "join r_personnel on id_util = r_personnel.id_pers " +
      "join r_equipe on r_equipe.id_equipe = r_personnel.id_eq " +
      "join r_departement on r_departement.id = r_personnel.id_departement " +
      " where 1=1   "+w_cp+"  "+w_pers+" AND to_date(pdate,'YYYY/MM/DD') BETWEEN to_date('"+option.pdate+"','YYYY/MM/DD') AND to_date('"+option.pdatefin+"','YYYY/MM/DD') " +
      " order by pdate,id_util asc";
    Pointage.query(requete, function(err, res) {
      if (err) {
        return callback(err);
      } else {
        return callback(null, res.rows);
      }
    } );
  },

  getAnomaliePointageByCPDesc: function(option, callback) {

    var querie = "select * from r_periode_paie where id_paie = "+option.id_paie+" ";

    Pointage.query(querie, function(errr, resu){
      if(errr){
        return callback(errr);
      } else {
        var requete = "select distinct(pdate),id_util,duree_prod,duree_total,duree_prod_gpao,anomalie from anomalie_pointage join r_groupe on id_util = id_pers" +
          " where id_cp = "+option.id_cp+" AND to_date(pdate,'yyyy/MM/dd') " +
          "between to_date('"+resu.rows[0].date_deb_prd+"','yyyy/MM/dd') AND to_date('"+resu.rows[0].date_fin_prd+"','yyyy/MM/dd')" +
          " order by id_util,pdate desc,anomalie asc";
        //////console.log("reqqqq=="+requete);
        Pointage.query(requete, function(err, res) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, res.rows);

          }
        } );
      }

      //////console.log(res.rows);

    });
  },

  getAnomaliePointageByOP: function(option, callback) {

    var querie = "select * from r_periode_paie where id_paie = "+option.id_paie+" ";

    Pointage.query(querie, function(errr, resu){
      if(errr){
        return callback(errr);
      } else {
        var requete = "select distinct(pdate),id_util,duree_prod,duree_total,duree_prod_gpao,anomalie from anomalie_pointage join r_groupe on id_util = id_pers" +
          " where id_pers = "+option.id_pers+" AND to_date(pdate,'yyyy/MM/dd') " +
          "between to_date('"+resu.rows[0].date_deb_prd+"','yyyy/MM/dd') AND to_date('"+resu.rows[0].date_fin_prd+"','yyyy/MM/dd')" +
          " order by id_util,pdate desc,anomalie desc";
        Pointage.query(requete, function(err, res) {
          if (err) {
            return callback(err);
          } else {
            return callback(null, res.rows);

          }
        } );
      }

      //////console.log(res.rows);

    });
  },
  addRpointage: function(option, callback){
    //date : 2016/12/26
    var pointeuse = [];
    pointeuse[1]= 'IN-1';
    pointeuse[2]= 'IN-2';
    pointeuse[3]= 'IN-3';
    pointeuse[4]= 'IN-4';
    pointeuse[5]= 'OUT-1';
    pointeuse[6]= 'OUT-2';
    pointeuse[7]= 'OUT-3';
    pointeuse[8]= 'OUT-4';
    var sql = "INSERT INTO r_pointage " +
      "(id_util,pdate,entree,source,sortie)" +
      " VALUES " +
      " ("+option.id_pers+",'"+option.date+"','"+option.heure+"','"+pointeuse[option.id_pointeuse]+"','"+option.commentaire+"-"+option.id_pers_modif+"')";
    //////console.log("r_pointage=="+sql);
    Pointage.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, true);
    });
  },

  // Getting htotal rpointage by id_pers and pdate

  getHpointage: function(option, callback){
    var moment = require('moment');
    // ////console.log("date=========================>"+option);
    var requete = "select * from r_pointage where id_util = "+option.id_pers+" AND to_date(pdate,'yyyy/MM/dd') = to_date('"+option.date+"','yyyyMMdd') " +
      "AND (source like '%IN%' OR source like '%OUT%')";
    //////console.log(requete);
    Pointage.query(requete, function(errs, res){
      if(errs) return callback(errs);

      var retour = {};
      var date_in = [];
      var date_out = [];
      var lastIn = null;
      var lastOut = null;

      for(var i = 0; i < res.rows.length; i++){
        if((res.rows[i]['source']).indexOf("IN")===0){
          if(lastIn !== null){
            var lastInsplit = lastIn.split(":");
            var linNum = new Date().setHours(parseInt(lastInsplit[0]), parseInt(lastInsplit[1]), parseInt(lastInsplit[2]));
            var Insplit = res.rows[i]['entree'].split(":");
            var inNum = new Date().setHours(parseInt(Insplit[0]), parseInt(Insplit[1]), parseInt(Insplit[2]));
            //comparaison par rapport au last In si la #ce entre in[i] et lastIn < 1 Min
            if(((inNum-linNum)/1000)/60 > 1/*min*/){
              //on affecte in[i] dans lastIn et dans tableIn
              lastIn  = res.rows[i]['entree'];
              date_in.push(lastIn);

            }
          }else{
            lastIn  = res.rows[i]['entree'];
            date_in.push(lastIn);
          }
        }else{
          if(lastOut !== null){
            var lastOutsplit = lastOut.split(":");
            var loutNum = new Date().setHours(parseInt(lastOutsplit[0]), parseInt(lastOutsplit[1]), parseInt(lastOutsplit[2]));
            var Outsplit = res.rows[i]['entree'].split(":");
            var outNum = new Date().setHours(parseInt(Outsplit[0]), parseInt(Outsplit[1]), parseInt(Outsplit[2]));
            //comparaison par rapport au lastOut si la #ce entre out[i] et lastOut < 1 Min
            if(((outNum-loutNum)/1000)/60 > 1/*min*/){
              //on affecte out[i] dans lastOut et dans tableOut
              lastOut  = res.rows[i]['entree'];
              date_out.push(lastOut);

            }
          }else{

            lastOut  = res.rows[i]['entree'];
            date_out.push(lastOut);
          }
        }
        //retour[res.rows[i].libelle] = res.rows[i].retard;
      }


      var dur_tmp= null;
      var err = false;
      var heureCons = "00:00:00";
      for(var i=0 ; i<date_in.length;i++) {
        if (date_in.length < date_out.length) {
         // ////console.log("anomalie pointage");
          err = true;
        } else {
          var date_in_tmp = new Date();
          var date_out_tmp = new Date();
          var in_split = date_in[i].split(":");
          date_in_tmp.setHours(parseInt(in_split[0]), parseInt(in_split[1]), parseInt(in_split[2]));
          var out_split = [];
          if (typeof date_out[i] === "undefined") {

          } else {
            out_split = date_out[i].split(":");
            date_out_tmp.setHours(parseInt(out_split[0]), parseInt(out_split[1]), parseInt(out_split[2]));
          }
          dur_tmp += (date_out_tmp - date_in_tmp);

        }
      }
      heureCons = moment().startOf('day')
        .seconds(dur_tmp/1000)
        .format('H:mm:ss');
      retour = {duree : heureCons,err : err};
      return callback(null, retour);
    });
  },


};

