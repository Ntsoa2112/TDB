/**
 * SpecialiteController
 *
 * @description :: Server-side logic for managing Specialites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/*
   * Fonction pour recuperer la liste des specialites
   * */
  getListeSpecialite: function(req, res)
  {
    async.series([
      function (callback) {
        Specialite.getListeSpecialite(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des specialite sn JSON
    })
  },

  getListeSpecialiteAS: function(req, res)
  {
    async.series([
      function (callback) {
        Specialite.getListeSpecialiteAS(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des specialite sn JSON
    })
  },

  getListeSpecialiteDoctocare: function(req, res)
  {
    async.series([
      function (callback) {
        Specialite.getListeSpecialiteDoctocare(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des specialite sn JSON
    })
  },
  
  getListeCampagneAS: function(req, res)
  {
    async.series([
      function (callback) {
        Specialite.getListeCampagneAS(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des specialite sn JSON
    })
  },

  getListeMotifCRC: function(req, res)
  {
    async.series([
      function (callback) {
        Specialite.getListeMotifCRC(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des specialite sn JSON
    })
  },
};

