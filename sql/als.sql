--affichage par lot client  premier tableau

SELECT SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree,
        sum(to_number('0'||quantite,'99999')) as qte,count(p_ldt.commentaire ) FILTER (WHERE commentaire ILIKE 'ok%') as nb_ldw,sum(to_number('0'||p_ldt.nbre_erreur,'99999')) as nb_erreur ,
  p_etape.id_etape,p_etape.libelle  as etape,
  p_lot_client.id_lotclient,p_lot_client.libelle as lot_client
   , p_lien_oper_dossier.vitesse   FROM p_ldt
 LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers  LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
 LEFT JOIN p_lien_oper_dossier ON p_ldt.id_etape = p_lien_oper_dossier.id_lien
 LEFT JOIN  p_etape ON p_etape.id_etape = p_lien_oper_dossier.id_oper
  WHERE p_ldt.id_dossier = 959  AND date_deb_ldt BETWEEN '20200801' AND '20200905' AND id_departement =58  and id_type_ldt=0  AND p_ldt.id_etat<>1  AND (commentaire ILIKE 'ok%' OR COALESCE(commentaire,'')='') group by p_lot_client.id_lotclient,
p_etape.id_etape,p_lot_client.libelle,p_lien_oper_dossier.vitesse order by p_lot_client.libelle;

--frequence de faute masquer

SELECT p_ldt.id_pers,r_personnel.appelation, p_dossier.num_dossier, p_lot_client.libelle as lot_client,  p_etape.libelle as etape,
sum(to_number('0' ||  p_ldt.quantite, '99999')) as qte,sum(to_number('0' || p_ldt.nbre_erreur, '99999')) as nbErreur,count(p_ldt.commentaire) FILTER (WHERE commentaire ILIKE 'ok%') nbLot,
SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree
FROM p_ldt
JOIN r_personnel on r_personnel.id_pers= p_ldt.id_pers
JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot
JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier
JOIN  p_lien_oper_dossier ON p_lien_oper_dossier.id_lien= p_ldt.id_etape
JOIN p_etape ON p_lien_oper_dossier.id_oper= p_etape.id_etape
 WHERE p_ldt.id_dossier=959  AND date_deb_ldt BETWEEN '20200801' AND '20200905' AND id_departement =58  and id_type_ldt=0 AND (commentaire ILIKE 'ok%' OR COALESCE(commentaire,'')='')
GROUP BY  p_ldt.id_pers ,r_personnel.appelation, p_dossier.num_dossier, p_lot_client.libelle,p_etape.libelle
 ORDER BY p_ldt.id_pers asc ;
 
 -- saisie als par piece deuxieme tableau
SELECT  p_ldt.id_pers,r_personnel.appelation,date_deb_ldt,  p_dossier.num_dossier,  p_lot_client.libelle as lot_client, p_lot.libelle as lot,
sum(to_number('0' ||  p_ldt.quantite, '99999')) as qte,
SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree
FROM p_ldt
LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier
LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot
JOIN (select p_ldt.id_pers,p_lot.libelle   FROM p_ldt left join p_lot on p_lot.id_lot=p_ldt.id_lot
LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
where commentaire ilike 'ok%' AND  p_ldt.id_dossier = 959 AND date_deb_ldt BETWEEN '20200801' AND '20200905' AND id_departement =58 ) AS t (p,o) ON p = p_ldt.id_pers AND o = p_lot.libelle
WHERE 1=1     AND   COALESCE(p_ldt.quantite,'')<>''   and id_type_ldt=0 group by lot,date_deb_ldt, p_ldt.id_pers,r_personnel.appelation,
p_dossier.num_dossier,  p_lot_client.libelle order
by p_ldt.id_pers asc

-- get by operateur dernier tableau
 SELECT  p_ldt.id_pers,r_personnel.appelation,p_dossier.num_dossier,
count(p_ldt.commentaire ) FILTER (WHERE commentaire ILIKE 'ok%') as nb_ldw,
sum(to_number('0' ||  p_ldt.quantite, '99999')) as qte,
SUM(DATE_PART('epoch', ('2011-12-29 '||p_ldt.h_fin)::timestamp - ('2011-12-29 '||p_ldt.h_deb)::timestamp )) as duree
FROM p_ldt  LEFT JOIN r_personnel ON r_personnel.id_pers=p_ldt.id_pers
LEFT JOIN p_dossier ON p_dossier.id_dossier=p_ldt.id_dossier
LEFT JOIN p_lot_client ON p_ldt.id_lotclient=p_lot_client.id_lotclient
LEFT JOIN p_lot ON p_lot.id_lot=p_ldt.id_lot
 WHERE 1=1  AND  p_ldt.id_dossier = 959 AND date_deb_ldt BETWEEN '20200801' AND '20200905' AND id_departement =58 AND   COALESCE(p_ldt.quantite,'')<>''   and id_type_ldt=0 AND (commentaire ILIKE 'ok%' OR COALESCE(commentaire,'')='')group by  p_ldt.id_pers,r_personnel.appelation,  p_dossier.num_dossier order by p_ldt.id_pers asc