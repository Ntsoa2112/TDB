/**
 * AlmerysCallController
 *
 * @description :: Server-side logic for managing Almeryscalls
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

function nullsetzero(value){
  if(!value) return "0";
  if(value.toString()=="null")
    return "0";
  return value;
};
var moment = require('moment');
module.exports = {
  getNombreLotAlmerys : function (req, res) {
    if (!req.session.user) return res.redirect('/login');
  //recuperation de la date d'aujourd'hui de format yyyymmjj
    var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    var datePrim = dateNow.substr(0,6)+'01';

    var options = [];
    options.date_prime = dateNow;
    options.date_deb = dateNow;
    options.date_fin = dateNow;
    options.id_dossier = 496;
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          AlmerysCall.getNombreLotParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          ////console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['menu']=menu;
        //////console.log(retour);
      //  return
        res.view('AlmerysCall/index',retour);
      //  res.ok(JSON.stringify(results[0]));

      });
  },

  getAjaxNombreLotAlmerys : function (req, res) {
    //recuperation de la date d'aujourd'hui de format yyyymmjj
    var datedeb  = req.param('date','');
    var date_fin  = req.param('datefin','');
    /* var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
     var datePrim = dateNow.substr(0,4)+req.param('mois','01')+'01';
     var dateDer = dateNow.substr(0,4)+req.param('mois','01')+'31';*/

    var options = [];
    options.date_deb = datedeb;
    options.date_fin = date_fin;
    options.id_dossier = 496;

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    async.series([
        function(callback){
          AlmerysCall.getNombreLotParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          ////console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }
        var retour=[];
        retour['resultat']=results[0];
        retour['menu']=menu;
        retour['layout']=false;
        //////console.log(retour);
        //  return
        res.view('AlmerysCall/indexAjax',retour);
        //  res.ok(JSON.stringify(results[0]));

      });
  },

  getXlNombreLotAlmerys : function (req, res) {
//recuperation de la library kexcel
    var jkexcel = require('jkexcel');
    var path = require('path');
    //recuperation de la date d'aujourd'hui de format yyyymmjj
    var datedeb  = req.param('date','');
    var datefin = req.param('datefin','');
   /* var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    var datePrim = dateNow.substr(0,4)+req.param('mois','01')+'01';
    var dateDer = dateNow.substr(0,4)+req.param('mois','01')+'31';*/

    var options = [];
    options.date_prime = datedeb;
    options.date_deb = datedeb;
    options.date_fin = datefin;
    options.id_dossier = 496;

    //console.log(options);

    async.series([
        function(callback){
          AlmerysCall.getNombreLotParDate(options, callback);
        }],
      function(err, results) {
        //return res.ok("ok");
        if (err) {
          //////console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }else{
          //template path   templates/reporting-almerys.xlsx

          jkexcel.open(path.join('', 'templates/reporting-almerys.xlsx')).then(function(workbook) {

            var motif = [];
            //Demande d'annulation PEC
            //motif[15457]=3;
            motif[17931]=3;
            //Demande d'information suite à refus de PEC
            //motif[15456]=4;
            motif[17932]=4;
            //Demande de règlement de facture
            //motif[15455]=5;
            motif[17934]=5;
            //Demande d'information sur bénéficiaire (Droits, garanties,….)
            //motif[15454]=7;
            motif[17936]=7;
            //Demande d'information Virements / Imputations / Décompte
            //motif[15453]=8;
            motif[17937]=8;
            //Demande de conventionnement / Identifiant PS / Coordonnées bancaires
            //motif[15452]=9;
            motif[17938]=9;
            //Demande information Télétransmission / Noémie TP / DRE / TP3G
            //motif[15451]=10;
            motif[17939]=10;
            //Demande d'information sur code acte
            /*motif[15450]=11;
            motif[15889]=11;*/
            motif[17940]=11;
            //Autre
            //motif[15449]=14;
            motif[17943]=17;
            //Demande de renseignement PEC
            //motif[15449]=14;
            motif[17933]=14;
            //Rejet de facture
            //motif[15890]=6;
            motif[17935]=6;
            //Demande des coordonnées ALMERYS"
            motif[17942]=12;
            //Mauvais Numéro / Appel assuré
            motif[17941]=13;
            //19-Contestations Indus
            motif[17941]=15;
            //18-Contrôle Fraude en cours
            motif[17941]=16;

            var col = [];
            //Autre
            col[1] = 2;
            //Hospi/SE
            col[2] = 3;
            //Optique/Audio
            col[3] = 4;
            //Dentaire
            col[4] = 6;
            //Supervision
            col[5] = 5;

            //Distance entre date

            var dist = 0;
            //recuperation de la feuill base
            var base = workbook.getSheet(0);
            var lastDate = null;
            //operation sur les données recuperer dans la base des données
            var autre = 0;
            var hospiSe = 0;
            var optAud = 0;
            var Dent = 0;
            var Supervision = 0;
            var lastLotC = null;
            //return res.ok("ok");


            async.eachSeries(results[0], function (lot, callback) {
              //////console.log(lot.idlotclient);
             // var datJour = (lot.date).toString().substr(6,2);
              var datJour = (datedeb).toString().substr(6,2);
              ////////console.log(datJour);
              dist = (6 * Number(datJour))-6;
              dist = (6 * Number(1))-6;

                //SE/HOSPI
                if(Number(lot.etape) == 487){
                  hospiSe = Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[2]+dist+" nbHospi:"+Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0') +hospiSe);
                  base.setCellValue(motif[lot.idlotclient],col[2]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[2]+dist) || '0') +hospiSe);
                }
                //optisue audio
                else if(Number(lot.etape) == 486){
                  //////console.log("tato");
                  optAud = Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[3]+dist+" nb:"+optAud);
                  base.setCellValue(motif[lot.idlotclient],col[3]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[3]+dist) || '0') +optAud);
                }
                //dentaire
                else if(Number(lot.etape) == 404){
                  Dent =  Number(lot.nb);
                  //console.log(lot.date+"li:"+motif[lot.idlotclient]+" col:"+col[4]+dist+" Dentaire"+Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0'));
                  base.setCellValue(motif[lot.idlotclient],col[4]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[4]+dist) || '0') +Dent);
                }else if(Number(lot.etape) == 413){
                  Supervision =  Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                  base.setCellValue(motif[lot.idlotclient],col[5]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[5]+dist) || '0') +Supervision);
                }else{
                  //////console.log("tato2");
                  autre = Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[1]+dist+" nb:"+autre);
                  base.setCellValue(motif[lot.idlotclient],col[1]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0') + autre);
                }
              /*if(lot.date!=lastDate){
                if(lastDate!=null){
                  //dist = dist + 5;
                }
                if(lot.idlotclient!=lastLotC){
                  autre = 0;
                  hospiSe = 0;
                  optAud = 0;
                  Dent = 0;
                  Supervision = 0;
                  lastLotC = null;
                  //SE/HOSPI
                  if(Number(lot.etape) == 487){
                    hospiSe = Number(hospiSe) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[2]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[2]+dist) || '0') +hospiSe);
                  }
                  //optisue audio
                  else if(Number(lot.etape) == 486){
                    //////console.log("tato");
                    optAud = Number(optAud) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[3]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[3]+dist) || '0') +optAud);
                  }
                  //dentaire
                  else if(Number(lot.etape) == 404){
                    Dent = Number(Supervision) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[4]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[4]+dist) || '0') +Dent);
                  }else if(Number(lot.etape) == 413){
                    Supervision = Number(Dent) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[4]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[5]+dist) || '0') +Supervision);
                  }else{
                    autre = Number(autre) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[1]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0') +autre);
                  }
                  //////console.log("ligne:1"+motif[lot.idlotclient]+"cols:["+col[1]+dist+","+col[2]+dist+","+col[3]+dist+","+col[4]+dist+"]");
                  //////console.log("ligne1:"+motif[lot.idlotclient]+"cols:["+autre+","+hospiSe+","+optAud+","+Dent+"]");
                  lastLotC = lot.idlotclient;
                  lastDate = lot.date;
                }


              }else{
                if(lot.idlotclient!=lastLotC){
                  autre = 0;
                  hospiSe = 0;
                  optAud = 0;
                  Dent = 0;
                  Supervision = 0;
                }


                //SE/HOSPI
                if(Number(lot.etape) == 487){
                  hospiSe = Number(hospiSe) + Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[2]+dist+" nbHospi:"+Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0') +hospiSe);
                  base.setCellValue(motif[lot.idlotclient],col[2]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[2]+dist) || '0') +hospiSe);
                }
                //optisue audio
                else if(Number(lot.etape) == 486){
                  //////console.log("tato");
                  optAud = Number(optAud) + Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[3]+dist+" nb:"+optAud);
                  base.setCellValue(motif[lot.idlotclient],col[3]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[3]+dist) || '0') +optAud);
                }
                //dentaire
                else if(Number(lot.etape) == 404){
                  Dent = Number(Dent) + Number(lot.nb);
                  //console.log(lot.date+"li:"+motif[lot.idlotclient]+" col:"+col[4]+dist+" Dentaire"+Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0'));
                  base.setCellValue(motif[lot.idlotclient],col[4]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[5]+dist) || '0') +Dent);
                }else if(Number(lot.etape) == 413){
                  Supervision = Number(Supervision) + Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                  base.setCellValue(motif[lot.idlotclient],col[5]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[5]+dist) || '0') +Supervision);
                }else{
                  //////console.log("tato2");
                  autre = Number(autre) + Number(lot.nb);
                  //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[1]+dist+" nb:"+autre);
                  base.setCellValue(motif[lot.idlotclient],col[1]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0') + autre);
                }
                ////////console.log("ligne2:"+motif[lot.idlotclient]+"cols:["+autre+","+hospiSe+","+optAud+","+Dent+"]");
              }*/
             // return res.ok("ok");
              callback();
            },function(err){
              if(err) return res.send(err);

              res.setHeader('Content-disposition', 'attachment; filename=ReportingAlmerys.xlsx');
              res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              return workbook.pipe(res);

              //return res.ok(JSON.stringify(results[0]));
            });

          });

        }

      });
  },


  getXlNombreLotAlmerys2_0 : function (req, res) {
//recuperation de la library kexcel
    var jkexcel = require('jkexcel');
    var path = require('path');
    //recuperation de la date d'aujourd'hui de format yyyymmjj
    var datedeb  = req.param('date','');
    var datefin = req.param('datefin','');
    /* var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
     var datePrim = dateNow.substr(0,4)+req.param('mois','01')+'01';
     var dateDer = dateNow.substr(0,4)+req.param('mois','01')+'31';*/

    var options = [];
    options.date_prime = datedeb;
    options.date_deb = datedeb;
    options.date_fin = datefin;
    options.id_dossier = 496;

    //console.log(options);

    async.series([
        function(callback){
          AlmerysCall.getNombreLotParDateV2(options, callback);
        }],
      function(err, results) {
        //return res.ok("ok");
        if (err) {
          //////console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }else{
          //template path   templates/reporting-almerys.xlsx

          jkexcel.open(path.join('', 'templates/reporting-almerys-v2.xlsx')).then(function(workbook) {

            var motif = {};
            //1-Annulation PEC
            motif[19201]=3;
            //2-Réclamation PEC introuvable
            motif[19202]=4;
            //3-Contestation refus PEC
            motif[19203]=5;
            //4-Demande d'information refus PEC
            motif[19204]=6;
            //5-Réclamation PEC
            motif[19205]=7;
            //6-Réclamation facture introuvable
            motif[19206]=8;
            //7-Contestation rejet facture
            motif[19207]=9;
            //8-Contestation règlement facture
            motif[19208]=10;
            //9-Consultation droits
            motif[19209]=11;
            //10-Consultation garanties
            motif[19210]=12;
            //11-Demande de conventionnement
            motif[19211]=13;
            //12-Réclamation conventionnement
            motif[19212]=14;
            //13-Demande d'informations almerys
            motif[19213]=15;
            //14-Demande d'informations virement
            motif[19214]=16;
            //15-Demande de décomptes
            motif[19215]=17;
            //16-Mauvais N°
            motif[19216]=18;
            //17-Appel adhéren
            motif[19217]=19;

            //18-Contrôle Fraude en cours
            motif[19884]=20;
            //19-Contestations Indus
            motif[19994]=21;
            //'vide'
            motif[17943]=25;

            //20-Demande d'information suite à rejet facture
            motif[20483]=22;

            //21-Demande d'information accord PEC PEC
            motif[20699]=23;

            //22-Contrôle Fraude refus
            motif[21044]=24;

            var col = {};
            //OPTIQUE
            col[2422] = 2;
            //DENTAIRE
            col[2434] = 3;
            //HOSPI
            col[2420] = 4;
            //Supervision
            col[3085] = 5;
            //Audio
            col[3379] = 6;
            //Pharma
            col[3380] = 7;
            //Labo
            col[3381] = 8;
            //Auxiliaires
            col[3382] = 9;
            //Radiologue
            col[3384] = 10;
            //Soins Externes
            col[3385] = 11;
            //MG
            col[3386] = 12;
            //MS
            col[3387] = 13;
            //Soins dentaires
            col[3388] = 14;
            //Transport
            col[3383] = 15;

            //Distance entre date

            var dist = 0;
            //recuperation de la feuill base
            var base = workbook.getSheet(0);
            var lastDate = null;
            //operation sur les données recuperer dans la base des données
            var hospi = 0;
            var dentaire = 0;
            var optique = 0;
            var supervision = 0;
            var audio = 0;
            var pharma = 0;
            var labo = 0;
            var auxiliaires = 0;
            var transport = 0;
            var radiologie = 0;
            var soin_ext = 0;
            var mg = 0;
            var ms = 0;
            var soin_dent = 0;
            var lastLotC = null;
            //return res.ok("ok");


            async.eachSeries(results[0], function (lot, callback) {
              //////console.log(lot.idlotclient);
              // var datJour = (lot.date).toString().substr(6,2);
              var datJour = (datedeb).toString().substr(6,2);
              ////////console.log(datJour);
              dist = (6 * Number(datJour))-6;
              dist = (6 * Number(1))-6;

              //HOSPI
              if(Number(lot.etape) == 2420){
                hospi = Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[2]+dist+" nbHospi:"+Number(base.getCellValue(motif[lot.idlotclient],col[1]+dist) || '0') +hospiSe);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +hospi);
              }
              //DENTAIRE
              else if(Number(lot.etape) == 2434){
                //////console.log("tato");
                dentaire = Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[3]+dist+" nb:"+optAud);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +dentaire);
              }
              //OPTIQUE
              else if(Number(lot.etape) == 2422){
                optique =  Number(lot.nb);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +optique);
              }
              //SUPERVISION
              else if(Number(lot.etape) == 3085){
                supervision =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +supervision);
              } //AUDIO
              else if(Number(lot.etape) == 3379){
                audio =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +audio);
              } //PHARMA
              else if(Number(lot.etape) == 3380){
                pharma =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +pharma);
              } //LABO
              else if(Number(lot.etape) == 3381){
                labo =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +labo);
              } //AUXILIAIRE
              else if(Number(lot.etape) == 3382){
                auxiliaires =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +auxiliaires);
              } //RADIOLOGIE
              else if(Number(lot.etape) == 3384){
                radiologie =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +radiologie);
              } //TRANSPORT
              else if(Number(lot.etape) == 3383){
                transport =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +transport);
              } //SOINS DENTAIRE
              else if(Number(lot.etape) == 3388){
                soin_dent =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +soin_dent);
              } //SOINS EXTERNE
              else if(Number(lot.etape) == 3385){
                soin_ext =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +soin_ext);
              } //MG
              else if(Number(lot.etape) == 3386){
                mg =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +mg);
              }//MS
              else if(Number(lot.etape) == 3387){
                ms =  Number(lot.nb);
                //////console.log("li:"+motif[lot.idlotclient]+" col:"+col[5]+dist+" nb:"+Supervision);
                base.setCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist,Number(base.getCellValue(motif[lot.idlotclient],col[Number(lot.etape)]+dist) || '0') +ms);
              }

              callback();
            },function(err){
              if(err) return res.send(err);

              res.setHeader('Content-disposition', 'attachment; filename=ReportingAlmerys.xlsx');
              res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              return workbook.pipe(res);

              //return res.ok(JSON.stringify(results[0]));
            });

          });

        }

      });
  },
  getXlSXNombreLotAlmerys : function (req, res) {
//recuperation de la library kexcel
    var Excel = require('exceljs');
    var path = require('path');
    //recuperation de la date d'aujourd'hui de format yyyymmjj
    var dateNow = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    var datePrim = dateNow.substr(0,6)+'01';

    var options = [];
    options.date_prime = datePrim;
    options.date_deb = dateNow;
    options.id_dossier = 496;

    async.series([
        function(callback){
          AlmerysCall.getNombreLotParDate(options, callback);
        }],
      function(err, results) {
        if (err) {
          ////console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }else{
          var motif = [];
          //Demande d'annulation PEC
          motif[15457]=3;
          //Demande d'information suite à refus de PEC
          motif[15456]=4;
          //Demande de règlement de facture
          motif[15455]=5;
          //Demande d'information sur bénéficiaire (Droits, garanties,….)
          motif[15454]=7;
          //Demande d'information Virements / Imputations / Décompte
          motif[15453]=8;
          //Demande de conventionnement / Identifiant PS / Coordonnées bancaires
          motif[15452]=9;
          //Demande information Télétransmission / Noémie TP / DRE / TP3G
          motif[15451]=10;
          //Demande d'information sur code acte
          motif[15450]=11;
          //Autre
          motif[15449]=12;

          var col = [];
          //Autre
          col[1] = 2;
          //Hospi/SE
          col[2] = 3;
          //Optique/Audio
          col[3] = 4;
          //Dentaire
          col[4] = 5;

          //Distance entre date

          var dist = 0;

          //template path   templates/reporting-almerys.xlsx

          var options = {
            filename: '../templates/reporting-almerys.xlsx',
            useStyles: true,
            useSharedStrings: true
          };
          var workbook = new Excel.stream.xlsx.WorkbookWriter(options);
          var worksheet = workbook.getWorksheet(1);
          //worksheet.getCell('A1').value
          /*var workbook = new Excel.Workbook();
          workbook.xlsx.readFile(path.join('', 'templates/reporting-almerys.xlsx'))
            .then(function() {
              // use workbook
              res.pipe(workbook.xlsx.createInputStream());
            })*/
          return res.ok("haha"+worksheet.getCell('A1').value);

         /* kexcel.open(path.join('', 'templates/reporting-almerys.xlsx')).then(function(workbook) {
            //recuperation de la feuill base
            var base = workbook.getSheet(0);
            var lastDate = null;
            //operation sur les données recuperer dans la base des données
            var autre = 0;
            var hospiSe = 0;
            var optAud = 0;
            var Dent = 0;
            var lastLotC = null;
            async.eachSeries(results[0], function (lot, callback) {
              ////////console.log("tato"+Number(lot.etape));
              var datJour = (lot.date).toString().substr(6,2);
              //////console.log(datJour);
              dist = (5 * Number(datJour))-5;
              if(lot.date!=lastDate){
                if(lastDate!=null){
                  //dist = dist + 5;
                }
                if(lot.idlotclient!=lastLotC){
                  autre = 0;
                  hospiSe = 0;
                  optAud = 0;
                  Dent = 0;
                  lastLotC = null;
                  //SE/HOSPI
                  if(Number(lot.etape) == 391 || Number(lot.etape) ==400){
                    hospiSe = Number(hospiSe) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[2]+dist,hospiSe);
                  }
                  //optisue audio
                  else if(Number(lot.etape) == 392){
                    //////console.log("tato");
                    optAud = Number(optAud) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[3]+dist,optAud);
                  }
                  //dentaire
                  else if(Number(lot.etape) == 404){
                    Dent = Number(Dent) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[4]+dist,Dent);
                  }else{
                    autre = Number(autre) + Number(lot.nb);
                    base.setCellValue(motif[lot.idlotclient],col[1]+dist,autre);
                  }
                  ////////console.log("ligne:1"+motif[lot.idlotclient]+"cols:["+col[1]+dist+","+col[2]+dist+","+col[3]+dist+","+col[4]+dist+"]");
                  //////console.log("ligne1:"+motif[lot.idlotclient]+"cols:["+autre+","+hospiSe+","+optAud+","+Dent+"]");

                  lastLotC = lot.idlotclient;
                  lastDate = lot.date;
                }

              }else{
                if(lot.idlotclient!=lastLotC){
                  autre = 0;
                  hospiSe = 0;
                  optAud = 0;
                  Dent = 0;
                }


                //SE/HOSPI
                if(Number(lot.etape) == 391 || Number(lot.etape) ==400){
                  hospiSe = Number(hospiSe) + Number(lot.nb);
                  base.setCellValue(motif[lot.idlotclient],col[2]+dist,hospiSe);
                }
                //optisue audio
                else if(Number(lot.etape) == 392){
                  //////console.log("tato");
                  optAud = Number(optAud) + Number(lot.nb);
                  base.setCellValue(motif[lot.idlotclient],col[3]+dist,optAud);
                }
                //dentaire
                else if(Number(lot.etape) == 404){
                  Dent = Number(Dent) + Number(lot.nb);
                  base.setCellValue(motif[lot.idlotclient],col[4]+dist,Dent);
                }else{
                  //////console.log("tato2");
                  autre = Number(autre) + Number(lot.nb);
                  base.setCellValue(motif[lot.idlotclient],col[1]+dist,autre);
                }

                //////console.log("ligne2:"+motif[lot.idlotclient]+"cols:["+autre+","+hospiSe+","+optAud+","+Dent+"]");
              }
              callback();
            },function(err){

              res.setHeader('Content-disposition', 'attachment; filename=ReportingAlmerys.xlsx');
              res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
              workbook.pipe(res);

              //return res.ok(JSON.stringify(results[0]));

            });

          });*/

        }

      });
  },
  // Affichage Page Call
  PageHeureNonProdCall: function(req,res){
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    res.view("pages/Call/heure",{menu: menu, layout: false});
  },
  // recuperation des list heure non prod call
  getListHeureNonProdCall: function(req,res){
    var date_deb=req.param('datedeb');
    var date_fin=req.param('datefin');
    var typeHeure = req.param('type_heure');
    var id_dossier = req.param('id_dossier');
    var id_pers = req.param('id_pers');
    console.log(date_deb);
    console.log(date_fin);
    console.log(id_dossier);
//    return res.ok("ok");
    var array_Global=[];
    var array=[];
    var array_second=[];
//
    async.series([
      function(callback){
        // Get Date
        Almerys.getListDateLdt(date_deb,date_fin,callback);
      }
    ],function(err,dateValues){
      if(err) return res.badRequest(err);
      async.forEachSeries(dateValues[0],function (dateValue,Callback_s1) {
        //Get Pers
        console.log(dateValue.date_deb_ldt);
        async.series([
          function(callback){
            Almerys.getListPersByDate(dateValue.date_deb_ldt,id_dossier,id_pers,callback);
          }
        ],function(err_inner,persValues){
          if(err_inner) return res.badRequest(err_inner);
          //Get Heure
          async.forEachSeries(persValues[0],function (persValue,Callback_s2) {
            async.series([
              //    "FORMATION: ASSISTANCE OP"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,22,callback);
              },
              //    "FORMATION: PRATIQUE"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,23,callback);
              },
              //    "FORMATION: SOUS-CHARGE"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,15,callback);
              },
              //    "FORMATION: THEORIQUE"
              function(callback){
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,2,callback);
              },
              //          "REUNION: ADMINISTRATIVE/RH"
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,25,callback);
              },
              //          "REUNION: INTERNE"
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,12,callback);
              },
              // PROBLEME TECHNIQUE
              //PROBLEME : INTERNET
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,6,callback);
              },
              // PROBLEME: MACHINE
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,5,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,7,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,16,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,31,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,32,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,33,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,34,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,35,callback);
              },
              function (callback) {
                Almerys.getDuration(persValue.id_pers,dateValue.date_deb_ldt,id_dossier,36,callback);
              },
            ],function(err_heure,heureValue){
              var object={};
              object.date=dateValue.date_deb_ldt;
              object.id_pers=persValue.id_pers;
              object.formation_assistance_op=nullsetzero(heureValue[0][0].duree);
              object.formation_pratique=nullsetzero(heureValue[1][0].duree);
              object.formation_souscharge=nullsetzero(heureValue[2][0].duree);
              object.formation_theorique=nullsetzero(heureValue[3][0].duree);
              object.formation_administrative=nullsetzero(heureValue[4][0].duree);
              object.reunion_interne=nullsetzero(heureValue[5][0].duree);
              array.push(object);
              var object_second={};
              object_second.date=dateValue.date_deb_ldt;
              object_second.id_pers=persValue.id_pers;
              object_second.probleme_internet=nullsetzero(heureValue[6][0].duree);
              object_second.probleme_machine=nullsetzero(heureValue[7][0].duree);
              object_second.panne_reseau=nullsetzero(heureValue[8][0].duree);
              object_second.probleme_application=nullsetzero(heureValue[9][0].duree);
              object_second.ferme_bureautique=nullsetzero(heureValue[10][0].duree);
              object_second.progiciel_generali=nullsetzero(heureValue[11][0].duree);
              object_second.probleme_vdi=nullsetzero(heureValue[12][0].duree);
              object_second.probleme_kiamo=nullsetzero(heureValue[13][0].duree);
              object_second.probleme_interne=nullsetzero(heureValue[14][0].duree);
              object_second.probleme_connexion_bureau=nullsetzero(heureValue[15][0].duree);
              array_second.push(object_second);
              Callback_s2();
            });
          }, function() {
            Callback_s1();
          });
        });
      }, function() {
        array_Global.push(array);
        array_Global.push(array_second);
        return res.ok(JSON.stringify(array_Global));
      });
      //   res.json(dateValues);
    });
  },
  // Affichage Page Remontée Call
  PageTraitementRemonte: function(req,res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    res.view("pages/Call/Ticketing/Traitement_Remonte/index",{menu: menu, layout: false});
  },
  // Recuperation Liste Traitement Remontée
  getListTraitementRemontée: function(req,res) {
    let options = req.allParams();
    console.log(options);
    options.id_ticket = "";
    async.series([
      function(callback) {
        AlmerysCall.getRemonteTicketing(options, callback);
      }
    ],function(erreur_series, result_series){
      if(erreur_series)
      {
        return res.badRequest('Une erreur est survenue lors de la recuperation de donnée');
      }
      return res.json(result_series[0]);
    });
  },
  //Recuperation liste Specialite Ticketing
  GetSpecialiteTicketing: function(req,res) {
    async.series([
      function (callback) {
        AlmerysCall.getListSpecialiteTicketing(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify(result[0]));
    });
  },
  //Recuperation Liste Action Ticketing Remontee
  GetActionTicketing: function(req,res) {
    async.series([
      function(callback) {
        AlmerysCall.getListActionTicketing(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      console.log("Done Request");
      return res.ok(JSON.stringify(result[0]));
    });
  },
  //Recuperation liste Etat Demande Ticketing
  GetEtatDemandeTicketing: function(req,res) {
    async.series([
      function (callback) {
        AlmerysCall.getListEtatDemandeTicketing(req.allParams(), callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify(result[0]));
    });
  },
  //Recuperation liste Client Ticketing
  GetClientTicketing: function(req,res) {
    async.series([
      function (callback) {
        AlmerysCall.getListClientTicketing(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify(result[0]));
    });
  },
  //Recuperation liste Demande Ticketing
  GetDemandeTicketing: function(req,res) {
    async.series([
      function (callback) {0
        AlmerysCall.getListDemandeTicketing(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify(result[0]));
    });
  },
  //Recuperation liste Nature Erreur
  GetDemandeNatureErreur: function(req,res) {
    async.series([
      function (callback) {
        AlmerysCall.getListNatureErreur(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      return res.ok(JSON.stringify(result[0]));
    });
  },
  //Action Initial Traitement
  InitTraitementRemonte: function(req, res) {
    var params = req.allParams();
    var id_pers_traite = req.session.user;
    var datenow = moment().format('YYYYMMDD');
    var hournow = moment().format('HH:mm:ss');
    //console.log(params);
    // SAUVEGARDE ETAT INITIAL DANS HISTORIQUE
    async.parallel([
      function(callback) {
        AlmerysCall.InitialisationRemonte(params, callback);
      },
      function(callback) {
        let tempIdEtatDemande = "";
        if(params.id_etat_demande)
        {
          tempIdEtatDemande = params.id_etat_demande.toString();
        }
        if(tempIdEtatDemande === '3' || tempIdEtatDemande === '6')
        {
          // Etat 3
          AlmerysCall.getInfoWithoutInit(params, callback);
        }
        else
        if(req.session.UserRemonteCall.id_niveau === 1 || params.id_action.toString() === '2' || params.id_action.toString() === '1')
        {
          AlmerysCall.getInfoWithoutInit(params, callback);
        }
        // CHECK N2
        else if((req.session.UserRemonteCall.id_niveau < 3) && (tempIdEtatDemande === '4' || tempIdEtatDemande === '5'))
        {
          AlmerysCall.getInfoWithoutInit(params, callback);
        }
        // CHECK N3
        else if(req.session.UserRemonteCall.id_niveau < 4 && tempIdEtatDemande === '5')
        {
          AlmerysCall.getInfoWithoutInit(params, callback);
        }
        else
        {
          AlmerysCall.checkECRemonte(params,id_pers_traite, callback);
        }
      },
      // Recuperation Historique Traitement
      function(callback) {
        AlmerysCall.getHistoriqueRemonteCall(params, callback);
      }
    ],function(erreur_init, result_init){
      if(erreur_init)
      {
        console.log("erreur_init "+erreur_init);
        return res.badRequest(erreur_init);
      }
      // CHECK TRAITEMENT result_init
      var objectRetourEC = result_init[1];
      if(objectRetourEC.status !== 'ok')
      {
        if(objectRetourEC.status === 'ec_vue_tc')
        {
          objectRetourEC.dataHistoriqueRemonte = result_init[2];
        }
        //console.log(objectRetourEC);
        // Retour OBJ Test
        return res.json(objectRetourEC);
      }
      else
      {
        // DEBUT VUE POUR LES N
        if(req.session.UserRemonteCall.id_niveau === 1 || params.id_action.toString() === '1' || params.id_action.toString() === '2')
        {
          const objetRetour = {
            status: 'nouveau_vue_tc',
            dataHistorique: {
              id: 0,
              id_pers: 0,
              id_etat_precedent: 0,
            },
            dataTicket: params,
            dataDoublons: 0,
            dataHistoriqueRemonte: result_init[2]
          };
          return res.json(objetRetour);
        }else
        {
          // DEBUT TRAITEMENT POUR LES N1 ++
          async.parallel([
            // Modification Etat Ticket General ---> Encours
            function(para) {
              let option = {
                id_ticket: params.id_ticket,
                id_etat: 1,
                //id_pertinence: 0,
              };
              AlmerysCall.ModificationEtatTicket(option, para);
            },
            // Creation Ticket Etat -----> En Cours
            function(para)  {
              if(params.id_etat_demande ==='')
              {
                params.id_etat_demande = '0';
              }
              let option = {
                id_ticket: params.id_ticket,
                id_pers: id_pers_traite,
                id_action: 4,
                id_etat: 1,
                commentaire: 'En cours de traitement',
                h_deb: hournow,
                h_fin: '',
                date_action: datenow,
                id_etat_precedent: params.id_etat_demande,
              };
              console.log("Id etat demande ===-> "+params.id_etat_demande);
              AlmerysCall.InsertionNouvelleHistorique(option, para);
            }
          ],function(erreur_etatTicket, result_etatTicket){
            if(erreur_etatTicket) return res.badRequest(erreur_etatTicket);
            // Verification Doublon
            async.series([
              function(cb_series_doublons) {
                AlmerysCall.getDoublonNumFinessRemonte(params, cb_series_doublons);
              }
            ],function(error_doublons, result_doublons){
              if(error_doublons)
              {
                return res.badRequest(error_doublons);
              }
              else
              {
                // Retour Client (vue)
                const objetRetour = {
                  status: 'ok',
                  dataHistorique: {
                    id: result_etatTicket[1][0].id,
                    id_pers: result_etatTicket[1][0].id_pers,
                    id_etat_precedent: result_etatTicket[1][0].id_etat_precedent,
                  },
                  dataTicket: params,
                  dataDoublons: result_doublons[0],
                  dataHistoriqueRemonte: result_init[2]
                };
                return res.json(objetRetour);
              }
            });
          });
        }
      }
    });
  },
  // Action Annuler traitement
  AnnulerTraitementRemontee: function(req,res) {
    var params = req.allParams();
    var datenow = moment().format('YYYYMMDD');
    var hournow = moment().format('HH:mm:ss');
    //params.date_action = datenow;
    params.h_fin = hournow;
    async.series([
      function(callback) {
        AlmerysCall.UpdateHistoriqueRemonte(params, callback);
      },
      function(callback) {
        AlmerysCall.UpdateEtatRemonte(params, callback);
      }
    ],function (erreur, result) {
      if(erreur) return res.badRequest(erreur);
      return res.json("ModificationTerminer");
    });
  },
  // Action Enregistrer Traitement
  ValiderTraitementRemontee: function(req,res) {
    var params = req.allParams();
    var datenow = moment().format('YYYYMMDD');
    var hournow = moment().format('HH:mm:ss');
    //params.date_action = datenow;
    params.h_fin = hournow;
    async.parallel([
      function(callback) {
        AlmerysCall.UpdateHistoriqueRemonte(params, callback);
      },
      function(callback) {
        AlmerysCall.UpdateEtatRemonte(params, callback);
      }
    ],function (erreur, result) {
      if(erreur) return res.badRequest(erreur);
      return res.json("ModificationTerminer");
    });
  },
  // Affichage Page  GESTION Call
  PageGestionUtilisateurRemonte: function(req,res) {
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "selected";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";

    res.view("pages/Call/Ticketing/GestionUtilisateur/index",{menu: menu, layout: false});
  },

  // Action Recuperation Liste NiVEAU UTILISAteur RMEONTE
  GetListNiveauUtilisateurRemonte: function(req, res) {
    async.series([
      function(callback) {
        AlmerysCall.getListeNiveauProfilRemonte(null, callback);
      }
    ], function (err, result) {
      if (err) return res.send(err);
      //console.log("Done Request");
      return res.ok(JSON.stringify(result[0]));
    });
  },
  // Action Recuperation Liste Utlisateur Call NIVEAU
  GetListUtilisateurRemonteCall: function(req, res) {
    async.series([
      function(callback) {
        AlmerysCall.getAllListUtilisateurRemonteCall(callback);
      }
    ],function (erreur_recuperation, result_recuperation){
      if(erreur_recuperation) return res.badRequest(erreur_recuperation);
      return res.json(result_recuperation[0]);
    });
  },
  // Action Insertion Nouveau Utilisateur Call Niveau
  InsertUtilisateurRemonteCall: function (req, res) {
    var params = req.allParams();
    // CHECK SI MATRICULE EXISTE DEJA
    async.series([
      function(callback) {
        AlmerysCall.checkIfUtilisateurRemonteCallExist(params, callback);
      }
    ],function(erreur_checkexist, result_checkexist)
    {
      if(erreur_checkexist) return res.badRequest(erreur_checkexist);
      if(result_checkexist[0])
      {
        return res.json({status: "exist"});
      }
      else
      {
        async.series([
          function(cb_series) {
            AlmerysCall.insertUtilisateurRemonteCall(params, cb_series);
          }
        ],function(erreur_insertion, result_insertion){
          if(erreur_insertion) {
            return res.badRequest(erreur_insertion);
          }
          return res.json({status: "done"});
        });
      }
    });
  },
  // Action Modifier Etat Remonte Etat
  UpdateNiveauUtilisateurRemonteCall: function(req, res) {
    var params = req.allParams();
    async.series([
      function(callback) {
        AlmerysCall.setNiveauUtilisateurRemonteCall(params, callback);
      }
    ],function(erreur_checkexist, result_checkexist)
    {
      if(erreur_checkexist) return res.badRequest(erreur_checkexist);
      return res.json({status: "done"});
    });
  },
  // Action Suppression Donnee
  DeleteUtilisateurRemonteCall: function(req, res) {
    var params = req.allParams();
    async.series([
      function(callback) {
        AlmerysCall.SupprimerUtilisateurRemonteCallExist(params, callback);
      }
    ],function(erreur_checkexist, result_checkexist)
    {
      if(erreur_checkexist) return res.badRequest(erreur_checkexist);
      return res.json({status: "done"});
    });
  },
  // Action Recuperation Donnee
  GetReportingRemonteeCall: function(req, res) {
    let options = req.allParams();
    console.log(options);
    options.id_ticket = "";
    async.series([
      // Get Reporting ETAT + pertinence
      function(callback) {
        AlmerysCall.getDataRemonteeReportingEtatEtPertinence(options, callback);
      },
    ],function(erreur_series, result_series){
      if(erreur_series)
      {
        return res.badRequest('Une erreur est survenue lors de la recuperation de donnée');
      }
      return res.json(result_series[0]);
    });
  },
  /***
   *      -----------------------------------------------------------------------------------------------------------------------------------
   *      -------------------------------------------------------- SECTION SAISIE -----------------------------------------------------------
   *      -----------------------------------------------------------------------------------------------------------------------------------s
   * @param req
   * @param res
   * @constructor
   */
  // Initialisation Traitement Saisie
  InitTraitementSaisie: function(req, res) {
    var params = req.allParams();
    var id_pers_traite = req.session.user;
    var datenow = moment().format('YYYYMMDD');
    var hournow = moment().format('HH:mm:ss');
    //console.log(params);
    // SAUVEGARDE ETAT INITIAL DANS HISTORIQUE
    async.parallel([
      // Initialisation Saisie
      function(callback) {
        AlmerysCall.InitialisationRemonte(params, callback);
      },
      // Verification si Encours
      function(callback) {
        let tempIdEtatDemande = "";
        if(params.id_etat_demande)
        {
          tempIdEtatDemande = params.id_etat_demande.toString();
        }
        AlmerysCall.checkECSaisie(params,id_pers_traite, callback);
      },
      // Recuperation Historique Traitement
      function(callback) {
        AlmerysCall.getHistoriqueRemonteCall(params, callback);
      }
    ],function(erreur_init, result_init){
      if(erreur_init)
      {
        console.log("erreur_init "+erreur_init);
        return res.badRequest(erreur_init);
      }
      // CHECK TRAITEMENT result_init
      var objectRetourEC = result_init[1];
      if(objectRetourEC.status !== 'ok')
      {
        if(objectRetourEC.status === 'ec_vue_tc')
        {
          objectRetourEC.dataHistoriqueSaisie = result_init[2];
        }
        //console.log(objectRetourEC);
        // Retour OBJ Test
        return res.json(objectRetourEC);
      }
      else
      {
        // Force Lancement Vue TC si Droit NOK
        if(req.session.UserRemonteCall.etat_autoriser == null)
        {
          // PROBLEME C-- ou continuer
        }
        else
        {
          if(req.session.UserRemonteCall === null)
          {
            //req.session.UserRemonteCall = '';
          }
          var arrayEtatAutoriser = req.session.UserRemonteCall.etat_autoriser.split(',');
          if(params.id_etat_demande ==="" && req.session.UserRemonteCall.id_niveau === 6)
          {
            console.log("OPG 1 GO");
          }
          else
          {
            if(req.session.UserRemonteCall.etat_autoriser.toString() === '')
            {
              // ASSIGNATION VALEUR ou continuer
            }
            else if(!arrayEtatAutoriser.includes(params.id_etat_demande))
            {
              const objetRetour = {
                status: 'nouveau_vue_tc',
                dataHistorique: {
                  id: 0,
                  id_pers: 0,
                  id_etat_precedent: 0,
                },
                dataTicket: params,
                dataHistoriqueSaisie: result_init[2]
              };
              return res.json(objetRetour);
            }
          }
        }

        // DEBUT VUE POUR LES N
        if(req.session.UserRemonteCall.id_niveau === 1 || params.id_action.toString() === '1' || params.id_action.toString() === '2')
        {
          const objetRetour = {
            status: 'nouveau_vue_tc',
            dataHistorique: {
              id: 0,
              id_pers: 0,
              id_etat_precedent: 0,
            },
            dataTicket: params,
            dataHistoriqueSaisie: result_init[2]
          };
          return res.json(objetRetour);
        }else
        {
          // DEBUT TRAITEMENT POUR LES N1 ++
          async.parallel([
            // Modification Etat Ticket General ---> Encours
            function(para) {
              let option = {
                id_ticket: params.id_ticket,
                id_etat: 1,
                //id_pertinence: 0,
              };
              AlmerysCall.ModificationEtatTicket(option, para);
            },
            // Creation Ticket Etat -----> En Cours
            function(para)  {
              if(params.id_etat_demande ==='')
              {
                params.id_etat_demande = '0';
              }
              let option = {
                id_ticket: params.id_ticket,
                id_pers: id_pers_traite,
                id_action: 4,
                id_etat: 1,
                commentaire: 'En cours de traitement',
                h_deb: hournow,
                h_fin: '',
                date_action: datenow,
                id_etat_precedent: params.id_etat_demande,
              };
              console.log("Id etat demande ===-> "+params.id_etat_demande);
              AlmerysCall.InsertionNouvelleHistorique(option, para);
            }
          ],function(erreur_etatTicket, result_etatTicket){
            if(erreur_etatTicket) return res.badRequest(erreur_etatTicket);
            // Verification Doublon
            async.series([
              function(cb_series_doublons) {
                return cb_series_doublons(null, true);
                //AlmerysCall.getDoublonNumFinessRemonte(params, cb_series_doublons);
              }
            ],function(error_doublons, result_doublons){
              if(error_doublons)
              {
                return res.badRequest(error_doublons);
              }
              else
              {
                // Retour Client (vue)
                const objetRetour = {
                  status: 'ok',
                  dataHistorique: {
                    id: result_etatTicket[1][0].id,
                    id_pers: result_etatTicket[1][0].id_pers,
                    id_etat_precedent: result_etatTicket[1][0].id_etat_precedent,
                  },
                  dataTicket: params,
                  //dataDoublons: result_doublons[0],
                  dataHistoriqueSaisie: result_init[2]
                };
                return res.json(objetRetour);
              }
            });
          });
        }
      }
    });
  },
  // Fonction Validation Traitement SAISIE
  ValiderTraitementSaisie: function(req, res) {
    var params = req.allParams();
    var datenow = moment().format('YYYYMMDD');
    var hournow = moment().format('HH:mm:ss');
    //params.date_action = datenow;
    params.h_fin = hournow;
    async.parallel([
      // Mise a jour Historique
      function(callback) {
        AlmerysCall.UpdateHistoriqueSaisie(params, req, callback);
      },
      function(callback) {
        AlmerysCall.UpdateSaisieMain(params, callback);
      },
      function(callback) {
        AlmerysCall.SaveHistoriqueUpdateSaisie(params, callback);
      }
    ],function (erreur, result) {
      if(erreur) return res.badRequest(erreur);
      return res.json("ModificationTerminer");
    });
  },
  // Action Recuperation Reporting Saisie
  GetReportingSaisieCall: function (req, res) {
    var json_data = [];
    var excel = require('excel4node');
    var fs = require('fs');
    var params = req.allParams();
    var cheminExport = "templates/Reporting_ReSaisie_Ticketing_"+ req.session.user+".xlsx";
    params.id_ticket = '';
    console.log(params);
    async.series([
      function(callback) {
        AlmerysCall.getRemonteTicketing(params, callback);
      }
    ],function(erreur_series, result_series){
      if(erreur_series)
      {
        return res.badRequest('Une erreur est survenue lors de la recuperation de donnée');
      }
        // Initialisation Excel
      var wb = new excel.Workbook();
      var ws = wb.addWorksheet('Export');
      var myStyleTraitement = wb.createStyle({
        /* alignement:{
         horizontal: ['center'],
         vertical: ['center'],
         }, */
        alignment: {
          shrinkToFit: true,
          wrapText: true
        },
        font: {
          color: 'white',
          bold: true,
          size: 12
        },
        fill: {
          type: 'pattern', // the only one implemented so far.
          patternType: 'solid', // most common.
          fgColor: '#107510', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
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
      var myStyleN1 = wb.createStyle({
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
          fgColor: '#23b526', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
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
      var myStyleN2Saisie = wb.createStyle({
        /* alignement:{
         horizontal: ['center'],
         vertical: ['center'],
         }, */
        alignment: {
          shrinkToFit: true,
          wrapText: true
        },
        font: {
          color: 'white',
          bold: true,
          size: 12
        },
        fill: {
          type: 'pattern', // the only one implemented so far.
          patternType: 'solid', // most common.
          fgColor: '#000275', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
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
      var myStyleN2Call = wb.createStyle({
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
          fgColor: '#fffe27', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
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
      var myStyleRappel = wb.createStyle({
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
          fgColor: '#5a7500', // you can add two extra characters to serve as alpha, i.e. '2172d7aa'.
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
      // ENTETE TRAITEMENT
      ws.cell(1,1).string("Date").style(myStyleTraitement);
      ws.cell(1,2).string("Pôle").style(myStyleTraitement);
      ws.cell(1,3).string("Sphere").style(myStyleTraitement);
      ws.cell(1,4).string("TC").style(myStyleTraitement);
      ws.cell(1,5).string("NUO").style(myStyleTraitement);
      ws.cell(1,6).string("N° PS").style(myStyleTraitement);
      ws.cell(1,7).string("N° " +
        "Facture").style(myStyleTraitement);
      ws.cell(1,8).string("N° PEC").style(myStyleTraitement);
      ws.cell(1,9).string("NNI").style(myStyleTraitement);
      ws.cell(1,10).string("Date de naissance").style(myStyleTraitement);
      ws.cell(1,11).string("SAT").style(myStyleTraitement);
      ws.cell(1,12).string("Nature de l'erreur").style(myStyleTraitement);
      ws.cell(1,13).string("Traitement à réaliser").style(myStyleTraitement);
      // ENTETE CELLULE SAISIE N1
      ws.cell(1,14).string("Cellule Saisie N1").style(myStyleN1);
      ws.cell(1,15).string("Etat").style(myStyleN1);
      ws.cell(1,16).string("Commentaire").style(myStyleN1);
      // ENTETE CELLULE SAISIE N2
      ws.cell(1,17).string("Cellule Saisie N2").style(myStyleN2Saisie);
      ws.cell(1,18).string("Etat").style(myStyleN2Saisie);
      ws.cell(1,19).string("Commentaire").style(myStyleN2Saisie);
      // ENTETE CELLULE CALL N2
      ws.cell(1,20).string("N2-Call").style(myStyleN2Call);
      ws.cell(1,21).string("Etat").style(myStyleN2Call);
      ws.cell(1,22).string("Commentaire").style(myStyleN2Call);
      // ENTETE CELLULE RAPPEL
      ws.cell(1,23).string("Nom PS").style(myStyleRappel);
      ws.cell(1,24).string("Numero telephone").style(myStyleRappel);
      ws.cell(1,25).string("Rappel PS/Reprise").style(myStyleRappel);
        // Parcours Par Ligne Appel
      var row = 2;
        async.forEachSeries(result_series[0], function(dataTicket, next){
          async.parallel([
            // Recuperation Valeur N1 Saisie
            function(cb_para) {
              let option = {
                id_ticket: dataTicket.id_ticket,
                id_droit: '6',
              };
              AlmerysCall.getModificationResaisieTicket(option ,cb_para);
            },
            // Recuperation Valeur N2 Saisie
            function(cb_para) {
              let option = {
                id_ticket: dataTicket.id_ticket,
                id_droit: '7',
              };
              AlmerysCall.getModificationResaisieTicket(option ,cb_para);
            },
            // Recuperation Valeur N2 Call
            function(cb_para) {
              let option = {
                id_ticket: dataTicket.id_ticket,
                id_droit: '5,8',
              };
              AlmerysCall.getModificationResaisieTicket(option ,cb_para);
            },
            // Recuperation Info Rappel
            function(cb_para) {
              let option = {
                id_ticket: dataTicket.id_ticket,

              };
              AlmerysCall.getLastRappelModificationResaisieTicket(option, cb_para);
            }
          ],function(error_parallel, result_parallel){
            if(error_parallel)
            {
              return res.forbidden("Erreur Fatal");
            }
            else
            {
              let data_n1 = result_parallel[0];
              let data_n2_saisie = result_parallel[1];
              let data_n2_call = result_parallel[2];
              let data_rappel = result_parallel[3];
              // Au object suivant
              let json_object = dataTicket;
              // Assignation Donnee de Base

              // Assignation Donnee de N1
              json_object.data_n1 = {
              etat: '',
              id_pers: '',
              commentaire: '',
              date_action: '',
              };
              if(data_n1.length !== 0)
              {
                json_object.data_n1 = data_n1[0];
              }
              // Assignation Donnee de N2 Saisie
              json_object.data_n2_saisie = {
                etat: '',
                id_pers: '',
                commentaire: '',
                date_action: '',
              };
              if(data_n2_saisie.length !== 0)
              {
                json_object.data_n2_saisie = data_n2_saisie[0];
              }
              // Assignation Donnee de N2 Call
              json_object.data_n2_call = {
                etat: '',
                id_pers: '',
                commentaire: '',
                date_action: '',
              };
              if(data_n2_call.length !== 0)
              {
                json_object.data_n2_call = data_n2_call[0];
              }
              // Assignation Donnee Rappel
              json_object.data_rappel = data_rappel;
              console.log(json_object);
              //Ecriture Body
              let arrayValueDemande = json_object.value_demande.split("$separator$");
              let Sphere = arrayValueDemande[0];
              let NUO = arrayValueDemande[1];
              let Date_Naisse = arrayValueDemande[2];
              let SAT = arrayValueDemande[3];
              let Commentaire = arrayValueDemande[4];
              let NomPS = arrayValueDemande[5];
              let NumTel = arrayValueDemande[6];
              let NatureErreur = "";
              if(arrayValueDemande.length === 8)
              {
                NatureErreur = arrayValueDemande[7];
              }
              // TRAITEMENT
              ws.cell(row,1).string(json_object.date_insert);
              ws.cell(row,2).string(json_object.specialite);
              ws.cell(row,3).string(Sphere);
              ws.cell(row,4).string(json_object.prenom_fr+'');
              ws.cell(row,5).string(NUO);
              ws.cell(row,6).string(json_object.ps);
              ws.cell(row,7).string(json_object.num_facture);
              ws.cell(row,8).string(json_object.num_pec);
              ws.cell(row,9).string(json_object.nni);
              ws.cell(row,10).string(Date_Naisse);
              ws.cell(row,11).string(SAT);
              ws.cell(row,12).string(NatureErreur);
              ws.cell(row,13).string("" + Commentaire);
              // CELLULE SAISIE N1
              ws.cell(row,14).string(json_object.data_n1.date_action);
              ws.cell(row,15).string(json_object.data_n1.etat);
              ws.cell(row,16).string(json_object.data_n1.commentaire);
              // CELLULE SAISIE N2
              ws.cell(row,17).string(json_object.data_n2_saisie.date_action);
              ws.cell(row,18).string(json_object.data_n2_saisie.etat);
              ws.cell(row,19).string(json_object.data_n2_saisie.commentaire);
              // CELLULE CALL N2
              ws.cell(row,20).string(json_object.data_n2_call.date_action);
              ws.cell(row,21).string(json_object.data_n2_call.etat);
              ws.cell(row,22).string(json_object.data_n2_call.commentaire);
              // CELLULE RAPPEL
              ws.cell(row,23).string(NomPS);
              ws.cell(row,24).string(NumTel);
              ws.cell(row,25).string(json_object.data_rappel);
              row++;
              next();
            }
          });
        },function(err)
        {
          //return res.json(json_data);
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
          //res.setHeader('Content-disposition', 'attachment; filename=ReportingAlmerysCall.xlsx');
          //res.setHeader('Content-type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          //return workbook.pipe(res);
        });
    });
    //return res.json(json_data);
  }
};

