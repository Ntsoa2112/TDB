/**
 * WebServiceController
 *
 * @description :: Server-side logic for managing Webservices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 **/
var moment = require('moment');
function comparaisonHeure (data_debut,data_fin,valeurHeure){
  var newValeur_Heure = parseFloat(valeurHeure);
  var startTime = moment(data_debut.heure, "HH:mm:ss");
  var endTime = moment(data_fin.heure, "HH:mm:ss");
  var duration = moment.duration(endTime.diff(startTime));
  var hours = duration.asHours();
  if(data_debut.ident=="IN" && data_fin.ident=="OUT")
  {
    // ADDITION
    newValeur_Heure = parseFloat(newValeur_Heure) + parseFloat(hours.toString());
  }
  else
  {
    // SOUSTRACTION
    newValeur_Heure = parseFloat(newValeur_Heure) - parseFloat(hours.toString());
  }
  return newValeur_Heure;
}
module.exports = {
  // FOnction urgent export Temps Detourage
  exportROnny: function(req,res){
  //  var array = [222,223,225,226,228,229,231,233,236,237,238,248,259,260,378,535,633,680,706,727,728,729,777,1013,1016,1017,1036,1048,1302,1303,1304,1677,1679,1680,1709,1710,1711,1724,1725,1734,1735,1736];
    var array = [396];
    var fs = require('fs');
    var excel = require('excel4node');
    var cheminExport = "templates/OSM_Reporting/ExportDetourage.xlsx";
    var wb = new excel.Workbook();
    //var sheet1 = workbook.createSheet('sheet1', 500, 500);
    var ws = wb.addWorksheet('ExportData');
    var index_ligne = 2;
    ws.cell(1,1).string("Matricule");
    ws.cell(1,2).string("Heure(Durree)");
    ws.cell(1,3).string("Heure");
    async.forEachSeries(array,function (matricule,Callback_s1) {
      var query = "select * from r_pointage where pdate = '2019/09/06' and id_util = "+matricule+" AND " +
        " (source = 'OUT' OR source = 'IN') AND to_timestamp(entree,'HH24:MI:SS') > to_timestamp('14:00:00','HH24:MI:SS') " +
        " ORDER BY to_timestamp(entree,'HH24:MI:SS') ;";

      Ldt.query(query, function(er, returnedData) {
        if(er) return res.badRequest(JSON.stringify(er));
        var i = 0;
        var valeur_horaire_ferie = 0;
        var data_debut ={};
        var data_fin={};
        async.forEachSeries(returnedData.rows,function (pointage,Callback_s2) {
          console.log(matricule);
          if (pointage.source == 'OUT' || pointage.source == 'IN') {
            //console.log(pointage.entree);
          }
          if (returnedData.rows.length == 1) {
            // console.log("UNIQUE PART");
            var startTime = moment("14:00:00", "HH:mm:ss");
            var endTime = moment(pointage.entree, "HH:mm:ss");
            var duration = moment.duration(endTime.diff(startTime));
            var hours = duration.asHours();
            valeur_horaire_ferie = parseFloat(hours.toString());
          } else {
            data_fin = {};
            // console.log('Test'+i);
            if (i == 0) {
              data_debut.heure = "14:00:00";
              data_debut.ident = "IN";
              data_fin.heure = pointage.entree.toString();
              data_fin.ident = pointage.source;
              // console.log(data_debut);
              //console.log(data_fin);
              valeur_horaire_ferie = comparaisonHeure(data_debut, data_fin, valeur_horaire_ferie);
              //console.log(valeur_horaire_ferie);
              data_debut = data_fin;
            } else {
              data_fin.heure = pointage.entree.toString();
              data_fin.ident = pointage.source;
              //console.log(data_debut);
              //console.log(data_fin);
              valeur_horaire_ferie = comparaisonHeure(data_debut, data_fin, valeur_horaire_ferie);
              //console.log(valeur_horaire_ferie);
              data_debut = data_fin;
            }
          }
          i++;
          console.log(valeur_horaire_ferie);
          Callback_s2();
      }, function(errorhim) {
        console.log("DONE LOOP INNER CALCULE MATRICULE ");
          var seconds =  moment.duration(valeur_horaire_ferie,'hours').seconds();
          var minutes =  moment.duration(valeur_horaire_ferie,'hours').minutes();
          var hours = Math.trunc(moment.duration(valeur_horaire_ferie,'hours').asHours());
          ws.cell(index_ligne,1).string(matricule.toString());
          ws.cell(index_ligne,2).string(valeur_horaire_ferie.toFixed(2).toString());
          ws.cell(index_ligne,3).string(hours+':'+minutes+':'+seconds);
        console.log(matricule+"=="+minutes);
          index_ligne++;
        Callback_s1();
      });
    });
    }, function(errorme) {
      console.log("DONE LOOP List Matricule");
      // Ecritue Excel Chemin export
      wb.write(cheminExport, function (err, stats) {
        if (err) {
          console.log(JSON.stringify(err));
        }
        // DOWNLOAD -- Reporting
        res.download(cheminExport, (err)=>{
          fs.unlinkSync(cheminExport);
        });
      });
    });
  },
	getall:function (req,res){
		var query = "SELECT * FROM osm_coordonnee LEFT JOIN r_personnel ON r_personnel.id_pers=osm_coordonnee.id_pers order by osm_coordonnee.id_pers";
		Ldt.query(query, function(er, returnedData) {
			if(er) return res.badRequest(JSON.stringify(er));
			return res.json(JSON.stringify(returnedData.rows));
		});
	},

	insert:function (req,res){
		var matricule = req.param("matricule");
		var longitude = req.param("longitude");
		var latitude = req.param("latitude");

		var query_verif = "SELECT * FROM osm_coordonnee where id_pers="+matricule;
		var query_insert = "INSERT INTO osm_coordonnee(id_pers,lon,lat) VALUES ($1,$2,$3)";
		var param = [matricule,longitude,latitude];
		Ldt.query(query_verif, function(er, verif) {
			if(er) return res.badRequest(JSON.stringify(er));
			if(verif.rows.length!=0)
			{
				return res.json(JSON.stringify({msg:"existant"}));
			}
			else
			{
				Ldt.query(query_insert,param, function(err, returnedData) {
				if(err) return res.badRequest(JSON.stringify(err));
					return res.json(JSON.stringify({msg:"ok"}));
				});
			}
		});
	},
	getInfoPersonne: function (req,res){
		var matricule = req.param("matricule");
		var query = "SELECT r_personnel.nom,r_personnel.prenom,r_personnel.adresse,r_departement.libelle as departement,r_personnel.sexe "+
					" FROM r_personnel LEFT JOIN r_departement on r_departement.id=r_personnel.id_departement WHERE r_personnel.id_pers="+matricule;
		Ldt.query(query, function(er, returnedData) {
			if(er) return res.badRequest(JSON.stringify(er));
			return res.json(JSON.stringify(returnedData.rows));
		});
	},
  index: function(req,res){
    res.view( 'pages/osmview', {layout : false});
  },
  getPole : function (req,res){
    var sql = "SELECT * FROM r_departement ORDER BY libelle"; // where r_personnel.id_pers = '" + option.matricule + " '
    GestionHoraire.query(sql, function(err, response){
      if(err) return callback(err);
      return res.json(JSON.stringify(response.rows));
    });
  },
  ExportData : function (req,res) {
    var fs = require('fs');
	  var data_test = JSON.parse(req.param('data_export'));
    var excel = require('excel4node');
    var cheminExport = "templates/OSM_Reporting/OSM_Reporting.xlsx";
    var wb = new excel.Workbook();
    //var sheet1 = workbook.createSheet('sheet1', 500, 500);
    var ws = wb.addWorksheet('ExportData');
    var myStyle = wb.createStyle({
      font: {
        bold: true,
      },
      alignment: {
        wrapText: true,
        horizontal: 'center',
        vertical: 'center'
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#b4c6e7'// bgColor only applies on patternTypes other than solid.
      }
    });
    // HEADER FUSION
    ws.cell(1,1,3,8,true).string("AFFICHAGE DONNEE Geolocalisation").style(myStyle);
    ws.cell(4,1).string("Matricule");
    ws.cell(4,2).string("Nom");
    ws.cell(4,3).string("Prenom");
    ws.cell(4,4).string("Adresse");
    ws.cell(4,5).string("Departement");
    ws.cell(4,6).string("Proximité");
    ws.cell(4,7).string("Distance Digue(km)");
    ws.cell(4,8).string("Distance Tsiadana(km)");
    // HEADER TSIADANA
  /*  ws.cell(1,10,3,15,true).string("TSIADANA").style(myStyle);
    ws.cell(4,10).string("Matricule");
    ws.cell(4,11).string("Nom");
    ws.cell(4,12).string("Prenom");
    ws.cell(4,13).string("Adresse");
    ws.cell(4,14).string("Departement");
    ws.cell(4,15).string("Distance(km)");*/
    var index_digue=5;
    var index_Tsiadana=5;
    async.parallel([
        // RUN DIGUE
        function(CallBack_Digue){
          async.forEachSeries(data_test.data.Digue,function (persValue,Callback_s2) {
            //console.log(persValue);
            async.series([
              function(callback)
              {
                var matricule = persValue.id_pers;
                var query = "SELECT r_personnel.nom,r_personnel.prenom,r_personnel.adresse,r_departement.libelle as departement,r_personnel.sexe "+
                  " FROM r_personnel LEFT JOIN r_departement on r_departement.id=r_personnel.id_departement WHERE r_personnel.id_pers="+matricule;
                Ldt.query(query, function(er, returnedData) {
                  if(er) return callback(JSON.stringify(er));
                  return callback(null,returnedData.rows);
                });
              }
            ],function(err_heure,personneDigue){
              if(err_heure) return res.badRequest(err_heure);
              ws.cell(index_digue,1).string(persValue.id_pers+"");
              ws.cell(index_digue,2).string(personneDigue[0][0].nom+"");
              ws.cell(index_digue,3).string(personneDigue[0][0].prenom+"");
              ws.cell(index_digue,4).string(personneDigue[0][0].adresse+"");
              ws.cell(index_digue,5).string(personneDigue[0][0].departement+"");
              ws.cell(index_digue,6).string(persValue.proximite+"");
              ws.cell(index_digue,7).string(persValue.distance_aDigue+"");
              ws.cell(index_digue,8).string(persValue.distance_aTsiad+"");
              index_digue++;
              Callback_s2();
            });
          }, function() {
            console.log("DONE LOOP DIGUE");
            CallBack_Digue(null, "done digue");
          });
        },
        // RUN TSIADANA
     /*   function(CallBack_Tsiadana){
          async.forEachSeries(data_test.data.Tsiadana,function (persValue,Callback_s2) {
            async.series([
              function(callback)
              {
                var matricule = persValue.id_pers;
                var query = "SELECT r_personnel.nom,r_personnel.prenom,r_personnel.adresse,r_departement.libelle as departement,r_personnel.sexe "+
                  " FROM r_personnel LEFT JOIN r_departement on r_departement.id=r_personnel.id_departement WHERE r_personnel.id_pers="+matricule;
                Ldt.query(query, function(er, returnedData) {
                  if(er) return callback(JSON.stringify(er));
                  return callback(null,returnedData.rows);
                });
              }
            ],function(err_heure,personneDigue){
              if(err_heure) return res.badRequest(err_heure);
              ws.cell(index_Tsiadana,10).string(persValue.id_pers+"");
              ws.cell(index_Tsiadana,11).string(personneDigue[0][0].nom+"");
              ws.cell(index_Tsiadana,12).string(personneDigue[0][0].prenom+"");
              ws.cell(index_Tsiadana,13).string(personneDigue[0][0].adresse+"");
              ws.cell(index_Tsiadana,14).string(personneDigue[0][0].departement+"");
              ws.cell(index_Tsiadana,15).string(persValue.distance_aTsiad+"");
              index_Tsiadana++;
              Callback_s2();
            });
          }, function() {
            console.log("DONE LOOP TSIADANA");
            CallBack_Tsiadana(null,"done tsiadana");
          });
        }*/
      ],
      function(err, results){
        // Ecritue Excel Chemin export
        wb.write(cheminExport, function (err, stats) {
          if (err) {
            console.log(JSON.stringify(err));
          }
          // DOWNLOAD -- Reporting
          res.download(cheminExport, (err)=>{
            fs.unlinkSync(cheminExport);
          });
        });

      });
  }
};

