SELECT id_lot,  p_lot.id_etat, id_etape, p_lot.libelle as lot,  p_lot.id_pers,det_ref.libelle as reference,p_lot.id_dossier,  id_det_ref
 FROM p_lot
 LEFT JOIN det_ref ON p_lot.id_det_ref=det_ref.id_ref
 LEFT JOIN p_lot_client ON p_lot_client.id_lotclient=p_lot.id_lotclient
 WHERE p_lot.id_etape IN(1931,3686)
 AND p_lot_client.libelle between 'undefined' AND 'undefined'
 AND p_lot.id_det_ref IS NOT NULL
 order by lot;
 /* SQL POUR SELECTION DE IDLOT DANS det_retour_cq f(resultat precedent) */
 SELECT id, id_lot
 FROM det_retour_cq
 WHERE id_lot in(SELECT id_lot FROM p_lot
 LEFT JOIN p_lot_client ON p_lot_client.id_lotclient=p_lot.id_lotclient
WHERE p_lot.id_etape IN(1931,3686) AND p_lot_client.libelle between 'undefined' AND 'undefined'
 AND p_lot.id_det_ref IS NOT NULL);