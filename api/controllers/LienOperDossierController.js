/**
 * LienOperDossierController
 *
 * @description :: Server-side logic for managing Lienoperdossiers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var Highcharts = require('highcharts');

module.exports = {
  index: function (req, res) {
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
    retval['menu']=menu;
    retval['layout']=false;

    return res.view( 'pages/statistique', retval);



  },

  ajaxStat: function (req, res) {
    // if (!req.session.user) return res.redirect('/login');
    var retval = [];
    var d = new Date();
    var day = d.getDay();
    var matricule =req.param('matricule',null);
    var matrSql = "";
    if(matricule!=null && matricule!= 'undefined' && matricule!= ''){

    }else{
      matricule = req.session.user;
    }
    var diff = d.getDate() - day + (day == 0 ? -6:1);
    //console.log("date=====>"+new Date(d.setDate(diff)).toISOString().replace(/-/,'').replace(/-/,'').substr(0,8))
    var dossier =req.param('dossier',null);
    var datedeb =req.param('datedeb',''+new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8));
    var datefin =req.param('datefin',''+new Date().toISOString().replace(/-/,'').replace(/-/,'').substr(0,8));
    req.session.mat = matricule;
    req.session.dossier = dossier;
    req.session.datedeb = datedeb;
    req.session.datefin = datefin;
    var sql = "select p_ldt.date_deb_ldt, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as somme, sum(to_number('0'||quantite,'99999')) as qte, "
      +" id_type_ldt FROM p_ldt "
      +"where 1=1 AND (to_date(p_ldt.date_deb_ldt,'yyyyMMdd') between to_date('"+datedeb+"','yyyyMMdd') AND to_date('"+datefin+"','yyyyMMdd')) AND id_type_ldt = 0 "
      +"AND p_ldt.id_pers = "+matricule+" GROUP BY p_ldt.date_deb_ldt, id_type_ldt order by p_ldt.date_deb_ldt, id_type_ldt ";
    //console.log("sqlnette==="+sql);
    Ldt.query(sql,function(err,vitesseNette){
      if (err){
        console.log(err);
        return;
      }else{
        //console.log("Nette:"+vitesseNette);
        retval['vitesseNette'] = vitesseNette.rows;
        var sql2 = "select p_ldt.date_deb_ldt, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as somme, sum(to_number('0'||quantite,'99999')) as qte "
          +" FROM p_ldt"
          +" where 1=1 AND (to_date(p_ldt.date_deb_ldt,'yyyyMMdd') between to_date('"+datedeb+"','yyyyMMdd') AND to_date('"+datefin+"','yyyyMMdd')) "
          +" AND p_ldt.id_pers = "+matricule+" GROUP BY p_ldt.date_deb_ldt order by p_ldt.date_deb_ldt";
        //console.log("sqlbrutte==="+sql2);
        Ldt.query(sql2, function(eror, vitesseBrute)
        {

          if (eror)
          {
            //console.log('erreur 2018');
            return res.send('erreur 2018');
          }else{
            //console.log(vitesseBrute);
            retval['vitesseBrute'] = vitesseBrute.rows;
            retval['Highcharts'] = Highcharts;

            return res.view( 'pages/ajax/ajaxStat', retval);
          }
        });
      }
    });


  }
};

