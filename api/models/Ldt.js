/**
 * Ldt.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
    connection: 'ConnexionPostgresql',
    tableName: 'p_ldt',
    autoCreatedAt: false,
    autoUpdatedAt: false,
    autoPK: false,

    attributes: {

        id: {type: 'integer'},

        pers: {type: 'string'},

        dossier: {type: 'string'},

        lot: {type: 'string'},

        etat: {type: 'string'},

        etape: {type: 'string'},

        type_ldt: {type: 'string'},

        h_deb: {type: 'string'},

        h_fin: {type: 'string'},

        date_deb_ldt: {type: 'string'},

        date_fin_ldt: {type: 'string'},

        mac: {type: 'string'}
    },
    repartitionParDate: function (option, callback) {
        var sql = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
                + "p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib,date_deb_ldt as date_ldt,p_ldt.id_type_ldt "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 and date_deb_ldt = '" + option.dateess + "'  AND p_ldt.id_pers = " + option.idPers + " "
                + "group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle,p_ldt.date_deb_ldt,p_ldt.id_type_ldt order by p_ldt.date_deb_ldt, p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";

        Ldt.query(sql, function (err, res) {
            if (err)return callback(err);
            return callback(null, res.rows);
        });

    },
    countEtapeParDate: function (option, callback) {
        var sql = "select count(distinct(p_etape.libelle)) as ct "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 and date_deb_ldt = '" + option.dateess + "'  AND p_ldt.id_pers = " + option.idPers + " "

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows[0].ct);
        });

    },

    getEtapeParDate: function (option, callback) {
        var sql = "SELECT   SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree,  " +
                "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err," +
                " (CASE WHEN (p_etape.libelle is null) THEN p_type_ldt.libelle ELSE p_etape.libelle END)  AS libelle "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 and date_deb_ldt = '" + option.dateess + "'  AND p_ldt.id_pers = " + option.idPers + " " +
                "group by p_etape.libelle, p_type_ldt.libelle "

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

  getMoyenneEtapeParDate: function (option, callback) {
        var sql = "SELECT   SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree,    "+
"    sum(to_number('0'||quantite,'99999.9')) as qte, sum(to_number('0'||nbre_erreur,'99999.9')) as err, "+
"      (CASE WHEN (p_etape.libelle is null) THEN p_type_ldt.libelle ELSE CONCAT(p_dossier.num_dossier,'_',p_etape.libelle) END)  AS libelle , "+
"      (CASE WHEN (p_lien_oper_dossier.quantite_journalier is null OR p_lien_oper_dossier.quantite_journalier = '' OR to_number('0'||p_lien_oper_dossier.quantite_journalier ,'99999.9')=0) "+
"    THEN "+
"    0 "+
"    ELSE "+
"    ((sum(to_number('0'||quantite,'99999.9'))*100)/to_number('0'||p_lien_oper_dossier.quantite_journalier,'99999.99')) "+
"    END)  AS pqte , " +
          " (CASE WHEN (p_lien_oper_dossier.vitesse is null OR p_lien_oper_dossier.vitesse = '' OR to_number('0'||p_lien_oper_dossier.vitesse ,'99999.9')=0 OR sum(to_number('0'||quantite,'99999.9'))=0)  "+
"    THEN "+
"    0 "+
"    ELSE "+
"    ((sum(to_number('0'||quantite,'99999.9'))/SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp ))/3600)*100)/to_number('0'||p_lien_oper_dossier.vitesse ,'99999.99') "+
"    END)  AS pvit ,"+
"    to_number('0'||p_lien_oper_dossier.vitesse ,'99999.99') as vitj, "+
"    to_number('0'||p_lien_oper_dossier.quantite_journalier,'99999.99') as qtej "+
"    from p_ldt "+
"    LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "+
"    LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "+
"    LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "+
"    LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "+
"    LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "+
"    LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "+
"    LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "+
"    where 1=1 and date_deb_ldt = '" + option.datecible + "'  AND p_ldt.id_pers =  " + option.matricule + "  AND p_ldt.id_type_ldt =0 "+
"    group by p_dossier.num_dossier,p_etape.libelle, p_type_ldt.libelle ,p_lien_oper_dossier.vitesse,p_lien_oper_dossier.quantite_journalier"

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },
    etapeLdtParDate: function (option, callback) {
        var sql = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
                + "p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 and p_dossier.num_dossier='" + option.dossier + "' and date_deb_ldt = '" + option.dateess + "'  AND p_ldt.id_pers = " + option.idPers + " "

                + "group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    pointageParIdDate: function (option, callback) {
        var sql = "SELECT r_pointage.entree, r_pointage.source, r_personnel.appelation from r_pointage " +
                " LEFT JOIN r_personnel ON r_personnel.id_pers=r_pointage.id_util" +
                " where r_pointage.id_util = " + option.idPers + " AND r_pointage.pdate = '" + option.datecible + "' and  r_pointage.source ~  'IN|OUT' order by r_pointage.id_pointage desc limit 1";
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            var statutName = "ABSENCE POINTAGE";
            for (var i = 0; i < res.length; i++) {
                statutName = res.appelation
            }
            return callback(null, statutName);
        });

    },
    listeConnected: function (option, callback) {
        var sql = "SELECT distinct(id_util) from r_pointage where pdate='" + option.datecible + "' order by id_util";

        var filtreGroupe = '';
        var filtreDep = '';
        var filtreEquipe = '';

        if (option.departement != "" && option.departement != null && typeof option.departement != 'undefined') {
            filtreDep = ' AND r_departement.id =' + option.departement + ' ';

        } else {
            if (option.groupe != "" && option.groupe != null && typeof option.groupe != 'undefined') {
                filtreGroupe = ' AND r_departement.id_groupe=' + option.groupe + ' ';
            }

        }

        if (option.equipe != "" && option.equipe != null && typeof option.equipe != 'undefined') {
            filtreEquipe = ' AND r_groupe.id_cp=' + option.equipe + ' ';
        }

        if (option.dossier != "" && option.dossier != null && typeof option.dossier != 'undefined'/* & option.departement == ""*/) {
            sql = "SELECT distinct(r_personnel.id_pers) as id_util, appelation FROM r_personnel" +
                    " LEFT JOIN p_affectation ON p_affectation.id_pers = r_personnel.id_pers" +
                    " LEFT JOIN r_departement ON r_departement.id = r_personnel.id_departement" +
                    " LEFT JOIN r_groupe ON r_personnel.id_pers = r_groupe.id_pers" +
                    " WHERE actif = true AND p_affectation.id_dossier = " + option.dossier + " " + filtreDep + "" + filtreGroupe + "" + filtreEquipe + " order by r_personnel.id_pers";
        } else {
            sql = "SELECT distinct(r_personnel.id_pers) as id_util, appelation FROM r_personnel" +
                    " LEFT JOIN r_departement ON r_departement.id = r_personnel.id_departement" +
                    " LEFT JOIN r_groupe ON r_personnel.id_pers = r_groupe.id_pers" +
                    " WHERE actif = true " + filtreDep + "" + filtreGroupe + "" + filtreEquipe + " order by r_personnel.id_pers";

        }
        // ////console.log("sql=====>" + sql);

        /*if (option.dossier != "" & option.departement != "") {
         sql = "SELECT distinct(r_personnel.id_pers) as id_util, appelation FROM r_personnel"+
         " LEFT JOIN p_affectation ON p_affectation.id_pers = r_personnel.id_pers"+
         " LEFT JOIN r_departement ON r_departement.id = r_affectation.id_departement"+

         " WHERE actif = true AND p_affectation.id_dossier = " +option.dossier+ " AND r_affectation.id_departement ="+option.departement+" order by r_personnel.id_pers";
         }*/


        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            var row = [];
            for (var i = 0; i < res.length; i++) {
                row[i]['id_util'] = res.rows[i].id_util;
                var opt = [];
                opt.idPers = row[i]['id_util'];
                opt.datecible = option.datecibl;
                row[i]['statutName'] = Ldt.pointageParIdDate(opt, callback);
            }
            return callback(null, res.rows);
        });

    },

    listeConnectedPt: function (option, callback) {
        var sql = "SELECT distinct(r_personnel.id_pers) as id_util, appelation FROM r_personnel" +
                " LEFT JOIN r_departement ON r_departement.id = r_personnel.id_departement" +
                " LEFT JOIN r_groupe ON r_personnel.id_pers = r_groupe.id_pers" +
                " WHERE actif = true pdate='" + option.datecible + "'  order by r_personnel.id_pers";




        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    listeConnectedPointage: function (option, callback) {
        var sql = "SELECT distinct(id_util) from r_pointage where pdate='" + option.datecible + "' order by id_util";




        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    listeConnectedGPAO: function (option, callback) {
        var sql = "select * from p_logon where connected=true  AND (now()-last_connected_time) < '00:01:00'";




        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    heureLdt: function (option, callback) {
        var sqlDoss = "";
        if (option.dossier != '') {
            sqlDoss = ' AND p_dossier.id_dossier=' + option.dossier + ' ';
        }
        var sql = "SELECT p_ldt.id_pers, " +
                "SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, " +
                "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
                + "p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib, p_dossier.id_dossier,p_ldt.id_type_ldt "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 AND p_ldt.date_deb_ldt = '" + option.datecible.replace('/', '').replace('/', '').substr(0, 8) + "' " + sqlDoss + ''
                + "group by p_ldt.id_pers, p_dossier.id_dossier,p_ldt.id_type_ldt, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },
    JourLdt: function (option, callback) {
        var sql = "SELECT p_ldt.id_pers, " +
                "SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, " +
                "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,"
                + "from p_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 AND to_date(date_deb_ldt,'yyyymmdd') between to_date('20160808','yyyymmdd') and to_date('20160907','yyyymmdd')"
                + "group by p_ldt.id_pers order by  p_ldt.id_pers";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Get dossier with quantity***************/
    dossierByDate: function (option, callback) {
        var sql = "SELECT p_dossier.num_dossier, " +
                "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 AND p_ldt.date_deb_ldt = '" + option.datecible.replace('/', '').replace('/', '').substr(0, 8) + "' "
                + "group by p_dossier.num_dossier order by p_dossier.num_dossier";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Get dossier Almerys with nb pers***************/
    dossierAlmConnectedByDate: function (option, callback) {
        var sql = "SELECT p_dossier.num_dossier, " +
                "Count(distinct(r_personnel.id_pers)) as pers "
                + "from p_ldt "
                + "JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "JOIN p_logon ON r_personnel.id_pers=p_logon.id_pers "
                + "where 1=1 AND p_ldt.date_deb_ldt = '" + option.datecible.replace('/', '').replace('/', '').substr(0, 8) + "' AND connected = true AND p_dossier.num_dossier LIKE '%ALM%' "
                + "group by p_dossier.num_dossier order by p_dossier.num_dossier";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Get dossier Classique with nb pers***************/
    dossierClassConnectedByDate: function (option, callback) {
        var sql = "SELECT p_dossier.num_dossier, " +
                "Count(distinct(r_personnel.id_pers)) as pers "
                + "from p_ldt "
                + "JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "JOIN p_logon ON r_personnel.id_pers=p_logon.id_pers "
                + "where 1=1 AND p_ldt.date_deb_ldt = '" + option.datecible.replace('/', '').replace('/', '').substr(0, 8) + "' AND connected = true AND p_dossier.num_dossier NOT LIKE '%ALM%' "
                + "group by p_dossier.num_dossier order by p_dossier.num_dossier";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Get connected with quantity***************/
    connectedByDate: function (option, callback) {
        var sql = "SELECT p_ldt.id_pers, " +
                "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "JOIN p_logon ON r_personnel.id_pers=p_logon.id_pers "
                + "where 1=1 AND p_ldt.date_deb_ldt = '" + option.datecible.replace('/', '').replace('/', '').substr(0, 8) + "'  AND connected = true "
                + "group by p_ldt.id_pers order by p_ldt.id_pers";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Get connected with quantity***************/
    connectedByDateDossier: function (option, callback) {
        var sql = "SELECT p_ldt.id_pers, " +
                "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 AND p_ldt.date_deb_ldt = '" + option.dateDebut.replace('/', '').replace('/', '').substr(0, 8) + "' AND p_ldt.id_dossier=" + option.dossier + " "
                + "group by p_ldt.id_pers order by p_ldt.id_pers";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Get etape with quantity***************/
    etapeByDateDossier: function (option, callback) {
        var sql = "SELECT p_etape.libelle, " +
                "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err "
                + "from p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + "where 1=1 AND p_ldt.date_deb_ldt = '" + option.dateDebut.replace('/', '').replace('/', '').substr(0, 8) + "' AND p_ldt.id_dossier=" + option.dossier + " "
                + "group by p_etape.libelle order by p_etape.libelle";
        //////console.log("sql=====>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Get etape with quantity by id_pers***************/
    /*etapeByPersDossier: function(option, callback) {
     var sql = "SELECT p_etape.libelle, " +
     "sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err "
     +"from p_ldt "
     +"LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
     +"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
     +"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
     +"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
     +"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
     +"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
     +"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
     +"where 1=1 AND p_ldt.date_deb_ldt = '"+ option.dateDebut.replace('/','').replace('/','').substr(0,8) +"' AND p_ldt.id_dossier="+ option.dossier + " AND p_ldt.id_pers="+
     option.id_pers+" "
     +"group by p_etape.libelle order by p_etape.libelle";
     ////console.log("sql=====>"+sql);

     Ldt.query(sql, function (err, res) {
     if (err) return callback(err);
     return callback(null, res.rows);
     });

     },*/

    /*************send Socket managment with quantity vitesse etape ***************/
    socketBlastManagment: function (option, callback) {
        /*var sync = require('synchronize');
        var sql = "SELECT * from p_dossier where id_etat = 0";
        var dateess = new Date().toISOString().replace(/-/, '/').replace(/-/, '/').substr(0, 10);
        var datedeb = dateess.replace('/', '').replace('/', '').substr(0, 8);
        var asyncTasks = [];
        Ldt.query(sql, function (err, result) {
            if (err) {
                console.log(err);
                return callback(err)
            } else {
                //////console.log(result);

                sync.fiber(function () {
                    result.rows.forEach(function (d) {

                        var doss = d.id_dossier;
                        var dossier = d;
                        var etapes = [];
                        var vop = [];

                        Ldt.query('select id_lien, p_etape.libelle, p_lien_oper_dossier.vitesse, p_lien_oper_dossier.quantite_journalier from p_lien_oper_dossier LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape WHERE id_dossier = ' + doss + ' order by id_lien', function (eror, test) {

                            if (eror) {
                                ////console.log('erreur 2018');
                                //return res.send('erreur 2018');
                            } else {
                                //////console.log( test.length() );

                                // return res.send(test);

                                //return res.ok(retval);
                                etapes = test.rows;

                                var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
                                        + " p_dossier.num_dossier as num, p_etape.libelle, p_type_ldt.libelle as lib"
                                        + " from p_ldt"
                                        + " LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
                                        + " LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
                                        + " LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
                                        + " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
                                        + " LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
                                        + " LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
                                        + " LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
                                        + " where 1=1 AND p_ldt.id_dossier = " + doss + " AND date_deb_ldt='" + datedeb + "'  "
                                        + "group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

                                Ldt.query(sql, function (er, vops) {
                                    if (er) {
                                        ////console.log('erreur vop');
                                        //return res.send('erreur vop');
                                    } else {
                                        //envoi des socket
                                        vop = vops.rows;
                                        sails.sockets.blast("" + doss + datedeb + "man", {vop: vop, dossier: dossier, etapes: etapes});
                                        //////console.log("blast:" + doss + datedeb + "man");

                                    }
                                });
                            }
                        });

                    });//fin forEach

                    return callback(null, null);


                });

            }
        });*/


    },

    /*************essai cron ***************/
    cronn: function (option, callback) {
        ////console.log("mande");
        return callback(null, 4);

    },

    /*************Suivis Heure op ***************/

    suiviHeureOP: function (option, callback) {
        // selection OP
        // somme heure op pendant la periode
        // ajout dossier si possible

        // requete modifier pour le calcul de candence + trie par dossier
        var sql = "select SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as somme" +
                ",  sum(to_number('0'||quantite,'99999')) as qte," +
                " p_ldt.id_pers, id_type_ldt,p_dossier.num_dossier as dossier," +
                " r_personnel.appelation," +
                "p_ldt.h_fin,p_ldt.h_deb"
                + " FROM p_ldt "
                + " LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers "
                + " LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier "
                + " where 1=1 "
                + " AND p_ldt.date_deb_ldt = '" + option.datecible + "'	AND p_ldt.id_pers =  " + option.matricule + " "
                + " GROUP BY p_ldt.id_pers,  r_personnel.appelation, id_type_ldt,p_ldt.h_fin,p_ldt.h_deb,p_dossier.num_dossier" +
                " order by p_ldt.id_pers, p_dossier.num_dossier, id_type_ldt ";

      //console.log(sql);

        Ldt.query(sql, function (err, res) {
            if (err){

              console.log(err);
              return callback(err);
            }else{

              ////console.log(res);
              return callback(null, res.rows);
            }
        });

    },

    /*************Vitesse par dossier etape op ***************/

    VitesseOP: function (option, callback) {
        // selection OP
        // somme heure op pendant la periode
        // ajout dossier si possible

        // requete modifier pour le calcul de candence + trie par dossier
        var sql = "SELECT p_ldt.id_pers," +
                " SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree," +
                " sum(to_number('0'||quantite,'99999')) as qte,p_ldt.id_type_ldt," +
                " p_dossier.id_dossier,p_dossier.num_dossier as num, p_etape.libelle,p_etape.id_etape, p_type_ldt.libelle as lib" +
                " from p_ldt" +
                " LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier" +
                " LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient" +
                " LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien" +
                " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape" +
                " LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat" +
                " LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt" +
                " LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers" +
                " where 1=1  AND p_ldt.date_deb_ldt = '" + option.datecible + "'	AND p_ldt.id_pers =  " + option.matricule + " " +
                " group by p_ldt.id_pers," +
                " p_dossier.num_dossier," +
                " p_dossier.id_dossier," +
                " p_type_ldt.libelle,p_ldt.id_type_ldt," +
                " p_etape.libelle,p_etape.id_etape" +
                " order by  p_ldt.id_pers," +
                " p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    /*************Evolution du vitesse des  op ***************/

    evolutionVitesse: function (option, callback) {

        var date = (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8);
        var dateJmoins1 = (date - 100) + "," + date;
        var sql = "select p_ldt.date_deb_ldt," +
                " SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as somme," +
                " sum(to_number('0'||quantite,'99999')) as qte" +
                " FROM p_ldt " +
                " where 1=1 AND p_ldt.date_deb_ldt > '" + dateJmoins1 + "'" +
                " AND p_ldt.id_pers = " + option.matricule + "" +
                " GROUP BY p_ldt.date_deb_ldt" +
                " order by p_ldt.date_deb_ldt";

        // ////console.log("jmoins1==================>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

    getLdtOstie: function (option, callback) {
        var date = (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8);
        var sql = "select count(*) as ct" +
                " FROM p_ldt " +
                " where 1=1 AND date_deb_ldt = '" + date + "' AND id_etat=1 AND id_type_ldt=11" +
                " AND id_pers = " + option + "";

        //////console.log("ldtOstie==================>" + sql);

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows[0].ct);
        });

    },

    getLdtOneOp: function (option, callback) {
        var date = (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8);
        var sql = "SELECT p_ldt.id_ldt, p_ldt.id_lot, p_ldt.id_dossier, p_ldt.machine, p_ldt.date_deb_ldt,p_ldt.date_fin_ldt, r_personnel.appelation, r_personnel.matricule, p_dossier.num_dossier,p_etape.libelle as lib, p_ldt.commentaire, p_type_ldt.libelle as type, p_ldt.h_deb, p_ldt.h_fin, p_ldt.quantite, p_ldt.nbre_erreur, p_etat.libelle as statu, p_lot.libelle as liblot, p_lot_client.libelle as liblotclient, "
                + "DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp ) as duree , p_lot_client.libelle as ldg FROM p_ldt "
                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
                + "LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot "
                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers  "
                + "WHERE 1=1 AND p_ldt.date_deb_ldt = '" + date + "' AND p_ldt.id_pers = " + option + " "
                + "order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";


        //////console.log("ldtOne==================>" + sql+"****fin sql");

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });

    },

////<<<<<<< HEAD
//    getLdtOneByOp: function (option, callback) {
//        // var date = (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8);
//        var sql = "SELECT p_ldt.id_ldt, p_ldt.id_lot, p_ldt.id_dossier, p_ldt.machine, p_ldt.date_deb_ldt,p_ldt.date_fin_ldt, r_personnel.appelation, r_personnel.matricule, p_dossier.num_dossier,p_etape.libelle as lib, p_ldt.commentaire, p_type_ldt.libelle as type, p_ldt.h_deb, p_ldt.h_fin, p_ldt.quantite, p_ldt.nbre_erreur, p_etat.libelle as statu, p_lot.libelle as liblot, p_lot_client.libelle as liblotclient, "
//                + "DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp ) as duree , p_lot_client.libelle as ldg FROM p_ldt "
//                + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
//                + "LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot "
//                + "LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
//                + "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
//                + "LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
//                + "LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
//                + "LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
//                + "LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers  "
//                + "WHERE 1=1 AND p_ldt.date_deb_ldt = '" + option.date + "' AND p_ldt.id_pers = " + option.id_pers + " "
//                + "order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle";
//=======
  getLdtOneByOp: function (option, callback) {
   var date = option.date.replace('/', '').replace('/', '').substr(0, 8);
    var sql = "SELECT p_ldt.id_ldt, p_ldt.id_lot, p_ldt.id_dossier, p_ldt.machine, p_ldt.date_deb_ldt,p_ldt.date_fin_ldt, r_personnel.appelation, r_personnel.matricule, p_dossier.num_dossier,p_etape.libelle as lib, p_ldt.commentaire, p_type_ldt.libelle as type, p_ldt.h_deb, p_ldt.h_fin, p_ldt.quantite, p_ldt.nbre_erreur, p_etat.libelle as statu, p_lot.libelle as liblot, p_lot_client.libelle as liblotclient, "
      + " CASE WHEN p_ldt.date_deb_ldt is null or p_ldt.date_fin_ldt is null THEN 0 ELSE EXTRACT(EPOCH FROM (TO_TIMESTAMP(concat_ws(' ', p_ldt.date_fin_ldt, p_ldt.h_fin), 'YYYYMMDD HH24:MI:SS')-TO_TIMESTAMP(concat_ws(' ', p_ldt.date_deb_ldt, p_ldt.h_deb), 'YYYYMMDD HH24:MI:SS'))) END as duree , p_lot_client.libelle as ldg FROM p_ldt "
      + "LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier "
      +"LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot "
      +"LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient "
      +"LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien "
      +"LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape "
      +"LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat "
      +"LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt "
      +"LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers  "
      +"WHERE 1=1 AND p_ldt.date_deb_ldt = '" + date + "' AND p_ldt.id_pers = " + option.id_pers + " "
      + "order by  p_ldt.h_deb asc ";


    //console.log("ldtOne==================>" + sql+"****fin sql");

    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });

  },

  getOneLdt: function (option, callback) {
    // var date = (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8);
    var sql = "SELECT p_ldt.id_ldt, p_ldt.id_dossier, p_ldt.date_deb_ldt,p_ldt.date_fin_ldt, " +
      "r_personnel.appelation, r_personnel.matricule, p_dossier.num_dossier,p_etape.libelle as lib," +
      "p_etape.id_etape as etape, p_ldt.commentaire, p_type_ldt.libelle as type, p_ldt.h_deb, " +
      "p_ldt.h_fin, p_ldt.quantite, p_ldt.nbre_erreur, p_etat.libelle as statu, p_ldt.machine ," +
      "tb_neocles_ldt.id_ldt_neocles,tb_neocles_ldt.intervenant,tb_neocles_ldt.beneficiaire,tb_neocles_ldt.ticket," +
      "tb_neocles_ldt.action,tb_neocles_ldt.information,tb_neocles_ldt.pilote," +
      "tb_neocles_ldt.interlocuteur,tb_neocles_ldt.type,tb_neocles_ldt.comportement,tb_neocles_ldt.societe," +
      "tb_neocles_ldt. description FROM p_ldt LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier" +
      " LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient " +
      "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien" +
      " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape" +
      " LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat" +
      "  LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt" +
      " LEFT JOIN tb_neocles_ldt on tb_neocles_ldt.id_ldt = p_ldt.id_ldt" +
      " LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers WHERE p_ldt.id_ldt= "+option.id_ldt;


    ////console.log("ldtOne==================>" + sql+"****fin sql");

    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);

      var str = "";
      for(var i=0;i<res.rows.length;i++){
        str = res.rows[i]['num_dossier'] + "|" + res.rows[i]['lib'] + "|" + res.rows[i]['h_deb'] + "|" + res.rows[i]['h_fin'] + "|" + res.rows[i]['quantite'] + "|" + res.rows[i]['nbre_erreur'] + "|" + res.rows[i]['statu'] + "|" + res.rows[i]['matricule'] + "|" + res.rows[i]['id_dossier'] + "|" + res.rows[i]['date_deb_ldt'] + "|" + res.rows[i]['date_fin_ldt'] + "|" + res.rows[i]['machine'] + "|" + res.rows[i]['etape'] + "|" +
          "" + option.id_pers;
        str += "|" ; //ajouter pour etre prise lors de la modification de dossier
        str += "{" + res.rows[i]['intervenant'] + "{" + res.rows[i]['beneficiaire'] + "{" + res.rows[i]['ticket'] + "{" + res.rows[i]['action'] + "{" + res.rows[i]['information'] + "{" + res.rows[i]['pilote'] + "{" + res.rows[i]['interlocuteur'] + "{" + res.rows[i]['type'] + "{" + res.rows[i]['comportement'] + "{" + res.rows[i]['societe'] + "{" + res.rows[i]['description'] + "{" + res.rows[i]['id_ldt_neocles'];

      }
      return callback(null, str);
    });

  },

  getRang: function (option, callback) {
    var sql = "select * from p_vitesse where date_deb_ldt = '"+option.date+"' AND  " +
      "id_dossier = "+option.id_dossier+" AND id_etape = "+option.id_etape+" " +
      "order by COALESCE( NULLIF(vitesse,null) , '0' ) desc,duree asc ";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
getJsonRang: function (option, callback) {
    var sql = "select id_pers from p_vitesse where date_deb_ldt = '"+option.date+"' " +
      "AND  id_dossier = "+option.id_dossier+" AND id_etape = "+option.id_etape+"  " +
      "order by COALESCE( NULLIF(vitesse,null) , '0' ) desc,duree asc ";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);

      // get rang sous forme de tableau de string
      var data = [];
      for (var i = 0; i<res.rows.length;i++){
        data.push(res.rows[i].id_pers);
      }
      return callback(null, data);
    });
  },

  getDossier: function (option, callback) {
    var sql = "SELECT * from p_dossier where id_dossier="+option.dossier;
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows[0]);
    });
  },

  getEtape: function (option, callback) {
    var sql = "select id_lien, p_etape.libelle, p_etape.id_etape, p_lien_oper_dossier.vitesse, p_lien_oper_dossier.quantite_journalier from p_lien_oper_dossier" +
      " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
      "WHERE id_dossier = "+option.dossier+" order by id_lien";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },

  getVop: function (option, callback) {
    var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
      +" p_dossier.num_dossier as num, p_etape.libelle, p_etape.id_etape, p_type_ldt.libelle as lib"
      +" from p_ldt"
      +" LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
      +" LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
      +" LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
      +" LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
      +" LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
      +" LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
      +" LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
      +" where 1=1 AND p_ldt.id_dossier = "+option.dossier+" AND date_deb_ldt='"+option.datedeb+"'  "+option.matrSql+" "
      +"group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.id_etape, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getDoss: function (option, callback) {
    var sql = "select sum(to_number('0'||quantite,'99999')) as qte" +
      ",SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree" +
      " from p_ldt where id_dossier="+option.dossier;

    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  // Getting heure de production by id and by date

  getHprod: function (option, callback) {
    var sql = "SELECT * " +
      " FROM prod_gpao " +
      " WHERE " +
      " date_deb_ldt = '"+option.date+"' " +
      " AND id_pers = "+option.id_pers;
    ////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      if(res.rows.length != 0){
        return callback(null, res.rows[0]);
      }else{
        return callback(null, {});
      }

    });
  },

  updatePldt: function (option, callback) {
    var sql = "UPDATE p_ldt SET h_deb='" + option.deb + "'";

    sql += ", h_fin='" + option.fin + "'";
    sql += ", quantite='" + option.qt + "'";
    sql += ", nbre_erreur='" + option.err + "'";
    sql += ", date_deb_ldt='" + option.dDeb + "'";
    sql += ", date_fin_ldt='" + option.dFin + "'";
    sql += ", machine='" + option.com + "'";
    if (option.stat != "")
      sql += ", id_etat=" + option.stat;
    sql += " WHERE id_ldt=" + option.id;
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, true);
    });
  },

  updateHistoriquePldt: function (option, callback) {
    var sql = "UPDATE p_ldt SET h_deb='" + option.deb + "'";

    sql += ", h_fin='" + option.fin + "'";
    sql += ", quantite='" + option.qt + "'";
    sql += ", nbre_erreur='" + option.err + "'";
    sql += ", date_deb_ldt='" + option.dDeb + "'";
    sql += ", date_fin_ldt='" + option.dFin + "'";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, true);
    });
  },
//>>>>>>> c74b70d06c189fd1efa13cda38f10b84c223f306


        //////console.log("ldtOne==================>" + sql+"****fin sql");
//
//        Ldt.query(sql, function (err, res) {
//            if (err)
//                return callback(err);
//            return callback(null, res.rows);
//        });
//
//    },

    getOneLdt: function (option, callback) {
        // var date = (new Date().toISOString()).replace(/-/, '').replace(/-/, '').substr(0, 8);
 var sql = "SELECT p_ldt.id_ldt, p_ldt.id_dossier, p_ldt.date_deb_ldt,p_ldt.date_fin_ldt, " +
                "r_personnel.appelation, r_personnel.matricule, p_dossier.num_dossier,p_etape.libelle as lib," +
                " p_etape.id_etape as etape, p_ldt.commentaire, p_type_ldt.libelle as type, p_ldt.h_deb, " +
                " p_ldt.h_fin, p_ldt.quantite, p_ldt.nbre_erreur, p_etat.libelle as statu" +
                " FROM p_ldt LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier" +
                " LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient " +
                "LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien" +
                " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape" +
                " LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat" +
                "  LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt" +
                " LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers WHERE p_ldt.id_ldt= " + option.id_ldt;


        ////console.log("ldtOne==================>" + sql + "****fin sql");

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);

            var str = "";
            for (var i = 0; i < res.rows.length; i++) {
                str = res.rows[i]['num_dossier'] + "|" + res.rows[i]['lib'] + "|" + res.rows[i]['h_deb'] + "|" + res.rows[i]['h_fin'] + "|" + res.rows[i]['quantite'] + "|" + res.rows[i]['nbre_erreur'] + "|" + res.rows[i]['statu'] + "|" + res.rows[i]['matricule'] + "|" + res.rows[i]['id_dossier'] + "|" + res.rows[i]['date_deb_ldt'] + "|" + res.rows[i]['date_fin_ldt'] + "|" + res.rows[i]['machine'] + "|" + res.rows[i]['etape'] + "|" +
                        "" + option.id_pers;
                str += "|"; //ajouter pour etre prise lors de la modification de dossier
                str += "{" + res.rows[i]['intervenant'] + "{" + res.rows[i]['beneficiaire'] + "{" + res.rows[i]['ticket'] + "{" + res.rows[i]['action'] + "{" + res.rows[i]['information'] + "{" + res.rows[i]['pilote'] + "{" + res.rows[i]['interlocuteur'] + "{" + res.rows[i]['type'] + "{" + res.rows[i]['comportement'] + "{" + res.rows[i]['societe'] + "{" + res.rows[i]['description'] + "{" + res.rows[i]['id_ldt_neocles'];

            }
            return callback(null, str);
        });

    },

    getRang: function (option, callback) {
        var sql = "select * from p_vitesse where date_deb_ldt = '" + option.date + "' AND  " +
                "id_dossier = " + option.id_dossier + " AND id_etape = " + option.id_etape + " " +
                "order by COALESCE( NULLIF(vitesse,null) , '0' ) desc,duree asc ";
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });
    },
    getJsonRang: function (option, callback) {
        var sql = "select id_pers from p_vitesse where date_deb_ldt = '" + option.date + "' " +
                "AND  id_dossier = " + option.id_dossier + " AND id_etape = " + option.id_etape + "  " +
                "order by COALESCE( NULLIF(vitesse,null) , '0' ) desc,duree asc ";
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);

            // get rang sous forme de tableau de string
            var data = [];
            for (var i = 0; i < res.rows.length; i++) {
                data.push(res.rows[i].id_pers);
            }
            return callback(null, data);
        });
    },

    getDossier: function (option, callback) {
        var sql = "SELECT * from p_dossier where id_dossier=" + option.dossier;
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows[0]);
        });
    },

    getEtape: function (option, callback) {
        var sql = "select id_lien, p_etape.libelle, p_etape.id_etape, p_lien_oper_dossier.vitesse, p_lien_oper_dossier.quantite_journalier from p_lien_oper_dossier" +
                " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape " +
                "WHERE id_dossier = " + option.dossier + " order by id_lien";
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });
    },

    getVop: function (option, callback) {
        var sql = "SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte,"
                + " p_dossier.num_dossier as num, p_etape.libelle, p_etape.id_etape, p_type_ldt.libelle as lib"
                + " from p_ldt"
                + " LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier"
                + " LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient"
                + " LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien"
                + " LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape"
                + " LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat"
                + " LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt"
                + " LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers"
                + " where 1=1 AND p_ldt.id_dossier = " + option.dossier + " AND date_deb_ldt='" + option.datedeb + "'  " + option.matrSql + " "
                + "group by p_ldt.id_pers, p_dossier.num_dossier, p_type_ldt.libelle, p_etape.id_etape, p_etape.libelle order by  p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle "

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });
    },
    getDoss: function (option, callback) {
        var sql = "select sum(to_number('0'||quantite,'99999')) as qte" +
                ",SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree" +
                " from p_ldt where id_dossier=" + option.dossier;

        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, res.rows);
        });
    },
    // Getting heure de production by id and by date

    getHprod: function (option, callback) {
        var sql = "SELECT * " +
                " FROM prod_gpao " +
                " WHERE " +
                " date_deb_ldt = '" + option.date + "' " +
                " AND id_pers = " + option.id_pers;
        ////console.log(sql);
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            if (res.rows.length != 0) {
                return callback(null, res.rows[0]);
            } else {
                return callback(null, {});
            }

        });
    },

    updatePldt: function (option, callback) {
        var sql = "UPDATE p_ldt SET h_deb='" + option.deb + "'";

        sql += ", h_fin='" + option.fin + "'";
        sql += ", quantite='" + option.qt + "'";
        sql += ", nbre_erreur='" + option.err + "'";
        sql += ", date_deb_ldt='" + option.dDeb + "'";
        sql += ", date_fin_ldt='" + option.dFin + "'";
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, true);
        });
    },

    updateHistoriquePldt: function (option, callback) {
        var sql = "UPDATE p_ldt SET h_deb='" + option.deb + "'";

        sql += ", h_fin='" + option.fin + "'";
        sql += ", quantite='" + option.qt + "'";
        sql += ", nbre_erreur='" + option.err + "'";
        sql += ", date_deb_ldt='" + option.dDeb + "'";
        sql += ", date_fin_ldt='" + option.dFin + "'";
        Ldt.query(sql, function (err, res) {
            if (err)
                return callback(err);
            return callback(null, true);
        });
    },

  // For almerys reporting

  getLdtBySpec: function (option, callback) {
    var sql = "select SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp ))/3600 as duree," +
     // " to_number('0' || SUM(to_number('0'||quantite,'99999.9')),'99999') as qte," +
      " SUM(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte, "+
      "p_ldt.id_pers,r_departement.libelle " +
      "from p_ldt " +
      " join r_personnel on p_ldt.id_pers = r_personnel.id_pers " +
      " join r_departement on r_departement.id = r_personnel.id_departement " +
      "where id_dossier = "+option.id_dossier+" " +
      "AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd') " +
      "AND id_type_ldt=0 " +
      "group by p_ldt.id_pers,r_departement.libelle " +
      "order by p_ldt.id_pers,r_departement.libelle";
    console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },

  getLdtBySSpec: function (option, callback) {
      var where = "";
      if(option.id_ssp!=null && option.id_ssp!=""){
        where += " AND almerys_lien_ss_spe.id_alm_ss_spe="+option.id_ssp+" ";
      }

      if(option.id_ssp2!=null && option.id_ssp2!=""){
        where += " AND almerys_lien_ss_spe.id_lien_ss_spe2="+option.id_ssp2+" ";
      }
      // SAVE SQL
/*    var sql = "select DISTINCT SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp ))/3600 as duree," +
      " SUM(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte, " +
      " p_ldt.id_pers " +
      "from p_ldt " +
      "LEFT join almerys_lien_ss_spe ON p_ldt.id_ldt= almerys_lien_ss_spe.id_ldt " +
      "where p_ldt.id_lotclient = "+option.id_lotclient+" " +where+
      "AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd')  " +
      "AND id_type_ldt=0 " +
      "group by almerys_lien_ss_spe.id_almerys,p_ldt.id_pers " +
      "order by p_ldt.id_pers";*/
    var sql = "select DISTINCT SUM(DATE_PART('epoch', to_timestamp(p_ldt.date_fin_ldt||' '||p_ldt.h_fin, 'YYYYMMDD HH24:MI:SS') - " +
      " to_timestamp(p_ldt.date_deb_ldt||' '||p_ldt.h_deb, 'YYYYMMDD HH24:MI:SS') ))/3600 as duree," +
      " SUM(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte, " +
      " p_ldt.id_pers " +
      "from p_ldt " +
      "LEFT join almerys_lien_ss_spe ON p_ldt.id_ldt= almerys_lien_ss_spe.id_ldt " +
      "where " +
      "p_ldt.id_lotclient = "+option.id_lotclient+" " +
      "" +where+
      //"AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd')  " +
      " AND date_deb_ldt = '"+option.datedeb+"' " +
      //" AND date_deb_ldt >= '"+option.datedeb+"' AND date_deb_ldt <= '"+option.datefin+"' " +
      "AND id_type_ldt=0 " +
      "group by almerys_lien_ss_spe.id_almerys,p_ldt.id_pers " +
      "order by p_ldt.id_pers";
      // FORCE ADD BY RONNY  ---> ALM CQ SEULEMENT
      if(option.id_lotclient == "35-cible")
      {
        // EXECUTE REQUETE CIBLEE ONLY CQ

        sql = "select DISTINCT SUM(DATE_PART('epoch', to_timestamp(p_ldt.date_fin_ldt||' '||p_ldt.h_fin, 'YYYYMMDD HH24:MI:SS') -" +
          "  to_timestamp(p_ldt.date_deb_ldt||' '||p_ldt.h_deb, 'YYYYMMDD HH24:MI:SS') ))/3600 as duree," +
          " SUM(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte, " +
          " p_ldt.id_pers " +
          "from p_ldt " +
          "LEFT join almerys_lien_ss_spe ON p_ldt.id_ldt= almerys_lien_ss_spe.id_ldt " +
          "LEFT JOIN almerys_ss_spe2 ON almerys_lien_ss_spe.id_lien_ss_spe2 = almerys_ss_spe2.id " +
        //  "where p_ldt.id_lotclient = "+option.id_lotclient+" " +where+
          "where p_ldt.id_dossier = 35 AND REGEXP_REPLACE(UPPER(almerys_ss_spe2.libelle), '\\s+$', '') = 'CIBLE' " +
          //"AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd')  " +
          " AND date_deb_ldt = '"+option.datedeb+"' " +
          "AND id_type_ldt=0 " +
          "group by almerys_lien_ss_spe.id_almerys,p_ldt.id_pers " +
          "order by p_ldt.id_pers";
      }
      console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },

  getLdtBySSpecOld: function (option, callback) {
    var sql = "select  SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp ))/3600 as duree,to_number('0' || SUM(to_number('0'||quantite,'99999.9')),'99999') as qte,id_pers " +
      "from p_ldt " +
      "where id_lotclient = "+option.id_lotclient+" " +
      "AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd')  " +
      "AND id_type_ldt=0 " +
      "group by id_pers " +
      "order by id_pers";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },
  getLdtBySSpecHp: function (option, callback) {

    var where = "";
    if(option.id_ssp!=null && option.id_ssp!=""){
      where += " AND almerys_lien_ss_spe.id_alm_ss_spe="+option.id_ssp+" ";
    }

    if(option.id_ssp2!=null && option.id_ssp2!=""){
      where += " AND almerys_lien_ss_spe.id_lien_ss_spe2="+option.id_ssp2+" ";
    }
    var sql = "select DISTINCT SUM(DATE_PART('epoch', to_timestamp(p_ldt.date_fin_ldt||' '||p_ldt.h_fin, 'YYYYMMDD HH24:MI:SS') - " +
      " to_timestamp(p_ldt.date_deb_ldt||' '||p_ldt.h_deb, 'YYYYMMDD HH24:MI:SS') ))/3600 as duree," +
      //" to_number('0' || SUM(to_number('0'||quantite,'99999.9')),'99999') as qte,p_ldt.id_pers   " +
      " SUM(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte, " +
      " p_ldt.id_pers   " +
      "from p_ldt " +
      "LEFT join almerys_lien_ss_spe ON p_ldt.id_ldt= almerys_lien_ss_spe.id_ldt " +
      "where p_ldt.id_lotclient = "+option.id_lotclient+" " +where+
/*      "where " +
      " p_ldt.id_dossier = 721"+
      //"p_ldt.id_lotclient = "+option.id_lotclient+" " +
      "" +where+*/
      //"AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd') " +
      " AND date_deb_ldt = '"+option.datedeb+"' " +
      //" AND date_deb_ldt >= '"+option.datedeb+"' AND date_deb_ldt <= '"+option.datefin+"' " +
      "AND id_type_ldt <> 0 " +
      "group by almerys_lien_ss_spe.id_almerys,p_ldt.id_pers " +
      "order by p_ldt.id_pers";

    // FORCE ADD BY RONNY  ---> ALM CQ SEULEMENT
    if(option.id_lotclient == "35-cible")
    {
      // EXECUTE REQUETE CIBLEE ONLY CQ

      sql =  "select DISTINCT SUM(DATE_PART('epoch', to_timestamp(p_ldt.date_fin_ldt||' '||p_ldt.h_fin, 'YYYYMMDD HH24:MI:SS') - " +
        " to_timestamp(p_ldt.date_deb_ldt||' '||p_ldt.h_deb, 'YYYYMMDD HH24:MI:SS') ))/3600 as duree," +
        //" to_number('0' || SUM(to_number('0'||quantite,'99999.9')),'99999') as qte,p_ldt.id_pers   " +
        " SUM(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte, " +
        " p_ldt.id_pers   " +
        "from p_ldt " +
        "LEFT join almerys_lien_ss_spe ON p_ldt.id_ldt= almerys_lien_ss_spe.id_ldt " +
        "LEFT JOIN almerys_ss_spe2 ON almerys_lien_ss_spe.id_lien_ss_spe2 = almerys_ss_spe2.id " +
        "where p_ldt.id_dossier = 35 AND REGEXP_REPLACE(UPPER(almerys_ss_spe2.libelle), '\\s+$', '') = 'CIBLE' " +
       // "AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd') " +
        " AND date_deb_ldt = '"+option.datedeb+"' " +
        "AND id_type_ldt <> 0 " +
        "group by almerys_lien_ss_spe.id_almerys,p_ldt.id_pers " +
        "order by p_ldt.id_pers";
    }

    console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },

  getCqByEtat: function (option, callback) {

    var where = "";
    if(option.id_ssp!=null && option.id_ssp!=""){
      where += " AND almerys_lien_ss_spe.id_alm_ss_spe="+option.id_ssp+" ";
    }

    if(option.id_ssp2!=null && option.id_ssp2!=""){
      where += " AND almerys_lien_ss_spe.id_lien_ss_spe2="+option.id_ssp2+" ";
    }
    var sql = "select count(*) as qte,p_lot.id_pers,almerys_p_lot_new.id_etat as idet " +
      "from almerys_p_lot_new  " +
      "join p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot " +
      "LEFT join almerys_lien_ss_spe ON almerys_lien_ss_spe.id_almerys= almerys_p_lot_new.id " +
      "where p_lot.id_lotclient = "+option.id_lotclient+" " +where+
/*      "where " +
      " p_lot.id_dossier = 721"+
      //"p_ldt.id_lotclient = "+option.id_lotclient+" " +
      "" +where+*/
      //"AND to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd') " +
      " AND almerys_p_lot_new.date_deb = '"+option.datedeb+"' " +
     // " AND almerys_p_lot_new.date_deb >= '"+option.datedeb+"' AND almerys_p_lot_new.date_deb <= '"+option.datefin+"' " +
      "group by p_lot.id_pers,almerys_p_lot_new.id_etat " +
      "order by p_lot.id_pers,almerys_p_lot_new.id_etat ";
// FORCE ADD BY RONNY  ---> ALM CQ SEULEMENT
    if(option.id_lotclient == "35-cible")
    {
      // EXECUTE REQUETE CIBLEE ONLY CQ

      sql =  "select count(*) as qte,p_lot.id_pers,almerys_p_lot_new.id_etat as idet " +
        "from almerys_p_lot_new  " +
        "join p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot " +
        "LEFT join almerys_lien_ss_spe ON almerys_lien_ss_spe.id_almerys= almerys_p_lot_new.id " +
        "LEFT JOIN almerys_ss_spe2 ON almerys_lien_ss_spe.id_lien_ss_spe2 = almerys_ss_spe2.id " +
        "where almerys_p_lot_new.id_dossier = 35 AND REGEXP_REPLACE(UPPER(almerys_ss_spe2.libelle), '\\s+$', '') = 'CIBLE' " +
        //"AND to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd') " +
        " AND almerys_p_lot_new.date_deb = '"+option.datedeb+"' " +
        "group by p_lot.id_pers,almerys_p_lot_new.id_etat " +
        "order by p_lot.id_pers,almerys_p_lot_new.id_etat ";
    }
    console.log("-- SQL ETAT ---");
    console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },

  getLdtByDossier: function (option, callback) {
    var sql = "SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp ))/3600 as duree," +
     // "to_number('0' || SUM(to_number('0'||quantite,'99999.9')),'99999') as qte," +
      " SUM(CASE WHEN quantite~E'^\\\\d+$' THEN quantite::integer ELSE 0 END) as qte, "+
      " id_pers,id_lotclient " +
      "from p_ldt " +
      "where id_dossier = "+option.id_dossier+" " +
      "AND to_date(date_deb_ldt,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd')  " +
      "AND id_type_ldt=0 " +
      "group by id_pers,id_lotclient " +
      "order by id_pers,id_lotclient";
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);
      return callback(null, res.rows);
    });
  },

  getQteBydate: function (option, callback) {
  //   var mini_sql = "";
  //   if(option.tp ==0){//avant 9 h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==1){//9h - 11h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==2){//11h - 13h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('13:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==3){//11h - 13h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >= TO_TIMESTAMP('13:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') < TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==4){//+ 15h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >= TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') ";
  //   }
  //   var sql = "select count(*) as qte,p_lot.id_pers from almerys_p_lot_new "+
	// "	   join p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot "+
	// "    where (to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd')) "+mini_sql+"  AND p_lot.id_dossier="+option.id_dossier+" " +
  //     	"    group by p_lot.id_pers " +
  //     "order by p_lot.id_pers";


    var sql = `
      SELECT 
        COUNT(
          CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
        ) "m9",
        COUNT(
          CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
        ) "9_11",
        COUNT(
          CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('13:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
        ) "11_13",
        COUNT(
          CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('13:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
        ) "13_15",
        COUNT(
          CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >= TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
        ) "p15",
        p_lot.id_pers 
      FROM almerys_p_lot_new
      LEFT OUTER JOIN p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot 
      WHERE 
        ((to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') BETWEEN to_date('` + option.datedeb + `','yyyyMMdd') AND to_date('` + option.datefin + `','yyyyMMdd')) )
        AND p_lot.id_dossier= '` + option.id_dossier + `'
      GROUP BY p_lot.id_pers
    `;

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);

      return callback(null, res.rows);

    });
  },

  getVitBydate: function (option, callback) {
  //   var mini_sql = "";
  //   if(option.tp ==0){//avant 9 h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('07:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('08:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==1){//9h - 11h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('08:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==2){//11h - 13h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('09:45:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==3){//11h - 13h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >= TO_TIMESTAMP('10:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') < TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==4){//+ 15h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('11:45:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==5){//+ 15h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('12:30:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('14:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==6){//+ 15h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('14:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==7){//+ 15h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('16:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==8){//+ 15h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('16:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('17:00:00', 'HH24:MI:SS') ";
  //   }else if(option.tp ==9){//+ 15h
  //     mini_sql = " AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('17:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('18:00:00', 'HH24:MI:SS') ";
  //   }
  //   var sql = "select count(*) as qte,p_lot.id_pers from almerys_p_lot_new "+
	// "	   join p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot "+
	// "    where (to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') BETWEEN to_date('"+option.datedeb+"','yyyyMMdd') AND to_date('"+option.datefin+"','yyyyMMdd')) "+mini_sql+"  AND p_lot.id_dossier="+option.id_dossier+" " +
  //     	"    group by p_lot.id_pers " +
  //     "order by p_lot.id_pers";

    var sql = `
        SELECT 
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('07:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('08:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "7h_8h",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('08:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "8h_9h",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('09:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('09:45:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "9h_9h45",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('10:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "10h_11h",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('11:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('11:45:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "11h_11h45",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('12:30:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('14:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "12h30_14h",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('14:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "14h_15h",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('15:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('16:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "15h_16h",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('16:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('17:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "16h_17h",
          COUNT(
            CASE WHEN TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') >=  TO_TIMESTAMP('17:00:00', 'HH24:MI:SS') AND TO_TIMESTAMP(almerys_p_lot_new.h_deb, 'HH24:MI:SS') <  TO_TIMESTAMP('18:00:00', 'HH24:MI:SS') THEN almerys_p_lot_new.date_deb END
          ) "17h_18h",
          p_lot.id_pers 
        FROM almerys_p_lot_new
        LEFT OUTER JOIN p_lot on p_lot.id_lot = almerys_p_lot_new.id_lot 
        WHERE 
          ((to_date(almerys_p_lot_new.date_deb,'yyyyMMdd') BETWEEN to_date('` + option.datedeb + `','yyyyMMdd') AND to_date('` + option.datefin + `','yyyyMMdd')) )
          AND p_lot.id_dossier= '` + option.id_dossier + `'
        GROUP BY p_lot.id_pers
    `;

    //////console.log(sql);
    Ldt.query(sql, function (err, res) {
      if (err)
        return callback(err);

      return callback(null, res.rows);

    });
  },

  // recuperation de la ligne de temps
  getLdtDetourage : function (opt, next) {
      var sql = 'SELECT * FROM p_ldt,p_lien_oper_dossier WHERE id_etape=id_oper '
  },



  getDetailsSpecialite : function(options, callback) {
    var sql = `
        WITH ligne AS (
          SELECT 
            p_ldt.date_deb_ldt as debut,
            p_dossier.num_dossier as dossier,
            p_lot_client.libelle as specialite, 
            almerys_ss_spe.libelle as sous_specialite, 
            almerys_ss_spe2.libelle as sous_sous_specialite,
            (DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree,
            (cast(coalesce(nullif(p_ldt.quantite,''),'0') as integer)) as qte
            
          FROM p_ldt LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier 
          LEFT JOIN p_lot ON p_ldt.id_lot=p_lot.id_lot 
          LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient 
          LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien 
          LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape 
          LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat 
          LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt 
          LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers 
          LEFT JOIN almerys_lien_ss_spe on p_ldt.id_ldt = almerys_lien_ss_spe.id_ldt 
          LEFT JOIN almerys_ss_spe ON almerys_lien_ss_spe.id_alm_ss_spe = almerys_ss_spe.id_ss_spe 
          LEFT JOIN almerys_ss_spe2 ON almerys_lien_ss_spe.id_lien_ss_spe2 = almerys_ss_spe2.id 
          LEFT JOIN almerys_p_lot_new ON p_ldt.id_ldt = almerys_p_lot_new.id_ldt 
          LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache 
          LEFT JOIN almerys_distinction ON almerys_p_lot_new.id_distinction = almerys_distinction.id_distinction
        
          WHERE 
            p_ldt.date_fin_ldt >= $1 AND p_ldt.date_fin_ldt <= $2
            AND p_dossier.id_dossier = 35
            AND p_ldt.id_type_ldt = 0
        
          GROUP BY p_ldt.date_deb_ldt ,
              p_dossier.num_dossier ,
              p_lot_client.libelle , 
              almerys_ss_spe.libelle , 
              almerys_ss_spe2.libelle,
              (DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )),
              p_ldt.quantite
        
          ORDER BY dossier, specialite, sous_specialite, sous_sous_specialite
        )
        
        SELECT 
          ligne.debut,
          ligne.dossier,
          ligne.specialite,
          ligne.sous_specialite,
          ligne.sous_sous_specialite,
          sum(ligne.duree) as "sum_duree",
          sum(ligne.qte) as "sum_qte"
        FROM ligne
        GROUP BY 
          ligne.debut,
          ligne.dossier,
          ligne.specialite,
          ligne.sous_specialite,
          ligne.sous_sous_specialite
        ORDER BY debut, dossier, specialite, sous_specialite, sous_sous_specialite
    `;

    Ldt.query(sql, [options.dateDebut, options.dateFin],
      (err, res) => {
        if(err) return callback(err, null);

        return callback(null, res.rows);
      }
    );
  }

};
