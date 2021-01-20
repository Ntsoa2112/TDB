/**
 * TypeEcouteController
 *
 * @description :: Server-side logic for managing Typeecoutes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  getListeTypeEcoute: function(req, res)
   {
     var is_ggs = req.param('is_ggs',null);
     async.series([
       function (callback) {
         TypeEcoute.getListeTypeEcoute(is_ggs,callback);
       }
     ],function (err,result) {
       if (err) return res.send("Erreur de requete");
       return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
     })
   },
 
   getListeQualite: function(req, res)
   {
     async.series([
       function (callback) {
         TypeEcoute.getListeQualite(null,callback);
       }
     ],function (err,result) {
       if (err) return res.send("Erreur de requete");
       return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
     })
   },
 
   getListeMotifNq: function(req, res)
   {
     async.series([
       function (callback) {
         TypeEcoute.getListeMotifNq(null,callback);
       }
     ],function (err,result) {
       if (err) return res.send("Erreur de requete");
       return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
     })
   },
 
   getListeEvaluateur: function(req, res)
   {
     async.series([
       function (callback) {
         TypeEcoute.getListeEvaluateur(null,callback);
       }
     ],function (err,result) {
       if (err) return res.send("Erreur de requete");
       return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
     })
   },
 
   getListeConformite: function(req, res)
   {
     async.series([
       function (callback) {
         TypeEcoute.getListeConformite(null,callback);
       }
     ],function (err,result) {
       if (err) return res.send("Erreur de requete");
       return res.ok(JSON.stringify(result[0]));//retourne de la liste des TC sn JSON
     })
   },
 };
 
 