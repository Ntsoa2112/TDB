/**
 * LdtController
 *
 * @description :: Server-side logic for managing Ldts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function changeMatricule(id_pers){
  var str = id_pers;
  var pad = "00000";
  var ans = pad.substring(0, pad.length - str.length) + str;
  return ans;
}

var ArrayList = require('arraylist/ArrayList');
var Highcharts = require('highcharts');
module.exports = {


  /**
   * `LdtController.getLdtByID()`
   */
  getLdtByID: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var retval = [];
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["dossierOP"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    Ldt.query('select get_ldt_b_id(226)',function(err,result){
      if (err){
        //console.log('err');
        return;
      }
      else{

        for(var i=0;i<result['rows'].length;i++){
          var ligne = result['rows'][i].get_ldt_b_id;
          var castlign = ligne.substr(1, ligne.length-1);
          var tabsrt = castlign.split(",");
          //console.log('i='+i+' '+result['rows'][i].get_ldt_b_id);
          //console.log(tabsrt[0]);
        }

        menu["aceuil"]= "selected";
        menu["dossierAdmin"]= "";
        menu["dossierOP"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        retval['menu'] = menu;
        retval['ldt'] = result['rows'];
        return res.view( 'pages/ldt', retval);
        /*Photo.find({id_pers : matricul}, function(err, resultat){
          if(err || resultat[0] == undefined) return err;

          var imageToShow = ImageService.toBase64String(resultat[0].photo);
          retval['image'] = imageToShow;
          return res.view( 'pages/ldt', retval);
        });*/



      }




    });
  },

  getVitesseOP: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var retval = [];
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["dossierOP"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var dep =req.param('dep',null);
    var dossier =req.param('dossier',null);
    var matricule =req.session.user;
    var dateess = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    req.session.mat = matricule;
    req.session.dossier = dossier;
    req.session.datedeb = dateess;
    //console.log("date now:"+dateess+";");
    var datecible ="20160620";
    var filtre = "";
    if(dep!=null)
      filtre = filtre+ "AND r_personnel.id_departement ="+dep;
    if(dossier!=null)
      filtre = filtre+ "AND p_ldt.id_dossier ="+dossier;
    if(matricule!=null)
      filtre = filtre+ "AND p_ldt.id_pers ="+matricule;
    var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
			+"p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib "
			+"from p_ldt "
			+"LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
			+"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
			+"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
			+"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
			+"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
			+"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
			+"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
			+"where 1=1 AND p_ldt.date_deb_ldt = '"+dateess+"' AND p_ldt.id_pers = "+matricule+" "
			+"group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";


    Ldt.query(sql,function(err,result){
      if (err){
        console.log(err);
        return;
      }
      else{
        //console.log(result);
        var byDossier = [];
        var cpt = 0;
        for(var i=0;i<result['rows'].length;i++){
          if(byDossier.length==0){
            var byd = [];

            byd[0]=result['rows'][i].num;
            if(result['rows'][i].lib==null){
              byd[1]=(result['rows'][i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(result['rows'][i].duree)/ 3600;
            }
            if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
               byd[3]=parseInt(result['rows'][i].qte);
               //console.log("int:"+parseInt(result['rows'][i].qte));
            }else{

              byd[3]=0;
            }

            if(result['rows'][i].err!=null && result['rows'][i].err!=""){
               byd[4]=parseInt(result['rows'][i].err);
               //console.log("int:"+parseInt(result['rows'][i].err));
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
              //console.log("bdossier="+byDossier[t][0]+";result="+result['rows'][i].num);
              if(byDossier[t][0]==result['rows'][i].num){
                //console.log('misy:'+byDossier.length);
                index = t;
              }else{


              }
            }


              if(index==-1){
                  cpt = cpt + 1;
                var byd = [];
                byd[0]=result['rows'][i].num;
                if(result['rows'][i].lib==null){
                  byd[1]=(result['rows'][i].duree)/ 3600;
                  byd[2]=0;

                }else{
                  byd[1]=0;
                  byd[2]=(result['rows'][i].duree)/ 3600;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte);
                  }else{

                    byd[3]=0;
                  }
                   if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err);
                  }else{

                    byd[4]=0;
                  }
                byDossier[cpt]=byd;
              }else{

                var byd = [];
                byd[0]=result['rows'][i].num;
                if(result['rows'][i].lib==null){
                  var hp = (result['rows'][i].duree)/ 3600;
                  byd[1]=hp + tempProd;
                  byd[2]=temphProd;

                }else{
                  var hhp = (result['rows'][i].duree)/ 3600;
                  byd[1]=tempProd;
                  byd[2]=hhp + temphProd;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte)+tempqte;
                    //console.log("rows:"+parseInt(result['rows'][i].qte));
                  }else{

                       byd[3]=tempqte;
                  }

                  if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err)+temperr;
                    //console.log("rows:"+parseInt(result['rows'][i].err));
                  }else{

                       byd[4]=temperr;
                  }
                byDossier[index]=byd;
                //console.log(byd);
              }

            //console.log('2:');

          }
          var id_pers = result['rows'][i].id_pers;
          var duree = (result['rows'][i].duree)/ 3600;

          var qte = 0;
          var num ;
          var lib;
          var vitesse =0;
          if(result['rows'][i].qte!=null && result['rows'][i].qte!=0){
              qte = result['rows'][i].qte;
              num = result['rows'][i].num;
              lib = result['rows'][i].lib;

              vitesse = qte/duree;
              //console.log(vitesse);
          }


        }

        //console.log(byDossier);
        menu["aceuil"]= "selected";
        menu["dossierAdmin"]= "";
        menu["dossierOP"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        retval['menu'] = menu;
        retval['ldt'] = result['rows'];
        retval['courbe'] = byDossier;
        Photo.find({id_pers : req.session.user}, function(err, resultat){
          if(err || resultat[0] == undefined) return err;

          var imageToShow = ImageService.toBase64String(resultat[0].photo);
          retval['image'] = imageToShow;
          return res.view( 'pages/ldt', retval);
        });

      }




    });
  },


  getDashData: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var retval = [];
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["dossierOP"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var dep =req.param('dep',null);
    var dossier =req.param('dossier',null);
    var matricule =req.session.user;
    var dateess = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    //console.log("date now:"+dateess+";");
    var datecible ="20160620";
    var filtre = "";
    if(dep!=null)
      filtre = filtre+ "AND r_personnel.id_departement ="+dep;
    if(dossier!=null)
      filtre = filtre+ "AND p_ldt.id_dossier ="+dossier;
    if(matricule!=null)
      filtre = filtre+ "AND p_ldt.id_pers ="+matricule;
    var sql = "SELECT p_ldt.id_pers,r_personnel.appelation, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
      +"p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib "
      +"from p_ldt "
      +"LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
      +"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
      +"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
      +"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
      +"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
      +"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
      +"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
      +"where 1=1 AND p_ldt.date_deb_ldt = '"+dateess+"' AND p_ldt.id_pers = "+matricule+" "
      +"group by p_ldt.id_pers,r_personnel.appelation, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";


    Ldt.query(sql,function(err,result){
      if (err){
        console.log(err);
        return;
      }
      else{
        //console.log(result);
        var byDossier = [];
        var cpt = 0;
        for(var i=0;i<result['rows'].length;i++){
          if(byDossier.length==0){
            var byd = [];

            byd[0]=result['rows'][i].num;
            if(result['rows'][i].lib==null){
              byd[1]=(result['rows'][i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(result['rows'][i].duree)/ 3600;
            }
            if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
              byd[3]=parseInt(result['rows'][i].qte);
              //console.log("int:"+parseInt(result['rows'][i].qte));
            }else{

              byd[3]=0;
            }

            if(result['rows'][i].err!=null && result['rows'][i].err!=""){
              byd[4]=parseInt(result['rows'][i].err);
              //console.log("int:"+parseInt(result['rows'][i].err));
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
              //console.log("bdossier="+byDossier[t][0]+";result="+result['rows'][i].num);
              if(byDossier[t][0]==result['rows'][i].num){
                //console.log('misy:'+byDossier.length);
                index = t;
              }else{


              }
            }


            if(index==-1){
              cpt = cpt + 1;
              var byd = [];
              byd[0]=result['rows'][i].num;
              if(result['rows'][i].lib==null){
                byd[1]=(result['rows'][i].duree)/ 3600;
                byd[2]=0;

              }else{
                byd[1]=0;
                byd[2]=(result['rows'][i].duree)/ 3600;
              }
              if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                byd[3]=parseInt(result['rows'][i].qte);
              }else{

                byd[3]=0;
              }
              if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                byd[4]=parseInt(result['rows'][i].err);
              }else{

                byd[4]=0;
              }
              byDossier[cpt]=byd;
            }else{

              var byd = [];
              byd[0]=result['rows'][i].num;
              if(result['rows'][i].lib==null){
                var hp = (result['rows'][i].duree)/ 3600;
                byd[1]=hp + tempProd;
                byd[2]=temphProd;

              }else{
                var hhp = (result['rows'][i].duree)/ 3600;
                byd[1]=tempProd;
                byd[2]=hhp + temphProd;
              }
              if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                byd[3]=parseInt(result['rows'][i].qte)+tempqte;
                //console.log("rows:"+parseInt(result['rows'][i].qte));
              }else{

                byd[3]=tempqte;
              }

              if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                byd[4]=parseInt(result['rows'][i].err)+temperr;
                //console.log("rows:"+parseInt(result['rows'][i].err));
              }else{

                byd[4]=temperr;
              }
              byDossier[index]=byd;
              //console.log(byd);
            }

            //console.log('2:');

          }
          var id_pers = result['rows'][i].id_pers;
          var duree = (result['rows'][i].duree)/ 3600;

          var qte = 0;
          var num ;
          var lib;
          var vitesse =0;
          if(result['rows'][i].qte!=null && result['rows'][i].qte!=0){
            qte = result['rows'][i].qte;
            num = result['rows'][i].num;
            lib = result['rows'][i].lib;

            vitesse = qte/duree;
            //console.log(vitesse);
          }


        }

        //console.log(byDossier);
        menu["aceuil"]= "selected";
        menu["dossierAdmin"]= "";
        menu["dossierOP"]= "";
        menu["gestionDossier"]= "";
        menu["statOpAdmin"]= "";
        menu["presence"]= "";
        menu["admin"]= "";
        retval['menu'] = menu;
        retval['ldt'] = result['rows'];
        retval['courbe'] = byDossier;
        Photo.find({id_pers : req.session.user}, function(err, resultat){
          if(err || resultat[0] == undefined) return err;

          var imageToShow = ImageService.toBase64String(resultat[0].photo);
          retval['image'] = imageToShow;
          return res.view( 'pages/ldt', retval);
        });

      }




    });
  },
  getLsDossier: function (req, res) {
    //var sync = require('synchronize');
    // if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    User.query('SELECT p_affectation.id_dossier,p_dossier.num_dossier FROM p_affectation LEFT JOIN p_dossier ON p_affectation.id_dossier = p_dossier.id_dossier WHERE id_pers=' +idPers+' AND id_etat = 0 ORDER BY num_dossier ASC', function(eror, test)
    {
      //console.log( "taile ============================> "+test.rows.length );

      var str = '<option value=""></option>';

      /*
       req.session.mat = matricule;
       req.session.dossier = dossier;
       req.session.datedeb = dateess;
       */
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);

        //console.log("session dossier===>"+req.session.dossier);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.dossier!=null){
            if(parseInt(req.session.dossier)==parseInt(test.rows[i].id_dossier)){
              //console.log("session dossier is===>true");
              str += '<option value=' +test.rows[i].id_dossier +' selected="true">' + test.rows[i].num_dossier  +'</option>';
            }else {
              str += '<option value=' +test.rows[i].id_dossier +'>' + test.rows[i].num_dossier  +'</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id_dossier +'>' + test.rows[i].num_dossier  +'</option>';
          }

          ////console.log( test.rows.length );
        }
        return res.send(str);
      }
    });
  },

  getLsDepartement: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    User.query('SELECT * FROM r_departement ORDER BY libelle ASC', function(eror, test)
    {
      //console.log( "taile ============================> "+test.rows.length );
      var str = '<option value="">TOUS LES DEPARTEMENTS</option>';
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.departement != null ){
            if(parseInt(req.session.departement) == parseInt(test.rows[i].id)){
              str += '<option value=' +test.rows[i].id +' selected="true">' + test.rows[i].libelle  +'</option>';
            }else{
              str += '<option value=' +test.rows[i].id +'>' + test.rows[i].libelle  +'</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id +'>' + test.rows[i].libelle  +'</option>';
          }

          ////console.log( test.rows.length );
        }
        return res.send(str);
      }
    });
  },

  getLsEquipe: function (req, res) {
    // SELECT id_pers,  id_pers as matricule,appellation,sexe,r_personnel.id_fonction,'' as email FROM r_personnel LEFT JOIN r_fonction ON r_fonction.id_fonction = r_personnel.id_fonction WHERE actif=TRUE AND is_cp ORDER BY appellation ASC
    ModelEASYGPAO.query('SELECT id_pers,appellation as appelation FROM r_personnel LEFT JOIN r_fonction ON r_fonction.id_fonction = r_personnel.id_fonction WHERE actif=TRUE AND is_cp ORDER BY id_pers ASC', function(eror, test)
    {
      //console.log( "taile ============================> "+test.rows.length );
      var str = '<option value="">TOUTES LES EQUIPES</option>';
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.equipe != null ){
            if(parseInt(req.session.equipe) == parseInt(test.rows[i].id_pers)){
              str += '<option value=' +test.rows[i].id_pers +' selected="true">'+changeMatricule(test.rows[i].id_pers)+' ' + test.rows[i].appelation  +'</option>';
            }else{
              str += '<option value=' +test.rows[i].id_pers +'>'+changeMatricule(test.rows[i].id_pers)+' ' + test.rows[i].appelation  +'</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id_pers +'>'+changeMatricule(test.rows[i].id_pers)+' ' + test.rows[i].appelation  +'</option>';
          }

          ////console.log( test.rows.length );
        }
        return res.send(str);
      }
    });
  },

  getLsMois: function (req, res) {
    User.query('SELECT * from r_periode_paie ORDER BY id_paie ASC ', function(eror, test)
    {
      //console.log( "taile ============================> "+test.rows.length );
      var str = '<option value=""></option>';
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.mois != null ){
            if(parseInt(req.session.mois) == parseInt(test.rows[i].id_paie)){
              str += '<option value=' +test.rows[i].id_paie +' selected="true">' + test.rows[i].mois  +' ' +test.rows[i].annee  +'</option>';
            }else{
              str += '<option value=' +test.rows[i].id_paie +'>' + test.rows[i].mois  +' ' +test.rows[i].annee+ '</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id_paie +'>' + test.rows[i].mois  +' ' +test.rows[i].annee  +'</option>';
          }

          ////console.log( test.rows.length );
        }
        return res.send(str);
      }
    });
  },
  getLsDepartementGroupe: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var id_groupe = req.param('groupe','');
    var groupSql = " ";
    var title = " TOUS LES DEPARTEMENTS "
    if(id_groupe!=''){
      groupSql = ' where id_groupe = '+id_groupe+' ';
      title = " TOUS LES SOUS DEPARTEMENTS "
    }
    User.query('SELECT * FROM r_departement'+groupSql+'ORDER BY libelle ASC', function(eror, test)
    {
      //console.log( "taile ============================> "+test.rows.length );
      var str = '<option value="">'+title+'</option>';
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.departement != null ){
            if(parseInt(req.session.departement) == parseInt(test.rows[i].id)){
              str += '<option value=' +test.rows[i].id +' selected="true">' + test.rows[i].libelle  +'</option>';
            }else{
              str += '<option value=' +test.rows[i].id +'>' + test.rows[i].libelle  +'</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id +'>' + test.rows[i].libelle  +'</option>';
          }

          ////console.log( test.rows.length );
        }
        return res.send(str);
      }
    });
  },

  getLsGroupe: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    User.query('SELECT * FROM r_departement_groupe ORDER BY libelle ASC', function(eror, test)
    {
      //console.log( "taile ============================> "+test.rows.length );
      var str = '<option value="">TOUS LES GROUPES</option>';
      if (eror)
      {
        return res.send('erreur 2018');
      }else{
        // return res.send(test);
        for(var i=0 ; i< test.rows.length ; i++){
          if(req.session.groupe != null ){
            if(parseInt(req.session.groupe) == parseInt(test.rows[i].id_groupe)){
              str += '<option value=' +test.rows[i].id_groupe +' selected="true">' + test.rows[i].libelle  +'</option>';
            }else{
              str += '<option value=' +test.rows[i].id_groupe +'>' + test.rows[i].libelle  +'</option>';
            }
          }else {
            str += '<option value=' +test.rows[i].id_groupe +'>' + test.rows[i].libelle  +'</option>';
          }

          ////console.log( test.rows.length );
        }
        return res.send(str);
      }
    });
  },

  getGrapheDossier: function (req, res) {

    // if (!req.session.user) return res.redirect('/login');
    var retval = [];

    var dossier =req.param('idDossier',null);
    var datedeb =/*req.param('datedeb',null).replace(/-/,'').replace(/-/,'').substr(0,8)*/"20160530";
    var datefin =/*req.param('datefin',null).replace(/-/,'').replace(/-/,'').substr(0,8)*/"20160604";
    var matricule =req.session.user;
    var dateess = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    //console.log("date now:"+dateess+";"+dossier+";"+matricule);
    var datecible ="20160620";
    var sql = "select SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree,  sum(to_number('0'||quantite,'99999')) as qte,sum(to_number('0'||nbre_erreur,'99999')) as err, id_type_ldt, r_personnel.appelation,p_ldt.date_deb_ldt "
			+"from p_ldt "
			+"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
			+"LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier "
			+"where 1=1 AND date_deb_ldt BETWEEN '"+datedeb+"' AND '"+datefin+"' "
      +"AND p_ldt.id_dossier ="+dossier+" "
      +"AND p_ldt.id_pers="+matricule+" "
			+"GROUP BY  p_ldt.date_deb_ldt, r_personnel.appelation, id_type_ldt order by p_ldt.date_deb_ldt ";


    Ldt.query(sql,function(err,result){
      if (err){
        //console.log("err"+err);
        return;
      }
      else{
        //console.log(result.rows);
//_____________________
        var byDate = [];
        var cpt = 0;
        for(var i=0;i<result['rows'].length;i++){
          //console.log('duree:'+result['rows'][i].duree);
          if(byDate.length==0){
            var byd = [];

            byd[0]=result['rows'][i].date_deb_ldt;
            if(result['rows'][i].lib==null){
              byd[1]=(result['rows'][i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(result['rows'][i].duree)/ 3600;
            }
            if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
               byd[3]=parseInt(result['rows'][i].qte);
               //console.log("int:"+parseInt(result['rows'][i].qte));
            }else{

              byd[3]=0;
            }

            if(result['rows'][i].err!=null && result['rows'][i].err!=""){
               byd[4]=parseInt(result['rows'][i].err);
               //console.log("int:"+parseInt(result['rows'][i].err));
            }else{

              byd[4]=0;
            }



            byDate[cpt]=byd;
            //console.log('1:');
          }else{
            var index = -1;
             var tempProd =0;
                var temphProd = 0;
                var tempqte = 0;
                var temperr = 0;
            for(var t = 0; t<byDate.length;t++){
              tempProd = byDate[t][1];
               temphProd = byDate[t][2];
                tempqte = byDate[t][3];
                temperr = byDate[t][4];
              //console.log("bdossier="+byDate[t][0]+";result="+result['rows'][i].date_deb_ldt);
              if(byDate[t][0]==result['rows'][i].date_deb_ldt){
                //console.log('misy:'+byDate.length);
                index = t;
              }else{


              }
            }


              if(index==-1){
                  cpt = cpt + 1;
                var byd = [];
                byd[0]=result['rows'][i].date_deb_ldt;
                if(result['rows'][i].lib==null){
                  byd[1]=(result['rows'][i].duree)/ 3600;
                  byd[2]=0;

                }else{
                  byd[1]=0;
                  byd[2]=(result['rows'][i].duree)/ 3600;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte);
                  }else{

                    byd[3]=0;
                  }
                   if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err);
                  }else{

                    byd[4]=0;
                  }
                byDate[cpt]=byd;
              }else{

                var byd = [];
                byd[0]=result['rows'][i].date_deb_ldt;
                if(result['rows'][i].lib==null){
                  var hp = (result['rows'][i].duree)/ 3600;
                  byd[1]=hp + tempProd;
                  byd[2]=temphProd;

                }else{
                  var hhp = (result['rows'][i].duree)/ 3600;
                  byd[1]=tempProd;
                  byd[2]=hhp + temphProd;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte)+tempqte;
                    //console.log("rows:"+parseInt(result['rows'][i].qte));
                  }else{

                       byd[3]=tempqte;
                  }

                  if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err)+temperr;
                    //console.log("rows:"+parseInt(result['rows'][i].err));
                  }else{

                       byd[4]=temperr;
                  }
                byDate[index]=byd;
                //console.log(byd);
              }

            //console.log('2:');

          }
        }

        var retval = [];
        retval['courbe'] = byDate;

        //xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
        return res.view('pages/ajax/graphDossier', retval);
      }
    });
    //res.view('pages/ajax/graphDossier');

  },

  wsGrapheDossier: function (req, res) {

    // if (!req.session.user) return res.redirect('/login');
    var retval = [];

    var dossier =req.param('idDossier',null);
    var datedeb =/*req.param('datedeb',null).replace(/-/,'').replace(/-/,'').substr(0,8)*/"20160530";
    var datefin =/*req.param('datefin',null).replace(/-/,'').replace(/-/,'').substr(0,8)*/"20160604";
    var matricule =req.session.user;
    var dateess = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    //console.log("date now:"+dateess+";"+dossier+";"+matricule);
    var datecible ="20160620";
    var sql = "select SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree,  sum(to_number('0'||quantite,'99999')) as qte,sum(to_number('0'||nbre_erreur,'99999')) as err, id_type_ldt, r_personnel.appelation,p_ldt.date_deb_ldt "
			+"from p_ldt "
			+"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
			+"LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier "
			+"where 1=1 AND date_deb_ldt BETWEEN '"+datedeb+"' AND '"+datefin+"' "
      +"AND p_ldt.id_dossier ="+dossier+" "
      +"AND p_ldt.id_pers="+matricule+" "
			+"GROUP BY  p_ldt.date_deb_ldt, r_personnel.appelation, id_type_ldt order by p_ldt.date_deb_ldt ";


    Ldt.query(sql,function(err,result){
      if (err){
        //console.log("err"+err);
        return;
      }
      else{
        //console.log(result.rows);
//_____________________
        var byDate = [];
        var cpt = 0;
        for(var i=0;i<result['rows'].length;i++){
          //console.log('duree:'+result['rows'][i].duree);
          if(byDate.length==0){
            var byd = [];

            byd[0]=result['rows'][i].date_deb_ldt;
            if(result['rows'][i].lib==null){
              byd[1]=(result['rows'][i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(result['rows'][i].duree)/ 3600;
            }
            if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
               byd[3]=parseInt(result['rows'][i].qte);
               //console.log("int:"+parseInt(result['rows'][i].qte));
            }else{

              byd[3]=0;
            }

            if(result['rows'][i].err!=null && result['rows'][i].err!=""){
               byd[4]=parseInt(result['rows'][i].err);
               //console.log("int:"+parseInt(result['rows'][i].err));
            }else{

              byd[4]=0;
            }



            byDate[cpt]=byd;
            //console.log('1:');
          }else{
            var index = -1;
             var tempProd =0;
                var temphProd = 0;
                var tempqte = 0;
                var temperr = 0;
            for(var t = 0; t<byDate.length;t++){
              tempProd = byDate[t][1];
               temphProd = byDate[t][2];
                tempqte = byDate[t][3];
                temperr = byDate[t][4];
              //console.log("bdossier="+byDate[t][0]+";result="+result['rows'][i].date_deb_ldt);
              if(byDate[t][0]==result['rows'][i].date_deb_ldt){
                //console.log('misy:'+byDate.length);
                index = t;
              }else{


              }
            }


              if(index==-1){
                  cpt = cpt + 1;
                var byd = [];
                byd[0]=result['rows'][i].date_deb_ldt;
                if(result['rows'][i].lib==null){
                  byd[1]=(result['rows'][i].duree)/ 3600;
                  byd[2]=0;

                }else{
                  byd[1]=0;
                  byd[2]=(result['rows'][i].duree)/ 3600;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte);
                  }else{

                    byd[3]=0;
                  }
                   if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err);
                  }else{

                    byd[4]=0;
                  }
                byDate[cpt]=byd;
              }else{

                var byd = [];
                byd[0]=result['rows'][i].date_deb_ldt;
                if(result['rows'][i].lib==null){
                  var hp = (result['rows'][i].duree)/ 3600;
                  byd[1]=hp + tempProd;
                  byd[2]=temphProd;

                }else{
                  var hhp = (result['rows'][i].duree)/ 3600;
                  byd[1]=tempProd;
                  byd[2]=hhp + temphProd;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte)+tempqte;
                    //console.log("rows:"+parseInt(result['rows'][i].qte));
                  }else{

                       byd[3]=tempqte;
                  }

                  if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err)+temperr;
                    //console.log("rows:"+parseInt(result['rows'][i].err));
                  }else{

                       byd[4]=temperr;
                  }
                byDate[index]=byd;
                //console.log(byd);
              }

            //console.log('2:');

          }


        }

        var retval = {"courbe":byDate};
        return res.json(retval);
        //retval['courbe'] = byDate;

//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
       // return res.view('pages/ajax/graphDossier', retval);
      }
    });
    //res.view('pages/ajax/graphDossier');

  },

  getldtop: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var ret = {'ldt':[], 'courbe':[]};

    var dep =req.param('dep',null);
    var dossier =req.param('dossier',null);
    var matricule =req.session.user;
    var dateess = new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8);
    //console.log("date now:"+dateess+";");
    var datecible ="20160620";
    var filtre = "";
    if(dep!=null)
      filtre = filtre+ "AND r_personnel.id_departement ="+dep;
    if(dossier!=null)
      filtre = filtre+ "AND p_ldt.id_dossier ="+dossier;
    if(matricule!=null)
      filtre = filtre+ "AND p_ldt.id_pers ="+matricule;
    var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
			+"p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib "
			+"from p_ldt "
			+"LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
			+"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
			+"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
			+"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
			+"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
			+"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
			+"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
			+"where 1=1 AND p_ldt.date_deb_ldt = '"+dateess+"' AND p_ldt.id_pers = "+matricule+" "
			+"group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";


    Ldt.query(sql,function(err,result){
      if (err){
        console.log(err);
        return;
      }
      else{
        //console.log(result);
        var byDossier = [];
        var cpt = 0;
        for(var i=0;i<result['rows'].length;i++){
          if(byDossier.length==0){
            var byd = [];

            byd[0]=result['rows'][i].num;
            if(result['rows'][i].lib==null){
              byd[1]=(result['rows'][i].duree)/ 3600;
              byd[2]=0;

            }else{
              byd[1]=0;
              byd[2]=(result['rows'][i].duree)/ 3600;
            }
            if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
               byd[3]=parseInt(result['rows'][i].qte);
               //console.log("int:"+parseInt(result['rows'][i].qte));
            }else{

              byd[3]=0;
            }

            if(result['rows'][i].err!=null && result['rows'][i].err!=""){
               byd[4]=parseInt(result['rows'][i].err);
               //console.log("int:"+parseInt(result['rows'][i].err));
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
              //console.log("bdossier="+byDossier[t][0]+";result="+result['rows'][i].num);
              if(byDossier[t][0]==result['rows'][i].num){
                //console.log('misy:'+byDossier.length);
                index = t;
              }else{


              }
            }


              if(index==-1){
                  cpt = cpt + 1;
                var byd = [];
                byd[0]=result['rows'][i].num;
                if(result['rows'][i].lib==null){
                  byd[1]=(result['rows'][i].duree)/ 3600;
                  byd[2]=0;

                }else{
                  byd[1]=0;
                  byd[2]=(result['rows'][i].duree)/ 3600;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte);
                  }else{

                    byd[3]=0;
                  }
                   if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err);
                  }else{

                    byd[4]=0;
                  }
                byDossier[cpt]=byd;
              }else{

                var byd = [];
                byd[0]=result['rows'][i].num;
                if(result['rows'][i].lib==null){
                  var hp = (result['rows'][i].duree)/ 3600;
                  byd[1]=hp + tempProd;
                  byd[2]=temphProd;

                }else{
                  var hhp = (result['rows'][i].duree)/ 3600;
                  byd[1]=tempProd;
                  byd[2]=hhp + temphProd;
                }
                if(result['rows'][i].qte!=null && result['rows'][i].qte!=""){
                    byd[3]=parseInt(result['rows'][i].qte)+tempqte;
                    //console.log("rows:"+parseInt(result['rows'][i].qte));
                  }else{

                       byd[3]=tempqte;
                  }

                  if(result['rows'][i].err!=null && result['rows'][i].err!=""){
                    byd[4]=parseInt(result['rows'][i].err)+temperr;
                    //console.log("rows:"+parseInt(result['rows'][i].err));
                  }else{

                       byd[4]=temperr;
                  }
                byDossier[index]=byd;
                //console.log(byd);
              }

            //console.log('2:');

          }
          var id_pers = result['rows'][i].id_pers;
          var duree = (result['rows'][i].duree)/ 3600;

          var qte = 0;
          var num ;
          var lib;
          var vitesse =0;
          if(result['rows'][i].qte!=null && result['rows'][i].qte!=0){
              qte = result['rows'][i].qte;
              num = result['rows'][i].num;
              lib = result['rows'][i].lib;

              vitesse = qte/duree;
              //console.log(vitesse);
          }
        }


        ret.ldt = result['rows'];
        ret.courbe = byDossier;
        sails.sockets.blast(""+matricule, ret);
        return res.json(ret);


      }

    });
  },

  suivisOp: function (req, res) {
    var math = require('mathjs');
    // if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    var dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datees2 = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    var rt = false;

    if(dateess==''+(new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10)){
      rt = true;
    }
    if(dateess==''){
      dateess = (''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
      datees2 = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    }
    var dossier = req.param('dossier','');
    var dep = req.param('departement','');
    var equipe = req.param('equipe','');
    var groupe = req.param('groupe','');
    var filtre = req.param('filtre','1');
    req.session.datechoice = req.param('datedeb',''+new Date().toISOString()).substr(0,10);
    req.session.dossier = dossier;
    req.session.departement = dep;
    req.session.groupe = groupe;
    req.session.equipe = equipe;
    req.session.filtre = filtre;
    var options = [];
    options.datecible=dateess;
    options.datesess=datees2;
    options.dossier= dossier;
    options.departement= dep;
    options.groupe= groupe;
    options.equipe= equipe;



    async.series([
        function(callback){
          LdtService.getListeConnected(options, callback);
        },
        function(callback){
          LdtService.getHeureLdt(options, callback);
        },
        function(callback){
          PointageService.getCongeParDate(options, callback);
        }
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var listePConnected = results[0];
        var listeinLdtConnected = results[1];
        var listeConge = results[2];
        ////console.log(results[1]);

        return res.view('pages/suivisOp',{
          menu : menu,
          listePersonneConnected :  listePConnected,
          listeinLdtConnected :  listeinLdtConnected,
          listeConge : listeConge,
          dossier :  dossier,
          dep :  dep,
          math :  math,
          groupe :  groupe,
          filtre :  filtre,
          datecible :  datees2,
          realtime :  rt,
          layout :  false,
          Highcharts :  Highcharts
        });
      });
  },


  anomalieOp: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    if (req.session.droit!=1) return res.redirect('/');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    return res.view('pages/anomalieOp',{
      menu : menu,
      layout :  false,
    });

  },

  suivisHeureOp: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    if (req.session.droit!=1) return res.redirect('/');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    return res.view('pages/suivisHeureOp',{
      menu : menu,
      layout :  false,
    });

  },

  suivisOpMensuel: function (req, res) {

    var math = require('mathjs');
    // if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    if(req.param('datedeb',null)==null){
      return res.view('pages/suivisOpMensuel',{
        menu : menu,
        nothing : true
      });
    }
    var dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
    var datees2 = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    if(dateess==''){
      dateess = (''+new Date().toISOString()).replace(/-/,'/').replace(/-/,'/').substr(0,10);
      datees2 = (new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    }
    var dossier = req.param('dossier','');
    var dep = req.param('departement','');
    var groupe = req.param('groupe','');
    var filtre = req.param('filtre','1');
    req.session.datechoice = req.param('datedeb',''+new Date().toISOString()).substr(0,10);
    req.session.dossier = dossier;
    req.session.departement = dep;
    req.session.groupe = groupe;
    req.session.filtre = filtre;
    var options = [];
    options.datecible=dateess;
    options.datesess=datees2;
    options.dossier= dossier;
    options.departement= dep;
    options.groupe= groupe;



    async.series([
        function(callback){
          LdtService.getListeConnected(options, callback);
        },
        function(callback){
          LdtService.getJourLdt(options, callback);
        },
        function(callback){
          PointageService.getCongeParDate(options, callback);
        }
      ],
      function(err, results) {
        if (err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var listePConnected = results[0];
        var listeinLdtConnected = results[1];
        var listeConge = results[2];
        //console.log(results[1]);

        return res.view('pages/suivisOpMensuel',{
          menu : menu,
          listePersonneConnected :  listePConnected,
          listeinLdtConnected :  listeinLdtConnected,
          listeConge : listeConge,
          dossier :  dossier,
          dep :  dep,
          math :  math,
          groupe :  groupe,
          filtre :  filtre,
          nothing : false,
          datecible :  datees2
        });
      });

  },

  createExcel: function (req, res) {
    /*var sync = require('synchronize');
    // load math.js
    var math = require('mathjs');
    if (!req.session.user) return res.redirect('/login');

    //console.log("FONCTION TO EXCEL ********************************************************************")
    //get('excel',function(req,res){
    var nodeExcel=require('excel-export');
    var conf={}
    conf.cols=[{
      caption:'MATRICULE',
      type:'number',
      width:150
    },
      {
        caption:'DOSSIER',
        type:'string',
        width:350
      },
      {
        caption:'DUREE TOTAL',
        type:'number',
        width:150
      },
      {
        caption:'PROD',
        type:'number',
        width:150
      },
      {
        caption:'HORS PROD',
        type:'number',
        width:150
      }
    ];


    var dateess = req.param('datedeb',''+new Date().toISOString()).replace('-','').substr(0,8);
    dateess = dateess.replace('/','').substr(0,8);
    var dossier = req.param('dossier','');
    var sqlDossier = "";
    if(dossier!=''){
      sqlDossier = " AND p_ldt.id_dossier="+dossier;
    }
    var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
      +"p_dossier.num_dossier as num, p_dossier.id_dossier "
      +"from p_ldt "
      +"LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
      +"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
      +"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
      +"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
      +"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
      +"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
      +"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
      +"where 1=1 AND p_ldt.date_deb_ldt = '"+ dateess +"' "+sqlDossier+" AND p_ldt.id_type_ldt =0 "
      +"group by p_ldt.id_pers, p_dossier.id_dossier, p_dossier.num_dossier order by  p_ldt.id_pers, p_dossier.num_dossier";

    var sql2 = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
      +"p_dossier.num_dossier as num, p_dossier.id_dossier "
      +"from p_ldt "
      +"LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
      +"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
      +"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
      +"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
      +"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
      +"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
      +"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
      +"where 1=1 AND p_ldt.date_deb_ldt = '"+ dateess +"' "+sqlDossier+" AND p_ldt.id_type_ldt !=0 "
      +"group by p_ldt.id_pers, p_dossier.id_dossier, p_dossier.num_dossier order by  p_ldt.id_pers, p_dossier.num_dossier";




    Ldt.query(sql, function(error, app){
      if (error) {
        //console.log(error);
      }

      Ldt.query(sql2,function (err, ldt) {
        var arr=[];
        sync.fiber(function(){
          for(i=0;i<app.rows.length;i++){
            var hp = 0;
            var test = 0;
            for(var b=0; b<ldt.rows.length; b++){
              if(app.rows[i].id_pers==ldt.rows[b].id_pers){
                hp = ldt.rows[b].duree;
                //console.log("hp-----> "+hp);
                test = test+1;
              }
            }

            var matricule=app.rows[i].id_pers;
            var dossier=app.rows[i].num;
            var hprod=math.round(hp/3600,3);

            var prod=math.round(app.rows[i].duree/3600,3);

            var duree=math.round(prod + hprod,3);
            if(hprod==0){
              hprod = "0";
            }if(test==0){
              hprod = "0";
            }
            if(prod==0){
              prod = "0";
            }
            if(duree==0){
              duree = "0";
            }

            var a=[matricule,dossier,duree,prod,hprod];
            arr.push(a);
          }

        });
        conf.rows=arr;
        var result=nodeExcel.execute(conf);
        res.setHeader('Content-Type','application/vnd.openxmlformates');
        res.setHeader("Content-Disposition","attachment;filename=Export"+dateess+".xlsx");
        res.end(result,'binary');


        //console.log("FIN FONCTION TO EXCEL ********************************************************************");


      })



    });*/
  }, createExcelPost: function (req, res) {
    /*var sync = require('synchronize');
    // load math.js
    var math = require('mathjs');
    if (!req.session.user) return res.redirect('/login');
    var app = req.param('data',null);

    //console.log("FONCTION TO EXCEL ********************************************************************")
    //get('excel',function(req,res){
    var nodeExcel=require('excel-export');
    var conf={}
    conf.cols=[{
      caption:'MATRICULE',
      type:'string',
      width:150
    },
      {
        caption:'STATUS',
        type:'string',
        width:350
      },
      {
        caption:'DUREE TOTAL',
        type:'string',
        width:150
      }
    ];



    var arr=[];
    sync.fiber(function(){
      //console.log("donnee==========>"+app);
      if(app!=null){
        for(i=0;i<(app.split(":")).length-1;i++){

          var matricule=(app.split(":"))[i];
          var appelation="Non connectée";
          var a=[matricule,appelation,"0"];
          arr.push(a);
        }
      }


    });
    conf.rows=arr;
    var result=nodeExcel.execute(conf);
    res.setHeader('Content-Type','application/vnd.openxmlformates');
    res.setHeader("Content-Disposition","attachment;filename=ExportNONCONNECTER.xlsx");
    res.end(result,'binary');


    //console.log("FIN FONCTION TO EXCEL ********************************************************************");

*/
  }, createExcelPostDep: function (req, res) {
   /* var sync = require('synchronize');
    // load math.js
    var math = require('mathjs');
    if (!req.session.user) return res.redirect('/login');
    var app = req.param('data',null);

    //console.log("FONCTION TO EXCEL ********************************************************************")
    //get('excel',function(req,res){
    var nodeExcel=require('excel-export');
    var conf={}
    conf.cols=[{
      caption:'MATRICULE',
      type:'string',
      width:150
    },
      {
        caption:'DOSSIER',
        type:'string',
        width:350
      },
      {
        caption:'DUREE TOTAL',
        type:'string',
        width:150
      },
      {
        caption:'PROD',
        type:'string',
        width:150
      },
      {
        caption:'HORS PROD',
        type:'string',
        width:150
      }
    ];



    var arr=[];
    sync.fiber(function(){
      //console.log("donnee==========>"+app);
      if(app!=null){
        for(i=0;i<(app.split(":")).length-1;i++){
          var obj = (app.split(":"))[i];
          var matricule=(obj.split("?"))[0];
          var appelation=(obj.split("?"))[1];
          var duree=(obj.split("?"))[2];
          var prod=(obj.split("?"))[3];
          var hprod=(obj.split("?"))[4];
          var a=[matricule,appelation,duree,prod,hprod];
          arr.push(a);
        }
      }


    });
    conf.rows=arr;
    var result=nodeExcel.execute(conf);
    res.setHeader('Content-Type','application/vnd.openxmlformates');
    res.setHeader("Content-Disposition","attachment;filename=ExportNONCONNECTER.xlsx");
    res.end(result,'binary');


    //console.log("FIN FONCTION TO EXCEL ********************************************************************");
*/

  },

  createExcelDetailee: function (req, res) {

    // if (!req.session.user) return res.redirect('/login');

    //console.log("FONCTION TO EXCEL ********************************************************************")
    //get('excel',function(req,res){
    var nodeExcel=require('excel-export');
    var conf={}
    conf.cols=[{
      caption:'MATRICULE',
      type:'string',
      width:150
    },
      {
        caption:'DOSSIER',
        type:'string',
        width:350
      },
      {
        caption:'DUREE',
        type:'integer',
        width:150
      },
      {
        caption:'ETAPE',
        type:'string',
        width:150
      },
      {
        caption:'TYPE',
        type:'string',
        width:350
      }
    ];


    var dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    var dossier = req.param('dossier','');
    var sqlDossier = "";
    if(dossier!=''){
      sqlDossier = " AND p_dossier.id_dossier="+dossier;
    }
    var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
      +"p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib, p_dossier.id_dossier,p_ldt.id_type_ldt "
      +"from p_ldt "
      +"LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
      +"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
      +"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
      +"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
      +"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
      +"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
      +"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
      +"where 1=1 AND p_ldt.date_deb_ldt = '"+ dateess +"'"+sqlDossier+" "
      +"group by p_ldt.id_pers, p_dossier.id_dossier, p_dossier.num_dossier,p_etape.libelle, p_type_ldt.libelle,p_ldt.id_type_ldt order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";




    Ldt.query(sql, function(error, app){
      if (error) {
        //console.log(error);
      }
      var arr=[];
      for(i=0;i<app.rows.length;i++){



        var type = " - ";
        switch (app.rows[i]['id_type_ldt']) {
          case 0:type = " PROD ";
            break;
          case 1://pause
            type = " PAUSE ";
            break;

          case 2: type = " FORMATION ";
            break;
          case 3: type = " ATTENTE DE TRAVAIL ";
            break;
          //case 4:	$PAUSE_DEJEUNER+= $arr['somme'];$horsProd += $arr['somme'];break;
          case 5: type = " PANNE MACHINE ";
            break;
          case 6: type = " PANNE INTERNET ";
            break;
          case 7: type = " PANNE RESEAUX ";
            break;
          case 8:type = " DELEGUE DU PERSONNEL ";
            break;
          //case 9:	$PAUSE_TOILETTE+= $arr['somme'];$horsProd += $arr['somme'];break;
          case 10:type = " INSTALATION ";
            break;
          case 11:type = " OSTIE ";
            break;
          case 12:type = " REUNION ";
            break;
          case 13:type = " MAINTENANCE ";
            break;
          case 14:type = " PERMISSION ";
            break;
          case 15:type = " EXERCICE SOUS CHARGE ";
            break;
          case 16:type = " PROBLEME APPLICATION ";
            break;
          case 17:type = " TEST APPLICATION ";
            break;
          case 18:type = " REFECTION ";
            break;
        }


        var matricule=app.rows[i].id_pers;
        var dossier=app.rows[i].num;
        var duree=app.rows[i].duree;
        var etape=app.rows[i].libelle;

        var a=[matricule,dossier,duree,etape,type];
        arr.push(a);
      }
      conf.rows=arr;
      var result=nodeExcel.execute(conf);
      res.setHeader('Content-Type','application/vnd.openxmlformates');
      res.setHeader("Content-Disposition","attachment;filename=Export"+dateess+".xlsx");
      res.end(result,'binary');


      //console.log("FIN FONCTION TO EXCEL ********************************************************************");

    });
  },



  DashboardOp: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var idPers = req.session.user;
    var retVal = [];
    var dateess = req.param('datedeb',''+new Date().toISOString()).replace(/-/,'').replace(/-/,'').substr(0,8);
    //var dateess = req.param('datedeb','20160807');
    var menu = [];
    menu["aceuil"]= "selected";
    menu["dossierAdmin"]= "";
    menu["gestionDossier"]= "";
    menu["statOpAdmin"]= "";
    menu["presence"]= "";
    menu["admin"]= "";
    req.session.datechoice = dateess;
    var options = [];
    options.dateess=dateess;
    options.idPers= idPers;
    var data = 'huhu';
    async.series([
        function(callback){
          LdtService.getRepartitionParDate(options, callback);
        },function(callback){
          LdtService.getLdtParEtape(options, callback);
        }
      ],
      function(err, results){
        if(err) return res.badRequest("Problème avec la récupération des données dans la base");

        //traitement des donnees
        var listeDossier = results[0];



        //console.log("result===========>"+listeDossier.length);
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

        //par Etape



        return res.view('pages/DashboardOp', {
          listeDossier : listeDossier,
          byDossier : byDossier,
          menu : menu
        });
      });
  }
};

