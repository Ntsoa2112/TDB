/**
 * Classique.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  },
  // Fonction pour recuperation liste Dossier flexi capture
  GetListDossierFlex : function(option, callback) {
    var sql = "SELECT id_lotclient,libelle from p_lot_client where id_dossier=959 order by libelle asc";
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  },
  // Fonction pour recuperation donnée ligne de temps dossier flexi capture
  getStatFlexi : function(option,callback) {
    var filtre_dosier = "p_ldt.id_dossier IN (901,902,903) ";
    if(option.id_dossier != null && option.id_dossier !== "" && option.id_dossier !== '')
      filtre_dosier = "p_ldt.id_dossier = "+option.id_dossier+"";
    var sql_filtre = "";
    if(option.id_pers != null && option.id_pers !== "" && option.id_pers !== '')
      sql_filtre = " AND p_ldt.id_pers = "+option.id_pers+"";
    var sql = "" +
      " select " +
      " p_dossier.num_dossier," +
      " p_lot_client.libelle as lotclient_num," +
      " p_lot.libelle as lot," +
      " p_etape.libelle as etape," +
      " p_ldt.h_deb as debut," +
      " p_ldt.h_fin as fin," +
      " (select SUM(CASE WHEN qte_sum.quantite~E'^\\\\d+$' THEN qte_sum.quantite::integer ELSE 0 END) FROM p_ldt qte_sum WHERE qte_sum.id_dossier = p_ldt.id_dossier " +
      "AND to_date(qte_sum.date_deb_ldt,'yyyyMMdd') BETWEEN to_date(p_ldt.date_deb_ldt,'yyyyMMdd') AND to_date(p_ldt.date_deb_ldt,'yyyyMMdd')  " +
      "AND qte_sum.id_type_ldt=0 AND qte_sum.id_pers= p_ldt.id_pers AND qte_sum.id_lotclient = p_ldt.id_lotclient) " +
      "as somme_qte, " +
      " (select SUM(DATE_PART('epoch', ('2011-12-29 '||duree_sum.h_fin)::timestamp - ('2011-12-29 '||duree_sum.h_deb)::timestamp )) FROM p_ldt duree_sum WHERE duree_sum.id_dossier = p_ldt.id_dossier " +
      "AND to_date(duree_sum.date_deb_ldt,'yyyyMMdd') BETWEEN to_date(p_ldt.date_deb_ldt,'yyyyMMdd') AND to_date(p_ldt.date_deb_ldt,'yyyyMMdd')  " +
      "AND duree_sum.id_type_ldt=0 AND duree_sum.id_pers= p_ldt.id_pers AND duree_sum.id_lotclient = p_ldt.id_lotclient) " +
      "as somme_duree, " +
      " (select Count(nombre_lotclient.id_ldt) FROM p_ldt nombre_lotclient WHERE nombre_lotclient.id_dossier = p_ldt.id_dossier "+
      " AND to_date(nombre_lotclient.date_deb_ldt,'yyyyMMdd') BETWEEN to_date(p_ldt.date_deb_ldt,'yyyyMMdd') " +
      " AND to_date(p_ldt.date_deb_ldt,'yyyyMMdd')    AND nombre_lotclient.id_type_ldt=0 AND " +
      " nombre_lotclient.id_lotclient = p_ldt.id_lotclient )    as nombre_occurence, "+
      "(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree, " +
      "(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte," +
      "  p_ldt.id_pers" +
      " from " +
      "p_ldt " +
      "LEFT JOIN p_dossier on p_dossier.id_dossier = p_ldt.id_dossier " +
      "LEFT JOIN p_lot_client on p_lot_client.id_lotclient = p_ldt.id_lotclient " +
      "LEFT JOIN p_lot on p_lot.id_lot = p_ldt.id_lot " +
      "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien " +
      "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
      "WHERE "+filtre_dosier+ " " +
      "AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.date_debut+"','yyyyMMdd') AND to_date('"+option.date_fin+"','yyyyMMdd')  " +
      "AND id_type_ldt=0 " +
      ""+sql_filtre+"" +
      "order by p_ldt.id_pers,p_lot_client.libelle,p_lot.libelle";
   // console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err) return callback(err);
      return callback(null, res.rows);
    });
  }
};

