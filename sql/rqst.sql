SELECT num_dossier,id_dossier,p_dossier.id_cl,p_client.description FROM p_dossier LEFT JOIN p_client ON p_client.id_cl = p_dossier.id_cl
where p_client.is_cqalm = false  AND p_dossier.id_cl <> 5 order by p_dossier.id_cl ASC;

SELECT p_etape.* from p_etape JOIN p_lien_oper_dossier on id_oper = id_etape where id_dossier = 830;
SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree,
	sum(to_number('0'||quantite,'99999')) as qte,
	sum(to_number('0'||nbre_erreur,'99999')) as err,
  p_etape.id_etape,p_etape.libelle,
  p_lien_oper_dossier.vitesse
  FROM p_ldt
  JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien
  join p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper
  WHERE p_ldt.id_dossier = 830 group by p_etape.id_etape,p_etape.libelle,p_lien_oper_dossier.vitesse;

  SELECT * FROM p_dossier where id_dossier = 830 LIMIT 1;

  SELECT * FROM p_client;
SELECT num_dossier,id_dossier FROM p_dossier

--multiple dossier
SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree,
	sum(to_number('0'||quantite,'99999')) as qte,
	sum(to_number('0'||nbre_erreur,'99999')) as err,
  p_etape.id_etape,p_etape.libelle,
  p_dossier.num_dossier,p_dossier.id_dossier,
  r_personnel.id_pers,r_personnel.appelation,
  p_lien_oper_dossier.vitesse
  FROM p_ldt
  JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien
  JOIN p_dossier ON p_lien_oper_dossier.id_dossier = p_dossier.id_dossier
  JOIN r_personnel ON p_ldt.id_pers = r_personnel.id_pers
  join p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper
  WHERE p_ldt.id_dossier IN (830,476) group by p_etape.id_etape,p_etape.libelle,p_lien_oper_dossier.vitesse,p_dossier.num_dossier,p_dossier.id_dossier, r_personnel.id_pers,r_personnel.appelation;


SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree,
	sum(to_number('0'||quantite,'99999')) as qte,
	sum(to_number('0'||nbre_erreur,'99999')) as err,
  p_etape.id_etape,p_etape.libelle,
  p_dossier.num_dossier,p_dossier.id_dossier,
  r_personnel.id_pers,r_personnel.appelation,
  p_lien_oper_dossier.vitesse
  FROM p_ldt
  JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien
  JOIN p_dossier ON p_lien_oper_dossier.id_dossier = p_dossier.id_dossier
  JOIN r_personnel ON p_ldt.id_pers = r_personnel.id_pers
  join p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper
  WHERE p_ldt.id_dossier IN (SELECT id_dossier FROM p_dossier LEFT JOIN p_client ON p_client.id_cl = p_dossier.id_cl
where  p_dossier.id_cl <> 5 order by p_dossier.id_cl ASC) group by p_etape.id_etape,p_etape.libelle,p_lien_oper_dossier.vitesse,p_dossier.num_dossier,p_dossier.id_dossier, r_personnel.id_pers,r_personnel.appelation;

SELECT
  p_dossier.num_dossier,p_dossier.id_dossier,
  r_personnel.id_pers,r_personnel.appelation,
  p_lien_oper_dossier.vitesse
  FROM p_ldt
  JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien
  JOIN p_dossier ON p_lien_oper_dossier.id_dossier = p_dossier.id_dossier
  JOIN r_personnel ON p_ldt.id_pers = r_personnel.id_pers
  join p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper
  WHERE p_ldt.id_dossier IN (SELECT id_dossier FROM p_dossier LEFT JOIN p_client ON p_client.id_cl = p_dossier.id_cl
where  p_dossier.id_cl <> 5 order by p_dossier.id_cl ASC) group by p_etape.id_etape,p_etape.libelle,p_lien_oper_dossier.vitesse,p_dossier.num_dossier,p_dossier.id_dossier, r_personnel.id_pers,r_personnel.appelation;
