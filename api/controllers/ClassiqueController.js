/**
 * ClassiqueController
 *
 * @description :: Server-side logic for managing classiques
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');
var fs = require('fs');
// changer second to basic heure format
function changeSecondToBasicHourFormat(seconds){
  /*var formatcorrect=  moment("2015-01-01").startOf('day')
    .seconds(seconds)
    .format('HH:mm:ss');*/
  var dur = moment.duration(seconds, "seconds");
  var formatcorrect = Math.floor(dur.asHours()) + moment.utc(dur.asMilliseconds()).format(":mm:ss");
  if(parseInt(Math.floor(dur.asHours()))<10)
  {
    formatcorrect = "0"+Math.floor(dur.asHours()) + moment.utc(dur.asMilliseconds()).format(":mm:ss");
  }
  return formatcorrect.toString();
}
module.exports = {
  ReportinIndex: function(req,res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    res.view("pages/Classique/reportingindex",{menu: menu, layout: false});
  },
  GetListDossierFlexi: function(req,res) {
    async.series([
      function (callback) {
        Classique.GetListDossierFlex(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);

      return res.ok(JSON.stringify(result[0]));
    });
  },
  GetDataDossierFlexiCap: function(req,res) {
    var id_dossier = req.param("id_dossier",null);
    var date_debut = req.param("date_debut",null);
    var date_fin = req.param("date_fin",null);
    var id_pers = req.param("id_pers",null);
    var opt = {};
    opt.id_dossier = id_dossier;
    opt.date_debut = date_debut;
    opt.date_fin = date_fin;
    opt.id_pers = id_pers;
    var arrayReturn = [];
    async.series([
      function(callback)
      {
        Classique.getStatFlexi(opt,callback);
      }
    ],function(err,result){
      if(result[0].length>0)
      {
        result[0].forEach(function(donnee){
          var objectJson = {};
          objectJson.dossier = donnee.num_dossier;
          objectJson.lot_client = donnee.lotclient_num;
          objectJson.lot = donnee.lot;
          objectJson.etape = donnee.etape;
          objectJson.debut = donnee.debut;
          objectJson.fin = donnee.fin;
          objectJson.duree = donnee.duree;
          objectJson.quantite = donnee.qte;
          objectJson.id_pers = donnee.id_pers;
          objectJson.somme_duree = donnee.somme_duree;
          objectJson.somme_qte = donnee.somme_qte;
          arrayReturn.push(objectJson);
        });
      }
      return res.ok(JSON.stringify(arrayReturn));
    });
  },

  TestFusionDynamiqueCellule : function(req,res) {
    console.log(req.host);
    var id_dossier = req.param("specialite",null);
    var date_debut = req.param("date_debut",null);
    var date_fin = req.param("date_fin",null);
    var id_pers = req.param("matricule",null);
    var opt = {};
    opt.id_dossier = id_dossier;
    opt.date_debut = date_debut;
    opt.date_fin = date_fin;
    opt.id_pers = id_pers;
    var excel = require('excel4node');
    var workbook = new excel.Workbook();
    var worksheet=workbook.addWorksheet("Test fusion");
    // Style Titre
    var headerBigText = workbook.createStyle({
      /* alignement:{
       horizontal: ['center'],
       vertical: ['center'],
       }, */
      alignment: {
        shrinkToFit: true,
        wrapText: true,
        horizontal: ['center'],
        vertical: ['center']
      },
      font: {
        color: 'black',
        bold: true,
        size: 14
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#b29e45', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
        // bgColor: 'ffffff' // bgColor only applies on patternTypes other than solid.
      },
      border: {
        left: {
          style: 'thin',
          color: 'black',
        },
        right: {
          style: 'thin',
          color: 'black',
        },
        top: {
          style: 'thin',
          color: 'black',
        },
        bottom: {
          style: 'thin',
          color: 'black',
        },
        outline: false,
      },
    });
    // HEADER 2 EME NIVEAU TITRE
    var headerSousRubrique = workbook.createStyle({
      /* alignement:{
       horizontal: ['center'],
       vertical: ['center'],
       }, */
      alignment: {
        shrinkToFit: true,
        wrapText: true,
        horizontal: ['center'],
        vertical: ['center']
      },
      font: {
        color: 'black',
        bold: true,
        size: 12
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: '#6e7cb2', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
        // bgColor: 'ffffff' // bgColor only applies on patternTypes other than solid.
      },
      border: {
        left: {
          style: 'thin',
          color: 'black',
        },
        right: {
          style: 'thin',
          color: 'black',
        },
        top: {
          style: 'thin',
          color: 'black',
        },
        bottom: {
          style: 'thin',
          color: 'black',
        },
        outline: false,
      },
    });
    var header = workbook.createStyle({
      /* alignement:{
       horizontal: ['center'],
       vertical: ['center'],
       }, */
      alignment: {
        shrinkToFit: true,
        wrapText: true
      },
      font: {
        color: 'black',
        bold: true,
        size: 12
      },
      fill: {
        type: 'pattern', // the only one implemented so far.
        patternType: 'solid', // most common.
        fgColor: 'white', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
        // bgColor: 'ffffff' // bgColor only applies on patternTypes other than solid.
      },
      border: {
        left: {
          style: 'thin',
          color: 'black',
        },
        right: {
          style: 'thin',
          color: 'black',
        },
        top: {
          style: 'thin',
          color: 'black',
        },
        bottom: {
          style: 'thin',
          color: 'black',
        },
        outline: false,
      },
    });
    var stylecelulle = workbook.createStyle({
      /* alignement:{
       horizontal: ['center'],
       vertical: ['center'],
       }, */
      alignment: {
        shrinkToFit: true,
        wrapText: true
      },
    });

    // ENTETE
    worksheet.cell(1,1).string("NOM OUVRAGE").style(headerBigText);
    worksheet.cell(1,2).string("Nombre Document").style(headerBigText);
    worksheet.cell(1,3).string("Matricule").style(headerBigText);
    worksheet.cell(1,4).string("Type de DOSSIER").style(headerBigText);
    worksheet.cell(1,5).string("CATEGORIE DE DOCUMENT").style(headerBigText);
    worksheet.cell(1,6).string("TYPE DE DOCUMENT").style(headerBigText);
    worksheet.cell(1,7).string("Heure Debut").style(headerBigText);
    worksheet.cell(1,8).string("Heure Fin").style(headerBigText);
    worksheet.cell(1,9).string("Duree par doc").style(headerBigText);
    worksheet.cell(1,10).string("Duree Totale").style(headerBigText);
    worksheet.cell(1,11).string("Nombre Pieces").style(headerBigText);
  //  worksheet.cell(2,1,22,1,true).string("INFORMATION CONSULTATION").style(headerBigText);
    var index_ligne = 2;
    async.series([
      function(callback){
        Classique.getStatFlexi(opt,callback);
      }
    ],function (err,resultReport) {
      if(err) return res.badRequest(err);
      if(resultReport[0].length>0)
      {
        var init_Fusion = 0;
        var nombre_fusion = 0;
        var boolGet = false;
        var versaContinue = 0;
        var boolInit = false;
        async.forEachSeries(resultReport[0], function(donnee, callback2) {
          if(!boolGet)
          {
            init_Fusion = index_ligne;
            nombre_fusion = parseInt(donnee.nombre_occurence);
            if(!boolInit)
            {
              versaContinue += nombre_fusion;
            }
            console.log(init_Fusion);
            console.log(versaContinue);
            boolGet = true;
            boolInit = true;
          }
          worksheet.cell(index_ligne,1).string(""+donnee.lotclient_num);
          worksheet.cell(index_ligne,2).string(""+changeSecondToBasicHourFormat(donnee.somme_qte));
          worksheet.cell(index_ligne,3).string(""+donnee.id_pers);
          worksheet.cell(index_ligne,4).string(""+donnee.num_dossier);
          worksheet.cell(index_ligne,5).string(""+donnee.etape);
          worksheet.cell(index_ligne,6).string(""+donnee.lot);
          worksheet.cell(index_ligne,7).string(""+donnee.debut);
          worksheet.cell(index_ligne,8).string(""+donnee.fin);
          worksheet.cell(index_ligne,9).string(""+changeSecondToBasicHourFormat(donnee.duree));
          worksheet.cell(index_ligne,10).string(""+changeSecondToBasicHourFormat(donnee.somme_duree));
          worksheet.cell(index_ligne,11).string(""+donnee.somme_qte);

          if(boolGet && versaContinue == index_ligne-1)
          {
            /*if(boolInit)
            {
              versaContinue += nombre_fusion+1;
            }*/
            worksheet.cell(init_Fusion,1,versaContinue+1,1,true).string(""+donnee.lotclient_num).style(headerSousRubrique);
            worksheet.cell(init_Fusion,2,versaContinue+1,2,true).string(""+donnee.somme_qte).style(headerSousRubrique);
            worksheet.cell(init_Fusion,3,versaContinue+1,3,true).string(""+donnee.id_pers).style(headerSousRubrique);
            worksheet.cell(init_Fusion,4,versaContinue+1,4,true).string(""+donnee.num_dossier).style(headerSousRubrique);
            worksheet.cell(init_Fusion,10,versaContinue+1,10,true).string(""+changeSecondToBasicHourFormat(donnee.somme_duree)).style(headerSousRubrique);
            worksheet.cell(init_Fusion,11,versaContinue+1,11,true).string(""+donnee.somme_qte).style(headerSousRubrique);
/*            console.log("INIT FALSE");
            console.log("INIT => "+init_Fusion);
            console.log("VERSA => "+versaContinue);*/
            boolGet = false;
            boolInit = false;
          }
          index_ligne++;
          callback2();
        },function(err){
          if(err) return res.json(err);
          for(var i=1; i<12; i++)
          {
            worksheet.column(i).setWidth(42);
          }
          worksheet.column(2).setWidth(12);
          worksheet.column(3).setWidth(12);
          worksheet.column(8).setWidth(15);
          worksheet.column(9).setWidth(15);
          worksheet.column(10).setWidth(15);
          worksheet.column(11).setWidth(15);
          // EXECUTE WRITE EXCEL
          //console.log("WHEN EVERYTHING  DONE WRITE EXCEL NOW");
          var nomfichier='Export_Reporting_Classique';
          var cheminExport='templates/'+nomfichier+'.xlsx';
          workbook.write(cheminExport, function (err, stats) {
            if (err) {
              console.log(JSON.stringify(err));
              return next(err);
            }
            var objectReturn = { nomfichier:nomfichier+".xlsx", cheminExport:cheminExport };
            return res.download(objectReturn.cheminExport, objectReturn.nomfichier, function(err){
              //CHECK FOR ERROR
              fs.unlink(objectReturn.cheminExport, (err) => {
                if (err) throw err;
              });
            });

          });
        });
      }
    });
  }

};

