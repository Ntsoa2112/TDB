/**
 * Centralisation.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  },

  getlisteProjet: function (next) {
    var query = 'SELECT num_dossier,id_dossier,p_dossier.id_cl,p_client.description FROM p_dossier LEFT JOIN p_client ON p_client.id_cl = p_dossier.id_cl ' +
      ' where  p_dossier.id_cl <> 5 AND (num_dossier like \'00%\' OR num_dossier like \'p%\'  OR num_dossier like \'P%\' OR p_dossier.id_dossier in (39,750)) AND p_dossier.id_dossier not in (306,45,41,410,541,657) order by p_dossier.num_dossier ASC;';
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },
  getProjetAls: function (next) {
    var query = 'SELECT num_dossier,id_dossier FROM p_dossier  where p_dossier.id_dossier  in (856,908,959,1012) order by p_dossier.num_dossier ASC;';
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  getSommeLdtByIdDossier: function (opt, next) {
    var sql_where = '';
    if (opt.date !== '') {
      sql_where = " AND date_deb_ldt <= '" + opt.date + "' ";
    }
    var query = 'SELECT SUM(DATE_PART(\'epoch\', (\'2011-12-29 \'||p_ldt.h_fin)::timestamp - (\'2011-12-29 \'||p_ldt.h_deb)::timestamp )) as duree,\n' +
      '\tsum(to_number(\'0\'||quantite,\'99999\')) as qte,\n' +
      '  p_etape.id_etape,p_etape.libelle\n' +
      '   ,\n' +
      '  p_lien_oper_dossier.vitesse ' +
      '  FROM p_ldt \n' +
      '  JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien\n' +
      '  join p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper\n' +
      '  WHERE p_ldt.id_dossier = ' + opt.id_dossier + ' ' + sql_where + ' group by p_etape.id_etape,p_etape.libelle,p_lien_oper_dossier.vitesse ;';
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },


  getDetailProject: function (id_dossier, next) {
    var query = '  SELECT * FROM p_dossier where id_dossier = ' + id_dossier + ' LIMIT 1;';
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  getListEtape: function (id_dossier, next) {
    var query = "select id_lien, p_etape.libelle from p_lien_oper_dossier  " +
      "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape  WHERE id_dossier = " + id_dossier + "order by id_lien";
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  getListLotClient: function (id_dossier, next) {
    var query = "select id_lotclient, libelle from p_lot_client WHERE id_dossier = " + id_dossier + " AND id_etat <> 2 order by libelle ASC";
    console.log("\n --------------------------------------------SQL>>>>\n" + query);
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  getFrequenceFaute: function (opt, next) {
    console.log("\n --------------------------DEBUT FREQUENCE DE FAUTE------------------\n");
    var sql_where = '';
    if (opt.id_etape !== '' && opt.id_etape != 0)
      sql_where += " AND p_ldt.id_etape =" + opt.id_etape;
    if (opt.id_lotclient !== '' && opt.id_lotclient != 0)
      sql_where += " and p_lot_client.id_lotclient=" + opt.id_lotclient;
    if (opt.matricule !== '')
      sql_where += " AND p_ldt.id_pers=" + opt.matricule;
    if (opt.date !== '')
      sql_where += " AND date_deb_ldt BETWEEN '" + opt.dateDeb + "' AND '" + opt.dateFin + "'";
    if (opt.h_debut !== '00:00:00' && opt.h_fin !== '00:00:00')
      sql_where += " AND  h_fin::time BETWEEN'" + opt.h_debut + "' AND  '" + opt.h_fin + "'";
      if (opt.depart !== '' && opt.depart !== '0')
      sql_where += " AND id_departement ="+opt.depart;
    var query = "SELECT p_ldt.id_pers,r_personnel.appelation, p_dossier.num_dossier, p_lot_client.libelle as lot_client,  p_etape.libelle as etape,\n" +
      "sum(to_number('0' ||  p_ldt.quantite, '99999')) as qte,sum(to_number('0' || p_ldt.nbre_erreur, '99999')) as nbErreur,count(p_ldt.commentaire) FILTER (WHERE commentaire ILIKE 'ok%') nbLot, \n" +

      "SUM(DATE_PART(\'epoch\', (\'2011-12-29 \'||p_ldt.h_fin)::timestamp - (\'2011-12-29 \'||p_ldt.h_deb)::timestamp )) as duree\n" +
      "FROM p_ldt\n" +
      "JOIN r_personnel on r_personnel.id_pers= p_ldt.id_pers\n" +
      "JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient\n" +
      "JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot\n" +
      "JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier\n" +
      "JOIN  p_lien_oper_dossier ON p_lien_oper_dossier.id_lien= p_ldt.id_etape\n" +
      "JOIN p_etape ON p_lien_oper_dossier.id_oper= p_etape.id_etape\n" +
      " WHERE p_ldt.id_dossier=" + opt.id_dossier + " " + sql_where + "  and id_type_ldt=0 AND (commentaire ILIKE \'ok%\' OR COALESCE(commentaire,'')='')\n" +
      "GROUP BY  p_ldt.id_pers ,r_personnel.appelation, p_dossier.num_dossier, p_lot_client.libelle,p_etape.libelle  \n" +
      " ORDER BY p_ldt.id_pers asc ;";
    console.log("\n --------------------------------------------SQL>>>>\n" + query);
    console.log("\n --------------------------FIN  FREQUENCE DE FAUTE------------------\n");
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  //pour la correction des données qui ont des erreur lot client
  getErrorLotClient: function (opt, next) {
    var dos = [];
    var query = "SELECT id_ldt, p_ldt.id_pers, p_dossier.num_dossier, p_lot_client.libelle as lotclient, p_lot.libelle," +
      "  p_ldt.id_etape, p_ldt.h_deb, h_fin, quantite, p_ldt.nbre_erreur, commentaire," +
      "date_deb_ldt,  date_fin_ldt" +
      "  FROM p_ldt" +
      "  JOIN p_dossier ON  p_dossier.id_dossier = p_ldt.id_dossier" +
      "  JOIN p_lot_client ON p_ldt.id_lotclient = p_lot_client.id_lotclient" +
      "  JOIN p_lot ON p_lot.id_lot = p_ldt.id_lot" +
      "  WHERE p_ldt.id_dossier =  " + opt.id_dossier +
      " AND p_ldt.id_etape =  " + opt.id_etape +
      " AND p_ldt.id_lotclient <>  " + opt.id_lotclient + " AND p_lot_client.libelle<>'TEST' AND p_lot_client.libelle<>'Prod' AND p_lot_client.libelle<>'Test' AND p_lot_client.libelle<>'PROD_AMO'" +
      " AND commentaire ILIKE 'ok%' " +
      " AND p_lot.libelle  ILIKE '" + opt.keyword + "%'; ";
    console.log("\n*********************SQL AFFICHAGE LISTE à CORRIGER**********************\n" + query);
    Ldt.query(query, function (err, res) {
      if (err) return next(err);
      res.rows.forEach(element => {
        var updateQuery = "UPDATE p_ldt   SET  id_lotclient = " + opt.id_lotclient + " WHERE id_ldt =" + element["id_ldt"] + ";"
      });
      // return next(null, res.rows);
    });
  },



  //pour l'afficahge des heure consomé par lot client initialement 
  getSommeLdtByIdLotClient: function (opt, next) {

    var sql_where = '';
    if (opt.id_etape !== '' && opt.id_etape != 0)
      sql_where += " AND p_ldt.id_etape =" + opt.id_etape;
    if (opt.id_lotclient !== '' && opt.id_lotclient != 0)
      sql_where += " and p_lot_client.id_lotclient=" + opt.id_lotclient;
    if (opt.matricule !== '')
      sql_where += " AND p_ldt.id_pers=" + opt.matricule;
    if (opt.date !== '')
      sql_where += " AND date_deb_ldt BETWEEN '" + opt.dateDeb + "' AND '" + opt.dateFin + "'";
    if (opt.h_debut !== '00:00:00' && opt.h_fin !== '00:00:00')
      sql_where += " AND  h_fin::time BETWEEN'" + opt.h_debut + "' AND  '" + opt.h_fin + "'";
      if (opt.depart !== '' && opt.depart !== '0')
      sql_where += " AND id_departement ="+opt.depart;

    var query = ""
    if(opt.id_dossier==1012)
    {
      query= 'SELECT SUM(DATE_PART(\'epoch\', (\'2011-12-29 \'||p_ldt.h_fin)::timestamp - (\'2011-12-29 \'||p_ldt.h_deb)::timestamp )) as duree,\n' +
      '\tsum(to_number(\'0\'||quantite,\'99999\')) as qte,count(p_ldt.id_lot ) FILTER (WHERE  COALESCE(commentaire,\'\')=\'\') as nb_ldw,sum(to_number(\'0\'||p_ldt.nbre_erreur,\'99999\')) as nb_erreur ,\n' +
      '  p_etape.id_etape,p_etape.libelle  as etape,\n' +
      '  p_lot_client.id_lotclient,p_lot_client.libelle as lot_client\n' +
      '   , p_lien_oper_dossier.vitesse ' +
      '  FROM p_ldt \n' +
      ' LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers '+
      ' LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient\n' +
      ' LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien\n' +
      ' LEFT JOIN  p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper\n' +
      '  WHERE p_ldt.id_dossier = ' + opt.id_dossier + ' ' + sql_where + '  and id_type_ldt=0  AND p_ldt.id_etat<>1  AND  COALESCE(commentaire,\'\')=\'\' AND COALESCE(quantite,\'\')<>\'\''+
      'group by p_lot_client.id_lotclient,\n' +
      'p_etape.id_etape,p_lot_client.libelle,p_lien_oper_dossier.vitesse order by p_lot_client.libelle;';
    }
    else
    {
      query= 'SELECT SUM(DATE_PART(\'epoch\', (\'2011-12-29 \'||p_ldt.h_fin)::timestamp - (\'2011-12-29 \'||p_ldt.h_deb)::timestamp )) as duree,\n' +
      '\tsum(to_number(\'0\'||quantite,\'99999\')) as qte,count(p_ldt.commentaire ) FILTER (WHERE commentaire ILIKE \'ok%\') as nb_ldw,sum(to_number(\'0\'||p_ldt.nbre_erreur,\'99999\')) as nb_erreur ,\n' +
      '  p_etape.id_etape,p_etape.libelle  as etape,\n' +
      '  p_lot_client.id_lotclient,p_lot_client.libelle as lot_client\n' +
      '   , p_lien_oper_dossier.vitesse ' +
      '  FROM p_ldt \n' +
      ' LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers '+
      ' LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient\n' +
      ' LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien\n' +
      ' LEFT JOIN  p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper\n' +
      '  WHERE p_ldt.id_dossier = ' + opt.id_dossier + ' ' + sql_where + '  and id_type_ldt=0  AND p_ldt.id_etat<>1  AND (commentaire ILIKE \'ok%\' OR COALESCE(commentaire,\'\')=\'\') '+
      //' and p_lot.libelle not in (select p_lot.libelle from p_lot where id_etat=1 and id_dossier=" + opt.id_dossier + " ) '+
      'group by p_lot_client.id_lotclient,\n' +

      'p_etape.id_etape,p_lot_client.libelle,p_lien_oper_dossier.vitesse order by p_lot_client.libelle;';
    }

    var date = new Date;
    console.log("\n*********************SQL AFFICHAGE PAR LOT CLIENT PAR ETAPE**********************\n" + query);
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  getDetailProject: function (id_dossier, next) {
    var query = '  SELECT * FROM p_dossier where id_dossier = ' + id_dossier + ' LIMIT 1;';
    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  // detail par matricule par dossier par etape
  getDataByDateByIdPers: function (opt, next) {
    var query = 'SELECT SUM(DATE_PART(\'epoch\', (\'2011-12-29 \'||p_ldt.h_fin)::timestamp - (\'2011-12-29 \'||p_ldt.h_deb)::timestamp )) as duree,\n' +
      '\tsum(to_number(\'0\'||quantite,\'99999\')) as qte,\n' +
      '\tsum(to_number(\'0\'||nbre_erreur,\'99999\')) as err,\n' +
      '  p_etape.id_etape,p_etape.libelle,p_lien_oper_dossier.quantite_journalier as qte_jour,\n' +
      '  p_dossier.num_dossier,p_dossier.id_dossier,\n' +
      '  r_personnel.id_pers,r_personnel.appelation,\n' +
      '  p_lien_oper_dossier.vitesse\n' +
      '  FROM p_ldt\n' +
      '  JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien\n' +
      '  JOIN p_dossier ON p_lien_oper_dossier.id_dossier = p_dossier.id_dossier\n' +
      '  JOIN r_personnel ON p_ldt.id_pers = r_personnel.id_pers\n' +
      '  join p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper\n' +
      '  WHERE p_ldt.id_dossier IN (SELECT id_dossier FROM p_dossier LEFT JOIN p_client ON p_client.id_cl = p_dossier.id_cl\n' +
      'where  p_dossier.id_cl <> 5 order by p_dossier.id_cl ASC)  AND (num_dossier like \'00%\' OR num_dossier like \'p%\'  OR num_dossier like \'P%\' OR p_dossier.id_dossier in (39,750)) AND p_dossier.id_dossier not in (306,45,41,410,541,657) ';
    var sql_wher = '';
    if (opt.dateDeb !== '' && opt.dateFin !== '') {
      sql_wher += " AND p_ldt.date_deb_ldt >= '" + opt.dateDeb + "' AND p_ldt.date_deb_ldt <= '" + opt.dateFin + "' ";
    }

    if (opt.id_pers !== 0) {
      sql_wher += " AND p_ldt.id_pers = " + opt.id_pers + " ";
    }

    if (Number(opt.id_dossier) !== 0) {
      sql_wher += " AND p_ldt.id_dossier = " + opt.id_dossier + " ";
    }
    query += sql_wher;

    query += 'group by r_personnel.id_pers,r_personnel.appelation,p_etape.id_etape,p_etape.libelle,p_lien_oper_dossier.vitesse,p_lien_oper_dossier.quantite_journalier,p_dossier.num_dossier,p_dossier.id_dossier ' +
      ' order by  r_personnel.id_pers,p_dossier.id_dossier,p_etape.id_etape ;';

    console.log(query);

    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

  // detail par matricule par dossier par etape
  getLdtByLot: function (opt, next) {
   
var sql_where='';
if (opt.date !== '')
sql_where +=" AND date_ldt BETWEEN '" + opt.dateDeb + "' AND '" + opt.dateFin + "' \n";
if (opt.h_debut !== '00:00:00' && opt.h_fin !== '00:00:00')
sql_where +=" AND heure_fin::time  BETWEEN '"+ opt.h_debut + "' AND  '" + opt.h_fin + "' \n";
if (opt.id_lotclient !== '' && opt.id_lotclient != 0)
sql_where +=" AND p_lot_client.id_lotclient="+ opt.id_lotclient+" \n";
if (opt.depart !== '' && opt.depart !== '0')
sql_where +=" AND _005825_dossier.id_departement="+ opt.depart+" \n";
if (opt.matricule !== '')
sql_where +=" AND _005825_dossier.id_pers=" + opt.matricule+" \n";
console.log("\n********************SAISIE ALS PAR DOSSIER ******************\n");
var query ="SELECT id_als, date_ldt,_005825_dossier.id_pers,r_personnel.appelation,\n"+
"p_lot_client.libelle as type,_005825_dossier.libelle as lot, quantite,\n"+
"duree, heure_fin, _005825_dossier.id_departement\n"+
"	FROM _005825_dossier\n"+
"	LEFT JOIN r_personnel ON r_personnel.id_pers=_005825_dossier.id_pers\n"+
"	LEFT JOIN p_lot_client ON p_lot_client.id_lotclient=_005825_dossier.id_lot_client \n"+
" WHERE _005825_dossier.id_dossier="+opt.id_dossier+" \n"+
sql_where+" ORDER BY date_ldt ASC ,_005825_dossier.id_pers ASC;";
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>\n \t" + query);

    Dossier.query(query, function (err, res) {
      if (err) return next(err);
      return next(null, res.rows);
    });
  },

    // detail par matricule
    getByOp: function (opt, next) {
      var sql_where = '';
 
      if (opt.id_lotclient !== '' && opt.id_lotclient != 0)
        sql_where += " and p_ldt.id_lotclient=" + opt.id_lotclient;
      if (opt.matricule !== '')
        sql_where += " AND p_ldt.id_pers=" + opt.matricule;
      if (opt.date !== '')
        sql_where += " AND date_deb_ldt BETWEEN '" + opt.dateDeb + "' AND '" + opt.dateFin + "'";
      if (opt.h_debut !== '00:00:00' && opt.h_fin !== '00:00:00')
        sql_where += " AND  h_fin::time BETWEEN'" + opt.h_debut + "' AND  '" + opt.h_fin + "'";
      if (opt.depart !== '' && opt.depart !== '0')
      sql_where += " AND id_departement =" + opt.depart;
      console.log("********************SAISIE ALS par matricule ******************");
      var query = "";
if(opt.id_dossier==1012)
{
query="SELECT  p_ldt.id_pers,r_personnel.appelation,p_dossier.num_dossier,\n"+
"count (p_ldt.id_lot)  as nb_ldw,\n"+
"sum(to_number('0' ||  p_ldt.quantite, '99999')) as qte,\n"+
"SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree\n"+
"FROM p_ldt  LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers\n"+
 "   LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier\n"+
 "  LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient\n"+
 "  LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot \n"+
 " where 1=1 AND  p_ldt.id_dossier =" + opt.id_dossier + sql_where +
 " AND  COALESCE(p_ldt.quantite,'')<>''   and id_type_ldt=0\n"+
 " AND  COALESCE(commentaire,'')=''\n"+
 " group by  p_ldt.id_pers,r_personnel.appelation,  p_dossier.num_dossier order by p_ldt.id_pers asc";
}
else
{
  query="SELECT  p_ldt.id_pers,r_personnel.appelation,p_dossier.num_dossier,\n"+
  "count(p_ldt.commentaire ) FILTER (WHERE commentaire ILIKE 'ok%') as nb_ldw,\n"+
  "sum(to_number('0' ||  p_ldt.quantite, '99999')) as qte,\n"+
  "SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree\n"+
    "FROM p_ldt  LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers\n" +
    "LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier\n" +
    "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient\n" +
    "LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot\n" +
    " WHERE 1=1  AND  p_ldt.id_dossier = " + opt.id_dossier + sql_where +" AND   COALESCE(p_ldt.quantite,\'\')<>\'\'   and id_type_ldt=0 "+
    "AND (commentaire ILIKE \'ok%\' OR COALESCE(commentaire,\'\')=\'\')"+
    "group by  p_ldt.id_pers,r_personnel.appelation,  p_dossier.num_dossier order by p_ldt.id_pers asc";
}
       console.log("*************get by operateur*************\n \t" + query);
  
      Dossier.query(query, function (err, res) {
        if (err) return next(err);
        return next(null, res.rows);
      });
    },



};

