/**
 * Prime.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @author :: Jack
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',
  tableName: 'tdb_prime',
  autoCreatedAt: false,
  autoUpdatedAt: false,

  attributes: {
    id : {
      type : 'integer',
      unique: true,
      columnName : 'id'
    },
    id_spec : {
      type : 'integer',
      columnName : 'id_spec'
    },
    id_s_spec : {
      type : 'integer',
      columnName : 'id_sousspec'
    },

    date :{
      type : 'string',
      columnName : 'date'
    },
    id_crenaux :{
      type : 'integer',
      columnName : 'id_crenaux'
    },

    cible : {
      type : 'integer',
      columnName : 'qte_cible'
    },

    reel : {
      type : 'integer',
      columnName : 'qte_reel'
    },

    prime : {
      type : 'boolean',
      columnName : 'prime'
    },

    montant : {
      type : 'float',
      columnName : 'montant'
    },
    json_titulaire : {
      type : 'string',
      columnName : 'lst_titulaire'
    },
    json_renfort : {
      type : 'string',
      columnName : 'lst_renfort'
    }
  },

  findprime : function (option,callback) {
    Prime.find({date:option}).exec(function (err, records) {
      if(err) return callback(err);
      return callback(null,records);
    });
  }
  ,
  findprimeByDossier : function (option,callback) {
    Prime.find({id_spec:option.id_dossier,date:option.pdate}).sort('id_s_spec asc').sort('id_crenaux asc').exec(function (err, records) {
      if(err) return callback(err);
      return callback(null,records);
    });
  }
  ,findprimeByDossierLot : function (option,callback) {
    Prime.find({id_spec:option.id_dossier,date:option.pdate,id_s_spec:option.id_lot}).sort('id_crenaux asc').exec(function (err, records) {
      if(err) return callback(err);
      return callback(null,records);
    });
  }
  ,

  findQte :  function (option,callback) {
    async.series([
      function (callback) {
        var sql = "SELECT  sum(to_number('0'||quantite,'99999')) as qte "+
        "FROM public.p_ldt JOIN r_personnel ON r_personnel.id_pers = p_ldt.id_pers "+
        "WHERE date_deb_ldt = '"+option.pdate+"' AND id_dossier = "+option.id_dossier+" AND id_lotclient = "+option.id_lotclient+" AND r_personnel.id_departement ="+option.id_departement+" "+option.minisql;

        ////console.log(sql);
        Prime.query(sql, function (err, res) {
          if (err) {
            return callback({er: err, lib: "findQte Titulaire"});
          } else {
            ////console.log("rf:"+res.rows[0].ct);
            return callback(null, {qte:res.rows[0].qte});
          }
        });
      },

      function (callback) {
        var sql = "SELECT  sum(to_number('0'||quantite,'99999')) as qte "+
          "FROM public.p_ldt JOIN r_personnel ON r_personnel.id_pers = p_ldt.id_pers "+
          "WHERE date_deb_ldt = '"+option.pdate+"' AND id_dossier = "+option.id_dossier+" AND id_lotclient = "+option.id_lotclient+" AND r_personnel.id_departement !="+option.id_departement+" "+option.minisql;

        Prime.query(sql, function (err, res) {
          if (err) {
            return callback({er: err, lib: "findQte Renfort"});
          } else {
            ////console.log("rf:"+res.rows[0].ct);
            return callback(null, {qte:res.rows[0].qte});
          }
        });
      }
    ],function (err,results) {
      if(err) return callback({er:err,lib:"find qte async"});
      return callback(null, {ref:results[1].qte,pri:results[0].qte});
    });
  },

  findLstPers :  function (option,callback) {
    async.series([
      function (callback) {
        var sql = "SELECT  r_personnel.id_pers "+
          "FROM public.p_ldt JOIN r_personnel ON r_personnel.id_pers = p_ldt.id_pers "+
          "WHERE date_deb_ldt = '"+option.pdate+"' AND id_dossier = "+option.id_dossier+" AND id_lotclient = "+option.id_lotclient+" AND r_personnel.id_departement ="+option.id_departement+" "+option.minisql+"" +
          "  GROUP BY r_personnel.id_pers ";

        ////console.log(sql);
        Prime.query(sql, function (err, res) {
          if (err) {
            return callback({er: err, lib: "findLstPers Titulaire"});
          } else {
            ////console.log("rf:"+res.rows[0].ct);
            var lst = [];
            async.eachSeries(res.rows,function(prime,callback){
              lst.push(prime.id_pers);
              callback();
            },function(erreur){
              return callback(null, {lst:lst});
            })

          }
        });
      },

      function (callback) {
        var sql = "SELECT  r_personnel.id_pers "+
          "FROM public.p_ldt JOIN r_personnel ON r_personnel.id_pers = p_ldt.id_pers "+
          "WHERE date_deb_ldt = '"+option.pdate+"' AND id_dossier = "+option.id_dossier+" AND id_lotclient = "+option.id_lotclient+" AND r_personnel.id_departement !="+option.id_departement+" "+option.minisql+"" +
          "  GROUP BY r_personnel.id_pers ";

        Prime.query(sql, function (err, res) {
          if (err) {
            return callback({er: err, lib: "findLstPers Renfort"});
          } else {
            ////console.log("rf:"+res.rows[0].ct);
            var lst = [];
            async.eachSeries(res.rows,function(prime,callback){
              lst.push(prime.id_pers);
              callback();
            },function(erreur){
              return callback(null, {lst:lst});
            })
          }
        });
      }
    ],function (err,results) {
      if(err) return callback({er:err,lib:"find qte async"});
      return callback(null, {ref:results[1].lst,pri:results[0].lst});
    });
  }
};

