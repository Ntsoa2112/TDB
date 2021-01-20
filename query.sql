-- Function: createpointagejour()

-- DROP FUNCTION createpointagejour();

CREATE OR REPLACE FUNCTION createpointagejour()
  RETURNS TABLE(pdate text, id_util integer, entree text, sortie text, duree_prod text, duree_pause text, duree_total text, commentaire text, historique text, type_erreur text, type_erreur text, duree_prod_gpao text) AS
$BODY$
  -- INSERT INTO r_pointage_jour (pdate, id_util, entree, sortie, duree_prod, duree_pause, duree_total, commentaire, historique, type_erreur, duree_prod_gpao) VALUES (currDT, rowsID.mat, firstIn, lastOut, dureeHP, dureeHNP, dureeTotal, commentP, histo, errorType, dureeHPgpao);

	DECLARE
		currDT	 	ALIAS FOR  $1;

		rowsID		RECORD;
		rowsPT		RECORD;
		rowsMT		RECORD;
		rowsTmp		RECORD;
		rowsLDT		RECORD;


		rowDayofWeekYesterday	RECORD;
		rowDayWorked	RECORD;

		H_entree	character varying;
		H_sortie	character varying;

		firstIn		character varying;
		lastOut		character varying;

		lastHour	character varying;

		sourceP		character varying;

		errorType	character varying;
		commentP	character varying;

		dureeHP		character varying;
		dureeHNP	character varying;
		dureeTotal	character varying;
		dureeHPgpao	character varying;

		histo		character varying;
		nbIn		int;
		nbOut		int;

		currDate	character varying;
		dateDuLendemain	date;

		outBefore	boolean;

	BEGIN

	-- AUT	  TSITEZERA
	-- DAT 	  2017/01/06

	-- USAGE : select createpointagejour()




		--MODIF Christian (12/03/2014): matricule à ne pas prendre en compte car externe (180,181,182)
		-- Charge la liste des matricules
		FOR rowsPT IN SELECT DISTINCT(r_pointage.pdate) as pdate FROM r_pointage WHERE to_date(pdate,'YYYY/MM/DD') <> NOW()  LOOP
        FOR rowsID IN SELECT distinct(id_pers) as mat, id_eq as idequipe FROM r_personnel WHERE actif = true AND id_pers not in (180,181,182,472) AND to_date(date_embauche,'DD/MM/YYYY') <= dateDuLendemain   ORDER BY id_pers ASC LOOP

        			firstIn = null;
        			histo = '';
        			lastHour = null;
        			H_entree = null;
        			H_sortie = null;
        			lastOut = null;
        			dureeHP = null;
        			dureeHNP = null;
        			dureeTotal = null;
        			dureeHPgpao = null;
        			errorType = 'Absent';
        			commentP = Null;
        			nbIn = 0;
        			nbOut = 0;
        			outBefore := false;

        			-- Recupere tous les pointages BIO de la personne
        			FOR rowsMT IN SELECT r_pointage.entree, r_pointage.source FROM r_pointage WHERE pdate = rowsPT.pdate AND id_util = rowsID.mat ORDER BY entree ASC LOOP

        				IF lastHour is not null THEN
        					-- S'il y a 2 pointages successifs d'une intervalle de moins de 5s, on ne prends pas en compte le second
        					IF CAST(rowsMT.entree AS TIME) - CAST(lastHour AS TIME) < CAST('00:00:05' AS TIME) THEN
        						CONTINUE;
        					END IF;
        				END IF;

        				lastHour := rowsMT.entree;
        				sourceP := rowsMT.source;

        				--IF sourceP = 'IN' OR sourceP = 'IN_ARO' OR sourceP = 'IN_ARO1' OR sourceP = 'IN_RDJ' OR sourceP = 'IN-1' OR sourceP = 'IN-2' OR sourceP = 'IN-3' OR sourceP = 'IN-4' THEN
        				IF sourceP LIKE 'IN%' THEN
        					IF firstIn is null THEN
        						firstIn  := rowsMT.entree;
        						errorType := Null;
        					END IF;
        					H_entree := rowsMT.entree;
        					histo := histo || ';IN_' || rowsMT.entree;
        					nbIn = nbIn + 1;
        				ELSE
        					--IF sourceP  = 'OUT'  OR sourceP = 'OUT_ARO' OR sourceP = 'OUT_ARO1' OR sourceP = 'OUT_RDJ' OR sourceP  = 'OUT-1'  OR sourceP = 'OUT-2' OR sourceP = 'OUT-3' OR sourceP = 'OUT-4' THEN
        					IF sourceP LIKE 'OUT%' THEN
        					--si il n'y a pas encore de IN or on est déja en OUT
        						IF firstIn is null THEN
        							outBefore := true;
        						END IF;

        						IF lastOut is null THEN
        							errorType := Null;
        						END IF;
        						H_sortie := rowsMT.entree;
        						lastOut := rowsMT.entree;
        						histo := histo || ';OUT_' || rowsMT.entree;
        						nbOut = nbOut + 1;
        					END IF;
        				END IF;

        				-- Calcul de l'intervalle entre un in-out puis on l'accumule => heure prod
        				IF H_entree is not null AND H_sortie is not null AND CAST(H_entree AS TIME) < CAST(H_sortie AS TIME) THEN
        					iF dureeHP is not null THEN
        						dureeHP = (select tDiff(dureeHP, (SELECT tDiff(H_entree, H_sortie, '-')), '+'));
        					ELSE
        						dureeHP = (SELECT tDiff(H_entree, H_sortie, '-'));
        					END IF;
        					H_entree = null;
        					H_sortie = null;
        				END IF;
        			END LOOP;

        			-- Signale les retards et calcul de la duree totale de présence
        			IF firstIn is not null THEN

        				select heure_entree into rowsTmp FROM r_equipe inner join r_personnel on r_equipe.id_equipe = r_personnel.id_eq where id_pers = rowsID.mat;

        				IF rowsTmp.heure_entree < firstIn THEN
        					errorType='Retard';
        				END IF;

        				IF lastOut is not null THEN
        					dureeTotal = (SELECT tDiff(firstIn, lastOut, '-'));
        				END IF;
        			END IF;

        			--Calcul des heures pauses (non travaillées)
        			IF dureeHP is not null AND dureeTotal is not null THEN
        				dureeHNP = (SELECT tDiff(dureeHP, dureeTotal, '-'));
        			END IF;

        			-- Signale s'il y a eu des pointages manquants
        			IF nbIn < nbOut THEN
        				commentP := 'Pointage BIO IN manquant';
        			END IF;

        			IF nbIn > nbOut OR outBefore THEN
        				--pointage OUT manquant probablement la personne travail la nuit
        				--on regarde le pointage du lendemain si il commence par un pointage OUT c'est le pointage OUT
        				FOR rowsMT IN SELECT r_pointage.entree, r_pointage.source FROM r_pointage WHERE pdate = to_char(dateDuLendemain, 'YYYY/MM/DD') AND id_util = rowsID.mat ORDER BY entree ASC LIMIT 1 LOOP

        					lastHour := rowsMT.entree;
        					sourceP := rowsMT.source;

        					--IF sourceP  = 'OUT'  OR sourceP = 'OUT_ARO' OR sourceP = 'OUT_ARO1' OR sourceP = 'OUT_RDJ' OR sourceP  = 'OUT-1'  OR sourceP = 'OUT-2' OR sourceP = 'OUT-3' OR sourceP = 'OUT-4' THEN
        					IF sourceP LIKE 'OUT%' THEN
        						IF lastOut is null THEN
        							errorType := Null;
        						END IF;

        						H_sortie := rowsMT.entree;
        						lastOut := rowsMT.entree;
        						histo := histo || ';OUT_' || rowsMT.entree||'_J+1';
        						nbOut = nbOut + 1;

        						-- Calcul de l'intervalle entre un in-out puis on l'accumule => heure prod
        						IF H_entree is not null AND H_sortie is not null THEN
        							dureeHP = (SELECT tDiff(firstIn, H_sortie, '-', to_date(currDT, 'YYYY/MM/DD'), dateDuLendemain));
        							--dureeHP = (SELECT tDiff(firstIn, H_sortie, '-'));
        							dureeTotal := dureeHP;
        							--Calcul des heures pauses (non travaillées)
        							IF dureeHP is not null AND dureeTotal is not null THEN
        								dureeHNP = (SELECT tDiff(dureeHP, dureeTotal, '-'));
        							END IF;
        						END IF;

        					ELSE
        						commentP := 'Pointage BIO OUT manquant';
        					END IF;
        				END LOOP;
        			END IF;

        			-- Recupere toutes les LDT de la personne (hors taches non productives)
        			currDate := replace(currDT,'/',''); --yyyy/MM/dd => yyyyMMdd
        			FOR rowsLDT IN SELECT p_ldt.h_deb, p_ldt.h_fin FROM p_ldt WHERE id_pers = rowsID.mat AND (to_date(date_deb_ldt,'YYYYMMDD') = to_date(rowsPT.pdate,'YYYY/MM/DD') OR to_date(date_fin_ldt,'YYYYMMDD') = to_date(rowsPT.pdate,'YYYY/MM/DD')) AND (id_type_ldt = 0 OR id_type_ldt = 2) ORDER BY id_ldt ASC LOOP
        				IF rowsLDT.h_deb is not null AND rowsLDT.h_fin is not null AND CAST(rowsLDT.h_deb AS TIME) < CAST(rowsLDT.h_fin AS TIME) THEN
        					IF dureeHPgpao is not null THEN
        						dureeHPgpao = (select tDiff(dureeHPgpao, (SELECT tDiff(rowsLDT.h_deb, rowsLDT.h_fin, '-')), '+'));
        					ELSE
        						dureeHPgpao = (SELECT tDiff(rowsLDT.h_deb, rowsLDT.h_fin, '-'));
        					END IF;
        					--Si la personne n'a pas de pointage BIO mais a pointé GPAO => pas absent
        					IF errorType = 'Absent' THEN
        						errorType := Null;
        					END IF;
        				END IF;
        			END LOOP;

        			-- Test si c'est un jour travaillé pour la personne (Weekend + férié)
        			IF (histo = '' AND dureeHPgpao IS NULL) THEN
        				IF (SELECT to_char(cast(currDT as date), 'DD/MM/YYYY') IN (SELECT date FROM r_jour_ferie)) THEN
        					errorType = 'NonAbsent';
        				ELSE
        					SELECT EXTRACT(DOW FROM cast(currDT as timestamp)) AS dayofweek INTO rowDayofWeekYesterday;

        					IF (rowDayofWeekYesterday.dayofweek = 1) THEN --lundi
        						SELECT lundi as dayworked INTO rowDayWorked FROM r_equipe WHERE id_equipe = rowsID.idequipe;
        					END IF;
        					IF (rowDayofWeekYesterday.dayofweek = 2) THEN --mardi
        						SELECT mardi as dayworked INTO rowDayWorked FROM r_equipe WHERE id_equipe = rowsID.idequipe;
        					END IF;
        					IF (rowDayofWeekYesterday.dayofweek = 3) THEN --mercredi
        						SELECT mercredi as dayworked INTO rowDayWorked FROM r_equipe WHERE id_equipe = rowsID.idequipe;
        					END IF;
        					IF (rowDayofWeekYesterday.dayofweek = 4) THEN --jeudi
        						SELECT jeudi as dayworked INTO rowDayWorked FROM r_equipe WHERE id_equipe = rowsID.idequipe;
        					END IF;
        					IF (rowDayofWeekYesterday.dayofweek = 5) THEN --vendredi
        						SELECT vendredi as dayworked INTO rowDayWorked FROM r_equipe WHERE id_equipe = rowsID.idequipe;
        					END IF;
        					IF (rowDayofWeekYesterday.dayofweek = 6) THEN --samedi
        						SELECT samedi as dayworked INTO rowDayWorked FROM r_equipe WHERE id_equipe = rowsID.idequipe;
        					END IF;
        					IF (rowDayofWeekYesterday.dayofweek = 0) THEN --dimanche
        						SELECT dimanche as dayworked INTO rowDayWorked FROM r_equipe WHERE id_equipe = rowsID.idequipe;
        					END IF;

        					IF (rowDayWorked.dayworked = '0') THEN
        						errorType = 'NonAbsent';
        					END IF;

        				END IF;
        			END IF;

        			--pour le debogage
        			--IF rowsID.mat = 148 THEN RETURN dureeHP ; END IF;

        			IF (errorType IS NULL OR errorType <> 'NonAbsent') THEN
        			  pdate := pdate;
        			  id_util := rowsID.mat;
        			  entree := firstIn;
        			  sortie := lastOut;
        			  duree_prod := dureeHP;
        			  duree_pause := dureeHNP;
        			  duree_total := dureeTotal;
        			  commentaire := commentP;
        			  historique := histo;
        			  type_erreur := errorType;
        			  duree_prod_gpao := dureeHPgpao;

        			  --currDT, rowsID.mat, firstIn, lastOut, dureeHP, dureeHNP, dureeTotal, commentP, histo, errorType, dureeHPgpao
        				--INSERT INTO r_pointage_jour (pdate, id_util, entree, sortie, duree_prod, duree_pause, duree_total, commentaire, historique, type_erreur, duree_prod_gpao) VALUES (currDT, rowsID.mat, firstIn, lastOut, dureeHP, dureeHNP, dureeTotal, commentP, histo, errorType, dureeHPgpao);
        			END IF;
            RETURN NEXT
        		END LOOP;

		END LOOP;


		--RETURN 'OK' ;
	END;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION createpointagejour()
  OWNER TO postgres;
