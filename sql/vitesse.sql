select SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as somme,
	sum(to_number('0'||quantite,'99999')) as qte,
	p_ldt.id_pers, id_type_ldt,
	p_dossier.num_dossier as dossier,
	r_personnel.appelation,
	p_ldt.h_fin,p_ldt.h_deb
	FROM p_ldt
	LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
	LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier
	where 1=1
	AND p_ldt.date_deb_ldt = '20160908'
	AND p_ldt.id_dossier = 29
	GROUP BY p_ldt.id_pers, r_personnel.appelation, id_type_ldt,p_ldt.h_fin,p_ldt.h_deb,p_dossier.num_dossier
	order by p_ldt.id_pers, p_dossier.num_dossier, id_type_ldt



/*par dossier et par etape , plage de date*/
select SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as somme,
	sum(to_number('0'||quantite,'99999')) as qte,id_type_ldt,
	p_dossier.num_dossier as dossier,
	r_personnel.appelation,
	date_deb_ldt
	FROM p_ldt
	LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
	LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier
	where 1=1
	AND to_date(date_deb_ldt,'yyyymmdd') between to_date('20160909','yyyymmdd') and to_date('20160909','yyyymmdd')
	AND p_ldt.id_dossier = 484
	AND p_ldt.id_etape = 45
	AND p_ldt.id_pers = 509
	GROUP BY r_personnel.appelation, id_type_ldt,p_dossier.num_dossier,date_deb_ldt
	order by p_dossier.num_dossier, id_type_ldt,date_deb_ldt




SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree,
      sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,
      p_dossier.id_dossier,
      p_dossier.num_dossier as num, p_etape.libelle,p_etape.id_etape, p_type_ldt.libelle as lib
      from p_ldt
      LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier
      LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
      LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien
      LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape
      LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat
      LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt
      LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
      where 1=1 and p_ldt.id_dossier=482
      and to_date(date_deb_ldt,'yyyymmdd') between to_date('20160908','yyyymmdd') and to_date('20160909','yyyymmdd')
      AND p_ldt.id_pers = 509
      AND p_etape.id_etape = 45
      group by p_ldt.id_pers, p_dossier.id_dossier, p_dossier.num_dossier,p_etape.id_etape, p_type_ldt.libelle, p_etape.libelle
      order by p_ldt.id_pers, p_dossier.num_dossier, p_etape.libelle, p_type_ldt.libelle





SELECT p_ldt.id_ldt, p_ldt.id_dossier, p_ldt.date_deb_ldt,p_ldt.date_fin_ldt,  p_dossier.num_dossier,p_etape.libelle as lib, p_ldt.commentaire, p_type_ldt.libelle as type, p_ldt.h_deb, p_ldt.h_fin, p_ldt.quantite, p_ldt.address_ip, p_ldt.nbre_erreur, p_etat.libelle as statu FROM p_ldt
			LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier
			LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
			LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien
			LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape
			LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat
			LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt
			WHERE date_deb_ldt = '20160912' AND  p_ldt.id_pers = 277 order by id_ldt desc limit 1

SELECT r_pointage.entree, r_pointage.source, r_personnel.appelation from r_pointage
		LEFT JOIN r_personnel ON r_personnel.id_pers=r_pointage.id_util
		where r_pointage.id_util = 277 AND r_pointage.pdate = '20160912' and  r_pointage.source ~  'IN|OUT' order by r_pointage.id_pointage desc limit 1



SELECT p_ldt.id_pers, SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree, sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,
      p_dossier.num_dossier as num , p_dossier.id_dossier
      from p_ldt
      LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier
      LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
      LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien
      LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape
      LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat
      LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt
      LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
      where 1=1 AND p_ldt.date_deb_ldt = '20160901'  AND p_ldt.id_type_ldt !=0
      group by p_ldt.id_pers,
	p_dossier.num_dossier
	, p_dossier.id_dossier order by  p_ldt.id_pers, p_dossier.num_dossier;











	CREATE OR REPLACE VIEW anomalie_pointage AS
   SELECT r_pointage_jour.id_util,
      r_pointage_jour.pdate,
      r_pointage_jour.duree_prod,
      r_pointage_jour.duree_pause,
      r_pointage_jour.duree_total,
      r_pointage_jour.duree_prod_gpao,
          CASE
              WHEN r_pointage_jour.type_erreur IS NOT NULL THEN
              CASE
                  WHEN (( SELECT count(*) AS count
                     FROM r_conge_view
                    WHERE r_conge_view.id_pers = r_pointage_jour.id_util AND to_date(r_pointage_jour.pdate::text, 'yyyy/MM/dd'::text) >= to_date(r_conge_view.date_debut::text, 'dd/MM/yyyy'::text) AND to_date(r_pointage_jour.pdate::text, 'yyyy/MM/dd'::text) <= to_date(r_conge_view.date_fin::text, 'dd/MM/yyyy'::text))) > 0 THEN 'Conge'::text
                  ELSE r_pointage_jour.type_erreur::text
              END
              ELSE
              CASE
                  WHEN r_pointage_jour.commentaire IS NOT NULL THEN r_pointage_jour.commentaire
                  ELSE 'Anomalie GPAO'::text
              END
          END AS anomalie
     FROM r_pointage_jour
    WHERE 1 = 1 AND (r_pointage_jour.type_erreur::text <> ''::text AND r_pointage_jour.type_erreur IS NOT NULL OR r_pointage_jour.commentaire IS NOT NULL AND r_pointage_jour.commentaire <> ''::text OR r_pointage_jour.duree_prod_gpao::text < '04:00:00'::text);

  ALTER TABLE anomalie_pointage
    OWNER TO gpao_classique;


    create table r_anomalie_tdb
    as select * from r_pointage_jour


SELECT
       p_lot_client.libelle  AS lib,
       p_ldt.id_lotclient  AS idlotclient,
       p_etape.libelle  AS libel,
       p_etape.id_etape  AS etape
       , COUNT(p_lot.id_etape ) AS nb,
       p_ldt.date_deb_ldt AS date
      FROM p_ldt
      LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot
      INNER JOIN p_lot_client ON p_lot.id_lotclient = p_lot_client.id_lotclient
      LEFT JOIN p_lien_oper_dossier ON p_lot.id_etape=p_lien_oper_dossier.id_lien
      LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape
      WHERE p_lot_client.id_dossier = option.id_dossier AND to_date(date_deb_ldt,'yyyymmdd') between to_date('option.date_prime','yyyymmdd') and to_date('option.date_deb','yyyymmdd')
      GROUP BY
      p_lot_client.libelle,
      p_etape.libelle,p_etape.id_etape,
      p_ldt.id_lotclient,
      p_ldt.date_deb_ldt
      ORDER BY p_ldt.date_deb_ldt ASc,p_ldt.id_lotclient;





      var sql = SELECT p_dossier.num_dossier as DOSSIER,
          p_lot_client.libelle as LOTCLIENT,
          p_lot.libelle as  LOT,
          p_lot.id_lotclient as  idp,
          p_etape.libelle as ETAPE,
          p_lot.duree as DUREE,
          p_lot.qte_op as QUANTITEOP,
          p_lot.id_pers as MATRICULESAISIE,
          almerys_p_lot_new.id_cq as MATRICULECQ,
          almerys_p_lot_new.id as id,
          p_lot.id_dossier as id_dossier,
          almerys_p_lot_new.echantillon as echant,
          p_lot.priority as PRIORITE,
          almerys_p_lot_new.libelle as NUMEROFACTURE,
          almerys_p_lot_new.num_nuo as NUMERONUO,
          almerys_p_lot_new.num_ps as NUMEROPS ,
            almerys_p_etat.libelle as ETAT,
          almerys_p_lot_new.qte as QUANTITE,
          almerys_p_lot_new.erreur as ERREUR,
          almerys_motif_rejet.libelle as MOTIFREJET,
          almerys_p_lot_new.date_deb as DATE,
          almerys_p_lot_new.h_deb as HEURE,
          almerys_tache.libelle as TACHE,
          r_departement.libelle as dep,
          almerys_p_lot_new.id_etat as id_et,
          almerys_p_lot_new.id_motif_rejet as id_mot_rj,
            almerys_type_fav.fav_a,
            almerys_type_fav.fav_b,
            almerys_type_fav.fav_c,
            almerys_type_fav.non_fav,
      	(CASE
      	    WHEN CAST(almerys_p_lot_new.qte AS double precision) >= 100 THEN
      	   almerys_type_fav.fav_a::text
      	    ELSE
      	    CASE WHEN CAST(almerys_p_lot_new.qte as double precision) BETWEEN 50 AND 99.9 THEN
      	    almerys_type_fav.fav_b::text
      	    ELSE
      	    CASE WHEN CAST(almerys_p_lot_new.qte as double precision) BETWEEN 30 AND 49.9 THEN
      	    almerys_type_fav.fav_c::text
      	    ELSE  almerys_type_fav.non_fav::text
      	    END
      	    END
      	    END) as typefav,
             almerys_user.sat
          FROM almerys_p_lot_new
          JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot
          JOIN almerys_p_etat on almerys_p_etat.id_etat = almerys_p_lot_new.id_etat
          JOIN p_dossier on p_lot.id_dossier = p_dossier.id_dossier
          JOIN p_lot_client on p_lot.id_lotclient = p_lot_client.id_lotclient
          JOIN p_lien_oper_dossier ON p_lien_oper_dossier.id_lien = p_lot.id_etape
          JOIN p_etape on p_etape.id_etape = p_lien_oper_dossier.id_oper
          JOIN p_etat on p_lot.id_etat = p_etat.id_etat
          JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers
          JOIN r_departement on r_personnel.id_departement = r_departement.id
          LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet
          LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache
          LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient
             LEFT JOIN almerys_user_new ON almerys_user_new.matricule = p_lot.id_pers
             WHERE 1= 1 p_lot.id_pers = 769 ORDER BY almerys_p_lot_new.id asc;

SELECT   SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree,
                sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,
                 (CASE WHEN (p_etape.libelle is null) THEN p_type_ldt.libelle ELSE p_etape.libelle END)  AS libelle
                 from p_ldt
                 LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier
                 LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
                 LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien
                 LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape
                 LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat
                 LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt
                 LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
                 where 1=1 and date_deb_ldt = '  option.dateess  '  AND p_ldt.id_pers =   option.idPers
                group by p_etape.libelle, p_type_ldt.libelle















Insert into almerys_user_new (matricule,sat) values (34,'SAT175');
Insert into almerys_user_new (matricule,sat) values (75,'SAT114');
Insert into almerys_user_new (matricule,sat) values (123,'SAT133');
Insert into almerys_user_new (matricule,sat) values (129,'SAT131');
Insert into almerys_user_new (matricule,sat) values (131,'SAT144');
Insert into almerys_user_new (matricule,sat) values (171,'SAT163');
Insert into almerys_user_new (matricule,sat) values (162,'SAT252');
Insert into almerys_user_new (matricule,sat) values (198,'SAT181');
Insert into almerys_user_new (matricule,sat) values (313,'SAT262');
Insert into almerys_user_new (matricule,sat) values (336,'SAT189');
Insert into almerys_user_new (matricule,sat) values (339,'SAT186');
Insert into almerys_user_new (matricule,sat) values (366,'SAT240');
Insert into almerys_user_new (matricule,sat) values (380,'SAT271');
Insert into almerys_user_new (matricule,sat) values (433,'SAT015');
Insert into almerys_user_new (matricule,sat) values (438,'SAT039');
Insert into almerys_user_new (matricule,sat) values (441,'SAT086');
Insert into almerys_user_new (matricule,sat) values (446,'SAT155');
Insert into almerys_user_new (matricule,sat) values (447,'SAT153');
Insert into almerys_user_new (matricule,sat) values (448,'SAT021');
Insert into almerys_user_new (matricule,sat) values (451,'SAT159');
Insert into almerys_user_new (matricule,sat) values (454,'SAT070');
Insert into almerys_user_new (matricule,sat) values (496,'SAT278');
Insert into almerys_user_new (matricule,sat) values (604,'SAT295');
Insert into almerys_user_new (matricule,sat) values (606,'SAT296');
Insert into almerys_user_new (matricule,sat) values (670,'SAT311');
Insert into almerys_user_new (matricule,sat) values (671,'SAT316');
Insert into almerys_user_new (matricule,sat) values (672,'SAT310');
Insert into almerys_user_new (matricule,sat) values (673,'SAT317');
Insert into almerys_user_new (matricule,sat) values (674,'SAT318');
Insert into almerys_user_new (matricule,sat) values (675,'SAT312');
Insert into almerys_user_new (matricule,sat) values (676,'SAT319');
Insert into almerys_user_new (matricule,sat) values (678,'SAT314');
Insert into almerys_user_new (matricule,sat) values (679,'SAT313');
Insert into almerys_user_new (matricule,sat) values (687,'SAT325');
Insert into almerys_user_new (matricule,sat) values (688,'SAT326');
Insert into almerys_user_new (matricule,sat) values (691,'SAT328');
Insert into almerys_user_new (matricule,sat) values (692,'SAT329');
Insert into almerys_user_new (matricule,sat) values (702,'SAT333');
Insert into almerys_user_new (matricule,sat) values (731,'SAT336');
Insert into almerys_user_new (matricule,sat) values (733,'SAT338');
Insert into almerys_user_new (matricule,sat) values (735,'SAT340');
Insert into almerys_user_new (matricule,sat) values (737,'SAT342');
Insert into almerys_user_new (matricule,sat) values (738,'SAT343');
Insert into almerys_user_new (matricule,sat) values (739,'SAT344');
Insert into almerys_user_new (matricule,sat) values (753,'SAT356');
Insert into almerys_user_new (matricule,sat) values (761,'SAT367');
Insert into almerys_user_new (matricule,sat) values (775,'SAT373');
Insert into almerys_user_new (matricule,sat) values (807,'SAT392');
Insert into almerys_user_new (matricule,sat) values (811,'SAT396');
Insert into almerys_user_new (matricule,sat) values (823,'SAT421');
Insert into almerys_user_new (matricule,sat) values (824,'SAT422');
Insert into almerys_user_new (matricule,sat) values (857,'SAT445');
Insert into almerys_user_new (matricule,sat) values (861,'SAT446');
Insert into almerys_user_new (matricule,sat) values (873,'SAT452');
Insert into almerys_user_new (matricule,sat) values (889,'SAT418');
Insert into almerys_user_new (matricule,sat) values (960,'SAT507');
Insert into almerys_user_new (matricule,sat) values (968,'SAT515');
Insert into almerys_user_new (matricule,sat) values (971,'SAT518');
Insert into almerys_user_new (matricule,sat) values (987,'SAT534');
Insert into almerys_user_new (matricule,sat) values (998,'SAT551');
Insert into almerys_user_new (matricule,sat) values (989,'SAT533');
Insert into almerys_user_new (matricule,sat) values (994,'SAT550');
Insert into almerys_user_new (matricule,sat) values (997,'SAT548');
Insert into almerys_user_new (matricule,sat) values (1000,'SAT549');
Insert into almerys_user_new (matricule,sat) values (1002,'SAT552');
Insert into almerys_user_new (matricule,sat) values (1003,'SAT542');
Insert into almerys_user_new (matricule,sat) values (1006,'SAT536');
Insert into almerys_user_new (matricule,sat) values (1009,'SAT547');
Insert into almerys_user_new (matricule,sat) values (1039,'SAT574');
Insert into almerys_user_new (matricule,sat) values (1069,'SAT629');
Insert into almerys_user_new (matricule,sat) values (1072,'SAT634');
Insert into almerys_user_new (matricule,sat) values (1046,'SAT579');
Insert into almerys_user_new (matricule,sat) values (1073,'SAT628');
Insert into almerys_user_new (matricule,sat) values (1082,'SAT632');
Insert into almerys_user_new (matricule,sat) values (1097,'SAT656');
Insert into almerys_user_new (matricule,sat) values (1103,'SAT642');
Insert into almerys_user_new (matricule,sat) values (1111,'SAT599');
Insert into almerys_user_new (matricule,sat) values (1113,'SAT596');
Insert into almerys_user_new (matricule,sat) values (1114,'SAT671');
Insert into almerys_user_new (matricule,sat) values (1118,'SAT598');
Insert into almerys_user_new (matricule,sat) values (1123,'SAT698');
Insert into almerys_user_new (matricule,sat) values (1124,'SAT695');
Insert into almerys_user_new (matricule,sat) values (1125,'SAT694');
Insert into almerys_user_new (matricule,sat) values (1129,'SAT696');
Insert into almerys_user_new (matricule,sat) values (1130,'SAT692');
Insert into almerys_user_new (matricule,sat) values (1132,'SAT693');
Insert into almerys_user_new (matricule,sat) values (1135,'SAT699');
Insert into almerys_user_new (matricule,sat) values (1155,'SAT716');
Insert into almerys_user_new (matricule,sat) values (1153,'SAT721');
Insert into almerys_user_new (matricule,sat) values (1165,'SAT725');
Insert into almerys_user_new (matricule,sat) values (1157,'SAT718');
Insert into almerys_user_new (matricule,sat) values (1166,'SAT706');
Insert into almerys_user_new (matricule,sat) values (1167,'SAT719');
Insert into almerys_user_new (matricule,sat) values (1169,'SAT707');
Insert into almerys_user_new (matricule,sat) values (1172,'SAT720');
Insert into almerys_user_new (matricule,sat) values (1173,'SAT717');
Insert into almerys_user_new (matricule,sat) values (1178,'SAT722');
Insert into almerys_user_new (matricule,sat) values (1176,'SAT704');
Insert into almerys_user_new (matricule,sat) values (1180,'SAT724');
Insert into almerys_user_new (matricule,sat) values (1179,'SAT723');
Insert into almerys_user_new (matricule,sat) values (1183,'SAT705');
Insert into almerys_user_new (matricule,sat) values (1184,'SAT726');
Insert into almerys_user_new (matricule,sat) values (1189,'SAT743');
Insert into almerys_user_new (matricule,sat) values (1190,'SAT739');
Insert into almerys_user_new (matricule,sat) values (1191,'SAT746');
Insert into almerys_user_new (matricule,sat) values (1192,'SAT742');
Insert into almerys_user_new (matricule,sat) values (1193,'SAT740');
Insert into almerys_user_new (matricule,sat) values (437,'SAT209');
Insert into almerys_user_new (matricule,sat) values (891,'SAT478');
Insert into almerys_user_new (matricule,sat) values (900,'SAT460');
Insert into almerys_user_new (matricule,sat) values (902,'SAT467');
Insert into almerys_user_new (matricule,sat) values (936,'SAT490');
Insert into almerys_user_new (matricule,sat) values (940,'SAT494');
Insert into almerys_user_new (matricule,sat) values (958,'SAT505');
Insert into almerys_user_new (matricule,sat) values (984,'SAT530');
Insert into almerys_user_new (matricule,sat) values (985,'SAT532');
Insert into almerys_user_new (matricule,sat) values (986,'SAT531');
Insert into almerys_user_new (matricule,sat) values (1104,'SAT643');
Insert into almerys_user_new (matricule,sat) values (329,'SAT201');
Insert into almerys_user_new (matricule,sat) values (358,'SAT232');
Insert into almerys_user_new (matricule,sat) values (639,'SAT303');
Insert into almerys_user_new (matricule,sat) values (645,'SAT297');
Insert into almerys_user_new (matricule,sat) values (646,'SAT307');
Insert into almerys_user_new (matricule,sat) values (694,'SAT331');
Insert into almerys_user_new (matricule,sat) values (756,'SAT358');
Insert into almerys_user_new (matricule,sat) values (762,'SAT362');
Insert into almerys_user_new (matricule,sat) values (790,'SAT376');
Insert into almerys_user_new (matricule,sat) values (810,'SAT395');
Insert into almerys_user_new (matricule,sat) values (812,'SAT397');
Insert into almerys_user_new (matricule,sat) values (814,'SAT399');
Insert into almerys_user_new (matricule,sat) values (816,'SAT401');
Insert into almerys_user_new (matricule,sat) values (819,'SAT404');
Insert into almerys_user_new (matricule,sat) values (820,'SAT405');
Insert into almerys_user_new (matricule,sat) values (840,'SAT423');
Insert into almerys_user_new (matricule,sat) values (841,'SAT424');
Insert into almerys_user_new (matricule,sat) values (843,'SAT426');
Insert into almerys_user_new (matricule,sat) values (846,'SAT429');
Insert into almerys_user_new (matricule,sat) values (854,'SAT437');
Insert into almerys_user_new (matricule,sat) values (859,'SAT439');
Insert into almerys_user_new (matricule,sat) values (863,'SAT438');
Insert into almerys_user_new (matricule,sat) values (870,'SAT449');
Insert into almerys_user_new (matricule,sat) values (872,'SAT451');
Insert into almerys_user_new (matricule,sat) values (874,'SAT453');
Insert into almerys_user_new (matricule,sat) values (785,'SAT665');
Insert into almerys_user_new (matricule,sat) values (1053,'');
Insert into almerys_user_new (matricule,sat) values (1055,'');
Insert into almerys_user_new (matricule,sat) values (1107,'SAT662');
Insert into almerys_user_new (matricule,sat) values (1109,'SAT669');
Insert into almerys_user_new (matricule,sat) values (1115,'SAT667');
Insert into almerys_user_new (matricule,sat) values (1121,'SAT659');
Insert into almerys_user_new (matricule,sat) values (1126,'SAT701');
Insert into almerys_user_new (matricule,sat) values (1128,'SAT702');
Insert into almerys_user_new (matricule,sat) values (1131,'SAT703');
Insert into almerys_user_new (matricule,sat) values (1133,'SAT700');
Insert into almerys_user_new (matricule,sat) values (1134,'SAT697');
Insert into almerys_user_new (matricule,sat) values (1158,'SAT727');
Insert into almerys_user_new (matricule,sat) values (1159,'SAT735');
Insert into almerys_user_new (matricule,sat) values (1160,'SAT737');
Insert into almerys_user_new (matricule,sat) values (1162,'SAT728');
Insert into almerys_user_new (matricule,sat) values (1163,'SAT736');
Insert into almerys_user_new (matricule,sat) values (1164,'SAT734');
Insert into almerys_user_new (matricule,sat) values (1168,'SAT732');
Insert into almerys_user_new (matricule,sat) values (1170,'SAT731');
Insert into almerys_user_new (matricule,sat) values (1175,'SAT733');
Insert into almerys_user_new (matricule,sat) values (1181,'SAT729');
Insert into almerys_user_new (matricule,sat) values (1186,'SAT730');
Insert into almerys_user_new (matricule,sat) values (17,'SAT170');
Insert into almerys_user_new (matricule,sat) values (39,'SAT246');
Insert into almerys_user_new (matricule,sat) values (79,'SAT105');
Insert into almerys_user_new (matricule,sat) values (120,'SAT140');
Insert into almerys_user_new (matricule,sat) values (292,'SAT267');
Insert into almerys_user_new (matricule,sat) values (309,'SAT275');
Insert into almerys_user_new (matricule,sat) values (348,'SAT222');
Insert into almerys_user_new (matricule,sat) values (351,'SAT225');
Insert into almerys_user_new (matricule,sat) values (356,'SAT231');
Insert into almerys_user_new (matricule,sat) values (541,'SAT288');
Insert into almerys_user_new (matricule,sat) values (542,'SAT289');
Insert into almerys_user_new (matricule,sat) values (605,'SAT294');
Insert into almerys_user_new (matricule,sat) values (642,'SAT305');
Insert into almerys_user_new (matricule,sat) values (649,'SAT298');
Insert into almerys_user_new (matricule,sat) values (651,'SAT309');
Insert into almerys_user_new (matricule,sat) values (740,'SAT345');
Insert into almerys_user_new (matricule,sat) values (741,'SAT346');
Insert into almerys_user_new (matricule,sat) values (771,'SAT370');
Insert into almerys_user_new (matricule,sat) values (773,'SAT372');
Insert into almerys_user_new (matricule,sat) values (796,'SAT379');
Insert into almerys_user_new (matricule,sat) values (798,'SAT381');
Insert into almerys_user_new (matricule,sat) values (804,'SAT389');
Insert into almerys_user_new (matricule,sat) values (924,'SAT482');
Insert into almerys_user_new (matricule,sat) values (943,'SAT468');
Insert into almerys_user_new (matricule,sat) values (944,'SAT465');
Insert into almerys_user_new (matricule,sat) values (1110,'SAT663');
Insert into almerys_user_new (matricule,sat) values (1112,'SAT666');
Insert into almerys_user_new (matricule,sat) values (1119,'SAT668');
Insert into almerys_user_new (matricule,sat) values (1120,'SAT664');
Insert into almerys_user_new (matricule,sat) values (1154,'SAT711');
Insert into almerys_user_new (matricule,sat) values (1156,'SAT709');
Insert into almerys_user_new (matricule,sat) values (1171,'SAT708');
Insert into almerys_user_new (matricule,sat) values (1174,'SAT715');
Insert into almerys_user_new (matricule,sat) values (1182,'SAT713');
Insert into almerys_user_new (matricule,sat) values (1185,'SAT714');
Insert into almerys_user_new (matricule,sat) values (162,'SAT252');
Insert into almerys_user_new (matricule,sat) values (336,'SAT189');
Insert into almerys_user_new (matricule,sat) values (349,'SAT223');
Insert into almerys_user_new (matricule,sat) values (418,'SAT245');
Insert into almerys_user_new (matricule,sat) values (438,'SAT039');
Insert into almerys_user_new (matricule,sat) values (440,'SAT062');
Insert into almerys_user_new (matricule,sat) values (442,'SAT017');
Insert into almerys_user_new (matricule,sat) values (540,'SAT287');
Insert into almerys_user_new (matricule,sat) values (544,'SAT291');
Insert into almerys_user_new (matricule,sat) values (546,'SAT293');
Insert into almerys_user_new (matricule,sat) values (759,'SAT355');
Insert into almerys_user_new (matricule,sat) values (1057,'SAT610');
Insert into almerys_user_new (matricule,sat) values (1122,'SAT691');
Insert into almerys_user_new (matricule,sat) values (1127,'SAT690');
Insert into almerys_user_new (matricule,sat) values (132,'SAT146');
Insert into almerys_user_new (matricule,sat) values (817,'SAT402');
Insert into almerys_user_new (matricule,sat) values (858,'SAT444');
Insert into almerys_user_new (matricule,sat) values (131,'SAT144');
Insert into almerys_user_new (matricule,sat) values (309,'SAT275');


--Moyenne

SELECT   SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp )) as duree,
    sum(to_number('0'||quantite,'99999')) as qte, sum(to_number('0'||nbre_erreur,'99999')) as err,
      (CASE WHEN (p_etape.libelle is null) THEN p_type_ldt.libelle ELSE CONCAT(p_dossier.num_dossier,'_',p_etape.libelle) END)  AS libelle ,
      (CASE WHEN (p_lien_oper_dossier.quantite_journalier is null OR p_lien_oper_dossier.quantite_journalier = '' OR to_number('0'||p_lien_oper_dossier.quantite_journalier ,'99999')=0)
    THEN
    0
    ELSE
    ((sum(to_number('0'||quantite,'99999'))*100)/to_number('0'||p_lien_oper_dossier.quantite_journalier,'999999'))
    END)  AS pqte ,
           (CASE WHEN (p_lien_oper_dossier.vitesse is null OR p_lien_oper_dossier.vitesse = '' OR to_number('0'||p_lien_oper_dossier.vitesse ,'99999')=0 OR sum(to_number('0'||quantite,'99999'))=0)
    THEN
    0
    ELSE
    ((sum(to_number('0'||quantite,'99999'))/SUM(DATE_PART('epoch', ('2011-12-29 '||h_fin)::timestamp - ('2011-12-29 '||h_deb)::timestamp ))/3600)*100)/to_number('0'||p_lien_oper_dossier.vitesse ,'999999')
    END)  AS pvit ,
    to_number('0'||p_lien_oper_dossier.vitesse ,'999999') as vitj,
    to_number('0'||p_lien_oper_dossier.quantite_journalier,'999999') as qtej
    from p_ldt
    LEFT JOIN p_dossier ON p_ldt.id_dossier=p_dossier.id_dossier
    LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
    LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape=p_lien_oper_dossier.id_lien
    LEFT JOIN p_etape ON p_lien_oper_dossier.id_oper=p_etape.id_etape
    LEFT JOIN p_etat ON p_ldt.id_etat=p_etat.id_etat
    LEFT JOIN p_type_ldt on p_type_ldt.id_type_ldt = p_ldt.id_type_ldt
    LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
    where 1=1 and date_deb_ldt = '20170130'  AND p_ldt.id_pers =    107    AND p_ldt.id_type_ldt =0
    group by p_dossier.num_dossier,p_etape.libelle, p_type_ldt.libelle ,p_lien_oper_dossier.vitesse,p_lien_oper_dossier.quantite_journalier


SELECT COUNT(p_dossier.num_dossier) as ct
              FROM almerys_p_lot_new
              JOIN p_lot on almerys_p_lot_new.id_lot = p_lot.id_lot
              JOIN r_personnel on r_personnel.id_pers = p_lot.id_pers
              LEFT JOIN almerys_motif_rejet on almerys_motif_rejet.id = almerys_p_lot_new.id_motif_rejet
              LEFT JOIN almerys_tache ON almerys_p_lot_new.id_tache = almerys_tache.id_tache
              LEFT JOIN almerys_type_fav ON almerys_type_fav.id_pole_new = p_lot.id_lotclient
           WHERE 1= 1 AND p_dossier.id_dossier = 578/* +  AND r_personnel.id_departement!=+option.id_dep+*/  option.sql;


INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (17,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (34,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (39,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (75,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (79,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (120,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (123,17703);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (129,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (131,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (131,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (132,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (162,2395);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (162,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (171,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (198,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (292,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (309,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (309,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (313,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (329,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (336,2395);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (336,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (339,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (348,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (349,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (351,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (356,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (358,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (366,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (380,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (418,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (433,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (437,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (438,17333);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (438,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (440,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (441,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (442,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (446,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (447,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (448,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (451,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (454,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (496,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (540,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (541,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (542,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (544,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (546,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (604,17703);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (605,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (606,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (639,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (642,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (645,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (646,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (649,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (651,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (670,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (671,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (672,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (673,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (674,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (675,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (676,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (678,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (679,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (687,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (688,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (691,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (692,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (694,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (702,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (731,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (733,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (735,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (737,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (738,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (739,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (740,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (741,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (753,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (756,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (759,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (761,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (762,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (771,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (773,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (775,17238);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (785,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (790,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (796,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (798,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (804,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (807,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (810,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (811,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (812,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (814,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (816,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (817,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (819,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (820,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (823,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (824,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (840,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (841,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (843,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (846,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (854,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (857,17288);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (858,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (859,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (861,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (863,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (870,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (872,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (873,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (874,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (889,17287);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (891,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (900,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (902,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (924,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (936,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (940,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (943,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (944,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (958,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (960,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (968,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (971,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (984,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (985,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (986,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (987,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (994,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1002,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1003,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1006,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1009,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1039,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1053,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1055,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1057,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1069,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1072,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1073,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1082,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1097,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1103,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1104,17331);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1107,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1109,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1110,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1111,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1112,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1113,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1114,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1115,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1118,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1119,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1120,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1121,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1122,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1123,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1124,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1125,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1126,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1127,5945);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1128,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1129,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1130,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1131,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1132,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1133,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1134,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1135,17204);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1153,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1154,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1155,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1156,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1157,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1158,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1159,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1160,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1162,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1163,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1164,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1165,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1166,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1167,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1168,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1169,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1170,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1171,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1172,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1173,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1174,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1175,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1176,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1178,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1179,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1180,17701);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1181,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1182,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1183,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1184,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1185,17308);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1186,17296);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1189,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1190,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1191,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1192,17203);
INSERT INTO almerys_affectation_sspe (id_pers,id_pole_new) values (1193,17203);
