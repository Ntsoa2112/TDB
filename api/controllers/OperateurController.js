/**
 * OperateurController
 *
 * @description :: Server-side logic for managing operateurs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const RestrictionPage = require('../services/RestrictionPage');

module.exports = {
  suivis : function (req, res) {
    var math = require('mathjs');
    /*Check session*/
    /*
    if (!req.session.user) return res.redirect('/login');
    if (req.session.user=="ostie") return res.redirect('/ostie');
    */

    /* class des menus*/

    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";

    var quota = (req.param('quota')) ? req.param('quota') : '';

    /*initialisation des parametre */
    var datecible = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    var idPers = req.session.user;
    var options = [];
    options.datecible=datecible;
    options.matricule=idPers;

    var option = [];
    option.dateess=datecible;
    option.idPers= idPers;


    async.series([
      function(callback){
        Ldt.suiviHeureOP(options, callback);
      },function(callback){
          LdtService.getRepartitionParDate(option, callback);
        },function(callback){
          Ldt.VitesseOP(options, callback);
        },function(callback){
          Ldt.evolutionVitesse(options, callback);
        }
    ],
      function(err, results) {
        if (err){

          console.log(err);
          return res.badRequest("Problème avec la récupération des données dans la base");
        }

        /*regroupement par dossier*/
        var listeDossier = results[1];



       // //console.log("result===========>"+listeDossier.length);
        var byDossier = [];
        var cpt = 0;
        for(var i=0;i<listeDossier.length;i++){
          if(byDossier.length==0){
            var byd = [];

            byd[0]=listeDossier[i].num;
            if(listeDossier[i].lib==null){
              byd[1]=(listeDossier[i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(listeDossier[i].duree)/ 3600;
            }
            if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
              byd[3]=parseInt(listeDossier[i].qte);
              //console.log("int:"+parseInt(listeDossier[i].qte));
            }else{

              byd[3]=0;
            }

            if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err);
                //console.log("int:"+parseInt(listeDossier[i].err));
            }else{
                byd[4]=0;
            }



            byDossier[cpt]=byd;
            //console.log('1:');
          }else{
            var index = -1;
            var tempProd =0;
            var temphProd = 0;
            var tempqte = 0;
            var temperr = 0;
            for(var t = 0; t<byDossier.length;t++){
              tempProd = byDossier[t][1];
              temphProd = byDossier[t][2];
              tempqte = byDossier[t][3];
              temperr = byDossier[t][4];
              //console.log("bdossier="+byDossier[t][0]+";result="+listeDossier[i].num);
              if(byDossier[t][0]==listeDossier[i].num){
                //console.log('misy:'+byDossier.length);
                index = t;
              }else{


              }
            }


            if(index==-1){
              cpt = cpt + 1;
              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                byd[1]=(listeDossier[i].duree)/ 3600;
                byd[2]=0;

              }else{
                byd[1]=0;
                byd[2]=(listeDossier[i].duree)/ 3600;
              }
              if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte);
              }else{

                byd[3]=0;
              }
              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err);
              }else{

                byd[4]=0;
              }
              byDossier[cpt]=byd;
            }else{

              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                var hp = (listeDossier[i].duree)/ 3600;
                byd[1]=hp + tempProd;
                byd[2]=temphProd;

              }else{
                var hhp = (listeDossier[i].duree)/ 3600;
                byd[1]=tempProd;
                byd[2]=hhp + temphProd;
              }
              if(listeDossier.qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte)+tempqte;
                //console.log("rows:"+parseInt(listeDossier[i].qte));
              }else{

                byd[3]=tempqte;
              }

              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err)+temperr;
                //console.log("rows:"+parseInt([i].err));
              }else{

                byd[4]=temperr;
              }
              byDossier[index]=byd;
              //console.log(byd);
            }

            //console.log('2:');

          }
          var id_pers = listeDossier[i].id_pers;
          var duree = (listeDossier[i].duree)/ 3600;

          var qte = 0;
          var num ;
          var lib;
          var vitesse =0;
          if(listeDossier[i].qte!=null && listeDossier[i].qte!=0){
            qte = listeDossier[i].qte;
            num = listeDossier[i].num;
            lib = listeDossier[i].lib;

            vitesse = qte/duree;
          }
        }


        return res.view('pages/ldtOp',{
          menu : menu,
          listeDossier : listeDossier,
          byDossier : byDossier,
          resultat :  results[0],
          rs :  results[2],
          rsDoss :  results[3],
          math :  math,
          quota : quota
        });
      });
  },

  loadErreurCq : function (req,res) {
    var idPers = req.param("idpers");
    var datecible = '';//(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);


    var dateNow = new Date();
    //console.log("day:"+dateNow.getDay());
    if(dateNow.getDay()==1){
      dateNow.setDate(dateNow.getDate() - 3);
      datecible = dateNow.toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    }else{
      dateNow.setDate(dateNow.getDate() - 1)
      datecible = dateNow.toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    }

    var option = [];
    option.datecible = datecible;
    option.idPers = idPers;

    async.series([
      function (callback) {
        Almerys.get_nrrg(option,callback);
      },
      function (callback) {
        Almerys.get_es(option,callback);
      }
    ],function (err,results) {
      if(err) return res.ok(err);
      //console.log(results)
      return res.ok(JSON.stringify({
        nrrg : results[0],
        es:results[1],
        date:datecible
      }));
    });
  },


  loadListErreurCq : function (req,res) {
    var idPers = req.param("idpers");
    var idEtat = req.param("id_etat");
    var datecible = '';//(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);


    var dateNow = new Date();
    if(dateNow.getDay==1){
      dateNow.setDate(dateNow.getDate() - 3);
      datecible = dateNow.toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    }else{
      dateNow.setDate(dateNow.getDate() - 1)
      datecible = dateNow.toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    }

    var option = [];
    option.datecible = datecible;
    option.idPers = idPers;
    option.idEtat = idEtat;

    async.series([
      function (callback) {
        Almerys.get_listErreur(option,callback);
      }
    ],function (err,results) {
      if(err) return res.ok(err);
      //console.log(results)
      return res.ok(JSON.stringify(results[0]));
    });
  },



suivisByOp : function (req, res) {
   var math = require('mathjs');
  // var aesjs = require('aes-js');
  var escape = require('escape-html');
  var querystring = require('querystring');
  var CryptoJS = require("crypto-js");
  var key = req.param("key",null);
  if(key == null) return res.ok("Executer le MAJ de votre application SVP!");

  var idPers = req.param("idpers");
  var datecible = req.param("dt",(new Date().toISOString())).replace(/-/,'').replace(/-/,'').substr(0,8) ;
  var datecible2 = req.param("dt",(new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10)) ;

// Encrypt
  var ciphertext = CryptoJS.AES.encrypt('1020_14:06:00', 'TDB2017');
  //console.log(ciphertext.toString());
  //console.log(querystring.escape(ciphertext.toString()));
  //console.log(querystring.unescape(querystring.escape(ciphertext.toString())));
// Decrypt
  var bytes  = CryptoJS.AES.decrypt(querystring.unescape(key), 'TDB2017');
  var plaintext = bytes.toString(CryptoJS.enc.Utf8);

  //console.log(plaintext);

 /* var cle = req.param("key");
  var key_128 = new Buffer([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
  var key_256 = new Buffer([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
    16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
    29, 30, 31]);
  var key = aesjs.util.convertStringToBytes(key_128);

// Convert text to bytes
  var text = '1020_18:22:2';

  var textBytes = aesjs.util.convertStringToBytes(text);

// The counter is optional, and if omitted will begin at 0
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
  var encryptedBytes = aesCtr.encrypt(textBytes);

  //console.log(querystring.escape(encryptedBytes.toString('utf8')));
  //console.log(aesjs.util.convertStringToBytes(querystring.unescape(cle)));
  //console.log(new Buffer(querystring.unescape(cle), "utf-8"));
  //console.log(aesjs.util.convertStringToBytes(aesjs.util.convertBytesToString(encryptedBytes)));
  //console.log(encryptedBytes);
// The counter mode of operation maintains internal state, so to
// decrypt a new instance must be instantiated.
  var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));

// Convert our bytes back into text
  var decryptedText = aesjs.util.convertBytesToString(decryptedBytes);
  //console.log(decryptedText);
    var datecible = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    var idPers = req.param("idpers");
*/
    var splitKey = plaintext.split("_");
    var heureSplit = splitKey[1].split(":");
    var dtt = splitKey[2];
    var heurParam = (new Date().setHours(parseInt(heureSplit[0]), parseInt(heureSplit[1]), parseInt(heureSplit[2])));
  //console.log(heurParam);

    var dateNow = new Date();
  dateNow = dateNow.setHours(dateNow.getHours(),  dateNow.getMinutes(),dateNow.getSeconds());
  //console.log(dateNow);
  //console.log((dateNow-heurParam)/1000/60);
    if(splitKey[0]!=idPers){
      return res.ok("Non autoriser");
    }else{
      if((dateNow-heurParam)>5*1000*60){
        return res.ok("SESSIONS EXPIREE");
      }
    }
    var options = [];
    options.datecible=datecible;
    options.matricule=idPers;

    var option = [];
    option.dateess=datecible;
    option.date=datecible2;
    option.idPers= idPers;


    async.series([
      function(callback){
        Ldt.suiviHeureOP(options, callback);
      },function(callback){
          LdtService.getRepartitionParDate(option, callback);
        },function(callback){
          Ldt.VitesseOP(options, callback);
        },function(callback){
          Ldt.evolutionVitesse(options, callback);
        },function(callback){
          Pointage.getPointageJournaliere(option, callback);
        },function(callback){
          Pointage.getAnomaliePointageMensuele(idPers, callback);
        },function(callback){
          Ldt.countEtapeParDate(option, callback);
        },function(callback){
          Ldt.getEtapeParDate(option, callback);
        },function(callback){
          Pointage.getAdressIp(idPers, callback);
        }
        ,function(callback){
          Ldt.getLdtOneOp(idPers, callback);
        }
      ,function(callback){
          Photo.find({id_pers : idPers}, function(err, resultat){
            if(err || resultat[0] == undefined || resultat.length ==0) return callback(null, null);

            var imageToShow = ImageService.toBase64String(resultat[0].photo);
            return callback(null, imageToShow)
          });
        },function(callback){
          User.find({id_pers : idPers}, function(err, resultat){
            if(err || resultat[0] == undefined) return null;

            return callback(null, resultat[0].appelation);
          });
        }
    ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        /*regroupement par dossier*/
        var listeDossier = results[1];



       // //console.log("result===========>"+listeDossier.length);
        var byDossier = [];
        var cpt = 0;
        for(var i=0;i<listeDossier.length;i++){
          if(byDossier.length==0){
            var byd = [];

            byd[0]=listeDossier[i].num;
            if(listeDossier[i].lib==null){
              byd[1]=(listeDossier[i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(listeDossier[i].duree)/ 3600;
            }
            if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
              byd[3]=parseInt(listeDossier[i].qte);
              //console.log("int:"+parseInt(listeDossier[i].qte));
            }else{

              byd[3]=0;
            }

            if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err);
                //console.log("int:"+parseInt(listeDossier[i].err));
            }else{
                byd[4]=0;
            }



            byDossier[cpt]=byd;
            //console.log('1:');
          }else{
            var index = -1;
            var tempProd =0;
            var temphProd = 0;
            var tempqte = 0;
            var temperr = 0;
            for(var t = 0; t<byDossier.length;t++){
              tempProd = byDossier[t][1];
              temphProd = byDossier[t][2];
              tempqte = byDossier[t][3];
              temperr = byDossier[t][4];
              //console.log("bdossier="+byDossier[t][0]+";result="+listeDossier[i].num);
              if(byDossier[t][0]==listeDossier[i].num){
                //console.log('misy:'+byDossier.length);
                index = t;
              }else{


              }
            }


            if(index==-1){
              cpt = cpt + 1;
              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                byd[1]=(listeDossier[i].duree)/ 3600;
                byd[2]=0;

              }else{
                byd[1]=0;
                byd[2]=(listeDossier[i].duree)/ 3600;
              }
              if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte);
              }else{

                byd[3]=0;
              }
              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err);
              }else{

                byd[4]=0;
              }
              byDossier[cpt]=byd;
            }else{

              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                var hp = (listeDossier[i].duree)/ 3600;
                byd[1]=hp + tempProd;
                byd[2]=temphProd;

              }else{
                var hhp = (listeDossier[i].duree)/ 3600;
                byd[1]=tempProd;
                byd[2]=hhp + temphProd;
              }
              if(listeDossier.qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte)+tempqte;
                //console.log("rows:"+parseInt(listeDossier[i].qte));
              }else{

                byd[3]=tempqte;
              }

              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err)+temperr;
                //console.log("rows:"+parseInt([i].err));
              }else{

                byd[4]=temperr;
              }
              byDossier[index]=byd;
              //console.log(byd);
            }

            //console.log('2:');

          }
          var id_pers = listeDossier[i].id_pers;
          var duree = (listeDossier[i].duree)/ 3600;

          var qte = 0;
          var num ;
          var lib;
          var vitesse =0;
          if(listeDossier[i].qte!=null && listeDossier[i].qte!=0){
            qte = listeDossier[i].qte;
            num = listeDossier[i].num;
            lib = listeDossier[i].lib;

            vitesse = qte/duree;
          }
        }




        return res.view('pages/ldtOpCS',{
          listeDossier : listeDossier,
          byDossier : byDossier,
          resultat :  results[0],
          rs :  results[2],
          rsDoss :  results[3],
          pointage :  results[4],
          pointageMens :  results[5],
          countEtape :  results[6],
          getEtape :  results[7],
          ip :  results[8],
          ldtOne: results[9],
          img: results[10],
          appelation: results[11],
          datecible: datecible,
          idpers :  idPers,
          layout :  false,
          math :  math,
          quota : ""
        });
      });
  },
suivisByOpAd : function (req, res) {
  // if (!req.session.user) return res.redirect('/login');
   var math = require('mathjs');
  // var aesjs = require('aes-js');

 
  var idPers = req.session.user;
  var quota = req.session.tdb_op;

  var datecible = req.param("dt",(new Date().toISOString())).replace(/-/,'').replace(/-/,'').substr(0,8) ;
  var datecible2 = req.param("dt",(new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10)) ;

// Encrypt

    var options = [];
    options.datecible=datecible;
    options.matricule=idPers;
    var option = [];
    option.dateess=datecible;
    option.date=datecible2;
    option.idPers= idPers;


    async.series([
      function(callback){
        Ldt.suiviHeureOP(options, callback);
      },
       function(callback){
          LdtService.getRepartitionParDate(option, callback);
       },
       function(callback){
          Ldt.VitesseOP(options, callback);
        },function(callback){
          Ldt.evolutionVitesse(options, callback);
        },function(callback){
          Pointage.getPointageJournaliere(option, callback);
        },function(callback){
          Pointage.getAnomaliePointageMensuele(idPers, callback);
        },function(callback){
          Ldt.countEtapeParDate(option, callback);
        },function(callback){
          Ldt.getEtapeParDate(option, callback);
        },function(callback){
          Pointage.getAdressIp(idPers, callback);
        }
        ,function(callback){
          Ldt.getLdtOneOp(idPers, callback);
        }
      ,function(callback){
          Photo.find({id_pers : idPers}, function(err, resultat){
            if(err || resultat[0] == undefined || resultat.length ==0) return callback(null, null);

            var imageToShow = ImageService.toBase64String(resultat[0].photo);
            return callback(null, imageToShow)
          });
        },function(callback){
          User.find({id_pers : idPers}, function(err, resultat){
            if(err || resultat[0] == undefined) return null;

            return callback(null, resultat[0].appelation);
          });
        }
    ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        /*regroupement par dossier*/
        var listeDossier = results[1];
       // //console.log("result===========>"+listeDossier.length);
        var byDossier = [];
        var cpt = 0;
        for(var i=0;i<listeDossier.length;i++){
          if(byDossier.length==0){
            var byd = [];

            byd[0]=listeDossier[i].num;
            if(listeDossier[i].lib==null){
              byd[1]=(listeDossier[i].duree)/ 3600;
              byd[2]=0;
            }else{
              byd[1]=0;
              byd[2]=(listeDossier[i].duree)/ 3600;
            }
            if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
              byd[3]=parseInt(listeDossier[i].qte);
              //console.log("int:"+parseInt(listeDossier[i].qte));
            }else{

              byd[3]=0;
            }

            if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err);
                //console.log("int:"+parseInt(listeDossier[i].err));
            }else{
                byd[4]=0;
            }



            byDossier[cpt]=byd;
            //console.log('1:');
          }else{
            var index = -1;
            var tempProd =0;
            var temphProd = 0;
            var tempqte = 0;
            var temperr = 0;
            for(var t = 0; t<byDossier.length;t++){
              tempProd = byDossier[t][1];
              temphProd = byDossier[t][2];
              tempqte = byDossier[t][3];
              temperr = byDossier[t][4];
              //console.log("bdossier="+byDossier[t][0]+";result="+listeDossier[i].num);
              if(byDossier[t][0]==listeDossier[i].num){
                //console.log('misy:'+byDossier.length);
                index = t;
              }else{


              }
            }


            if(index==-1){
              cpt = cpt + 1;
              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                byd[1]=(listeDossier[i].duree)/ 3600;
                byd[2]=0;

              }else{
                byd[1]=0;
                byd[2]=(listeDossier[i].duree)/ 3600;
              }
              if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte);
              }else{

                byd[3]=0;
              }
              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err);
              }else{

                byd[4]=0;
              }
              byDossier[cpt]=byd;
            }else{

              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                var hp = (listeDossier[i].duree)/ 3600;
                byd[1]=hp + tempProd;
                byd[2]=temphProd;

              }else{
                var hhp = (listeDossier[i].duree)/ 3600;
                byd[1]=tempProd;
                byd[2]=hhp + temphProd;
              }
              if(listeDossier.qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte)+tempqte;
                //console.log("rows:"+parseInt(listeDossier[i].qte));
              }else{

                byd[3]=tempqte;
              }

              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err)+temperr;
                //console.log("rows:"+parseInt([i].err));
              }else{

                byd[4]=temperr;
              }
              byDossier[index]=byd;
              //console.log(byd);
            }

            //console.log('2:');

          }
          var id_pers = listeDossier[i].id_pers;
          var duree = (listeDossier[i].duree)/ 3600;

          var qte = 0;
          var num ;
          var lib;
          var vitesse =0;
          if(listeDossier[i].qte!=null && listeDossier[i].qte!=0){
            qte = listeDossier[i].qte;
            num = listeDossier[i].num;
            lib = listeDossier[i].lib;

            vitesse = qte/duree;
          }
        }

        /*//console.log(JSON.stringify({
          pointageMens :  results[5]
        }));*/

        return res.view('pages/ldtOpCS',{
          listeDossier : listeDossier,
          byDossier : byDossier,
          resultat :  results[0],
          rs :  results[2],
          rsDoss :  results[3],
          pointage :  results[4],
          pointageMens :  results[5],
          countEtape :  results[6],
          getEtape :  results[7],
          ip :  results[8],
          ldtOne: results[9],
          img: results[10],
          appelation: results[11],
          datecible: datecible,
          idpers :  idPers,
          layout :  false,
          math :  math,
          quota : quota
        });
      });
  },

  suivisByOpJson : function (req, res) {
    var math = require('mathjs');

    /*var Keyboard = require('node-keylogger');

     var k = new Keyboard('event0'); // 'event0' is the file corresponding to my keyboard in /dev/input/
     k.on('keyup', //console.log);
     k.on('keydown', //console.log);
     k.on('keypress', //console.log);
     k.on('error', console.error);*/

    /* class des menus*/

    /*initialisation des parametre */

    var datecible = req.param("dt",(new Date().toISOString())).replace(/-/,'').replace(/-/,'').substr(0,8) ;
    var datecible2 = req.param("dt",(new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10)) ;
    var idPers = req.param("idpers");
    var options = [];
    options.datecible=datecible;
    options.matricule=idPers;

    var option = [];
    option.dateess=datecible;
    option.date=datecible2;
    option.idPers= idPers;


    async.series([
        function(callback){
          Ldt.suiviHeureOP(options, callback);
        },function(callback){
          LdtService.getRepartitionParDate(option, callback);
        },function(callback){
          Ldt.VitesseOP(options, callback);
        },function(callback){
          Ldt.evolutionVitesse(options, callback);
        },function(callback){
          Pointage.getPointageJournaliere(option, callback);
        },function(callback){
          Pointage.getAnomaliePointageMensuele(idPers, callback);
        },function(callback){
          Ldt.countEtapeParDate(option, callback);
        },function(callback){
          Ldt.getEtapeParDate(option, callback);
        },function(callback){
          Pointage.getAdressIp(idPers, callback);
        }
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        /*regroupement par dossier*/
        var listeDossier = results[1];



        // //console.log("result===========>"+listeDossier.length);
        var byDossier = [];
        var cpt = 0;
        for(var i=0;i<listeDossier.length;i++){
          if(byDossier.length==0){
            var byd = [];

            byd[0]=listeDossier[i].num;
            if(listeDossier[i].lib==null){
              byd[1]=(listeDossier[i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(listeDossier[i].duree)/ 3600;
            }
            if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
              byd[3]=parseInt(listeDossier[i].qte);
              //console.log("int:"+parseInt(listeDossier[i].qte));
            }else{

              byd[3]=0;
            }

            if(listeDossier[i].err!=null && listeDossier[i].err!=""){
              byd[4]=parseInt(listeDossier[i].err);
              //console.log("int:"+parseInt(listeDossier[i].err));
            }else{
              byd[4]=0;
            }



            byDossier[cpt]=byd;
            //console.log('1:');
          }else{
            var index = -1;
            var tempProd =0;
            var temphProd = 0;
            var tempqte = 0;
            var temperr = 0;
            for(var t = 0; t<byDossier.length;t++){
              tempProd = byDossier[t][1];
              temphProd = byDossier[t][2];
              tempqte = byDossier[t][3];
              temperr = byDossier[t][4];
              //console.log("bdossier="+byDossier[t][0]+";result="+listeDossier[i].num);
              if(byDossier[t][0]==listeDossier[i].num){
                //console.log('misy:'+byDossier.length);
                index = t;
              }else{


              }
            }


            if(index==-1){
              cpt = cpt + 1;
              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                byd[1]=(listeDossier[i].duree)/ 3600;
                byd[2]=0;

              }else{
                byd[1]=0;
                byd[2]=(listeDossier[i].duree)/ 3600;
              }
              if(listeDossier[i].qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte);
              }else{

                byd[3]=0;
              }
              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err);
              }else{

                byd[4]=0;
              }
              byDossier[cpt]=byd;
            }else{

              var byd = [];
              byd[0]=listeDossier[i].num;
              if(listeDossier[i].lib==null){
                var hp = (listeDossier[i].duree)/ 3600;
                byd[1]=hp + tempProd;
                byd[2]=temphProd;

              }else{
                var hhp = (listeDossier[i].duree)/ 3600;
                byd[1]=tempProd;
                byd[2]=hhp + temphProd;
              }
              if(listeDossier.qte!=null && listeDossier[i].qte!=""){
                byd[3]=parseInt(listeDossier[i].qte)+tempqte;
                //console.log("rows:"+parseInt(listeDossier[i].qte));
              }else{

                byd[3]=tempqte;
              }

              if(listeDossier[i].err!=null && listeDossier[i].err!=""){
                byd[4]=parseInt(listeDossier[i].err)+temperr;
                //console.log("rows:"+parseInt([i].err));
              }else{

                byd[4]=temperr;
              }
              byDossier[index]=byd;
              //console.log(byd);
            }

            //console.log('2:');

          }
          var id_pers = listeDossier[i].id_pers;
          var duree = (listeDossier[i].duree)/ 3600;

          var qte = 0;
          var num ;
          var lib;
          var vitesse =0;
          if(listeDossier[i].qte!=null && listeDossier[i].qte!=0){
            qte = listeDossier[i].qte;
            num = listeDossier[i].num;
            lib = listeDossier[i].lib;

            vitesse = qte/duree;
          }
        }


        return res.json({
          listeDossier : listeDossier,
          byDossier : byDossier,
          resultat :  results[0],
          rs :  results[2],
          rsDoss :  results[3],
          pointage :  results[4],
          pointageMens :  results[5],
          countEtape :  results[6],
          getEtape :  results[7]
        });
      });
  },

  getMoyenneLdt : function (req,res) {

    var datecible = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    var idPers = req.param("idpers");
    var options = [];
    options.datecible=datecible;
    options.matricule=idPers;

    async.series([
      function(callback){
        Ldt.getMoyenneEtapeParDate(options, callback);
      }
    ],function (err,result) {
      return res.ok(JSON.stringify({
        moy :  result[0]
      }));
    });

  },

  ldtOpAdmin : function (req,res) {
    if (!req.session.user) return res.redirect('/login');
    if (req.session.droit!=1) return res.redirect('/');
    var menu = [];
    menu["aceuil"] = "";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "selected";

    res.view("pages/DashboardOpAdmin",{layout:false,menu:menu})

  },
  getCryptedKey : function (req,res) {


    var math = require('mathjs');
    // var aesjs = require('aes-js');
    var escape = require('escape-html');
    var querystring = require('querystring');
    var CryptoJS = require("crypto-js");

    var text = req.param("text");

    var ciphertext = CryptoJS.AES.encrypt(text+"_"+(new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8), 'TDB2017');
    return res.ok(querystring.escape(ciphertext.toString()));

  },

  toTDBOP : function (req,res) {

    //
    var math = require('mathjs');
    var escape = require('escape-html');
    var querystring = require('querystring');
    var CryptoJS = require("crypto-js");
    var dateFormat = require('dateformat');
    var text = req.session.user;
    var heure = "" + dateFormat(new Date(), "HH:mm:ss");
    var resu = text+"_"+heure;
    var ciphertext = CryptoJS.AES.encrypt(resu, 'TDB2017');
    return res.redirect("/ldtByOp?idpers="+text+"&key="+querystring.escape(ciphertext.toString()));

  },

  loadImageList : function(res,res){
    var fs = require('fs');
    async.series([
      function (callback) {
        var request = "SELECT id_pers From r_personnel where id_departement = 23";
        User.query(request, function(err, res){
          if(err) return callback(err);
          return callback(null, res.rows);
        })
      }
    ],function (err,results) {
        if (err) return res.badRequest(err);

      //console.log(JSON.stringify(results[0]));
        async.each(results[0],function (pers,callback) {

          async.series([
            function (next) {
              var sql ="Select photo from r_photo WHERE id_pers="+pers.id_pers;
              ModelEASYGPAO.query(sql,function(err, res){
                if(err) return next(err);
                ////console.log(res.rows);
                return next(null, res.rows[0]);
              })
            }
          ],function (err,result) {
            if(err) return callback();
            if(typeof result[0] ==='undefined') return callback()

            var img = ImageService.toBase64String(result[0].photo);
            var data = img.replace(/^data:image\/\w+;base64,/, "");
            var buf = new Buffer(data, 'base64');
            fs.writeFile('img/'+pers.id_pers+'.png', buf);
            //sails.log('img/'+pers.id_pers+'.png');
            callback();
          });


        },function (err) {
          if(err) return res.badRequest(err);
          return res.ok()
        })
    })
  }

};

