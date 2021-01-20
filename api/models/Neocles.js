/**
 * Neocles.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  connection: 'ConnexionPostgresql',

  attributes: {
   
  },

  getUserRhDetails : function(idPers, idTypeMasque, date, callback){
    let sql = "SELECT nom, prenom, neo_pers_niveau.id_pers, seuille, nb_echantillon  FROM neo_pers_niveau ";
    sql += " LEFT JOIN  neo_niveau ON neo_niveau.id = neo_pers_niveau.id_niveau";
    sql += " LEFT JOIN r_personnel ON r_personnel.id_pers = neo_pers_niveau.id_pers ";
    sql += " LEFT JOIN neo_echantillon_masque ON neo_echantillon_masque.id_niveau = neo_niveau.id ";
    sql += " WHERE neo_pers_niveau.id_pers = $1 ";
    sql += " AND date <= $2 ";
    sql += " AND id_type_masque = $3 ";
    sql += " ORDER BY date desc, neo_pers_niveau.id DESC ";
    sql += " LIMIT 1";

    let param = [idPers, date, idTypeMasque];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);

      return callback(null, res.rows);
    });
  },

  getListUsers: function(option,callback){
    var sql = 'select distinct(neo_pers_niveau.id_pers) as matricule, r_personnel.nom, r_personnel.prenom, r_personnel.appelation, r_personnel.appelation as pseudo from neo_pers_niveau left join r_personnel on neo_pers_niveau.id_pers = r_personnel.id_pers where actif order by neo_pers_niveau.id_pers';

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListEquipe: function(option,callback){
    var sql = "SELECT * FROM neo_equipe";
    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getListTypes: function(option,callback){
    var sql = 'SELECT * from neo_type_masque';

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },
  
  getColonne: function (option,callback) {
    var sql = "SELECT required, neo_colonne.id as id_colonne, neo_colonne.libelle as colonne, neo_colonne.couleur as colonne_couleur, neo_colonne_categorie.couleur as colonne_categorie_couleur, neo_colonne_categorie.libelle as categorie, neo_colonne_categorie.id as id_colonne_categorie FROM neo_colonne LEFT JOIN neo_colonne_categorie ON neo_colonne.id_colonne_categorie = neo_colonne_categorie.id WHERE id_type_masque = " + option.id_type_masque + " order by neo_colonne.id_colonne_categorie, numero ";

    Neocles.query(sql, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  addNotation : function(option, id_type_masque, callback){
      async.waterfall([

      function(callback) {
          Neocles.insertEcoute(option, id_type_masque, callback);
        },

      function(rowsEcoute, callback) {
          var opt = [];
          opt.id_type_masque = id_type_masque;

          Neocles.getColonne(opt, function(err, rowsColonne){
            callback(err, rowsEcoute, rowsColonne);
          });
        },

      function(rowsEcoute, rowsColonne, callback) {
        let total = 0;

        async.each(rowsColonne, function(colonne, callbackSeries){
          let opt = [];

          opt.id_ecoute = rowsEcoute.id;
          opt.note = option.param(colonne.id_colonne + "", null);
          if(!opt.note) opt.note = null;

          opt.commentaire = option.param("commentaire" + colonne.id_colonne + "", null);
          opt.id_colonne = colonne.id_colonne;
          
          if(opt.note != null){
            let note = parseFloat(opt.note);
            total += note;
          }

          Neocles.insertNote(opt, callbackSeries);
        }, 

        function(err){
          if(err)
            return callback(err);

          if(option.allParams().situation_inacceptable) total = 0;
          return callback(err, rowsEcoute, total);
        });
      },

      function(rowsEcoute, noteTotal, callback){
        let param = option.allParams();

        Neocles.getNiveauWithSeuille(param.tc_select, param.date_enregistrement, function(err, niveau){
          return callback(err, rowsEcoute, noteTotal, niveau);
        });
      },

      function(rowsEcoute, noteTotal, seuille, callback){
        Neocles.updateNoteTotal(rowsEcoute.id, noteTotal, seuille, callback);
      }
      
    ], 
    function (err, result) {
      if(err) return callback(err);
      return callback(null);
    });
  },

  //mise a jour des notes
  updateNotation : function(option, id_type_masque,  callback){
    async.waterfall([
      function(callback){
        Neocles.updateEcoute(option, callback);
      },

      function(id_ecoute, callback) {
          var opt = [];
          opt.id_type_masque = id_type_masque;
          Neocles.getColonne(opt, callback);
        },

      function(rowsColonne, callback) {
        let total = 0;

        async.each(rowsColonne, function(colonne, callbackSeries){
          let opt = [];
          
          opt.id_ecoute = option.param("id_ecoute");
          opt.note = option.param(colonne.id_colonne + "", null);
          if(!opt.note) opt.note = null;

          opt.commentaire = option.param("commentaire" + colonne.id_colonne + "", null);
          opt.id_colonne = colonne.id_colonne;

          if(opt.note != null){
            let note = parseFloat(opt.note);
            total += note;
          }
          
          Neocles.updateNote(opt, callbackSeries);
        }, 

        function(err){
          if(err)
            return callback(err);

          if(option.allParams().situation_inacceptable) total = 0;

          return callback(null, total);
        });
      },

      function(noteTotal, callback){
        let param = option.allParams();

        Neocles.getNiveauWithSeuille(param.tc_select, param.date_enregistrement, function(err, niveau){
          return callback(err, noteTotal, niveau);
        });
      },

      function(noteTotal, niveau, callback){
        let param = option.allParams();
        Neocles.updateNoteTotal(param.id_ecoute, noteTotal, niveau, callback);
      }
      
    ], 
    function (err) {
      if(err) return callback(err);
      return callback(null);
    });
  },

  insertEcoute : function(req, id_type_masque, callback){
    let option = req.allParams();
    
    let situation_inacceptable = false;
    if(option.situation_inacceptable) situation_inacceptable = true;

    let sql = "INSERT INTO neo_ecoute (debut, fin, id_pers, id_pers_ecoute, date_enregistrement, id_type_ecoute, situation_inacceptable, id_client, id_ticket, id_hidden_categorie) VALUES (now(), now(), $1, $2, $3, $4, $5, $6, $7, $8) RETURNING id";
    let param = [option.tc_select, req.session.user, option.date_enregistrement, id_type_masque, situation_inacceptable, option.id_client, option.id_ticket, option.id_hidden_categorie];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      
      return callback(null, res.rows[0]);
    });
  },

  updateEcoute : function(req, callback){
    let option = req.allParams();
    
    let situation_inacceptable = false;
    if(option.situation_inacceptable) situation_inacceptable = true;

    let sql = "UPDATE neo_ecoute SET date_enregistrement = $1, situation_inacceptable = $2, id_client = $3, id_ticket = $4 WHERE id = $5";
    let param = [option.date_enregistrement, situation_inacceptable, option.id_client, option.id_ticket, option.id_ecoute];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      
      return callback(null, option.id_ecoute);
    });
  },

  insertNote : function(option, callback){
    if(option.id_ecoute > 0){
      let sql = "INSERT INTO neo_note (id_colonne, note, id_ecoute, commentaire) VALUES ($1, $2, $3, $4)";
      let param = [option.id_colonne, option.note , option.id_ecoute, option.commentaire];

      Neocles.query(sql, param, function(err, res){
        if(err) return callback(err);

        return callback(null, res.rows);
      });
    }
  },

  updateNote : function(option, callback){
    if(option.id_ecoute > 0){
      let sql = "UPDATE neo_note SET note = $2, commentaire = $4 WHERE id_colonne = $1 AND id_ecoute = $3";
      let param = [option.id_colonne, option.note , option.id_ecoute, option.commentaire];

      Neocles.query(sql, param, function(err, res){
        if(err) return callback(err);

        return callback(null, res.rows);
      });
    }
  },

  updateNoteTotal : function(idEcoute, noteTotal, niveau, callback){
    let sql = "UPDATE neo_ecoute SET note_total = $1, seuille = $2, id_niveau = $4 WHERE id = $3";
    let param = [noteTotal, niveau.seuille, idEcoute, niveau.id];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);

      return callback(null, res.rows);
    });
  },

  getSeuille : function(idPers, date, callback){
    var sql = "SELECT seuille from neo_pers_niveau LEFT JOIN neo_niveau on neo_niveau.id = neo_pers_niveau.id_niveau WHERE id_pers = $1 AND date <= $2 order by date desc, neo_pers_niveau.id DESC LIMIT 1";
    let param = [idPers, date + ""];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0].seuille);
    });
  },

  getNiveauWithSeuille : function(idPers, date, callback){
    var sql = "SELECT seuille, neo_niveau.id from neo_pers_niveau LEFT JOIN neo_niveau on neo_niveau.id = neo_pers_niveau.id_niveau WHERE id_pers = $1 AND date <= $2 order by date desc, neo_pers_niveau.id DESC LIMIT 1";
    let param = [idPers, date + ""];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0]);
    });
  },


  getEcouteById : function(idEcoute, callback){
    var sql = "SELECT id_hidden_categorie, id, debut, fin, neo_ecoute.id_pers, date_enregistrement, id_type_ecoute, situation_inacceptable, id_client, id_ticket, note_total, seuille, nom, prenom, appelation FROM neo_ecoute LEFT JOIN r_personnel ON r_personnel.id_pers = neo_ecoute.id_pers WHERE id=$1";
    let param = [idEcoute];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows[0]);
    });
  },

  //retourne les ecoutes du mois 
  getEcouteMensuelle : function(idPers, idTypeMasque, date, callback){
    let year = date.substring(0,4);
    let month = date.substring(5,7);

    var sql = "select * from neo_ecoute where id_pers = $1 AND id_type_ecoute = $2 AND (extract(YEAR FROM date_enregistrement) = $3 AND extract(MONTH FROM date_enregistrement) = $4) ORDER BY date_enregistrement, id";
    let param = [idPers, idTypeMasque, year, month];

    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  //retourne le details du mois pour un utilisateur
  getDetailsUser : function(idPers, idTypeMasque, date, callback){
    async.parallel([
      function(callback){
        Neocles.getUserRhDetails(idPers, idTypeMasque, date, callback);
      },
      function(callback){
        Neocles.getEcouteMensuelle(idPers, idTypeMasque, date, callback);
      }
    ],
    function(err, res){
      if(err) return callback(err);

      let retour = {};
      retour.infoRh = res[0][0];
      retour.listEcoutes = res[1];

      return callback(null, retour);
    });
  },

  //retourne la liste des valeurs des colonnes pour chaque personne suivant l'ecoute
  getValeurColonnes : function(idPers, idEcoute, callback){
    var sql = "SELECT neo_note.id, id_colonne, libelle, note, id_ecoute, commentaire FROM neo_note LEFT JOIN neo_ecoute ON neo_note.id_ecoute = neo_ecoute.id LEFT JOIN neo_colonne ON neo_colonne.id = neo_note.id_colonne ";
    sql += " WHERE id_pers = $1 and id_ecoute = $2 order by id_colonne_categorie, numero";
    
    let param = [idPers, idEcoute];
    Neocles.query(sql, param, function(err, res){
      if(err) return callback(err);
      return callback(null, res.rows);
    });
  },

  getEcouteMensuelleWithNote : function(idPers, idTypeMasque, date, callback){
    async.waterfall([

      function getEcoute(callback){
        Neocles.getEcouteMensuelle(idPers, idTypeMasque, date, callback);
      },

      function addColonne(listEcoute, callback){
        async.each(listEcoute, function(ecoute, callbackSeries){
          
          Neocles.getValeurColonnes(idPers, ecoute.id, function(err, note){
            if(err) callbackSeries(err);

            ecoute.note = note;
            callbackSeries(null);
          });
        }, 
        function(err){
          if(err)
            return callback(err);

          return callback(null, listEcoute);
        });
      }
    ],
    function(err, listEcoute){
      if(err) return callback(err);

      return callback(null, listEcoute);
    });
  },

  getEcouteMensuelleWithNoteWithColonne : function(idPers, idTypeMasque, date, callback){
    async.parallel([
      function(callback){
        return Neocles.getEcouteMensuelleWithNote(idPers, idTypeMasque, date, callback);        
      },

      function(callback){
        return Neocles.getColonne({id_type_masque : idTypeMasque}, callback);
      }
    ],
    function(err, res){
      if(err) return callback(err);
      
      let retour = res[0];
      retour.colonne = res[1];

      return callback(null, retour);
    });
  }

  
};

