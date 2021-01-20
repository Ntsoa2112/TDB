/**
 * Created by 8032 on 06/07/2016.
 */

module.exports = {
  connection: 'ConnexionPostgresql', // connexion à la base, nom du base:"ConnexionPostgresql"
  tableName: 'p_dossier', // nom du table qui est associé avec le modele Dossier
  autoCreatedAt: false,
  autoUpdatedAt: false,

  //attributs
  attributes: {
    id_dossier: { //id du dossier
      type: 'integer',
      required: true,
      unique: true,
      primaryKey: true,
      columnName: 'id_dossier'
    },

    num_dossier: { //numero du dossier
      type: 'string',
      required: true,
      unique: true,
      columnName: 'num_dossier'
    },

    atelier: { //atelier
      type: 'string',
      required: true,
      unique: true,
      columnName: 'atelier'
    },

    corresp: { //correspondance
      type: 'string',
      required: true,
      unique: true,
      columnName: 'corresp'
    },

    demarrage: { //demarrage
      type: 'string',
      required: true,
      unique: true,
      columnName: 'demarrage'
    },

    delai: { //delai
      type: 'string',
      required: true,
      unique: true,
      columnName: 'delai'
    },

    date_livr: { //date livr
      type: 'string',
      required: true,
      unique: true,
      columnName: 'date_livr'
    },

    vitesse_estime: { //vitesse estime
      type: 'string',
      required: true,
      unique: true,
      columnName: 'vitesse_estime'
    },

    vitesse_reelle: { //vitesse reelle
      type: 'string',
      required: true,
      unique: true,
      columnName: 'vitesse_reelle'
    },

    volume_prevue: { //volume prevue
      type: 'string',
      required: true,
      unique: true,
      columnName: 'volume_prevue'
    },

    resource_op: { //resource op
      type: 'string',
      required: true,
      unique: true,
      columnName: 'resource_op'
    },

    resource_cp: { //resource cp
      type: 'string',
      required: true,
      unique: true,
      columnName: 'resource_cp'
    },

    id_pers_cp: { //id pers cp
      type: 'integer',
      required: true,
      unique: true,
      columnName: 'id_pers_cp'
    },

    id_equipe: { //id equipe
      type: 'integer',
      required: true,
      unique: true,
      columnName: 'id_equipe'
    },

    /*id_d: { //id d
     type: 'integer',
     required: true,
     unique: true,
     columnName:'id_d'
     },*/

    id_etat: { //id etat
      type: 'integer',
      required: true,
      unique: true,
      columnName: 'id_etat'
    },

    id_atelier: { //id atelier
      type: 'integer',
      required: true,
      unique: true,
      columnName: 'id_atelier'
    },

    credit_heure: { //credit heure
      type: 'bigint',
      required: true,
      unique: true,
      columnName: 'credit_heure'
    }

    /*heure_consomme: { //heure consomme
     type: 'bigint',
     required: true,
     unique: true,
     columnName:'heure_consomme'
     },*/


  }
  ,specDossier: function(option, callback) {


    var sql = "select * from tb_lien_sp_dossier"+
      " LEFT JOIN p_dossier ON tb_lien_sp_dossier.id_dossier=p_dossier.id_dossier" +
      " LEFT JOIN tb_specialite ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec" +
      " where 1=1 AND tb_lien_sp_dossier.id_spec = "+option.id_spec+" order by num_dossier";

    //console.log("spec dossier==================>"+sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });

  }
  ,groupeDe: function(option, callback) {


 /* var sql = "select * from tb_lien_sp_dossier"+
    " LEFT JOIN p_dossier ON tb_lien_sp_dossier.id_dossier=p_dossier.id_dossier" +
    " LEFT JOIN tb_specialite ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec" +
    " where 1=1 AND tb_lien_sp_dossier.id_spec = "+option.id_spec+" order by num_dossier";*/
    var sql = "select r_personnel.nom,r_personnel.prenom,r_personnel.id_pers from r_groupe"+
      " LEFT JOIN r_personnel ON r_groupe.id_pers=r_personnel.id_pers" +
      " where 1=1 AND r_groupe.id_cp = "+option.groupe+" order by r_personnel.id_pers asc";

  //console.log("spec dossier==================>"+sql);

  Ldt.query(sql, function (err, res) {
    if (err) return callback(err);
    return callback(null, res.rows);
  });

}
  ,dossier: function(option, callback) {


  var sql = "select id_dossier,num_dossier from p_dossier order by num_dossier";

  //console.log("spec dossier==================>"+sql);

  Ldt.query(sql, function (err, res) {
    if (err) return callback(err);
    return callback(null, res.rows);
  });

}

  ,personnel: function(option, callback) {


    var sql = "select id_pers,appelation,nom,prenom from r_personnel where actif = true " +
      " order by id_pers asc";

    //console.log("spec dossier==================>"+sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });

  }

  ,specialite: function(option, callback) {


    var sql = "select * from tb_specialite order by id_spec";

    //console.log("spec==================>"+sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });

  }


  ,ldtSpec: function(option, callback) {


  var sql = "select SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as somme,"+
    " sum(to_number('0'||quantite,'99999')) as qte,id_type_ldt,tb_specialite.id_spec,tb_specialite.libelle, sum(to_number('0'||nbre_erreur,'99999')) as err " +
    " FROM p_ldt"+
    " JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"+
    " JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier"+
    " JOIN tb_lien_sp_dossier ON p_dossier.id_dossier=tb_lien_sp_dossier.id_dossier"+
    " JOIN tb_specialite ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec"+
    " where 1=1 and id_type_ldt = 0 "+
    " AND to_date(date_deb_ldt,'yyyymmdd') between to_date('"+option.datedeb+"','yyyymmdd') and to_date('"+option.datefin+"','yyyymmdd') "+
    " GROUP BY id_type_ldt,tb_specialite.id_spec,tb_specialite.libelle"+
    " order by tb_specialite.id_spec";

  //console.log("ldtSpec Ins dossier==================>"+sql);

  Ldt.query(sql, function (err, res) {
    if (err){
      return callback(err);
    }else{
      //console.log("ldt==================>"+res.rows);
      var opt = {};
      opt.id = 1202;
      opt.type = 11;
      opt.data = res.rows;
      sails.sockets.blast("test",opt);
      return callback(null,res.rows);
    }

  });

}

  ,ldtNbOpSpec: function(option, callback) {


  var sql = "select tb_specialite.id_spec," +
    /*" get_count_resultat(tb_specialite.id_spec,1,'"+option.datedeb+"','"+option.datefin+"') as op," +
    " get_count_resultat(tb_specialite.id_spec,2,'"+option.datedeb+"','"+option.datefin+"') as cp," +*/
    " get_err_ok_spec(tb_specialite.id_spec,'"+option.datedeb+"','"+option.datefin+"') as err," +
    " get_err_iso_spec(tb_specialite.id_spec,'"+option.datedeb+"','"+option.datefin+"') as err_iso," +
    " get_volume_spec(tb_specialite.id_spec,'"+option.datedeb+"','"+option.datefin+"') as volume," +
    " get_cadence_spec(tb_specialite.id_spec) as cadence" +
    " FROM p_ldt" +
    " JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier" +
    " JOIN tb_lien_sp_dossier ON p_dossier.id_dossier=tb_lien_sp_dossier.id_dossier" +
    " JOIN tb_specialite ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec" +
    " where 1=1" +
    " AND to_date(date_deb_ldt,'yyyymmdd') between to_date('"+option.datedeb+"','yyyymmdd') and to_date('"+option.datefin+"','yyyymmdd')" +
    " GROUP BY tb_specialite.id_spec,tb_specialite.libelle" +
    " order by tb_specialite.id_spec";

  //console.log("ldtNbOpSpec Ins dossier==================>"+sql);

  Ldt.query(sql, function (err, res) {
    if (err) return callback(err);
    return callback(null,res.rows);
  });

},

  get_err_ok_spec: function(option, callback) {


  var sql = "select get_err_ok_spec("+option.id_spec+",'"+option.datedeb+"','"+option.datefin+"')" ;

    //console.log("spec err ok==================>"+sql);
  Ldt.query(sql, function (err, res) {
    if (err){
      return callback(err);
      //console.log("err==================>"+err);
    } else{
      //console.log("ok==================>"+res.rows[0].get_err_ok_spec);var opt = {};
      opt.id = option.id_spec;
      opt.type = 0;
      opt.data = res.rows[0].get_err_ok_spec;
      sails.sockets.blast("test",opt);
      return callback(null,res.rows[0].get_err_ok_spec);
    }

  });

},

  get_err_iso_spec: function(option, callback) {


    var sql = "select get_err_iso_spec("+option.id_spec+",'"+option.datedeb+"','"+option.datefin+"')" ;

    //console.log("spec err ok==================>"+sql);
    Ldt.query(sql, function (err, res) {
      if (err){
        return callback(err);
        //console.log("err==================>"+err);
      } else{
        //console.log("iso==================>"+res.rows[0].get_err_iso_spec); var opt = {};
        opt.id = option.id_spec;
        opt.type = 1;
        opt.data = res.rows[0].get_err_iso_spec;
        sails.sockets.blast("test",opt);
        return callback(null,res.rows[0].get_err_iso_spec);
      }

    });

  },

  get_volume_spec: function(option, callback) {


    var sql = "select get_volume_spec("+option.id_spec+",'"+option.datedeb+"','"+option.datefin+"')" ;

    //console.log("spec err ok==================>"+sql);
    Ldt.query(sql, function (err, res) {
      if (err){
        return callback(err);
        //console.log("err==================>"+err);
      } else{
        //console.log("volume==================>"+res.rows[0].get_volume_spec);
        var opt = {};
        opt.id = option.id_spec;
        opt.type = 2;
        opt.data = res.rows[0].get_volume_spec;
        sails.sockets.blast("test",opt);
        return callback(null,res.rows[0].get_volume_spec);
      }

    });

  },

  get_volume_spec_by_type: function(option, callback) {


    var sql = "select get_volume_spec("+option.id_spec+",'"+option.datedeb+"','"+option.datefin+"',"+option.type+")" ;

    //console.log("spec err ok==================>"+sql);
    Ldt.query(sql, function (err, res) {
      if (err){
        return callback(err);
        //console.log("err==================>"+err);
      } else{
        //console.log("volume==================>"+res.rows[0].get_volume_spec);
        var opt = {};
        opt.id = option.id_spec;
        opt.type = 2+option.type;
        opt.data = res.rows[0].get_volume_spec;
        sails.sockets.blast("test",opt);
        return callback(null,res.rows[0].get_volume_spec);
      }

    });

  },
  get_cadence_spec: function(option, callback) {


    var sql = "select get_cadence_spec("+option.id_spec+")" ;

    //console.log("spec err ok==================>"+sql);
    Ldt.query(sql, function (err, res) {
      if (err){
        return callback(err);
        //console.log("err==================>"+err);
      } else{
        //console.log("cadence==================>"+res.rows[0].get_cadence_spec);
        var opt = {};
        opt.id = option.id_spec;
        opt.type = 2;
        opt.data = res.rows[0].get_cadence_spec;
        sails.sockets.blast("test",opt);
        return callback(null,res.rows[0].get_volume_spec);
      }

    });

  },
  /*get ldt par specialité */
  addDossierInSpec: function(option, callback) {


    var sql = "Insert into tb_lien_sp_dossier (id_spec,id_dossier) values ("+option.id_spec+","+option.id_dossier+")";

    //console.log("spec Ins dossier==================>"+sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null,true);
    });

  },

  addPersInGroup: function(option, callback) {


    var sql = "Insert into r_groupe (id_cp,id_pers) values ("+option.idcp+","+option.idpers+")";

    //console.log("group Ins Pers==================>"+sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null,true);
    });

  },

  delPersInGroup: function(option, callback) {


    var sql = "DELETE  from r_groupe where id_cp = "+option.idcp+" AND id_pers = "+option.idpers+"";

    //console.log("group Ins Pers==================>"+sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null,true);
    });

  },

  /*get liste specialité */
  getListSpecialite: function(option, callback) {
    var sql = "select * from tb_specialite";

    //console.log("getListSpecialite Ins dossier==================>"+sql);

    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null,res.rows);
    });

  },

    //lister les id_pers group by id_specialite

  getLPersGBySpec: function(option, callback) {
      var querie = "select p_affectation.id_pers,tb_specialite.id_spec "+
          "from tb_specialite "+
          "join tb_lien_sp_dossier on tb_lien_sp_dossier.id_spec = tb_specialite.id_spec "+
          "join p_dossier on p_dossier.id_dossier = tb_lien_sp_dossier.id_dossier "+
          "join p_affectation on p_affectation.id_dossier = p_dossier.id_dossier "+
          "order by tb_specialite.id_spec asc ";

      Dossier.query(querie,function(err,res) {
          if (err) return callback(err);
          return callback(null,res.rows);
      })


  },

// get erreur ok
    getErrOk: function(option, callback) {
      var querie = "SELECT almerys_p_lot.id_etape as etape,  COUNT( almerys_p_lot.id_etape ) AS nb,tb_specialite.id_spec"+
          " FROM almerys_p_lot"+
          " INNER JOIN p_lot_client ON almerys_p_lot.id_lotclient = p_lot_client.id_lotclient"+
          " LEFT JOIN tb_lien_sp_dossier ON almerys_p_lot.id_dossier=tb_lien_sp_dossier.id_dossier"+
          " LEFT JOIN tb_specialite ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec"+
          " WHERE almerys_p_lot.id_etape <> 943"+
    " AND to_date(date_deb,'yyyymmdd') between to_date('"+option.datedeb+"','yyyymmdd') and to_date('"+option.datefin+"','yyyymmdd')" +
          " AND is_interial=FALSE"+
          " GROUP BY almerys_p_lot.id_etape,tb_specialite.id_spec"+
          " ORDER BY tb_specialite.id_spec,almerys_p_lot.id_etape";
    //console.log(querie);
      Dossier.query(querie,function(err,res) {
          if (err) return callback(err);
          return callback(null,res.rows);
      })


  },

// get erreur ok
    getErrISO: function(option, callback) {
      var querie = "SELECT almerys_p_lot.id_etape as etape,  COUNT( almerys_p_lot.id_etape ) AS nb,tb_specialite.id_spec"+
          " FROM almerys_p_lot"+
          " INNER JOIN p_lot_client ON almerys_p_lot.id_lotclient = p_lot_client.id_lotclient"+
          " LEFT JOIN tb_lien_sp_dossier ON almerys_p_lot.id_dossier=tb_lien_sp_dossier.id_dossier"+
          " LEFT JOIN tb_specialite ON tb_specialite.id_spec=tb_lien_sp_dossier.id_spec"+
          " WHERE almerys_p_lot.id_etape <> 943"+
    " AND to_date(date_deb,'yyyymmdd') between to_date('"+option.datedeb+"','yyyymmdd') and to_date('"+option.datefin+"','yyyymmdd')" +
    " AND to_number('0'||almerys_p_lot.qte,'99999') < 30 " +
          " AND is_interial=FALSE"+
          " GROUP BY almerys_p_lot.id_etape,tb_specialite.id_spec"+
          " ORDER BY tb_specialite.id_spec,almerys_p_lot.id_etape";
    //console.log(querie);
      Dossier.query(querie,function(err,res) {
          if (err) return callback(err);
          return callback(null,res.rows);
      })


  },

  // recuperer etape non affecter

  getNonAffectedEtapes : function (id_dossier, callback) {
    var sql = "select distinct p_etape.* from p_etape where id_etape not in ( select id_oper from p_lien_oper_dossier  where id_dossier = "+id_dossier+") order by libelle asc";
    Dossier.query(sql,function(err,res) {
      if (err) return callback(err);
      return callback(null,res.rows);
    })
  },

  getAffectedEtapes : function (id_dossier, callback) {
    var sql = "select distinct p_etape.* from p_etape where id_etape not in ( select id_oper from p_lien_oper_dossier  where id_dossier = "+id_dossier+") order by libelle asc";
    Dossier.query(sql,function(err,res) {
      if (err) return callback(err);
      return callback(null,res.rows);
    });
  },

  getClient : function (callback) {
    var sql = "select distinct * from p_client  order by nom asc;";
    Dossier.query(sql,function(err,res) {
      if (err) return callback(err);
      return callback(null,res.rows);
    });
  },
  getDetailDossierClient : function (id_dossier, callback) {
    var sql = "select  * from p_dossier where id_dossier="+id_dossier+"  limit 1;";
    Dossier.query(sql,function(err,res) {
      if (err) return callback(err);
      return callback(null,res.rows);
    });
  }


}


