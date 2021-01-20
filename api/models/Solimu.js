/**
 * Solimu.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var array_CQ = ["4886","4984","4985","4986","4995","4996","4997","4998","4999","5000","4887","5006","4990","4991","4992","5001","5002","5003","5004","5005"];
var array_CQ_REJET = ["4979","4987","4988","4989","5043"];
var array_CQ_CO = ["4938","4980"];
var moment = require('moment');
module.exports = {
  connection: 'SolimuConnexion',
  attributes: {

    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝


    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝


    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

  },
  // Recuperation liste Date Array Pour Saisie
  getListeDateEntreInterVal: function (option, callback) {
    var sql = "SELECT DISTINCT date_deb_ldt,id_pers FROM p_ldt WHERE date_deb_ldt>='"+option.date_deb+"'" +
      " AND date_deb_ldt<='"+option.date_fin+"' AND id_dossier = "+option.id_dossier+" ORDER BY date_deb_ldt,id_pers";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  // Recuperation Information Nombre PDF traiter pour date x
  getNombrePDFTraiterparDateetMatricule: function (option, callback) {
    var sqlLotClient = "";
    if(option.id_lot_client != "")
    {
      sqlLotClient = "AND p_ldt.id_lotclient = "+option.id_lot_client;
    }
    var sql = "select count(DISTINCT p_ldt.id_lot) from p_ldt " +
      "LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot "+
      " where p_ldt.id_pers= "+option.id_pers+" and p_ldt.id_dossier = "+option.id_dossier+" " +
      " and p_ldt.date_deb_ldt = '"+option.date+"' and p_lot.id_etat = "+option.etat+" AND id_type_ldt = 0 AND p_lot.id_etape =4882 "+sqlLotClient+" ";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  // Recuperation INFO ACTES
  getNombreActeParDateetMatricule: function (option, callback) {
    var sqlLotClient = "";
    if(option.id_lot_client != "")
    {
      sqlLotClient = "AND p_ldt.id_lotclient = "+option.id_lot_client;
    }
    var sql = "select DISTINCT p_ldt.id_lot from p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot "+
      " where p_ldt.id_pers= "+option.id_pers+" and p_ldt.id_dossier = "+option.id_dossier+" " +
      " and p_ldt.date_deb_ldt = '"+option.date+"' and p_lot.id_etat = "+option.etat+" AND id_type_ldt = 0 AND p_lot.id_etape =4882 "+sqlLotClient+" ";
    async.series([
      function(cb)
      {
        Ldt.query(sql, function (err, res) {
          if (err)
            return cb(err);
          return cb(null, res.rows);
        });
      }
    ],function(err, lots){
      if(err) return callback(err);
      var stringArrayLot = [];
      async.forEachSeries(lots[0], function(info_date, callback_lot_suivant) {
        if(info_date.id_lot.toString() == "0")
        {

        }
        else
        {
          stringArrayLot.push(info_date.id_lot);
        }
        callback_lot_suivant();
      },function(err)
      {
        if(err) return callback(err);
        var stringLot = stringArrayLot.join(",");
        async.series([
          function (cb) {
            if(stringLot == "")
            {
              stringLot = "-9";
            }
            var requeteActeSolimu = "SELECT count(*) FROM traite_facture WHERE id_type_traitement IN(7) AND id_lot_gpao" +
              " IN ("+stringLot+") ";
            Solimu.query(requeteActeSolimu, function (err, res) {
              if (err)
                return cb(err);
              return cb(null, res.rows);
            });
          }
        ],function(error,resultatActe)
        {
          if(error) return callback(error);
          return callback(null, resultatActe[0]);
        });
      });
    });
  },
  getLotCQByDate: function(option,callback) {
    var sql_lotclient = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    var query = "SELECT DISTINCT p_ldt.id_lot,''''||p_lot.libelle||'''' as libelle,max(p_ldt.date_deb_ldt) as date_traitement FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot  WHERE 1 = 1  AND p_ldt.date_deb_ldt >= '"+option.date_deb+"' AND p_ldt.date_deb_ldt <= '"+option.date_fin+"' " +
      " "+sql_lotclient+" AND p_lot.id_dossier = 951 " +
      " AND p_lot.id_etape IN (4886,4984,4985,4986,4995,4996,4997,4998,4999,5000,4887,5006, " +
      " 4990,4991,4992,5001,5002,5003,5004,5005) GROUP BY p_ldt.id_lot,p_lot.libelle";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getEchantillonSolimu: function (option, callback) {
    async.series([
      function(cb)
      {
        if(option.id_lot_client!="")
        {
          Solimu.getLotCQByDate(option,cb);
        }else
        {
          var array_back = [];
          return cb(null,array_back);
        }
      }
    ],function(erroner,retour){
      if(erroner) return res.badRequest(erroner);
      var query_lot_gpao="";
      if(retour[0].length==0 && option.id_lot_client!="")
      {
        query_lot_gpao = "AND echantillonage.id_lot_cq IN (0)";
      }
      else
      if(retour[0].length!=0)
      {
        query_lot_gpao = "AND echantillonage.id_lot_cq IN("+_.pluck(retour[0],'id_lot').join(",")+")";
      }
      var sql = "SELECT " +
        " echantillonage.id, "+
        " echantillonage.id_facture, "+
        " cq_status.libelle as status, "+
        " cq_type_controle.libelle as type_controle, "+
        " echantillonage.id_pers_cq,"+
        " echantillonage.date_insert, "+
        " echantillonage.motif as commentaire, "+
        " echantillonage.id_pers_traite, echantillonage.id_lot_cq"+
        " FROM echantillonage " +
        " LEFT JOIN cq_status ON cq_status.id = echantillonage.status "+
        " LEFT JOIN cq_type_controle ON cq_type_controle.id = echantillonage.type_controle "+
        " WHERE date_insert>='"+option.date_deb+"' AND date_insert<='"+option.date_fin+"' "+query_lot_gpao+" ORDER BY date_insert,echantillonage.id_lot_cq,echantillonage.id";
      Solimu.query(sql, function (err, res) {
        if (err)
          return callback(err);
        return callback(null, res.rows);
      });
    });
  },
  getNumFactureByidFacture: function (option,callback) {
    var sql = "SELECT valeur FROM data_traitement WHERE data_traitement.id_facture = "+option.id_facture+" AND id_champs_traite=47";
    Solimu.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getListeErreurParEchantillon: function (option, callback) {
   /* var sql = "select " +
      "data_traitement.id as id_data_traitement, " +
      "valeur, " +
      " champs_traitement.id as id_champs_traite, " +
      " data_traitement.is_ok_cq, " +
      " data_traitement.commentaire_cq, " +
      " type_traitement.libelle as libelle_traitement, " +
      " type_traitement.id as id_type_traitement, " +
      "champs_traitement.* " +
      "from data_traitement " +
      " LEFT JOIN type_traitement ON data_traitement.id_type_traitement = type_traitement.id " +
      " LEFT JOIN champs_traitement ON champs_traitement.id = data_traitement.id_champs_traite " +
      " where (is_ok_cq = FALSE  " +
      " and id_facture = "+option.id_facture+") ORDER BY id_champs_traite; ";*/
   var sql = "select " +
     "historique_champs_cq.id," +
     "historique_champs_cq.id_echant," +
     "historique_champs_cq.commentaire," +
     "type_traitement.libelle as type_traitement," +
     "champs_traitement.libelle as champs" +
     " from historique_champs_cq" +
     " LEFT JOIN data_traitement ON historique_champs_cq.id_champs = data_traitement.id" +
     " LEFT JOIN type_traitement ON data_traitement.id_type_traitement = type_traitement.id" +
     " LEFT JOIN champs_traitement ON data_traitement.id_champs_traite = champs_traitement.id " +
     " WHERE id_echant = "+option.id;
    Solimu.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },

  getDateSaisieEchantillon: function (option, callback) {
    var sql = "SELECT libelle FROM p_lot WHERE id_lot ="+option.id_lot_cq;
    async.series([
      function(cb)
      {
        Ldt.query(sql, function (err, res) {
          if (err)
            return cb(err);
          return cb(null, res.rows);
        });
      }
    ],function(err, resultCQ)
    {
      if(err) return callback(err);
      var libelle_lot =  resultCQ[0][0].libelle;
      async.series([
        function (cb) {
          var sql_lot = "select id_lot from p_lot where p_lot.libelle = '"+libelle_lot+"' AND id_etape = 4882";
          Ldt.query(sql_lot, function (err, res) {
            if (err)
              return cb(err);
            return cb(null, res.rows);
          });
        }
      ],function(error, resultSAISIE){
        if(error) return callback(err);
        var id_lot_saisie = resultSAISIE[0][0].id_lot;
        async.series([
          function(cb) {
            var sql_date = "select date_deb_ldt from p_ldt where id_lot = "+id_lot_saisie+" ORDER BY id_ldt DESC limit 1";
            Ldt.query(sql_date, function (err, res) {
              if (err)
                return cb(err);
              return cb(null, res.rows);
            });
          }
        ],function (erroner,resultDate) {
          if(erroner) return callback(erroner);
          var date_saisie = "";
          if(resultDate[0].length == 0)
          {
            return callback(null, "");
          }
          else
          {
            date_saisie =  resultDate[0][0].date_deb_ldt;
          }
          return callback(null, date_saisie);
        });
      });
    });
  },
  getDateSaisieAndPersEchantillon: function (option, callback) {
    var sql = "SELECT libelle FROM p_lot WHERE id_lot ="+option.id_lot_cq;
    async.series([
      function(cb)
      {
        Ldt.query(sql, function (err, res) {
          if (err)
            return cb(err);
          return cb(null, res.rows);
        });
      }
    ],function(err, resultCQ)
    {
      if(err) return callback(err);
      var libelle_lot = "";
      if(resultCQ[0].length!=0)
      {
        libelle_lot =  resultCQ[0][0].libelle;
      }
      async.series([
        function (cb) {
          var sql_lot = "select id_lot from p_lot where p_lot.libelle = '"+libelle_lot+"' AND id_etape = 4882";
          Ldt.query(sql_lot, function (err, res) {
            if (err)
              return cb(err);
            return cb(null, res.rows);
          });
        }
      ],function(error, resultSAISIE){
        if(error) return callback(err);
        var id_lot_saisie = 0;
        if(resultSAISIE[0].length != 0)
        {
          id_lot_saisie = resultSAISIE[0][0].id_lot;
        }
        async.series([
          function(cb) {
            var sql_date = "select date_deb_ldt,id_pers from p_ldt where id_lot = "+id_lot_saisie+" ORDER BY id_ldt DESC limit 1";
            Ldt.query(sql_date, function (err, res) {
              if (err)
                return cb(err);
              return cb(null, res.rows);
            });
          }
        ],function (erroner,resultDate) {
          if(erroner) return callback(erroner);
          var obj = {};
          obj.date_saisie = "";
          obj.id_pers_traite = "";
          if(resultDate[0].length == 0)
          {
            return callback(null, obj);
          }
          else
          {
            obj.date_saisie = resultDate[0][0].date_deb_ldt;
            obj.id_pers_traite = resultDate[0][0].id_pers;
          }
          return callback(null, obj);
        });
      });
    });
  },
  getHeureProdEchantillon: function(option, callback) {
    var query = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp ))/3600 as duree," +
      // "to_number('0' || SUM(to_number('0'||quantite,'99999.9')),'99999') as qte," +
      " p_ldt.id_pers,p_ldt.id_lotclient,p_lot.libelle as nom_pdf " +
      "from p_ldt " +
      " LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot " +
      "where p_ldt.id_dossier = 951 " +
      "AND p_ldt.id_lot = "+option.id_lot_cq+" " +
      "AND p_ldt.id_type_ldt=0 " +
      "group by p_ldt.id_pers,p_ldt.id_lotclient,p_lot.libelle " +
      "order by p_ldt.id_pers,p_ldt.id_lotclient";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getEtapeSolimu: function(option, callback) {
    var query = "select id_lot,p_etape.libelle as etape from p_lot "+
  "  LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape=p_lien_oper_dossier.id_lien "+
  "  LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "+
  "  where id_lot = "+option.id_lot_cq+" ";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  // Fonction recuperation date et matricule
  getReportingDateWithMatricule: function (option,callback) {
    var sql_pers = "";
    var sql_etape = "";
    var sql_lotclient = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    if(option.id_pers != "")
    {
      sql_pers = "AND p_ldt.id_pers = "+option.id_pers;
    }

    if(option.id_etape != "")
    {
      sql_etape = "AND p_ldt.id_etape = "+option.id_etape+" ";
    }else
    {
      if(option.multi_etape == "cq_iso")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ.join(",")+")";
      }else if(option.multi_etape == "cq_rejet")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_REJET.join(",")+")";
      }else if(option.multi_etape == "cq_coherence")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_CO.join(",")+")";
      }
    }
    var query = "SELECT DISTINCT p_ldt.date_deb_ldt as date_traitement,p_ldt.id_pers " +
      "FROM p_ldt LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
      " WHERE 1 = 1 " +
      "  AND p_ldt.date_deb_ldt >= '"+option.date_deb+"' "+sql_pers+" "+sql_etape+" "+sql_lotclient+" AND p_ldt.date_deb_ldt <= '"+option.date_fin+"' " +
      "   AND p_lot.id_dossier = 951" +
      "   GROUP BY p_ldt.date_deb_ldt,p_ldt.id_pers" +
      "   ORDER BY p_ldt.date_deb_ldt,p_ldt.id_pers";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  // RECUPERATION QUANTITE REPORTING
  getQuantite: function (option,next) {

    async.series([
      // RECUPERATION QTE FACTURE SAISIE JOUR J
      function(callback){
        if(option.id_etape == "" || option.id_etape == "4882")
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          optionTemp.id_etape =  4882;
          optionTemp.id_lot_client = option.id_lot_client;
          Solimu.getQuantiteFactureSaisie(optionTemp,callback);
        }else
        {
          var array = [];
          var obj = {};
          obj.nombre_facture_saisie = "0";
          obj.nombre_rejeter = "0";
          obj.nombre_pdf_traiter = "0";
          array.push(obj);
          return callback(null, array);
        }
      },
      // RECUPERATION QTE ECHANTILLON CQ
      function(callback){
        if(option.id_etape == "" || array_CQ.includes(option.id_etape) || option.multi_etape == "cq_iso" )
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          if(option.id_lot_client == "" || option.multi_etape == "")
          {
            Solimu.getNombreEchantillonSolimuParDateEtMatricule(optionTemp,callback);
          }
          else
          {
            optionTemp.id_lot_client = option.id_lot_client;
            optionTemp.id_etape = option.id_etape;
            optionTemp.multi_etape = option.multi_etape;
            Solimu.getNombreEchantillonSolimuParDateEtMatriculeByLotClient(optionTemp,callback);
          }

        }
        else
        {
          var array = [];
          var obj = {};
          obj.nombre_facture_cq = "0";
          array.push(obj);
          return callback(null, array);
        }
      },
      // RECUPERATION QTE PDF REJETER CONTROLER
      function(callback){
        if(option.id_etape == "" || array_CQ_REJET.includes(option.id_etape) || option.multi_etape == "cq_rejet" )
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          optionTemp.id_lot_client = option.id_lot_client;
          optionTemp.id_etape = option.id_etape;
          optionTemp.multi_etape = option.multi_etape;
          Solimu.getNombrePdfRejeterControler(optionTemp,callback);
        }
        else
        {
          return callback(null, "0");
        }

      },
      // RECUPERATION QTE PDF VERIFIER CQ COHERENCE
      function(callback){
        if(option.id_etape =="" || array_CQ_CO.includes(option.id_etape) || option.multi_etape == "cq_coherence")
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          optionTemp.id_lot_client = option.id_lot_client;
          optionTemp.id_etape = option.id_etape;
          optionTemp.multi_etape = option.multi_etape;
          Solimu.getNombrePdfCoherenceControler(optionTemp,callback);
        }
        else
        {
          return callback(null, "0");
        }
      }
    ],function(error_parralel, retour_parallele)
    {
      if(error_parralel)
      {
        return next(error_parralel);
      }else
      {
        var qteSaisie = parseInt(retour_parallele[0][0].nombre_facture_saisie) + parseInt(retour_parallele[0][0].nombre_rejeter);
        var qteCQ = parseInt(retour_parallele[1][0].nombre_facture_cq);
        var qteRejet = parseInt(retour_parallele[2]);
        var qteCoherence = parseInt(retour_parallele[3]);
       // console.log(qteSaisie+"+"+qteCQ+"+"+qteRejet+"+"+qteCoherence);
        var qteTotal = qteSaisie+qteCQ+qteRejet+qteCoherence;
        next(null,qteTotal);
      }
    });
  },
  // RECUPERATION QUANTITE REPORTING PDF ONLY
  getQuantitePDF: function (option,next) {

    async.series([
      // RECUPERATION QTE FACTURE SAISIE JOUR J
      function(callback){
        if(option.id_etape == "" || option.id_etape == "4882")
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          optionTemp.id_etape =  4882;
          optionTemp.id_lot_client = option.id_lot_client;
          Solimu.getQuantiteFactureSaisie(optionTemp,callback);
        }else
        {
          var array = [];
          var obj = {};
          obj.nombre_facture_saisie = "0";
          obj.nombre_rejeter = "0";
          obj.nombre_pdf_traiter = "0";
          array.push(obj);
          return callback(null, array);
        }
      },
      // RECUPERATION QTE ECHANTILLON CQ
      function(callback){
        if(option.id_etape == "" || array_CQ.includes(option.id_etape) || option.multi_etape == "cq_iso" )
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          if(option.id_lot_client == "" || option.multi_etape == "")
          {
            Solimu.getNombreEchantillonSolimuParDateEtMatricule(optionTemp,callback);
          }
          else
          {
            optionTemp.id_lot_client = option.id_lot_client;
            optionTemp.id_etape = option.id_etape;
            optionTemp.multi_etape = option.multi_etape;
            Solimu.getNombreEchantillonSolimuParDateEtMatriculeByLotClient(optionTemp,callback);
          }

        }
        else
        {
          var array = [];
          var obj = {};
          obj.nombre_facture_cq = "0";
          array.push(obj);
          return callback(null, array);
        }
      },
      // RECUPERATION QTE PDF REJETER CONTROLER
      function(callback){
        if(option.id_etape == "" || array_CQ_REJET.includes(option.id_etape) || option.multi_etape == "cq_rejet" )
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          optionTemp.id_lot_client = option.id_lot_client;
          optionTemp.id_etape = option.id_etape;
          optionTemp.multi_etape = option.multi_etape;
          Solimu.getNombrePdfRejeterControler(optionTemp,callback);
        }
        else
        {
          return callback(null, "0");
        }

      },
      // RECUPERATION QTE PDF VERIFIER CQ COHERENCE
      function(callback){
        if(option.id_etape =="" || array_CQ_CO.includes(option.id_etape) || option.multi_etape == "cq_coherence")
        {
          var optionTemp = {};
          optionTemp.id_pers = option.id_pers;
          optionTemp.date =  option.date;
          optionTemp.id_lot_client = option.id_lot_client;
          optionTemp.id_etape = option.id_etape;
          optionTemp.multi_etape = option.multi_etape;
          Solimu.getNombrePdfCoherenceControler(optionTemp,callback);
        }
        else
        {
          return callback(null, "0");
        }
      }
    ],function(error_parralel, retour_parallele)
    {
      if(error_parralel)
      {
        return next(error_parralel);
      }else
      {
        var qteSaisie = parseInt(retour_parallele[0][0].nombre_pdf_traiter) + parseInt(retour_parallele[0][0].nombre_rejeter);
        var qteCQ = parseInt(retour_parallele[1][0].nombre_facture_cq);
        var qteRejet = parseInt(retour_parallele[2]);
        var qteCoherence = parseInt(retour_parallele[3]);
        // console.log(qteSaisie+"+"+qteCQ+"+"+qteRejet+"+"+qteCoherence);
        var qteTotal = qteSaisie+qteCQ+qteRejet+qteCoherence;
        next(null,qteTotal);
      }
    });
  },
  getQuantiteFactureSaisie: function (option,next) {
    async.parallel([
      function(callback){
        var optionTemp = {};
        optionTemp.date = option.date;
        optionTemp.id_pers = option.id_pers;
        optionTemp.id_etape = 4882;
        optionTemp.id_lot_client = option.id_lot_client;
        Solimu.getLotAndLibelleSaisie(option,callback);
      },
      function(callback){
        var optionTemp = {};
        optionTemp.date = option.date;
        optionTemp.id_pers = option.id_pers;
        optionTemp.id_etape = 4882;
        optionTemp.id_lot_client = option.id_lot_client;
        Solimu.getLotAndLibelleSaisieRejeter(option,callback);
      }
    ],function(err,retour)
    {
      if(err)
      {
        return next(err);
      }
      else
      {
        var lot_gpao = "";
        if(retour[0].length != 0)
        {
          //console.log(retour[0]);
          lot_gpao = _.pluck(retour[0],'id_lot').join(",");
          async.series([
            function(cb){
              Solimu.getNombreFactureByIdLotGpao(lot_gpao,cb);
            }
          ],function(error_cb,result_cb)
          {
            if(error_cb)
            {
              return next(error_cb);
            }
            else
            {
              if(retour[1].length != 0)
              {
                result_cb[0][0].nombre_rejeter = retour[1].length;
              }else
              {
                result_cb[0][0].nombre_rejeter = 0;
              }
              result_cb[0][0].nombre_pdf_traiter = retour[0].length;
              return next(null,result_cb[0]);
            }
          });
        }else
        {
          var array = [];
          var obj = {};
          obj.nombre_facture_saisie = 0;
          obj.nombre_rejeter = 0;
          obj.nombre_pdf_traiter = 0;
          array.push(obj);
          return next(null,array);
        }
      }
    });
  },
  getLotAndLibelleSaisie: function (option,callback) {
    var sql_lotclient = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    var query = "SELECT DISTINCT p_ldt.id_lot,''''||p_lot.libelle||'''' as libelle,max(p_ldt.date_deb_ldt) as date_traitement FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot  WHERE 1 = 1  AND p_ldt.date_deb_ldt = '"+option.date+"' " +
      " AND p_ldt.id_pers = "+option.id_pers+" "+sql_lotclient+" AND p_lot.id_dossier = 951 AND p_lot.id_etat = 2 " +
      " AND p_lot.id_etape = "+option.id_etape+" GROUP BY p_ldt.id_lot,p_lot.libelle";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getLotAndLibelleSaisieRejeter: function(option,callback) {
    var sql_lotclient = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    var query = "SELECT DISTINCT p_ldt.id_lot,''''||p_lot.libelle||'''' as libelle,max(p_ldt.date_deb_ldt) as date_traitement FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot  WHERE 1 = 1  AND p_ldt.date_deb_ldt = '"+option.date+"' " +
      " AND p_ldt.id_pers = "+option.id_pers+" "+sql_lotclient+" AND p_lot.id_dossier = 951 AND p_lot.id_etat = 3 " +
      " AND p_lot.id_etape = "+option.id_etape+" GROUP BY p_ldt.id_lot,p_lot.libelle";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getNombreFactureByIdLotGpao: function(lot_gpao,callback) {
    var query = "SELECT count(*) as nombre_facture_saisie FROM facture where id_lot IN ("+lot_gpao+")";
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getNombreEchantillonSolimuParDateEtMatricule: function (option, callback) {
    var sql = "SELECT count(*) as nombre_facture_cq " +
      " FROM echantillonage " +
      " WHERE date_insert='"+option.date+"' AND id_pers_cq="+option.id_pers+"";
    Solimu.query(sql, function (err, res) {
      if (err)
        return callback(err);
   //   console.log(res.rows);
      return callback(null, res.rows);
    });
  },
  getEchantillonSolimuParDateEtMatricule: function (option, callback) {
    var sql = "SELECT * " +
      " FROM echantillonage " +
      " WHERE date_insert='"+option.date+"' AND id_pers_cq="+option.id_pers+"";
    Solimu.query(sql, function (err, res) {
      if (err)
        return callback(err);
      //   console.log(res.rows);
      return callback(null, res.rows);
    });
  },
  getNombreEchantillonSolimuParDateEtMatriculeByLotClient: function(option, next) {
    async.series([
      function(callback)
      {
        Solimu.getEchantillonSolimuParDateEtMatricule(option,callback);
      },
    ],function(err,lot_cq){
      if(err)
      {
        return next(err);
      }
      else
      {
        if(lot_cq[0].length != 0)
        {
          var sql_lotclient= ""
          var sql_etape = "";
          if(option.id_lot_client=="stock")
          {
            sql_lotclient = " AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
          }
          else if(option.id_lot_client == "entrant")
          {
            sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
          }
          else
          {
            sql_lotclient = " AND p_ldt.id_lotclient="+option.id_lot_client+" ";
          }
          if(option.id_etape != "")
          {
            sql_etape = " AND p_ldt.id_etape = "+option.id_etape;
          }
          else
          {
            if(option.multi_etape == "cq_iso")
            {
              sql_etape = "AND p_ldt.id_etape IN ("+array_CQ.join(",")+")";
            }else if(option.multi_etape == "cq_rejet")
            {
              sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_REJET.join(",")+")";
            }else if(option.multi_etape == "cq_coherence")
            {
              sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_CO.join(",")+")";
            }
          }
          var lot_gpao = _.pluck(lot_cq[0],'id_lot_cq').join(",");
          var query = "SELECT count(DISTINCT id_lot) as nombre_facture_cq FROM p_ldt WHERE p_ldt.id_lot" +
            " IN("+lot_gpao+") "+sql_lotclient+"  "+sql_etape+" ";
          //console.log(query);
          Ldt.query(query, function (err, res) {
            if (err)
              return next(err);
            return next(null, res.rows);
          });
        }
        else
        {
          var array =[];
          var obj = {};
          obj.nombre_facture_cq= "0";
          array.push(obj);
          return next(null, array);
        }
      }
    });
  },
  getNombrePdfRejeterControler: function(option, callback) {
    var sql_lotclient = "";
    var sql_etape = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    if(option.id_etape != "")
    {
      sql_etape = " AND p_ldt.id_etape = "+option.id_etape+" ";
    }
    else
    {
      if(option.multi_etape == "cq_iso")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ.join(",")+")";
      }else if(option.multi_etape == "cq_rejet")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_REJET.join(",")+")";
      }else if(option.multi_etape == "cq_coherence")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_CO.join(",")+")";
      }
    }
    var query = "SELECT DISTINCT p_ldt.id_lot,p_lot.libelle,max(p_ldt.date_deb_ldt) as date_traitement FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot  " +
      "  LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape=p_lien_oper_dossier.id_lien "+
      "  LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "+
      "WHERE 1 = 1  AND p_ldt.date_deb_ldt = '"+option.date+"' " +
      " AND p_ldt.id_pers = "+option.id_pers+" AND p_lot.id_dossier = 951 "+sql_lotclient+" "+sql_etape+" AND p_lot.id_etat in (5,3,2) " +
      " AND p_etape.libelle LIKE '%REJET%' GROUP BY p_ldt.id_lot,p_lot.libelle";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows.length);
    });
  },
  getNombrePdfCoherenceControler: function(option, callback) {
    var sql_lotclient = "";
    var sql_etape = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    if(option.id_etape != "")
    {
      sql_etape = "AND p_ldt.id_etape = "+option.id_etape+" ";
    }
    else
    {
      if(option.multi_etape == "cq_iso")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ.join(",")+")";
      }else if(option.multi_etape == "cq_rejet")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_REJET.join(",")+")";
      }else if(option.multi_etape == "cq_coherence")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_CO.join(",")+")";
      }
    }
    var query = "SELECT DISTINCT p_ldt.id_lot,p_lot.libelle,max(p_ldt.date_deb_ldt) as date_traitement FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot  WHERE 1 = 1  AND p_ldt.date_deb_ldt = '"+option.date+"' " +
      " AND p_ldt.id_pers = "+option.id_pers+" "+sql_lotclient+" "+sql_etape+" AND p_lot.id_dossier = 951 AND p_lot.id_etat = 2 " +
      " AND p_lot.id_etape = 4938 GROUP BY p_ldt.id_lot,p_lot.libelle";
    //console.log(query);
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);

      return callback(null, res.rows.length);
    });
  },
  getHeureProdParDateetMatricule: function(option, callback) {
    var sql_lotclient = "";
    var sql_etape = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    if(option.id_etape != "")
    {
      sql_etape = "AND p_ldt.id_etape = "+option.id_etape+" ";
    }
    else
    {
      if(option.multi_etape == "cq_iso")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ.join(",")+")";
      }else if(option.multi_etape == "cq_rejet")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_REJET.join(",")+")";
      }else if(option.multi_etape == "cq_coherence")
      {
        sql_etape = "AND p_ldt.id_etape IN ("+array_CQ_CO.join(",")+")";
      }
    }
    var query = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp ))/3600 as duree" +
      " from p_ldt " +
      " where p_ldt.id_dossier = 951 " +
      " AND p_ldt.date_deb_ldt = '"+option.date+"' "+sql_lotclient+" "+sql_etape+" AND p_ldt.id_pers = "+option.id_pers+"" +
      " AND p_ldt.id_type_ldt=0 ";
  //    "group by p_ldt.id_pers,p_ldt.id_lotclient,p_lot.libelle " +
  //    "order by p_ldt.id_pers,p_ldt.id_lotclient";
    //console.log(query);
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getHeureHorsProdParDateetMatricule: function(option, callback) {
    var sql_lotclient = "";
    var sql_etape = "";
    if(option.id_lot_client=="stock")
    {
      //sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      //sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      //sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    if(option.id_etape != "")
    {
      //sql_etape = "AND p_ldt.id_etape = "+option.id_etape+" ";
    }
    var query = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp ))/3600 as duree" +
      " from p_ldt " +
      " where p_ldt.id_dossier = 951 " +
      " AND p_ldt.date_deb_ldt = '"+option.date+"' "+sql_lotclient+" "+sql_etape+" AND p_ldt.id_pers = "+option.id_pers+"" +
      " AND p_ldt.id_type_ldt NOT IN (0,1,4)";
    //    "group by p_ldt.id_pers,p_ldt.id_lotclient,p_lot.libelle " +
    //    "order by p_ldt.id_pers,p_ldt.id_lotclient";
    //console.log(query);

    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getEchantillonControllerParDateEtMatricule: function(option,next) {
    var obj = {};
    async.series([
      function(callback){
        if(option.id_etape == "" || option.id_etape == "4882")
        {
          var optionTemp = {};
          optionTemp.date = option.date;
          optionTemp.id_pers = option.id_pers;
          optionTemp.id_etape = 4882;
          optionTemp.id_lot_client = option.id_lot_client;
          optionTemp.multi_etape = option.multi_etape;
          Solimu.getLotAndLibelleSaisie(optionTemp,callback);
        }else
        {
          var array = [];
          callback(null,array);
        }

      }
    ],function(error,retour)
    {
      if(error) return next(error);
      var libelles = "";
      if(retour[0].length != 0) {
        //console.log(retour[0]);
        libelles = _.pluck(retour[0], 'libelle').join(",");
        async.series([
          function(callback){
            Solimu.getLotCQReprise(libelles,callback);
          }
        ],function(error_2,lot_Cq)
        {
          if(error_2)
          {
            return next(error_2);
          }
          else
          {
            var lot_cq_reprise = _.pluck(lot_Cq[0], 'id_lot').join(",");
            async.parallel([
              //NOMBRE EchANTILLON
              function (callback) {
                Solimu.getNombreEchantillonControle(lot_cq_reprise,callback);
              },
              // NOMBRE ES
              function (callback) {
                Solimu.getNombreEchantillonControleByStatus(lot_cq_reprise,3,callback);
              },
              // NOMBRE NRRG
              function (callback) {
                Solimu.getNombreEchantillonControleByStatus(lot_cq_reprise,2,callback);
              },
            ],function(error_parralel,retour_parallele)
            {
              if(error_parralel) return next(error_parralel);

              obj.nombre_echantillon = retour_parallele[0][0].nombre_echant;
              obj.nombre_es = parseInt(retour_parallele[1][0].nombre_echant);
              obj.nombre_nrrg = parseInt(retour_parallele[2][0].nombre_echant);
              var somme_es_nnr = obj.nombre_es + obj.nombre_nrrg;
              var float_es = parseFloat(somme_es_nnr);
              var taux = 100 - ((float_es*100) / parseFloat(retour_parallele[0][0].nombre_echant));
              if(!taux)
              {
                taux = "0";
              }
              obj.taux_de_qualite = taux;
              return next(null,obj);
            });
          }
        });
      }
      else
      {
        obj.nombre_echantillon = 0;
        obj.nombre_es = 0;
        obj.nombre_nrrg = 0;
        obj.taux_de_qualite=0;
        return next(null,obj);
      }
    });
  },
  getLotCQReprise : function(libelle_lot, callback) {
    var query = "SELECT p_lot.id_lot" +
      " from p_lot " +
      " where p_lot.id_dossier = 951 " +
      " AND p_lot.libelle IN ("+libelle_lot+") AND p_lot.id_etape IN (5000,4984,4886,4985,4986,4995,4996,4997,4998,4999,4887,5006,4990,4991,4992,5001,5002,5003,5004,5005) ";
    //    "group by p_ldt.id_pers,p_ldt.id_lotclient,p_lot.libelle " +
    //    "order by p_ldt.id_pers,p_ldt.id_lotclient";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getLotCQRejet : function(libelle_lot, callback) {
    var query = "SELECT p_lot.id_lot" +
      " from p_lot " +
      " where p_lot.id_dossier = 951 " +
      " AND p_lot.libelle IN ("+libelle_lot+") AND p_lot.id_etape IN (4979,4987,4988,4989,5043) ";
    //    "group by p_ldt.id_pers,p_ldt.id_lotclient,p_lot.libelle " +
    //    "order by p_ldt.id_pers,p_ldt.id_lotclient";
    // console.log(query);
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getNombreEchantillonControle : function(libelle_lot, callback) {
    var query = "SELECT count(*) as nombre_echant" +
      " from echantillonage " +
      " where " +
      " id_lot_cq IN ("+libelle_lot+") ";
    //    "group by p_ldt.id_pers,p_ldt.id_lotclient,p_lot.libelle " +
    //    "order by p_ldt.id_pers,p_ldt.id_lotclient";
    //console.log(query);
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getNombreEchantillonControleByStatus : function(libelle_lot,id_status, callback) {
    var query = "SELECT count(*) as nombre_echant" +
      " from echantillonage " +
      " where  " +
      " id_lot_cq IN ("+libelle_lot+") AND status="+id_status;
   // console.log(query);
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getLotUniqueByDate : function(option, callback) {
    // CQ REJET CQ COHERENCE
    var complet = "4938,4980,4979,4987,4988,4989,4887,5006,4990,4991,4992,5001,5002,5003,5004,5005,5043";
    var sql_parametre_lotclient = "";
    var sql_parametre_etape = "";
    var sql_parametre_lot = "";
    if(option.lot_client == "stock")
    {
      sql_parametre_lotclient = "AND p_lot.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.lot_client == "entrant")
    {
      sql_parametre_lotclient = "AND p_lot.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.lot_client != "")
    {
      sql_parametre_lotclient = "AND p_lot.id_lotclient="+option.lot_client+ " ";
    }
    if(option.etape != "")
    {
      sql_parametre_etape = " AND p_lot.id_etape = "+option.etape+" ";
    }else
    {
      sql_parametre_etape = "  ";
    }
    if(option.lot_libelle != "")
    {
      sql_parametre_lot = " AND p_lot.libelle = '"+option.lot_libelle+"' ";
    }
    var query = " SELECT DISTINCT p_ldt.id_lot,max(p_ldt.date_deb_ldt) as date_traitement "+
      //,max(p_ldt.id_pers) as id_pers " +
      "FROM p_ldt LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
      " WHERE 1=1 " +
      " AND p_ldt.date_deb_ldt >= '" + option.date_deb + "' AND p_ldt.date_deb_ldt <= '" + option.date_fin + "' " +
      " AND p_lot.id_dossier = 951 "+sql_parametre_lot+" "+sql_parametre_etape+" "+sql_parametre_lotclient+" GROUP BY p_ldt.id_lot";
  //console.log(query);
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getInfoLotById : function(id_lot, callback) {
    var query = "SELECT p_dossier.num_dossier, p_lot_client.libelle as ldg, p_lot.id_lot as id,p_lot.libelle as lib, p_etat.libelle as etat, p_etape.libelle as etape, " +
      "         p_lot.priority, p_lot.id_pers, p_lot.qte FROM p_lot " +
      "        LEFT JOIN p_etat ON p_lot.id_etat= p_etat.id_etat" +
      " LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape= p_lien_oper_dossier.id_lien" +
      " LEFT JOIN p_etape ON p_etape.id_etape= p_lien_oper_dossier.id_oper " +
      " LEFT JOIN p_lot_client ON p_lot.id_lotclient = p_lot_client.id_lotclient" +
      " LEFT JOIN p_dossier ON p_lot_client.id_dossier = p_dossier.id_dossier " +
      "  WHERE 1=1 AND p_lot.id_lot = "+id_lot+"";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getCommentaireRejet : function(id_lot, next) {
    var details = "";
    async.series([
      function (callback) {
        Solimu.checkIfLotIsRejet(id_lot,callback);
      }
    ],function(er,r){
      if(er)
      {
        return next(er);
      }
      else
      {
        if(!r[0])
        {
          next(null,"SAISIE VALIDER");
        }
        else
        {
          async.series([
            function(callback) {
              Solimu.getLotSaisieByLot(id_lot,callback);
            }
          ],function(err_lot,result_lot)
          {
            var new_lot = result_lot;
            if(err_lot) return next(err_lot);
            async.series([
              function(callback){
                var query = "SELECT id,commentaire from almerys_lien_lot_rejet_solimut WHERE id_lot = " + new_lot;
                Ldt.query(query, function (err, res) {
                  if (err)
                    return callback(err);
                  return callback(null, res.rows);
                });
              }
            ],function (error,retour) {
              if(error) return next(error);
              if(retour[0].length != 0)
              {
                details = retour[0][0].commentaire;
                return next(null,details);
              }
              else
              {
                async.series([
                  function (callback) {
                    var query ="SELECT commentaire FROM p_ldt where p_ldt.id_lot =  " + new_lot + "  ORDER BY id_ldt desc";
                    Ldt.query(query, function (err, res) {
                      if (err)
                        return callback(err);
                      return callback(null, res.rows);
                    });
                  }
                ],function (error_d,retour_d) {
                  if(error_d) return next(error_d);
                  if(retour_d[0].length != 0)
                  {
                    async.series([
                      function(callbackb)
                      {
                        var comment_Temp = "";
                        retour_d[0].forEach(function(commentaire){
                          if(commentaire.commentaire != "" && commentaire.commentaire != "Fermeture de l'application")
                          {
                            comment_Temp= commentaire.commentaire;
                          }
                        });
                        return callbackb(null,comment_Temp);
                      }
                    ],function(err,resul){
                      if(err)
                      {
                        return next(err);
                      }
                      else
                      {
                        return next(null,resul);
                      }
                    });
                  }
                  else
                  {
                    return next(null,"");
                  }
                });
              }
            });
          });
        }
      }
    });
  },
  InsertOrUpdateCommentaireLot : function(id_lot,commentaire,callback) {
    var query = " INSERT INTO almerys_lien_lot_rejet_solimut(id_lot,commentaire) VALUES(" + id_lot + ",'" + commentaire + "')" ;
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getLotSaisieByLot: function(id_lot,next) {
    async.series([
      function(callback){
        var query = " SELECT libelle FROM p_lot where id_lot = "+id_lot ;
        Ldt.query(query, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      }
    ],function (err,result) {
      if(err)
      {
        next(err);
      }
      else
      {
        var libelle = result[0][0].libelle;
        async.series([
          function(callback)
          {
            var query = " SELECT id_lot FROM p_lot where id_dossier=951 and libelle = '"+libelle+"' AND id_etape = 4882";
            Ldt.query(query, function (err, res) {
              if (err)
                return callback(err);
              return callback(null, res.rows);
            });
          }
        ],function(e,etat){
          if(e)
          {
            return next(e);
          }
          else
          {
              return next(null,etat[0][0].id_lot);
          }
        });
      }
    });
  },
  checkIfLotIsRejet : function(id_lot,next) {
    async.series([
      function(callback){
        var query = " SELECT libelle FROM p_lot where id_lot = "+id_lot ;
        Ldt.query(query, function (err, res) {
          if (err)
            return callback(err);
          return callback(null, res.rows);
        });
      }
    ],function (err,result) {
      if(err)
      {
        next(err);
      }
      else
      {
        var libelle = result[0][0].libelle;
        async.series([
          function(callback)
          {
            var query = " SELECT id_lot FROM p_lot where id_dossier=951 and id_etat =3 and libelle = '"+libelle+"' AND id_etape = 4882";
            Ldt.query(query, function (err, res) {
              if (err)
                return callback(err);
              return callback(null, res.rows);
            });
          }
        ],function(e,etat){
            if(e)
            {
              return next(e);
            }
            else
            {
              if(etat[0].length == 0)
              {
                return next(null,false);
              }
              else
              {
                return next(null,true);
              }
            }
        });
      }
    });
  },
  // Fonction pour recuperer liste lot echantillon CQ REJET
  getListLotClientEchantillonRejet: function (option, next) {
    var sql_etape = "AND p_ldt.id_etape IN (4979,4987,4988,4989,5043)";
    var sql_lotclient = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    var query = "SELECT DISTINCT p_ldt.id_lot as id_lot, p_ldt.date_deb_ldt," +
      " p_lot.libelle as libelle_lot, p_lot.id_etat, p_lot.id_etape,p_etape.libelle as libelle_etape,p_ldt.id_pers as id_pers_cq"+
      " FROM p_ldt LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot "+
      " LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape=p_lien_oper_dossier.id_lien  "+
      " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape  "+
      " WHERE 1 = 1  "+
      "  AND p_ldt.date_deb_ldt >= '"+option.date_deb+"'  AND p_ldt.date_deb_ldt <= '"+option.date_fin+"' "+sql_lotclient+ ""+
      " AND p_ldt.id_dossier = 951 "+sql_etape+" ORDER BY p_ldt.date_deb_ldt ";
    console.log(query);
    Ldt.query(query, function (err, res) {
      if (err)
        return next(err);
      return next(null, res.rows);
    });
  },

  /**
   * Recuperation listeMatricule
   */
  getListeMatriculeOpTraitement: function(options, next) {
    let query_where = "";
    if(options.lot_client != "")
    {
      query_where += " AND p_lot.id_lotclient = "+options.lot_client+" ";
    }
    if(options.etat_solimut !== "")
    {
      query_where += " AND p_lot.id_etat = "+options.etat_solimut+" ";
    }
    let query_lotgpao = "select p_lot.id_pers  " +
      " FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
      " WHERE 1=1" +
      " AND p_ldt.id_dossier = 951 " +
      " AND p_ldt.date_deb_ldt >= '"+options.date_deb+"' " +
      " AND p_ldt.date_deb_ldt <= '"+options.date_fin+"' " +
      " "+query_where+" "+
      " AND p_lot.id_etape = 4882 " +
      " GROUP BY p_lot.id_pers ORDER BY p_lot.id_pers ASC ";
    Ldt.query(query_lotgpao, function (err, res) {
      if (err)
        return next(err);
      return next(null, res.rows);
    });
  },
  /**
   * Recuperation Liste Lot Par Type Facture
   */
  getListeLotGpaoParFacture: function(options, callback) {
    var arrayRetour = [];
    // RECUPERATION LOT GPAO
      async.series([
        function(cb) {
          Solimu.getListeLotGpaoUniqueSaisie(options, cb);
        }
      ],function(erreur_lot, result_lot){
        if(erreur_lot)
        {
          return callback(erreur_lot);
        }
        else
        {
          if(options.specialite_solimut !== '' && options.etat_solimut === '2')
          {
            let listLotString = result_lot[0].join(",");
            if(result_lot[0].length === 0)
            {
              return callback(null, result_lot[0]);
            }
            async.series([
              function(cb) {
                Solimu.getLotGpaoByTypeFacture(listLotString, options.specialite_solimut, cb);
              }
            ],function(error_TypeFacture, resultTypeFacture){
              if(error_TypeFacture)
              {
                return callback(error_TypeFacture);
              }
              else
              {
                console.log('Autre Probleme');
                let arrayRetourTypeFacture = [];
                if(resultTypeFacture[0].length !== 0)
                {
                  arrayRetourTypeFacture = _.pluck(resultTypeFacture[0],'id_lot');
                }
                return callback(null, arrayRetourTypeFacture);
              }
            });
          }
          else
          {
            let listeLotGpaoSeul = [];
            if(result_lot[0].length !== 0)
            {
              listeLotGpaoSeul = result_lot[0];
            }
            return callback(null, listeLotGpaoSeul);
          }
        }
      });
  },
  getListeLotGpaoParFactureSaisieSeul: function(options, callback) {
    var arrayRetour = [];
    // RECUPERATION LOT GPAO
    async.series([
      function(cb) {
        Solimu.getListeLotGpaoUniqueSaisieValide(options, cb);
      }
    ],function(erreur_lot, result_lot){
      if(erreur_lot)
      {
        return callback(erreur_lot);
      }
      else
      {
        if(options.specialite_solimut !== '' && options.etat_solimut === '2')
        {
          let listLotString = result_lot[0].join(",");
          if(result_lot[0].length === 0)
          {
            return callback(null, result_lot[0]);
          }
          async.series([
            function(cb) {
              Solimu.getLotGpaoByTypeFacture(listLotString, options.specialite_solimut, cb);
            }
          ],function(error_TypeFacture, resultTypeFacture){
            if(error_TypeFacture)
            {
              return callback(error_TypeFacture);
            }
            else
            {
              let arrayRetourTypeFacture = [];
              if(resultTypeFacture[0].length !== 0)
              {
                arrayRetourTypeFacture = _.pluck(resultTypeFacture[0],'id_lot');
              }
              return callback(null, arrayRetourTypeFacture);
            }
          });
        }
        else
        {
          let listeLotGpaoSeul = [];
          if(result_lot[0].length !== 0)
          {
            listeLotGpaoSeul = result_lot[0];
          }
          return callback(null, listeLotGpaoSeul);
        }
      }
    });
  },
  /**
   * Recuperation Liste Lot TRAITE
   */
  getListeLotGpaoUniqueSaisie: function(options, next) {
    let query_where = "";
    if(options.lot_client != "")
    {
      query_where += " AND p_lot.id_lotclient = "+options.lot_client+" ";
    }
    if(options.etat_solimut !== "")
    {
      query_where += " AND p_lot.id_etat = "+options.etat_solimut+" ";
    }
    let query_lotgpao = " select p_lot.id_lot  " +
      " FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
      " WHERE 1=1" +
      " AND p_ldt.id_dossier = 951 " +
      " AND p_ldt.date_deb_ldt >= '"+options.date_deb+"' " +
      " AND p_ldt.date_deb_ldt <= '"+options.date_fin+"' " +
      " AND p_ldt.id_pers = "+options.id_pers+" AND p_lot.id_pers = "+options.id_pers+" " +
      " "+query_where+" "+
      " AND p_lot.id_etape = 4882 " +
      " GROUP BY p_lot.id_lot ";
    Ldt.query(query_lotgpao, function (err, res) {
      if (err)
      {
        return next(err);
      }
      let arrayLotSaisie = [];
      arrayLotSaisie = _.pluck(res.rows, 'id_lot');
      return next(null, arrayLotSaisie);
      //console.log(res.rows);
/*      async.forEachSeries(res.rows, function(lotValue, nextLot){
        var lotId = lotValue.id_lot;
        async.series([
          // Test Si Autre Matricule Participer
          function(para_cb) {
            let queryGetLastMatriculeParticipe = "select p_lot.id_pers  " +
              " FROM p_ldt " +
              " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
              " WHERE 1=1" +
              " AND p_ldt.id_dossier = 951 " +
              " AND p_ldt.date_deb_ldt >= '"+options.date_deb+"' " +
              " AND p_ldt.date_deb_ldt <= '"+options.date_fin+"' " +
              " AND p_lot.id_lot = "+lotId+" "+
              " "+query_where+" "+
              " AND p_lot.id_etape = 4882 " +
              " ORDER BY p_ldt.id_ldt DESC LIMIT 1";
            Ldt.query(queryGetLastMatriculeParticipe, function (errorcb, resnew) {
              if(errorcb)
              {
                return para_cb(errorcb);
              }else
              {
                let id_persreturn = 0;
                if(resnew.rows !== 0)
                {
                  id_persreturn = resnew.rows[0].id_pers;
                }
                return para_cb(null, id_persreturn);
              }
            });
          }
        ],function(errorPara, resultPara){
          if(errorPara)
          {
            return next(errorPara);
          }
          else
          {
            if(resultPara[0].toString() === options.id_pers.toString())
            {
              arrayLotSaisie.push(lotId);
              nextLot();
            }
            else
            {
              nextLot();
            }
          }
        });
      },function(errorEachSeries){

      });*/

    });
  },
  getListeLotGpaoUniqueSaisieValide: function(options, next) {
    let query_where = " AND p_lot.id_etat = 2 ";
    if(options.lot_client != "")
    {
      query_where += " AND p_lot.id_lotclient = "+options.lot_client+" ";
    }
    let query_lotgpao = " select p_lot.id_lot  " +
      " FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
      " WHERE 1=1" +
      " AND p_ldt.id_dossier = 951 " +
      " AND p_ldt.date_deb_ldt >= '"+options.date_deb+"' " +
      " AND p_ldt.date_deb_ldt <= '"+options.date_fin+"' " +
      " AND p_ldt.id_pers = "+options.id_pers+" AND p_lot.id_pers = "+options.id_pers+" " +
      " "+query_where+" "+
      " AND p_lot.id_etape = 4882 " +
      " GROUP BY p_lot.id_lot ";
    Ldt.query(query_lotgpao, function (err, res) {
      if (err)
      {
        return next(err);
      }
      let arrayLotSaisie = [];
      arrayLotSaisie = _.pluck(res.rows, 'id_lot');
      return next(null, arrayLotSaisie);
      //console.log(res.rows);
/*      async.forEachSeries(res.rows, function(lotValue, nextLot){
        var lotId = lotValue.id_lot;
        async.series([
          // Test Si Autre Matricule Participer
          function(para_cb) {
            let queryGetLastMatriculeParticipe = "select p_lot.id_pers  " +
              " FROM p_ldt " +
              " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
              " WHERE 1=1" +
              " AND p_ldt.id_dossier = 951 " +
              " AND p_ldt.date_deb_ldt >= '"+options.date_deb+"' " +
              " AND p_ldt.date_deb_ldt <= '"+options.date_fin+"' " +
              " AND p_lot.id_lot = "+lotId+" "+
              " "+query_where+" "+
              " AND p_lot.id_etape = 4882 " +
              " ORDER BY p_ldt.id_ldt DESC LIMIT 1";
            Ldt.query(queryGetLastMatriculeParticipe, function (errorcb, resnew) {
              if(errorcb)
              {
                return para_cb(errorcb);
              }else
              {
                let id_persreturn = 0;
                if(resnew.rows !== 0)
                {
                  id_persreturn = resnew.rows[0].id_pers;
                }
                return para_cb(null, id_persreturn);
              }
            });
          }
        ],function(errorPara, resultPara){
          if(errorPara)
          {
            return next(errorPara);
          }
          else
          {
            if(resultPara[0].toString() === options.id_pers.toString())
            {
              arrayLotSaisie.push(lotId);
              nextLot();
            }
            else
            {
              nextLot();
            }
          }
        });
      },function(errorEachSeries){
        return next(null, arrayLotSaisie);
      });*/

    });
  },

  getListeLotGpaoUniqueSaisieRejet: function(options, next) {
    let query_where = " AND p_lot.id_etat = 3 ";
    if(options.lot_client != "")
    {
      query_where += " AND p_lot.id_lotclient = "+options.lot_client+" ";
    }
    let query_lotgpao = " select p_lot.id_lot  " +
      " FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
      " WHERE 1=1" +
      " AND p_ldt.id_dossier = 951 " +
      " AND p_ldt.date_deb_ldt >= '"+options.date_deb+"' " +
      " AND p_ldt.date_deb_ldt <= '"+options.date_fin+"' " +
      " AND p_ldt.id_pers = "+options.id_pers+" " +
      " "+query_where+" "+
      " AND p_lot.id_etape = 4882 " +
      " GROUP BY p_lot.id_lot ";
    Ldt.query(query_lotgpao, function (err, res) {
      if (err)
      {
        return next(err);
      }
      let arrayLotSaisie = [];
      //console.log(res.rows);
      async.forEachSeries(res.rows, function(lotValue, nextLot){
        var lotId = lotValue.id_lot;
        async.series([
          // Test Si Autre Matricule Participer
          function(para_cb) {
            let queryGetLastMatriculeParticipe = "select p_lot.id_pers  " +
              " FROM p_ldt " +
              " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
              " WHERE 1=1" +
              " AND p_ldt.id_dossier = 951 " +
              " AND p_ldt.date_deb_ldt >= '"+options.date_deb+"' " +
              " AND p_ldt.date_deb_ldt <= '"+options.date_fin+"' " +
              " AND p_lot.id_lot = "+lotId+" "+
              " "+query_where+" "+
              " AND p_lot.id_etape = 4882 " +
              " ORDER BY p_ldt.id_ldt DESC LIMIT 1";
            Ldt.query(queryGetLastMatriculeParticipe, function (errorcb, resnew) {
              if(errorcb)
              {
                return para_cb(errorcb);
              }else
              {
                let id_persreturn = 0;
                if(resnew.rows !== 0)
                {
                  id_persreturn = resnew.rows[0].id_pers;
                }
                return para_cb(null, id_persreturn);
              }
            });
          }
        ],function(errorPara, resultPara){
          if(errorPara)
          {
            return next(errorPara);
          }
          else
          {
            if(resultPara[0].toString() === options.id_pers.toString())
            {
              arrayLotSaisie.push(lotId);
              nextLot();
            }
            else
            {
              nextLot();
            }
          }
        });
      },function(errorEachSeries){
        return next(null, arrayLotSaisie);
      });

    });
  },
  /**
   * Fonction recuperation Lot Gpao Par Type facture
   */
  getLotGpaoByTypeFacture: function(listeLot, type_facture,next){
    console.log("Type facture ="+type_facture);
    let queryFacture = "SELECT id_lot FROM facture where id_lot IN ("+listeLot+")" +
      "AND type_acte = "+type_facture+" " +
      "GROUP BY id_lot";
    Solimu.query(queryFacture, function (err, res) {
      if (err)
        return next(err);
      return next(null, res.rows);
    });
  },
  /***
   * Recuperation liste facture par listeLot
   * @param listeFactureByListeLot
   * @param callback
   */
  getListeFactureWrite: function(listeFactureByListeLot,etat, next) {
    let sqlwhere = "";
    if(etat != '')
    {
      sqlwhere += " AND type_acte = "+etat+  " ";
    }
    let queryFacture = "SELECT count(id) as nombre FROM facture where id_lot IN ("+listeFactureByListeLot+")" +
      " "+sqlwhere+" ";
    Solimu.query(queryFacture, function (err, res) {
      if (err)
        return next(err);
      let nombreVal = 0;
      if(res.rows.length !== 0)
      {
        nombreVal = res.rows[0].nombre;
      }
      return next(null, nombreVal);
    });
  },
  /**
   * Get Nombre Acte Saisie
   * @param listeFactureByListeLot
   * @param next
   */
  getNombreLigneActeFacture: function(listeFactureByListeLot,etat, next) {
    let sqlwhere = "";
    if(etat != '')
    {
      sqlwhere += " AND facture.type_acte = "+etat+" ";
    }
    let queryFacture = "select count(*) as nombre from data_traitement " +
      " LEFT JOIN traite_facture ON traite_facture.id = data_traitement.id_traite_facture " +
      " LEFT JOIN facture ON facture.id = data_traitement.id_facture " +
      " where data_traitement.id_lot_gpao IN ("+listeFactureByListeLot+") AND traite_facture.is_write = TRUE " +
      " AND id_champs_traite IN (131,237) "+sqlwhere+" ";
    Solimu.query(queryFacture, function (err, res) {
      if (err)
        return next(err);
      let nombreVal = 0;
      if(res.rows.length !== 0)
      {
        nombreVal = res.rows[0].nombre;
      }
      return next(null, nombreVal);
    });
  },
  /**
   * Recuperation heure prod interval
   * @param options
   * @param next
   */
  getHeurProdEntreIntervalDateEtMatricule: function(options, next) {
    let debutFiltre = '';
    let finFiltre = '';
    var weeknumber_last_week = moment().subtract(2, 'weeks').week();
    var object_week = moment().subtract(2, 'weeks');
    debutFiltre = object_week.day("Sunday").format('YYYYMMDD');
    let query_where = "";
    if (options.lot_client != "") {
      query_where += " AND p_lot.id_lotclient = " + options.lot_client + " ";
    }
    if (options.etat_solimut !== "") {
      query_where += " AND p_lot.id_etat = " + options.etat_solimut + " ";
    }
    let query_lotgpao = "select" +
      " SUM(DATE_PART('epoch', to_timestamp(p_ldt.date_fin_ldt||' '||p_ldt.h_fin, 'YYYYMMDD HH24:MI:SS') - to_timestamp(p_ldt.date_deb_ldt||' '||p_ldt.h_deb, 'YYYYMMDD HH24:MI:SS') ))/3600 as duree " +
      " FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot " +
      " WHERE 1=1" +
      " AND p_ldt.id_dossier = 951 " +
      " AND p_ldt.date_deb_ldt >= '" + debutFiltre + "' " +
      " AND p_ldt.date_deb_ldt <= '" + options.date_fin + "' " +
      //" AND p_ldt.id_pers = " + options.id_pers + " " +
      " " + query_where + " " +
      " AND p_lot.id_lot IN ("+options.listelotSaisie+") AND id_type_ldt = 0"+
      " AND p_lot.id_etape = 4882 " +
      "";
    if(options.id_pers.toString() === '1558')
    {
      //console.log(query_lotgpao);
    }
    Ldt.query(query_lotgpao, function (err, res) {
      if (err)
        return next(err);
      let duree = 0;
      if(res.rows.length !== 0)
      {
        duree = parseFloat(res.rows[0].duree);
        duree = duree.toFixed(2);
      }
      if(isNaN(duree))
      {
        duree = 0;
      }
      next(null, duree);
    });
  },
  getEchantillonControllerParDateEtMatriculeAndListeLot: function(option,next) {
    var obj = {};
    async.series([
      function(callback){
        if(option.id_etape == "" || option.id_etape == "4882")
        {
          var optionTemp = {};
          optionTemp.date_deb = option.date_deb;
          optionTemp.date_fin = option.date_fin;
          optionTemp.id_pers = option.id_pers;
          optionTemp.id_etape = 4882;
          optionTemp.id_lot_client = option.id_lot_client;
          optionTemp.listeLotSaise = option.listeLotSaise;
          Solimu.getLotAndLibelleSaisieAndListeLot(optionTemp,callback);
        }else
        {
          var array = [];
          callback(null,array);
        }
      }
    ],function(error,retour)
    {
      if(error) return next(error);
      var libelles = "";
      if(retour[0].length != 0) {
        //console.log(retour[0]);
        libelles = _.pluck(retour[0], 'libelle').join(",");
        async.series([
          function(callback){
            Solimu.getLotCQReprise(libelles,callback);
          }
        ],function(error_2,lot_Cq)
        {
          if(error_2)
          {
            return next(error_2);
          }
          else
          {
            if(lot_Cq[0].length === 0) {
              obj.nombre_echantillon = 0;
              obj.nombre_es = 0;
              obj.nombre_nrrg = 0;
              obj.taux_de_qualite=0;
              return next(null,obj);
            }
            else
            {
              var lot_cq_reprise = _.pluck(lot_Cq[0], 'id_lot').join(",");
              async.parallel([
                //NOMBRE EchANTILLON
                function (callback) {
                  Solimu.getNombreEchantillonControle(lot_cq_reprise,callback);
                },
                // NOMBRE ES
                function (callback) {
                  Solimu.getNombreEchantillonControleByStatus(lot_cq_reprise,3,callback);
                },
                // NOMBRE NRRG
                function (callback) {
                  Solimu.getNombreEchantillonControleByStatus(lot_cq_reprise,2,callback);
                },
              ],function(error_parralel,retour_parallele)
              {
                if(error_parralel) return next(error_parralel);

                obj.nombre_echantillon = retour_parallele[0][0].nombre_echant;
                obj.nombre_es = parseInt(retour_parallele[1][0].nombre_echant);
                obj.nombre_nrrg = parseInt(retour_parallele[2][0].nombre_echant);
                var somme_es_nnr = obj.nombre_es + obj.nombre_nrrg;
                var float_es = parseFloat(somme_es_nnr);
                var taux = 100 - ((float_es*100) / parseFloat(retour_parallele[0][0].nombre_echant));
                if(!taux)
                {
                  taux = "0";
                }
                obj.taux_de_qualite = taux;
                return next(null,obj);
              });
            }
          }
        });
      }
      else
      {
        obj.nombre_echantillon = 0;
        obj.nombre_es = 0;
        obj.nombre_nrrg = 0;
        obj.taux_de_qualite=0;
        return next(null,obj);
      }
    });
  },
  /**
   * Recuperation liste echantillon Rejet par Date et Matricule
   * @param option
   * @param next
   */
  getEchantillonRejetParDateEtMatricule: function(option, next) {
    // Recuperation Lot unique
    async.series([
      function(callback){
        if(option.id_etape == "" || option.id_etape == "4882")
        {
          var optionTemp = {};
          optionTemp.date_deb = option.date_deb;
          optionTemp.date_fin = option.date_fin;
          optionTemp.id_pers = option.id_pers;
          optionTemp.id_etape = 4882;
          optionTemp.id_lot_client = option.id_lot_client;
          optionTemp.listeLotSaise = option.listeLotSaise;

          Solimu.getLotAndLibelleSaisieRejetAndListeLot(optionTemp,callback);
        }else
        {
          var obj= {};
          obj.nombre_echantillon = 0;
          obj.nombre_erreur = 0;
          return next(null,obj);
        }
      }
    ],function(error,retour)
    {
      if(error) return next(error);
      var libelles = "";
      if(retour[0].length != 0) {
        //console.log(retour[0]);
        libelles = _.pluck(retour[0], 'libelle').join(",");
        async.series([
          function(callback){
            Solimu.getLotCQRejet(libelles,callback);
          }
        ],function(error_2,lot_Cq)
        {
          if(error_2)
          {
            return next(error_2);
          }
          else
          {
            var lot_cq_rejet = _.pluck(lot_Cq[0], 'id_lot').join(",");
            async.parallel([
              //NOMBRE EchANTILLON
              function (callback) {
                Solimu.getNombreEchantillonRejet(lot_cq_rejet,callback);
              },
              // NOMBRE ES
              function (callback) {
                Solimu.getNombreErreurRejet(lot_cq_rejet,callback);
              },
            ],function(error_parralel,retour_parallele)
            {
              if(error_parralel) return next(error_parralel);
              var obj= {};
              obj.nombre_echantillon = retour_parallele[0][0].nombre;
              obj.nombre_erreur = parseInt(retour_parallele[1][0].nombre);
              return next(null,obj);
            });
          }
        });
      }
      else
      {
        var obj= {};
        obj.nombre_echantillon = 0;
        obj.nombre_erreur = 0;
        return next(null,obj);
      }
    });

  },
  getLotAndLibelleSaisieAndListeLot: function (option,callback) {
    var sql_lotclient = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    var query = "SELECT DISTINCT p_ldt.id_lot,''''||p_lot.libelle||'''' as libelle,max(p_ldt.date_deb_ldt) as date_traitement FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot  WHERE 1 = 1  AND p_ldt.date_deb_ldt >= '"+option.date_deb+"' " +
      " AND p_ldt.date_deb_ldt <= '"+option.date_fin+"' AND p_lot.id_lot IN ("+option.listeLotSaise+") " +
      " AND p_ldt.id_pers = "+option.id_pers+" "+sql_lotclient+" AND p_lot.id_dossier = 951 AND p_lot.id_etat = 2 " +
      " AND p_lot.id_etape = "+option.id_etape+" GROUP BY p_ldt.id_lot,p_lot.libelle";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getLotAndLibelleSaisieRejetAndListeLot: function (option,callback) {
    var sql_lotclient = "";
    if(option.id_lot_client=="stock")
    {
      sql_lotclient = "AND p_ldt.id_lotclient IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696) ";
    }
    else if(option.id_lot_client == "entrant")
    {
      sql_lotclient= "AND p_ldt.id_lotclient NOT IN (31349,31350,31351,31398,31399,31400,31401,31488,31530,31696,31788,31633,32263)";
    }
    else if(option.id_lot_client != "")
    {
      sql_lotclient = "AND p_ldt.id_lotclient = "+option.id_lot_client+" ";
    }
    var query = "SELECT DISTINCT p_ldt.id_lot,''''||p_lot.libelle||'''' as libelle,max(p_ldt.date_deb_ldt) as date_traitement FROM p_ldt " +
      " LEFT JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot  WHERE 1 = 1  AND p_ldt.date_deb_ldt >= '"+option.date_deb+"' " +
      " AND p_ldt.date_deb_ldt <= '"+option.date_fin+"' AND p_lot.id_lot IN ("+option.listeLotSaise+") " +
      " AND p_ldt.id_pers = "+option.id_pers+" "+sql_lotclient+" AND p_lot.id_dossier = 951 AND p_lot.id_etat = 3 " +
      " AND p_lot.id_etape = "+option.id_etape+" GROUP BY p_ldt.id_lot,p_lot.libelle";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getNombreEchantillonRejet: function(listLotRejet, callback){
    var query = "SELECT count(*) as nombre FROM p_lot WHERE id_lot IN ("+listLotRejet+") AND id_etat IN (5,2,3) ";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getNombreErreurRejet: function(listLotRejet, callback){
    var query = "SELECT count(*) as nombre FROM p_lot WHERE id_lot IN ("+listLotRejet+") AND id_etat IN (2,3) ";
    Ldt.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  /**
   * Fonction dispatch Facture
   * @param callback
   */
  dispatchFactureNonDispatcher: function(next) {
    let listeFacture = [];
    async.parallel([
      // Recuperation Liste Facture NON Assigner
      function(callback) {
        Solimu.getListeFactureNonAssigner(callback);
      },
      // Recuperation Liste Code Acte HOSPI
      function(callback) {
        Solimu.getListeCodeActeParTypeActe(1, callback);
      },
      // Recuperation Liste Code Acte SE
      function(callback) {
        Solimu.getListeCodeActeParTypeActe(2, callback);
      },
      // Recuperation Liste Code Acte Taux SE
      function(callback) {
        Solimu.getListeCodeActeTauxSE(callback);
      }
    ],function(erreur_recuperationListeFacture, result_recuperationListeFacture){
      if(erreur_recuperationListeFacture)
      {
        next(erreur_recuperationListeFacture);
      }
      else
      {
        // Variable Code Acte
        var listeCodeActeHospi = _.pluck(result_recuperationListeFacture[1],'libelle');
        var listeCodeActeSE = _.pluck(result_recuperationListeFacture[2],'libelle');
        var listeCodeActeSEAvecTaux = result_recuperationListeFacture[3];
        // Verification si facture à traite existe
        if(result_recuperationListeFacture[0].length !== 0)
        {
          // LOOP FACTURE TROUVER
          async.forEachSeries(result_recuperationListeFacture[0], function(facture, next_facture){
            // Recuperation Si Code acte Contient HOSPI
            async.series([
              function(cb_check) {
                Solimu.checkFactureCodeActeHOSPI(facture, listeCodeActeHospi, listeCodeActeSE, listeCodeActeSEAvecTaux, cb_check);
              }
            ],function(erreur_checkCodeActe, resultCheckCodeActe){
              var type_acte = 2;
              // SI FACTURE CONTIENT HOSPI
              if(resultCheckCodeActe[0] === true)
              {
                type_acte = 1;
              }
              listeFacture.push({
                id_facture: facture.id_facture,
                type_acte: type_acte
              });
              async.series([
                function(cb_modif) {
                  Solimu.changerEtatActe(type_acte,facture.id_facture,cb_modif);
                }
              ],function(erreur_modif, result_modif){
                if(erreur_modif)
                {
                  next(erreur_modif);
                }
                else
                {
                  next_facture();
                }
              });
            });
          },function(erreurFacture){
            if(erreurFacture) {
              return next(erreurFacture);
            }
            return next(null, listeFacture);
            //return next(null, '');
          });
        }
        else
        {
          return next(null, 'Pas de facture à ');
        }
      }
    });
  },
  /***
   * Fonction recuperation liste facture non assigner
   */
  getListeFactureNonAssigner: function(callback) {
    var query = "select id_lot,id_lot_fichier,id as id_facture from facture where id_etat = 2 AND id > 84687 AND type_acte is null order by id";
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  /***
   * Fonction Recuperation Liste code acte Par Type Acte
   */
  getListeCodeActeParTypeActe: function(type_acte, callback) {
    var query = "SELECT libelle FROM code_acte WHERE type_acte = "+type_acte;
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  /***
   * Fonction Recuperation Liste Code Acte Avec Taux SE
   */
  getListeCodeActeTauxSE: function(callback) {
    var query = "SELECT * FROM code_acte WHERE type_acte = 2 AND taux_se IS NOT NULL AND taux_se != ''";
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  /***
   * Fonction Verification Si Facture Contient code acte HOSPI
   */
  checkFactureCodeActeHOSPI: function(facture, listeCodeActeHospi, listeCodeActeSE, listeCodeActeSEAvecTaux, callback){
    var listeCodeActeLot = [];
    var listeTauxSe = _.pluck(listeCodeActeSEAvecTaux,'taux_se');
    async.series([
      function(cb_listeCodeActe) {
        Solimu.getListeCodeActeParLotGpao(facture, cb_listeCodeActe);
      }
    ],function(error_listeCodeActe, result_listeCodeActe){
      if(error_listeCodeActe)
      {
        return callback(error_listeCodeActe);
      }
      listeCodeActeLot = result_listeCodeActe[0];
      // LOOP CODE ACTE
      async.forEachSeries(listeCodeActeLot, function(data_acte, next_codeacte){
        let code_acte = data_acte.valeur;
        let id_traite_facture = data_acte.id_traite_facture;
        let id_champs_traite = data_acte.id_champs_traite;
        // LOOP CODE ACTE TAUX SE
        async.forEachSeries(listeCodeActeSEAvecTaux, function(codeActeSE, next_se){
          if(code_acte == codeActeSE.libelle)
          {
            // Recuperation Valeur Taux Acte
            let valeurChampsTraite = "";
            if(id_champs_traite == "131")
            {
              valeurChampsTraite = "139";
            }
            else
            {
              valeurChampsTraite = "243";
            }
            // Recuperation Taux Traite
            async.series([
              function(cb_series) {
                Solimu.getTauxFromIdChampsTraite(valeurChampsTraite, id_traite_facture, cb_series);
              }
            ],function(erreur_taux, result_taux){
              if(erreur_taux) {
                return callback(erreur_taux);
              }
              let tauxActe = "";
              tauxActe = result_taux[0][0].valeur;
              if(listeTauxSe.includes(tauxActe))
              {
                // Load Next code acte SE
                next_se();
              }
              else
              {
                // Code acte Hsopi Found
                return callback(null, true);
              }
            });
          }
          else
          {
            // au suivant (code acte Se);
            next_se();
          }
        },function(err_EachSeries_codeacteSE){
          if(err_EachSeries_codeacteSE) {
            return callback(err_EachSeries_codeacteSE);
          }
          // FIN LOOP code Acte SE ---> Debut check Code Acte Hospi Brute
          if(listeCodeActeHospi.includes(code_acte))
          {
            // Load Next code acte SE
            return callback(null, true);
          }
          else
          {
            // Charger Code Acte Suivant
            next_codeacte();
          }
        });
      },function(err_EachSeries_codeacte){
        // FIN LOOP CODE ACTE ---> Pas de Code Acte HOSPI TROUVER
        if(err_EachSeries_codeacte)
        {
          return callback(err_EachSeries_codeacte);
        }
        return callback(null, false);
      });
    });
  },
  /**
   * Fonction recuperation taux
   * @param valeurChampsTraite
   * @param id_traite_facture
   * @param callback
   */
  getTauxFromIdChampsTraite: function(valeurChampsTraite, id_traite_facture, callback) {
    var query = "select valeur from data_traitement WHERE id_traite_facture = "+id_traite_facture+" AND id_champs_traite = "+valeurChampsTraite+"";
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  /**
   * Fonction recupration code acte suivant facture
   * @param facture
   * @param callback
   */
  getListeCodeActeParLotGpao: function(facture, callback) {
    var query = "select data_traitement.id_traite_facture,valeur,data_traitement.id_champs_traite from data_traitement " +
      "INNER JOIN traite_facture ON traite_facture.id = data_traitement.id_traite_facture "+
      " where traite_facture.is_write = true AND data_traitement.id_champs_traite in (131,237) " +
      " ANd data_traitement.id_lot_gpao = "+facture.id_lot+" AND data_traitement.id_facture = "+facture.id_facture+"";
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  /***
   * Fonction pour modifier Type Acte
   */
  changerEtatActe: function(type_acte, id_facture, callback) {
    var query = "UPDATE facture SET  type_acte = "+ type_acte + " WHERE id = " + id_facture + "";
    Solimu.query(query, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  }
};

