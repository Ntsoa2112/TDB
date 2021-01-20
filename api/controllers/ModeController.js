/**
 * ModeController
 *
 * @description :: Server-side logic for managing Modes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/*
   * Fonction pour recuperer la liste des modes écoutes
   * */
  getListeMode: function(req, res)
  {
    async.series([
      function (callback) {
        Mode.getListeMode(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des specialite sn JSON
    })
  },

  getListeModeCRC: function(req, res)
  {
    async.series([
      function (callback) {
        Mode.getListeModeCRC(null,callback);
      }
    ],function (err,result) {
      if (err) return res.send("Erreur de requete");
      return res.ok(JSON.stringify(result[0]));//retourne de la liste des specialite sn JSON
    })
  },
};

