/**
 * ReservationOstieController
 *
 * @description :: Server-side logic for managing reservationosties
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
    if (!req.session.user) return res.redirect('/login');
    if (req.session.user=="ostie") return res.redirect('/ostie');
    const querystring = require('querystring');
            var menu = [];
          menu["aceuil"] = "selected";
          menu["dossierAdmin"] = "";
          menu["gestionDossier"] = "";
          menu["statOpAdmin"] = "";
          menu["presence"] = "";
          menu["admin"] = "";
    async.series([
        function (callback) {
          ReservationOstieService.GetAll_Departement(callback);
        },
        function (callback) {
          ReservationOstieService.GetAll_Matricule(callback);
        },
        function(callback){
          ReservationOstieService.Get_id_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_All_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_count_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_heure_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_etat_ostie(callback);
        }
      ],
      function (err, results) {
                var rdv=results[2];
                var Departement = results[0];
                var personnel = results[1];
                var Allres=results[3];
                var count=results[4];
                var heureC=results[5];
                var etat=results[6];

                //      //console.log(personnel);

                var resultat = [];
                //console.log('==================>OK');
                resultat['layout'] = false;
                resultat['menu'] = menu;
                resultat['etat'] = etat;
                resultat['Departement'] = Departement;
                resultat['personnel'] = personnel;
                resultat['rendezv'] = rdv;
                resultat['count'] = JSON.stringify(count);
                resultat['Allres']=Allres;
                resultat['heureC']=JSON.stringify(heureC);
                //console.log("heure="+JSON.stringify(heureC));

            //resultat['test']=id_consult.rows;
                res.view('pages/Reservation_Ostie/index', resultat);
          })
      },



    getJsonOstie:function(req,res){
    const querystring = require('querystring');
    async.series([
        function (callback) {
          ReservationOstieService.GetAll_Departement(callback);
        },
        function (callback) {
          ReservationOstieService.GetAll_Matricule(callback);
        },
        function(callback){
          ReservationOstieService.Get_id_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_All_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_count_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_heure_consult(callback);
        }
      ],
      function (err, results) {


                var resultat = [];
                var rdv=results[2];
                var Departement = results[0];
                var personnel = results[1];
                var Allres=results[3];
                var count=results[4];
                var heureC=results[5];

                //      //console.log(personnel);
                //console.log('==================>OK');
                //resultat['Departement'] = Departement;
                /*resultat['personnel'] = personnel;
                resultat['rendezv'] = rdv;
                resultat['count'] = count;
                resultat['Allres']=Allres;*/

                resultat.heureC=heureC;
                //console.log("resultat="+JSON.stringify(results));

            //resultat['test']=id_consult.rows;
                return res.json(results);
          })
      },

    ostie:function(req,res){
    if (!req.session.user) return res.redirect('/login');
    if (req.session.user!="ostie") return res.redirect('/reservation_ostie/index');
    const querystring = require('querystring');
            var menu = [];
            menu["aceuil"] = "selected";
            menu["dossierAdmin"] = "";
            menu["gestionDossier"] = "";
            menu["statOpAdmin"] = "";
            menu["presence"] = "";
            menu["admin"] = "";
    async.series([
        function (callback) {
          ReservationOstieService.GetAll_Departement(callback);
        },
        function (callback) {
          ReservationOstieService.GetAll_Matricule(callback);
        },
        function(callback){
          ReservationOstieService.Get_id_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_All_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_count_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_heure_consult(callback);
        },
        function(callback){
          ReservationOstieService.Get_etat_ostie(callback);
        }
      ],
      function (err, results) {
                var rdv=results[2];
                var Departement = results[0];
                var personnel = results[1];
                var Allres=results[3];
                var count=results[4];
                var heureC=results[5];
                var etat=results[6];

                //      //console.log(personnel);

                var resultat = [];
                //console.log('==================>OK');
                resultat['layout'] = false;
                resultat['menu'] = menu;
                resultat['etat'] = etat;
                resultat['Departement'] = Departement;
                resultat['personnel'] = personnel;
                resultat['rendezv'] = rdv;
                resultat['count'] = JSON.stringify(count);
                resultat['Allres']=Allres;
                resultat['heureC']=JSON.stringify(heureC);
                //console.log("heure="+JSON.stringify(heureC));

            //resultat['test']=id_consult.rows;
                res.view('pages/Reservation_Ostie/ostie', resultat);
          })
      },





    ajout_r_Ostie:function(req,res){
    if (!req.session.user) return res.redirect('/login');
    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    m=parseInt(m)+1;
    var y = date.getFullYear();
    var h=date.getHours();
    var min=date.getMinutes();

    //var nom_personnel=req.param("nom_personnel");
    var matricule=req.param("matricule");
    var nom_personnel_dem=req.param("nom_personnel_dem");
    var  mat_perso_dem=req.param("mat_demand");
    var ip=req.param("ip");
    var id_pers=req.session.user;
    matricule=parseInt(matricule);
    var objet=req.param("object");
    var departement=req.param("dep");
    departement=parseInt(departement);
    var date_reserv=""+y+"-"+m+"-"+d;
    var debut=""+h+":"+min+"";
    var fin="";
    var stat="en attente";
    //console.log("mat=  "+matricule+"objet=  "+objet+"  deparrt=  "+departement+"  date=  "+date_reserv+"  "+debut + "  "+stat);
    var myQueryInsert="insert into r_reservation_ostie(id_pers,date_reservation,debut_reservation,stat,com_ajout) VALUES ("+matricule+",'"+date_reserv+"','"+debut+"','"+stat+"','"+ip+" : "+id_pers+"')";
    // var myQueryInsert="INSERT INTO r_reservation_salle(objet,id_pers,id_departement,date_reserv,debut_reservation,fin_reservation,salle) VALUES ('"+objet+"',"+matricule+","+departement+",'"+date_reserv+"','"+debut+"','"+fin+"',"+salle+");";
   // //console.log(myQueryInsert);
    ReservationOstie.query(myQueryInsert, function(err,insert) {
      if(err)
      {
        //console.log(err);
        ////console.log(insert.rows);
      }else{
        ////console.log(insert.row);

      res.redirect('reservation_ostie/index');


        //   res.redirect('ReservationSalle/index');
      }
    });

  },
  Fini_rdv:function(req,res) {
    if (!req.session.user) return res.redirect('/login');
    var date = new Date();
    var h = date.getHours();
    var min = date.getMinutes();
    var fin = "" + h + ":" + min + "";

    var id_ostie = req.param('id');
    var id_ldt = req.param('idldt');
    var ip = req.param('ip');
    var id_pers = req.session.user;
    //console.log(id_ostie + ' ' + fin);
    var updateQuery = "update r_reservation_ostie set stat='terminer',fin_reservation='" + fin + "',com_modif='"+ip+" : "+id_pers+"' where id_reservation_ostie=" + id_ostie + "";
    ////console.log(updateQuery);
    ReservationOstie.query(updateQuery, function (err, update) {
      if (err) {
        //console.log(err);
        ////console.log(insert.rows);
      } else {

          var reqFnLdt = "UPDATE p_ldt SET id_etat=2, h_fin= substr(now()|| ' ', 12, 8),  date_fin_ldt=substr(now()|| ' ', 0, 5)||substr(now()|| ' ', 6, 2)||substr(now()|| ' ', 9, 2), quantite=' ', nbre_erreur=' ', commentaire=' ' , machine=' ' WHERE id_ldt="+id_ldt;

          ReservationOstie.query(reqFnLdt, function (errLdt, updateLdt) {
              if (err) {
                //console.log(err);
                ////console.log(insert.rows);
                  res.redirect('reservation_ostie/index');
              } else {
                res.redirect('reservation_ostie/index');
              }
          });

        //   res.redirect('ReservationSalle/index');
      }
    })
  },


update_etat_ostie: function (req,res) {
    // var Query = "select * from ac_moyenne join ac_pole on ac_moyenne.id_pole=ac_pole.id_pole";
    var option = req.param("etat",false);
    var query = "update r_ostie_etat set etat = "+option+" where id_etat=1";
    ////console.log(query);
    ReservationOstie.query(query,
      function (err, retour) {
        if (err) return callback(err);
        res.ok("changed");
      });
  },
  Annuler:function(req,res){
    if (!req.session.user) return res.redirect('/login');
    var date = new Date();
    var h = date.getHours();
    var min = date.getMinutes();
    var fin = "" + h + ":" + min + "";

    var id_ostie = req.param('id');

    var ip = req.param('ip');
    var id_pers = req.session.user;
    //console.log(id_ostie + ' ' + fin);
    var updateQuery = "update r_reservation_ostie set stat='rendez vous annuler',fin_reservation='" + fin + "',com_modif='"+ip+" : "+id_pers+"' where id_reservation_ostie=" + id_ostie + "";
    //console.log(updateQuery);
    ReservationOstie.query(updateQuery, function (err, update) {
      if (err) {
        //console.log(err);
        ////console.log(insert.rows);
      } else {
        res.redirect('reservation_ostie/index');

        //   res.redirect('ReservationSalle/index');
      }
    })
  },
  commencer:function(req,res){
    if (!req.session.user) return res.redirect('/login');
    var date = new Date();
    var h = date.getHours();
    var min = date.getMinutes();
    var start = "" + h + ":" + min + "";

    var id_ostie = req.param('id');

    var ip = req.param('ip');
    var id_pers = req.session.user;
    ////console.log(id_ostie + ' ' +start);
    var updateQuery = "update r_reservation_ostie set stat='rendez vous en cours',debut_reservation='" + start + "',com_modif='"+ip+" : "+id_pers+"' where id_reservation_ostie=" + id_ostie + "";
    //console.log(updateQuery);
    ReservationOstie.query(updateQuery, function (err, update) {
      if (err) {
        //console.log(err);
        ////console.log(insert.rows);
      } else {
        res.redirect('reservation_ostie/index');

        //   res.redirect('ReservationSalle/index');
      }
    })
  },

  recap:function(req,res){
    if (!req.session.user) return res.redirect('/login');
    var menu = [];
    menu["aceuil"] = "selected";
    menu["dossierAdmin"] = "";
    menu["gestionDossier"] = "";
    menu["statOpAdmin"] = "";
    menu["presence"] = "";
    menu["admin"] = "";
    res.view('pages/Reservation_Ostie/recap',{layout:false,menu:menu});

  }

};

