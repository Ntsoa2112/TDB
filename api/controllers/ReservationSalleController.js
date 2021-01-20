/**
 * ReservationSalleController
 *
 * @description :: Server-side logic for managing Reservationsalles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /*  Nouveau_reservation:function (req,res){
   var menu = [];
   menu["aceuil"]= "selected";
   menu["dossierAdmin"]= "";
   menu["gestionDossier"]= "";
   menu["statOpAdmin"]= "";
   menu["presence"]= "";
   menu["admin"]= "";
   async.series([
   function (callback) {
   ReservationSalleService.GetAll_Departement(callback);
   }
   ],
   function (err, results) {
   //console.log(results[0]);
   var Departement = results[0];

   res.view('pages/Reservation/Nouveau_reservation',{menu:menu ,Departement:Departement});
   })
   },*/
  Ajout_Reservation: function (req, res) {
    var moment = require('moment');
    if (!req.session.user) return res.redirect('/login');
    var nom_personnel = req.param("nom_personnel");
    var matricule = req.param("matricule");
    matricule = parseInt(matricule);
    var objet = req.param("object");
    var get_depn = req.param("dep");
    var get_depn_split=get_depn.split(",");
    var departement=Number(get_depn_split[0]);
    var nom_departement=get_depn_split[1];
    nom_departement=nom_departement.toString();
    ////console.log(''+get_depn+' ======> ' +departement+ ' et '+nom_departement);
    departement = parseInt(departement);
    var date_reserv = req.param("date_reserv");
    var salle = req.param("salle");
    var debut = req.param("time_debut");
    var fin = req.param("time_fin");
    var ob=objet;
    var nb_pers=req.param("nb_personne");
    nb_pers=parseInt(nb_pers);
    //console.log("mat=" + matricule + "objet=" + objet + "deparrt=" + departement + "date=" + date_reserv );
    objet=objet.replace(new RegExp('\'', 'g'), '\'\'');
    objet=objet.replace(new RegExp('%22', 'g'), '%20');
   // console.log("New objet "+objet);
    //console.log(debut);
    var myQueryInsert = "insert into r_reservation_salle(objet,id_pers,id_departement,date_reserv,debut_reservation,fin_reservation,salle,nb_personne) VALUES ('" + objet + "'," + matricule + "," + departement + ",'" + date_reserv + "','" + debut + "','" + fin + "','" + salle + "',"+nb_pers+")";
    // var myQueryInsert="INSERT INTO r_reservation_salle(objet,id_pers,id_departement,date_reserv,debut_reservation,fin_reservation,salle) VALUES ('"+objet+"',"+matricule+","+departement+",'"+date_reserv+"','"+debut+"','"+fin+"',"+salle+");";
    //console.log(myQueryInsert);
   var debut_mail= moment(debut, "h:m").format("HH:mm");
    var fin_mail= moment(fin, "h:m").format("HH:mm");
    ReservationSalle.query(myQueryInsert, function (err, insert) {
      if (err) {
        console.log(err);
        ////console.log(insert.rows);
      } else {
        //console.log(insert.id_reservation);


        //fonction envoyer email

    //    var from = "no-reply@et.in";
     //   var objet = '[Reservation Salle]-' + salle + '-'+nom_personnel+'- ' + date_reserv + ' de ' + debut + ' Ã  ' +fin+ ' ';
      //  var message = "<p>Nous vous informons qu'une reservation de salle a Ã©tÃ© Ã©ffectuÃ©e pour motif '"+ob+"' pour le departement "+nom_departement+" pour "+nb_pers+" personnes ce "+ date_reserv + " de " + debut + " Ã  " +fin+ ""+" </p>";
        //console.log('from' + from + 'objet=' + objet + 'message' + message);
        /*ReservationSalleService.fonctionEnvoyerMail(from, objet, message,nom_personnel, function (err) { // Envoie email
          if (err) return res.send(err);
          //console.log('tonga ato **************************************************************');
          res.redirect('reservation/index');

        });*/
        res.redirect('reservation/index');

    //   res.redirect('ReservationSalle/index');
      }
    });

  },


  index: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    const querystring = require('querystring');
    var query = "SELECT * FROM r_reservation_salle join r_departement on r_reservation_salle.id_departement=r_departement.id_departement join r_personnel on r_reservation_salle.id_pers=r_personnel.id_pers ";
    ReservationSalle.query(query, function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        async.series([
            function (callback) {
              ReservationSalleService.GetAll_Departement(callback);
            }
          ],
          function (err, results) {
           // //console.log(results[0]);
          //  //console.log(result.rows);
            //console.log('Cheking number lenght row'+result.rows.length);
            var menu = [];
            var Departement = results[0];
            menu["aceuil"] = "selected";
            menu["dossierAdmin"] = "";
            menu["gestionDossier"] = "";
            menu["statOpAdmin"] = "";
            menu["presence"] = "";
            menu["admin"] = "";
            var lenght_reservation = result.rows.length;
            var resultat = [];
            resultat['reservationsalle'] = querystring.unescape(JSON.stringify(result.rows));
            resultat['layout'] = false;
            resultat['menu'] = menu;
            resultat['lenght_reservation'] = lenght_reservation;
            resultat['Departement'] = Departement;

            res.view('pages/Reservation/index', resultat);
          });
      }
    });
  },



  filtre: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    const querystring = require('querystring');
    var Filtre = req.param('filtre');
    var query = "SELECT * FROM r_reservation_salle join r_departement on r_reservation_salle.id_departement=r_departement.id_departement join r_personnel on r_reservation_salle.id_pers=r_personnel.id_pers where r_reservation_salle.salle='" + Filtre + "'";
    if (Filtre == "Tous") {
    //  console.log("Here");
      query = "SELECT * FROM r_reservation_salle join r_departement on r_reservation_salle.id_departement=r_departement.id_departement join r_personnel on r_reservation_salle.id_pers=r_personnel.id_pers";
    }
    ReservationSalle.query(query, function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        async.series([
            function (callback) {
              ReservationSalleService.GetAll_Departement(callback);
            }
          ],
          function (err, results) {
            //console.log(results[0]);

            //console.log(result.rows);
            var menu = [];
            var Departement = results[0];
            menu["aceuil"] = "selected";
            menu["dossierAdmin"] = "";
            menu["gestionDossier"] = "";
            menu["statOpAdmin"] = "";
            menu["presence"] = "";
            menu["admin"] = "";
            var lenght_reservation = result.rows.length;
            var resultat = [];
            resultat['reservationsalle'] = querystring.unescape(JSON.stringify(result.rows));
            resultat['layout'] = false;
            resultat['menu'] = menu;
            resultat['lenght_reservation'] = lenght_reservation;
            resultat['Departement'] = Departement;
            //console.log('valueee ===================================>' + result.rows);
            res.view('pages/Reservation/index', resultat);
          });
      }
    });
  },


  modifier: function (req, res) {
    if (!req.session.user) return res.redirect('/login');
    var nom_personnel = req.param("nom_personnel");
    var matricule = req.param("matricule");
    matricule = parseInt(matricule);
    var objet = req.param("object");
    var departement = req.param("dep");
    departement = parseInt(departement);
    var date_reserv = req.param("date_reserv");
    var heure_deb = req.param("heure_deb");
    var min_deb = req.param("min_deb");
    var heure_fin = req.param("heure_fin");
    var min_fin = req.param("min_fin");
    var salle = req.param("salle");
    var id_reservation=req.param("id_reservation");
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var h=date.getHours();
    var min=date.getMinutes();
    var DATEe=''+y+'-'+m+'-'+d+'/'+h+':'+min+'';
    var stat='derniere modification'+DATEe+' par monsieur '+nom_personnel+' et matricule'+matricule+'';
    //console.log("mat=" + matricule + "objet=" + objet + "deparrt=" + departement + "date=" + date_reserv + "deb=" + heure_deb + "" + min_deb + "fin=" + heure_fin + "" + min_fin);
    var debut = heure_deb + ":" + min_deb;
    var fin = heure_fin + ":" + min_fin;

    //console.log(debut);
    var myQueryupdate = "update r_reservation_salle set objet='"+objet+"',stat='"+stat+"',id_pers="+matricule+",id_departement="+departement+",date_reserv='"+date_reserv+"',debut_reservation='"+debut+"',fin_reservation='"+fin+"',salle='"+salle+"' where id_reservation="+id_reservation+"";
    //console.log(myQueryupdate);
    ReservationSalle.query(myQueryupdate, function (err, insert) {
      if (err) {
        console.log(err);
        ////console.log(insert.rows);
      } else {
        //console.log(insert.id_reservation);

        //fonction envoyer email

   /*     var from = "erica@et.in";
        var objet = 'Reservation salle' + salle + ' ' + nom_personnel + ' ' + departement;
        var message = "<p>Monsieur " + nom_personnel + " matricule = " + matricule + " vient de faire une reservation de Salle de reunion:</p></br> INFO: " + salle + " le " + date_reserv + " de " + debut + " jusqu' Ã  " + fin;
        //console.log('from' + from + 'objet=' + objet + 'message' + message);
        ReservationSalleService.fonctionEnvoyerMail(from, objet, message, function (err) { // Envoie email
          if (err) return res.send(err);
          //console.log('tonga ato **************************************************************');
          res.redirect('reservation/index');
        });

    */

        res.redirect('reservation/index');
      }

    });

  },


  supprimer:function(req,res) {
    if (!req.session.user) return res.redirect('/login');
    var id_reservation = req.param('ud_reservation');
    //console.log('ud_ reservation ===>' + id_reservation);
    var myQueryupdate = "DELETE FROM r_reservation_salle where id_reservation=" + id_reservation + "";
    ReservationSalle.query(myQueryupdate, function (err, insert) {
      if (err) {
        console.log(err);
        ////console.log(insert.rows);
      } else {
        //console.log(insert.id_reservation);
        res.redirect('reservation/index');
      }

    });
  },


  getLsReservationDate: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var date_res=req.param('date_reserv',null);
    var salle_res=req.param('salle_reserv',null);
    //console.log("Date reservation ====> " + date_res);
    //console.log("Salle reservation ====> " + salle_res);
    async.series([
        function(callback){
          var options = [];
          options.dateReservation = date_res;
          options.salleReservation = salle_res;
          ReservationSalle.getLsReservationDate(options, callback);
        }
      ],function(err, results) {
        if (err) return res.send("Erreur de requete");
        //console.log(results[0]);
        return res.ok(JSON.stringify(results[0]));//retourne de la liste des TC sn JSON
      });
  },
  getLsPersonneReserve: function(req, res)
  {
    //if (!req.session.user) return res.redirect('/login');
    var reservation=req.param('id_reservation',null);
    //console.log("id reservation ====> " + reservation);
    async.series([
      function(callback){
        ReservationSalle.getLsPersonneReserve(reservation, callback);
      }
    ],function(err, results) {
      if (err) return res.send("Erreur de requete");
      //console.log(results[0]);
      return res.ok(JSON.stringify(results[0]));//retourne de la liste des TC sn JSON
    });
  },



};

