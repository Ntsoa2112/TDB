/**
 * GpaoController
 *
 * @description :: Server-side logic for managing Gpaos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index : function (req,res) {
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    async.series([
      function (callback) {
        CQAlmerys.listSSBySP(null,callback);
      }
    ],function (err,result) {
      res.view('pages/gpao/GpaoModif',{layout: false,menu : menu,sspec : result[0]});
    })
  },


  loadRestrictionEtape: function (req, res) {
    var id_loclient = req.param('id_lotclient');
    var id_ss_spe = req.param('id_ss_spe');
    var id_ss_spe2 = req.param('id_ss_spe2');
    var option = [];
    option.id_lotclient = id_loclient;
    option.id_ss_spe = id_ss_spe;
    option.id_ss_spe2 = id_ss_spe2;
    async.series([
      function (callback) {
        CQAlmerys.listRestrictionEtape(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);

      return res.ok(JSON.stringify(result[0]));
    });
  },

  listRestrictionTache: function (req, res) {
    var id_loclient = req.param('id_lotclient');
    var id_ss_spe = req.param('id_ss_spe');
    var id_ss_spe2 = req.param('id_ss_spe2');
    var option = [];
    option.id_lotclient = id_loclient;
    option.id_ss_spe = id_ss_spe;
    option.id_ss_spe2 = id_ss_spe2;
    async.series([
      function (callback) {
        CQAlmerys.listRestrictionTache(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);

      return res.ok(JSON.stringify(result[0]));
    });
  },

  listRestrictionDistinction: function (req, res) {
    var id_loclient = req.param('id_lotclient');
    var id_ss_spe = req.param('id_ss_spe');
    var id_ss_spe2 = req.param('id_ss_spe2');
    var option = [];
    option.id_lotclient = id_loclient;
    option.id_ss_spe = id_ss_spe;
    option.id_ss_spe2 = id_ss_spe2;
    async.series([
      function (callback) {
        CQAlmerys.listRestrictionDistinction(option, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);

      return res.ok(JSON.stringify(result[0]));
    });
  },
};

