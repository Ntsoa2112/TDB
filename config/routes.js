/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */
module.exports.routes = {
 
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
   * etc. depending on your default view engine) your home page.              *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)       -18.969180, 47.534038                          *
   *                                                                          *
   ***************************************************************************/
 
  /*********** Authentification *****************************************************************************************/
 
  '/exportRonny':'OSMController.exportROnny',
 
  '/': {
    controller: 'OperateurController',
    action: 'suivis',
  },
 
  '/logout': 'AuthController.logout',
 
  'post /login': 'AuthController.login', //
 
  'get /login': 'AuthController.loginSimple',
  '/admin': 'AuthController.loginAdmin',
 
  /*********** Fin Authentification ***********************/
  /*********** Modal ***********************/
  '/modalVitesse':
    {
      view: 'pages/modal/VitesseModale'
    },
 
  /*********** Fin Modal ***********************/
 
  /*********** ligne de temps *******************************************************************************************/
  /*****************ligne de temps par op�rateur lors du clic de ligne de temps***********************/
  '/ldtmodal':'LdtController.getldtop',
  '/ldt':
    {
      view: 'pages/ldt'
    },
 
  /*'/ronny_test':
    {
      controller: 'AdminController',
      action: 'ronny_test',
    },*/
 
  'get /ldtById':
    {
      controller: 'LdtController',
      action: 'getVitesseOP',
    },
 
  'get /dashboardOp':
    {
      controller: 'LdtController',
      action: 'DashboardOp',
    },
 
  'get /getLsDossier': 'LdtController.getLsDossier',
  'get /getLsDepartement': 'LdtController.getLsDepartement',
  'get /getLsEquipe': 'LdtController.getLsEquipe',
  'get /getLsGroupe': 'LdtController.getLsGroupe',
  'get /getLsGroupeDep': 'LdtController.getLsDepartementGroupe',
  'get /getLsDossierAdmin': 'ManagementController.getLsDossierAdmin',
  'get /getLsSpecialite': 'AlmerysController.getLsSpecialite',
  'get /getLsMois': 'LdtController.getLsMois',
 
  'get /getGrapheDossier': 'LdtController.getGrapheDossier',
 
  /*********** Fin ligne de temps ***********************/

  //NEOCLES
  'get /neocles-user-list': 'NeoclesController.getUserList',
  'get /neocles-equipe-list': 'NeoclesReportingController.getEquipeList',
  'get /neocles-type-list': 'NeoclesReportingController.getTypeList',

  '/neocles-notation-appel': 'NeoclesController.indexNotationAppel',
  '/neocles-notation-mail-ticket': 'NeoclesController.indexNotationMailTicket',
  '/neocles-notation-mail-appel': 'NeoclesController.indexNotationMailAppel',
  '/neocles-add-notation-appel': 'NeoclesController.addNotationAppel',
  '/neocles-update-notation-appel': 'NeoclesController.updateNotationAppel',
  'get /neocles-details-user' : 'NeoclesController.getDetails',
  'get /neocles-get-list-ecoute' : 'NeoclesController.getListEcoute',
  '/neocles-list-ecoute' : 'NeoclesController.indexListeEcoute',
  '/neocles-edit-ecoute' : 'NeoclesController.editEcoute',
  '/neocles-test' : 'NeoclesController.test',

  '/neocles-administration' : 'NeoclesAdministrationController.index',
  '/neocles-get-niveau' : 'NeoclesAdministrationController.getNiveau',
  '/neocles-get-suscribed' : 'NeoclesAdministrationController.getSuscribed',
  '/neocles-get-not-suscribed' : 'NeoclesAdministrationController.getNotSuscribed',
  '/neocles-add-niveau' : 'NeoclesAdministrationController.insertNiveau',

  '/neocles-reporting-indiviuel' : 'NeoclesReportingController.indexReportingIndivuduel',
  '/neocles-reporting-indiviuel-notes' : 'NeoclesReportingController.getListEcoute',
  '/neocles-reporting-conformite' : 'NeoclesReportingController.getConformiteData',
  '/neocles-reporting-equipe' : 'NeoclesReportingController.indexReportingEquipe',
  '/neocles-reporting-conformite-annuelle' : 'NeoclesReportingController.getConformiteParEquipe',
  
  /*********** Ajout suivi ***********************/
  '/fiche_suivi_en_detail': 'FichedesuivineoController.fichedesuiviendetail',
  '/fiche_suivi_de_conformite': 'FichedesuivineoController.fichedesuivideconformite',
  /*********** Dossiers ************************************************************************************************/
  '/statOp': 'LienOperDossierController.index',
  '/ajaxStat': 'LienOperDossierController.ajaxStat',
  '/suivisOp': 'LdtController.suivisOp',
  '/anomalieOp': 'LdtController.anomalieOp',
  '/suivisHeureOp': 'LdtController.suivisHeureOp',
  '/suivisOpMens': 'LdtController.suivisOpMensuel',
  '/exportToExcel': 'LdtController.createExcel',
  '/exportToExcelNC': 'LdtController.createExcelPost',
  '/exportToExcelDep': 'LdtController.createExcelPostDep',
 
  '/listeDossier':
    {
      controller: 'DossierController',
      action: 'findDossier',
    },
 
  /*'get /modifierDossier':{
   controller: 'DossierController',
   action: 'updateDossier',
   },*/
 
  '/dossier': 'DossierController.index',
 
  'get /chart': 'DossierController.index',
 
  'get /ajoutEtape': 'EtapeController.createEtapeDossier',
 
  'get /modifierDossier':'DossierController.updateDossier',
  'get /modifierQV':'DossierController.updateEtape',
 
  'get /findDossierById': 'DossierController.findDossierById',
  'get /findSpecById': 'AlmerysController.gestionSpec',
  'get /findGroupeId': 'DossierController.gestionGroupe',
  'get /addSpecById': 'AlmerysController.modifSpec',
  'get /addEquipById': 'DossierController.modifEquipe',
  'get /delEquipById': 'DossierController.delEquipe',
 
  // web service ldt
 
  'get /wsdataldt': 'LdtController.getldtop',
 
  'get /wsgraphdossier': 'LdtController.wsGrapheDossier',
 
  /*********** Fin Dossiers ***********************/
 
  /*'/ldtByOp':
   {
     view: 'pages/hs'
   },
 
 '/toTDBOP':
   {
     view: 'pages/hs'
   },*/
 
  '/ldtOp': 'OperateurController.suivis',
  '/ldtOpAdmin': 'OperateurController.ldtOpAdmin',
  '/ldtByOp': 'OperateurController.suivisByOp',
  '/ldtByOpJson': 'OperateurController.suivisByOpJson',
  '/ldtMoy': 'OperateurController.getMoyenneLdt',
  '/getCryptedKey': 'OperateurController.getCryptedKey',
  '/toTDBOP': 'OperateurController.suivisByOpAd',
  '/loadErreurCq': 'OperateurController.loadErreurCq',
  '/loadListErreurCq': 'OperateurController.loadListErreurCq',
  /*********** Admin ***********************/
  'get /listAdmin': 'AdminController.getListAdmin',
  /*********** Fin Admin ***********************/
  '/pres':
    {
      view: 'pages/presencePage'
    },
 
  'get /presence':
    {
      controller: 'PresenceController',
      action: 'getPresenceToday',
    },
 
  'get /management': 'ManagementController.index',
  'get /jsonDossier': 'ManagementController.jsonDossier',
  'get /rangAjax': 'AjaxController.ajaxRangByDoss',
  'get /rangJson': 'AjaxController.jsonRangByDoss',
  'get /dashCp': 'ManagementController.dashCp',
  'get /getPresence': 'ManagementController.getPresence',
  'get /getRetard': 'ManagementController.getRetard',
  'get /getRetardParDepartement': 'ManagementController.getRetardParDepartement',
  'get /r_pointage_jour': 'WebServiceController.pointage_jour',
 
  /******WEB SERVICES */
 
  'get /updateLastConnetedTime': 'PresenceController.updatelastDateConnected',
 
  /*****AJAX****** */
  'get /getldtById': 'AjaxController.ajaxOneLdt',
  'get /ajaxLineDash': 'AjaxController.ajaxLineChart',
  'get /ajaxPointage': 'AjaxController.ajaxPointageAdd',
  'get /gpaoAddPointage': 'AjaxController.gpaoPointageAdd',
  'get /ajaxAnomalieTab': 'AjaxController.ajaxAnomalieTab',
  'get /ajaxHeureTab': 'AjaxController.ajaxHeureTab',
  'get /ajaxPointageForm': 'AjaxController.ajaxPointageForm',
  'get /ajaxAnomalieDet': 'AjaxController.ajaxAnomalieDet',
  'get /ajaxPointageDet': 'AjaxController.ajaxPointageDet',
  'post /geTableFiltre': 'AjaxController.ajaxTableFiltree',
  'get /getDonutEtape': 'AjaxController.ajaxEtapeDonut',
  'get /ajax_hm_almerys': 'AjaxController.ajaxHMAlm',
  'get /hm_almerys': 'AlmerysController.ajaxHMorte',
  'get /ajax_progress': 'AjaxController.ajaxPrBrPointage',
  'get /ajax_ldt': 'AjaxController.ajaxLdtByOp',
  'get /ajaxOneLdt': 'AjaxController.ajaxOneLdt',
  /*****SOCKET */
  'get /send': 'SocketServerController.sendSocket',
  'get /sendSocketChat': 'SocketServerController.sendSocketChat',
  'get /ImConnected': 'SocketServerController.ImConnected',
  'get /dashAdmin': 'DashboardController.dashAdmin',
  'get /go': 'SocketServerController.sendSocketTest',
  'get /emit': 'SocketServerController.sendSocketCS',
  'get /managmentSocket': 'SocketServerController.managmentUpdateSocket',
  'get /testLdap': 'SocketServerController.testLdap',
  //?dossier=29&datedeb=20160922&datefin=20160922
  'get /received':
    {
      view: 'pages/socket'
    },
 
  '/test':
    {
      view: 'pages/modal/testModal'
    },
 
  /*Almerys routes  gestion*/
  'get /gestionAlm': 'AlmerysController.gestion',
  'get /AlmerysCall': 'AlmerysCallController.getNombreLotAlmerys',
  '/export': "AlmerysCallController.getXlNombreLotAlmerys",
  '/exportV2': "AlmerysCallController.getXlNombreLotAlmerys2_0",
  '/geTableAC': "AlmerysCallController.getAjaxNombreLotAlmerys",
  'get /ajaxAlm': 'AlmerysController.gestionAjax',
  'get /excelAlm': 'AlmerysController.readXcel',
  'get /h_morte_alm': 'AlmerysController.hMorte',
  'post /uploadData': 'PresenceController.uploadInsertDb',
  '/showImg': 'PresenceController.showPhinDb',
  '/showScreen': 'PresenceController.showPhinDbByIDAjax',
  '/upload':
    {
      view: 'upload'
    },
 
  '/almerys':
    {
      view: 'pages/gestionAlmerysV2',
      locals: {
        layout: false
      }
    },
  '/screenS':'PresenceController.showPhinDbByID',
 
  '/stock_almerys':'AlmerysController.stock',
  '/ajax_stock_almerys':'AlmerysController.ajaxStock',
  '/add_stock':'AlmerysController.addStock',
  '/update_stock':'AlmerysController.updateStock',
  '/delete_stock':'AlmerysController.deleteStock',
 
  '/cadence_almerys':'AlmerysController.cadence',
  '/ajax_cadence_almerys':'AlmerysController.ajaxCadence',
  '/add_cadence':'AlmerysController.addCadence',
  '/update_cadence':'AlmerysController.updateCadence',
  '/delete_cadence':'AlmerysController.deleteCadence',
 
  '/qualite_almerys':'AlmerysController.qualite',
  '/ajax_qualite_almerys':'AlmerysController.ajaxQualite',
  '/add_qualite':'AlmerysController.addQualite',
  '/update_qualite':'AlmerysController.updateQualite',
  '/delete_qualite':'AlmerysController.deleteQualite',
  '/alm_suivis':'AlmerysController.alm_suivis',
 
  '/add_hmort':'AlmerysController.addHmort',
 
  '/ajaxForm':'AlmerysController.ajaxForm',
 
 
  '/conge_almerys':'AlmerysController.getCongeAnnuelAlm',
  '/qual_almerys':'AlmerysController.alm_vol_qual',
    // HEURE NON PROD
  '/PageHeurePauseAlmerys':'AlmerysController.PageHeureNonProdAlmerys',
  '/getlistHeureNonProductifAlmerys':'AlmerysController.getListHeureNonProdAlmerys',
 
 
 
  //Dashboard
  '/dash_suivis':'DashboardController.dashboardSuivis',
  '/graphe_suivis':'DashboardController.grapheSuivis',
  '/capt':'CapController.capt',
  '/get_data_dash_suivis':'DashboardController.getDataDashboardSuivis',
 
  /*      GESTION RESERVATION   */
  //'/reservation/nouveau':'ReservationSalleController.Nouveau_reservation',
  '/reservation/ajout_reservation':'ReservationSalleController.Ajout_Reservation',
  '/reservation/index':'ReservationSalleController.index',
  '/reservation/filtre':'ReservationSalleController.filtre',
  '/reservation/modifier/':'ReservationSalleController.modifier',
  '/reservation/suppression/':'ReservationSalleController.supprimer',
  //Reservetion /datedeb
  '/getLsReservationDate': 'ReservationSalleController.getLsReservationDate',
  '/getLsPersonneReservation': 'ReservationSalleController.getLsPersonneReserve',
 
  //G********************    OSTIE    **********************
  '/reservation_ostie/index':'ReservationOstieController.index',
  '/ostie':'ReservationOstieController.ostie',
  '/reservation_ostie/ajout':'ReservationOstieController.ajout_r_Ostie',
  '/update_ostie_reservation/':'ReservationOstieController.Fini_rdv',
  '/update_etat_ostie':'ReservationOstieController.update_etat_ostie',
  '/annuler_ostie_reservation/':'ReservationOstieController.Annuler',
  '/notification_ostie':'SocketServerController.notifyOstie',
  '/notification_op_ostie':'SocketServerController.notifyOpOstieV2',
  '/notification_ostie_web':'SocketServerController.notifyWebOstie',
  '/commencer_ostie_reservation/':'ReservationOstieController.commencer',
  '/json_ostie':'ReservationOstieController.getJsonOstie',
  '/recap_ostie':'ReservationOstieController.recap',
  '/ajaxOstieCP':'AjaxController.ajaxOstieCP',
  'get /ajaxLCOP':'AjaxController.ajaxSLast',
 
 
  //Webapp for GPAO
  '/indexGpao':'WebAppController.index',
 
  //Gestion horaire
  '/GestionHoraire': 'GestionHoraireController.getDataGestionHoraire',
  '/GestionHoraireAlmerys': 'GestionHoraireController.getDataGestionHoraireAlmerys',
  '/exportHoraire': 'GestionHoraireController.getXlGestionHoraire',
  '/exportHoraireAlmerys': 'GestionHoraireController.getXlGestionHoraireAlmerys',
  'get /getLsHoraire': 'GestionHoraireController.getLsHoraire',
  '/setNomPrenom' : 'GestionHoraireController.setXlNomPrenom',
 
 
  // Almerys Cq fonctionalité
  '/cq_almerys': 'CQAlmController.index',
  '/rp_almerys': 'CQAlmController.reporting',
  '/suivi_indicateur_prod' : 'CQAlmController.suiviIndicateur',
  '/gestion_frequence' : 'CQAlmController.gestionFrequence',
  '/rp_frequence_suivi_by_jour' : 'CQAlmController.recupererControleByJour',
  'post /update_frequence_by_jour' : 'CQAlmController.updateControleByJour',
  '/rp_frequence_suivi_by_date' : 'CQAlmController.recupererControleByDate',
  'post /update_frequence_by_date' : 'CQAlmController.insererControleByDate',
  'post /delete_date_from_frequence' : 'CQAlmController.deleteSpecificDate',
  '/rp_data': 'CQAlmController.getLdtBySpec',
  '/rp_datas': 'CQAlmController.getLdtBySSpec',
  '/cq_almerys_user': 'CQAlmController.users',
  '/modif_cible': 'CQAlmController.ModifCible',
  '/getspecialite': 'CQAlmController.loadSpecialite',
  '/getspecialiteCall': 'CQAlmController.loadSpecialiteCall',
  '/getsouspecialite': 'CQAlmController.loadSousSpecialite',
  '/getTraitement': 'CQAlmController.loadTraitement',
  '/getTache': 'CQAlmController.loadTache',
  '/getsat': 'CQAlmController.loadSAT',
  '/loadDistinction': 'CQAlmController.loadDistinction',
  '/getsatall': 'CQAlmController.loadSATAll',
  '/getcategorie': 'CQAlmController.loadCAT',
  '/getetat': 'CQAlmController.loadETAT',
  '/getetape': 'CQAlmController.loadETAPE',
  '/getetapeSolimu' : 'CQAlmController.loadETAPESOLIMU',
  '/getmotif': 'CQAlmController.loadMOTIF',
  '/getErreur': 'CQAlmController.loadERREUR',
  '/getlistcq': 'CQAlmController.loadCQAlm',
 // '/export_cq': 'CQAlmController.ExportCq',
  '/export_cq' : 'CQAlmController.exportListeCq',
  '/loadCQUpdated': 'CQAlmController.loadCQUpdated',
  '/updateCQ': 'CQAlmController.updateCQLot',
  '/getCQEtat': 'CQAlmController.getCQEtat',
  '/getPopulation': 'CQAlmController.getPop',
  '/setPop': 'CQAlmController.setPop',
  '/getLsMat': 'CQAlmController.getLsMat',
  '/getLsMatPara': 'CQAlmController.getLsMatPara',
  '/get_ech_by_mat': 'EchantillonController.get_ech_by_mat',
  '/getLsCQMat': 'CQAlmController.getLsCQMat',
  '/addCQ': 'CQAlmController.addCQ',
  '/removeCQ': 'CQAlmController.removeCQ',
  '/getclientalmcq': 'CQAlmController.getclientAlmcq',
  '/alm_cq/checkPresenceOpSaisie' : 'CQAlmController.CheckPresenceOpSaisie',
  '/grille/anomalies' : 'CQAlmController.recupererAnomalies',
  '/grille/type-grille' : 'CQAlmController.recupererTypeGrille',
  'post /grille/enregistrer' : 'CQAlmController.enregistrerGrille',
  'post /grille/update' : 'CQAlmController.updateGrille',
 
  //partie suivi prod almerys
  '/alm_suivi_prod/getListePrevision' : 'CQAlmController.getPrevision',
  'post /alm_suivi_prod/updatePrevision' : 'CQAlmController.updatePrevision',
 
  //Echantillonage
 
  '/setEchantillons': 'CQAlmController.setEchantilon',
  '/alm_param': 'EchantillonController.index',
  '/save_ech': 'EchantillonController.save_population_al',
  '/get_popu': 'EchantillonController.get_pop',
  '/add_ech_by_mat': 'EchantillonController.add_ech_by_mat',
  '/get_nb_by_lot': 'EchantillonController.get_nb_by_lot',
  '/set_echant_by_op': 'EchantillonController.set_echant_by_op',
  '/launch': 'EchantillonController.launch',
  '/del_ech_by_mat': 'EchantillonController.del_ech_by_mat',
  '/get_list_param': 'EchantillonController.get_list_param',
  '/gpao_modif': 'GpaoController.index',
 
  /**
   * Masque call
   * */
 
  '/masque': 'AlmerysUserNewController.index',
  '/masqueCodelis': 'AlmerysUserNewController.indexCodelis',
  '/masqueAS': 'AlmerysUserNewController.indexAS',
  '/masqueDoctocare': 'AlmerysUserNewController.indexDoctocare',
  '/masqueBriant': 'AlmerysUserNewController.indexBriant',
  '/masqueEole': 'AlmerysUserNewController.indexEole',
  '/masqueIsoEole': 'AlmerysUserNewController.indexIsoEole',
  '/masqueTpmep': 'AlmerysUserNewController.indexTpmep',
  '/import': 'StatistiqueController.import',
  '/uploadExcel': 'StatistiqueController.uploadExcel',
 
  'get /getLsTCdetails':'AlmerysUserNewController.getListeTCdetails',
  '/getLsCRCdetails':'AlmerysUserNewController.getListeCRCdetails',
  'get /getLsMotifAppel':'MotifAppelController.getListeMotifAppel',
  '/getLsSpecialiteMasque':'SpecialiteController.getListeSpecialite',
  '/getLsSpecialiteASMasque':'SpecialiteController.getListeSpecialiteAS',
  '/getLsSpecialiteDoctocareMasque':'SpecialiteController.getListeSpecialiteDoctocare',
  '/getLsCampagneAS':'SpecialiteController.getListeCampagneAS',
  '/getLsMotifCRC':'SpecialiteController.getListeMotifCRC',
  '/getLsModeMasque':'ModeController.getListeMode',
  '/getLsModeCRCMasque':'ModeController.getListeModeCRC',
  '/getLsMotifNonConformite':'MotifNonConformiteController.getListeMotifNonConformite',
 
  '/getLsTypeEcoute':'TypeEcouteController.getListeTypeEcoute',
  '/getLsAppreciation':'AppreciationController.getListeAppreciation',
 
 
  '/getLsNumeroEnregistrement':'AlmerysUserNewController.getListeNumeroEnregistrement',
  '/getLsChefEquipe':'AlmerysUserNewController.getListeChefEquipe',
  '/getLsSq':'AlmerysUserNewController.getListeSq',
  '/getListeSqAs':'AlmerysUserNewController.getListeSqAs',
  // url eole masque
  '/getLsUserCRC':'StatistiqueController.getLsUserCRC',
  '/getLsVagueCRC':'StatistiqueController.getLsVagueCRC',
  '/getLsEquipeCRC':'StatistiqueController.getLsEquipeCRC',
  '/getEcouteAllClientEole':'StatistiqueController.getEcouteAllClientEole',
  '/getEcouteAllIsoEole':'StatistiqueController.getEcouteAllIsoEole',
 
  '/getDataTemplateClientEole':'StatistiqueController.getDataTemplateClientEole',
  '/getDataTemplateIsoEole':'StatistiqueController.getDataTemplateIsoEole',
  '/getEcouteEole':'StatistiqueController.getEcouteEole',
  '/getEcouteIsoEole':'StatistiqueController.getEcouteIsoEole',
 
  // fin eole masque
 
  '/enregistrerNotation':'NoteController.enregistrerNote',
 
  '/listeEcoute':'EcouteController.getListeEcoute',
  '/listeEcouteCodelis':'EcouteController.getListeEcouteCodelis',
  '/listeEcouteAS':'EcouteController.getListeEcouteAS',
  '/listeEcouteDoctocare':'EcouteController.getListeEcouteDoctocare',
  '/listeEcouteTpmep':'EcouteController.getlisteEcouteTpmep',
  '/listeEcouteBriant':'EcouteController.getListeEcouteBriant',
  'get /getLsEcoute': 'EcouteController.getListeEcouteTab',
  'get /getLsEcouteCodelis': 'EcouteController.getListeEcouteTabCodelis',
  'get /getLsEcouteAS': 'EcouteController.getListeEcouteTabAS',
  'get /getLsEcouteDoctocare': 'EcouteController.getListeEcouteTabDoctocare',
  'get /getLsEcouteTpmep': 'EcouteController.getListeEcouteTabTpmep',
  'get /getLsEcouteBriant': 'EcouteController.getListeEcouteTabBriant',
  'get /updateEcouteById': 'EcouteController.findEcouteByIdUpdate',
  'get /updateEcouteByIdCodelis': 'EcouteController.findEcouteByIdUpdateCodelis',
  'get /updateEcouteByIdAS': 'EcouteController.findEcouteByIdUpdateAS',
  'get /updateEcouteByIdDoctocare': 'EcouteController.findEcouteByIdUpdateDoctocare',
  'get /updateEcouteByIdTpmep': 'EcouteController.findEcouteByIdUpdateTpmep',
  'get /updateEcouteByIdBriant': 'EcouteController.findEcouteByIdUpdateBriant',
  'get /modifierNotation': 'NoteController.modifierNote',
 
  '/getPonderation':'AlmerysUserNewController.getPonderation',
 
  '/statistique':'StatistiqueController.index',
  '/statistiqueCodelis':'StatistiqueController.indexCodelis',
  '/statistiqueAS':'StatistiqueController.indexAS',
  '/statistiqueDoctocare':'StatistiqueController.indexDoctocare',
  '/statistiqueBriant':'StatistiqueController.indexBriant',
  '/statistiqueEole':'StatistiqueController.indexEole',
  '/statistiqueIsoEole':'StatistiqueController.indexIsoEole',
  '/statistiqueTpmep':'StatistiqueController.indexTpmep',
  '/getLsTC':'StatistiqueController.getLsTC',
  '/getLsTCDoctocare':'StatistiqueController.getLsTCDoctocare',
  '/getLsTCBriant':'StatistiqueController.getLsTCBriant',
  '/getLsCE':'StatistiqueController.getLsCE',
  '/getLsVague':'StatistiqueController.getLsVague',
  '/getEcouteAll':'StatistiqueController.getEcouteAll',
  '/getEcouteAllCodelis':'StatistiqueController.getEcouteAllCodelis',
  '/getEcouteAllAS':'StatistiqueController.getEcouteAllAS',
  '/getEcouteAllDoctocare':'StatistiqueController.getEcouteAllDoctocare',
  '/getEcouteAllTpmep':'StatistiqueController.getEcouteAllTpmep',
  '/getEcouteAllBriant':'StatistiqueController.getEcouteAllBriant',
  '/getProfile':'StatistiqueController.getProfile',
  '/getProfileCRC':'StatistiqueController.getProfileCRC',
  '/getDataTemplate':'StatistiqueController.getDataTemplate',
  '/getDataTemplateCodelis':'StatistiqueController.getDataTemplateCodelis',
  '/getDataTemplateDoctocare':'StatistiqueController.getDataTemplateDoctocare',
  '/getDataTemplateTpmep':'StatistiqueController.getDataTemplateTpmep',
  '/getDataTemplateBriant':'StatistiqueController.getDataTemplateBriant',
  '/getDataTemplateAS':'StatistiqueController.getDataTemplateAS',
  '/getEcoute':'StatistiqueController.getEcoute',
  '/getEcouteCodelis':'StatistiqueController.getEcouteCodelis',
  '/getEcouteDoctocare':'StatistiqueController.getEcouteDoctocare',
  '/getEcouteBriant':'StatistiqueController.getEcouteBriant',
  '/getEcouteAS':'StatistiqueController.getEcouteAS',
  '/getEcouteTpmep':'StatistiqueController.getEcouteTpmep',
  '/getDataNotation':'StatistiqueController.getDataNotation',
  '/getDataCodelisNotation':'StatistiqueController.getDataCodelisNotation',
  '/getDataDoctocareNotation':'StatistiqueController.getDataDoctocareNotation',
  '/getDataBriantNotation':'StatistiqueController.getDataBriantNotation',
  '/getDataAsNotation':'StatistiqueController.getDataAsNotation',
  '/getDataEoleNotation':'StatistiqueController.getDataEoleNotation',
  '/getDataIsoEoleNotation':'StatistiqueController.getDataIsoEoleNotation',
  '/exportEvaluation':'StatistiqueController.ExportEvaluation',
 
/**
 * Get date now
 */
'/getDateNow':'StatistiqueController.getDateNow',
 
/*
 * SUIVI ECOUTE
 */
'/suiviEcoute':'SuiviEcouteController.index',
'/getSuiviEcoute':'SuiviEcouteController.getSuiviEcoute',
'/getSuiviEcouteSemaine':'SuiviEcouteController.getSuiviEcouteSemaine',
'/modifierCommentaireSuivi':'SuiviEcouteController.modifierCommentaireSuivi',
'/getLSSQ':'StatistiqueController.getLSSQ',
 
/*
 * FIN SUIVI ECOUTE
 */
 
  /*
  * PRIME
  * **/
  '/prime':'PrimeController.index',
  '/loadData':'PrimeController.loadData',
  '/addLine':'PrimeController.addLine',
  '/updatePrime':'PrimeController.updatePrime',
  '/loadDataZoom':'PrimeController.loadDataZoom',
  '/primeZoom':'PrimeController.zoom',
  '/primeSetting':'PrimeController.setting',
  '/saveCible':'PrimeController.save',
 
 
  /*
   DETOURAGE
   */
  //Main Activi
  '/Detourage/index':'DetourageController.index',
  '/Detourage/NouveauSaisi':'DetourageController.Nouveau_Saisi_Mail',
  '/Detourage/Ajout_Nouveau_Saisi':'DetourageController.Insertion_Nouveau_Saisi_Mail',
  '/Detourage/Export_Excel_Saisi':'DetourageController.ExportCsv_saisi_mail',
  //Client
  '/Detourage/NouveauClient':'DetourageController.AjoutClient',
  '/Detourage/ModifierClient':'DetourageController.ModifierClient',
  '/Detourage/SupprimerClient':'DetourageController.SupprimerClient',
  //Traite
  '/Detourage/NouveauTraite':'DetourageController.AjoutTraite',
  '/Detourage/ModifierTraite':'DetourageController.ModifierTraite',
  '/Detourage/SupprimerTraite':'DetourageController.SupprimerTraite',
  //Priorite
  '/Detourage/Modif_Priorite':'DetourageController.ModifPriorite',
 
  // reporting_conge
  '/Detourage/reporting':'DetourageController.reporting',
  '/Detourage/synthese':'DetourageController.synthese',
  '/Detourage/rapportCq':'DetourageController.rapportCq',
  '/Detourage/saveVitesseEquilibre':'DetourageController.saveVitesseEquilibre',
 
 
 
  '/getssouspecialite': 'CQAlmController.loadSSousSpecialite',
  '/load_restriction_etape': 'GpaoController.loadRestrictionEtape',
  '/load_restriction_tache': 'GpaoController.listRestrictionTache',
  '/load_restriction_distinction': 'GpaoController.listRestrictionDistinction',
 
  '/rp_data_vit': 'CQAlmController.getLdtBySpec_vit',
  '/ldt_by_dossier' : 'CQAlmController.getLdtByDossier',
  '/vit_by_date' : 'CQAlmController.getVitBydate',
  '/getsssouspecialite': 'CQAlmController.loadSSSousSpecialite',
 
  '/update_pointage': 'PresenceController.updatePointageJour',
  '/validate_pointage': 'PresenceController.validatePointageJour',
 
// liste pers
  'get /getLsPers': 'PersonnelController.getListePersTab',
  'get /getPhotoPers': 'PersonnelController.getPhotoPers',
  '/listePersonnel':'PersonnelController.getListePersonnel',
  '/getLsDepartementPers':'PersonnelController.getListeDepartement',
  '/getLsFonction':'PersonnelController.getListeFonction',
 
 
//enregistrer notation NA
  '/enregistrerNotationNA':'NoteController.enregistrerNoteNA',
 
  '/modifierNotationNA':'NoteController.modifierNoteNA',
 
 
  '/insertHoraire':'GestionHoraireController.getListUserToInsertTime',
  '/vueHoraire':'GestionHoraireController.vueGestionHoraire',
  '/saveGh':'GestionHoraireController.saveGh',
  '/real_gestion_horaire':'GestionHoraireController.realGestionHoraire',
 
  /*
  * Gestion Congée
  * */
 
  '/reporting_conge':'GestionCongeController.reporting',
 
  /*
  * Gestion HS
  * */
 
  '/gestion_hs':'GestionHSController.index',
  '/gestion_hr':'GestionHoraireController.ghoraire',
  '/gestion_hr_moment':'GestionHoraireController.ghoraireForMoment',
 
  '/saveHS':'GestionHSController.saveHS',
  '/addAllLineForOneYears':'GestionHSController.addAllLineForOneYears',
 
  /*
  * Data gestion horaire
  * */
 
  '/get_r_pointage_jour':'GestionHoraireController.getRPointageJour',
  '/export_gh':'GestionHoraireController.export_gh',
 
 
 
/**
 * verification numero enregistrement
 */
 'get /getIfNumEnregistrementExist': 'NoteController.verifierNumeroEnregistrement',
 
   /*
	PLAN 2 D SERVICE
   */
  '/getCoordonneeWithLogOn': 'Plan2dController.getCoordonneeWithLogOn',
  '/changePlanDonneeBaseDeDonnee': 'Plan2dController.changePlanDonneeBaseDeDonnee',
  '/changePlanDonneeBaseDeDonneeWithPersonne': 'Plan2dController.changePlanDonneeBaseDeDonneeWithPersonne',
 
 
  '/plan2d': 'Plan2dController.index',
 
  '/initDataDossier': 'DossierController.initDataDossier',
 
  // centralisation des données
  '/centralisation/index':'CentralisationController.index',
  '/centralisation/ajaxByDossier':'CentralisationController.ajaxCentralisationGlobale',
  '/centralisation/vitesse_qualite':'CentralisationController.vitesse_qualite',
  '/centralisation/consommation_dossier':'CentralisationController.consommation_dossier',
  '/centralisation/ajaxByLotClient':'CentralisationController.ajaxByLotClient',
  '/centralisation/ajaxSelectionDossier':'CentralisationController.ajaxSelectionDossier',
 
  '/centralisation/ajaxData':'CentralisationController.ajaxData',
 
  // SERVICE AJAX OSM
  '/getCoordonneeOSM':'OSMController.getall',
  '/setCoordonneeOSM':'OSMController.insert',
  '/viewOSM':'OSMController.index',
  '/getInfoPersOSM':'OSMController.getInfoPersonne',
  '/getPoleOSM':'OSMController.getPole',
  '/exportDataOSM': 'OSMController.ExportData',
 
 
  // CALL REPORTING HEURE PAUSE
  '/PageHeurePauseCall':'AlmerysCallController.PageHeureNonProdCall',
  '/getlistHeureNonProductifCallAlmerys': 'AlmerysCallController.getListHeureNonProdCall',
  // REPORTING DOSSIER FLEXI CAPTURE
  '/dossierflexicap/index' : 'ClassiqueController.ReportinIndex',
  '/GetspecialiteDossierFlexi': 'ClassiqueController.GetListDossierFlexi',
  '/dossierflexicap/GetDataDossier': 'ClassiqueController.GetDataDossierFlexiCap',
  '/testExportFlexiFusion': 'ClassiqueController.TestFusionDynamiqueCellule',
 
  // GESTION ACCES PRIVILEGE MODIFICATION JO
  '/gestion_acces/index' : 'AdminController.IndexGestionAccesHR',
  '/gestion_acces/listPersonneAcces' : 'AdminController.listPersonneAcces',
  '/gestion_acces/listDataAcces' : 'AdminController.listDataAcces',
 
 
  // STATISTIQUE SOLIMU
  // -- Lalaina Statistique
  '/solimu/statistique/index' : 'SolimuController.IndexStatistique',
  '/solimu/statistique/getDonneeSaisie' : 'SolimuController.getDonneeSaisie',
  // -- piraudon attente Heure Statistique
  // SOLIMU CQ
  '/solimu/cq/index' : 'SolimuController.IndexCQ',
  '/solimu/cq/getEchantillon' : 'SolimuController.getDonneeEchantillon',
  '/solimu/cq/statistique_op' : 'SolimuController.IndexStatistiqueOP',
  //'/solimu/cq/getEchantillon' : 'SolimuController.getDonneeEchantillon',
  // SOLIMU REPORTING HORAIRE
  '/solimu/reporting/index' : 'SolimuController.IndexReporting',
  '/solimu/reporting/getStatistique' : 'SolimuController.getDonneeReporting',
  // SOLIMU AFFICHAGE LOT AVANCER
  '/solimu/lot/index' : 'SolimuController.IndexLot',
  '/solimu/lot/getDonneeLot' : 'SolimuController.getDonneeLot',
  // SOLIMU AFFICHAGE REPORTING VOLUME PDF
  '/solimu/reporting_volume_pdf/index' : 'SolimuController.IndexVolumePdf',
  '/solimu/reporting_volume_pdf/getVolumepdf' : 'SolimuController.getDonneeReportingPdf',
  // SOLIMUT AFFICHAGE REPORTING OP
  '/solimut/reporting_op/index' : 'SolimuController.IndexReportingOP',
  '/solimut/reporting_op/getDonneeReportingOpSaisie' : 'SolimuController.getDonneeReportingOpSaisie',
  '/solimut/reporting_op/getDonneeReportingOpSaisieParMatricule' : 'SolimuController.getDonneeReportingOpSaisieParMatricule',
  '/solimut/reporting_op/test-dispatch': 'SolimuController.testBatchDispatch',
  // WEB SERVICE CHAT
  //'/chat/insert/' : 'WebServiceController.Insert_chat',
 
 
 
 
  // TRAITEMENT REMONTE CALL TICKETING
  '/call/ticketing/remonte/index' : 'AlmerysCallController.PageTraitementRemonte',
  '/call/ticketing/remonte/get-donnee-remonte' : 'AlmerysCallController.getListTraitementRemontée',
  '/call/ticketing/get-specialite' : 'AlmerysCallController.GetSpecialiteTicketing',
  '/call/ticketing/get-etat-demande' : 'AlmerysCallController.GetEtatDemandeTicketing',
  '/call/ticketing/get-action-ticket' : 'AlmerysCallController.GetActionTicketing',
  '/call/ticketing/get-client' : 'AlmerysCallController.GetClientTicketing',
  '/call/ticketing/get-demande-ticket' : 'AlmerysCallController.GetDemandeTicketing',
  '/call/ticketing/get-nature-erreur' : 'AlmerysCallController.GetDemandeNatureErreur',
  // ------- GESTION REMONTEE
  '/call/ticketing/remonte/init-traitement-remonte' : 'AlmerysCallController.InitTraitementRemonte',
  '/call/ticketing/remonte/annuler-traitement-remonte' : 'AlmerysCallController.AnnulerTraitementRemontee',
  '/call/ticketing/remonte/valider-traitement-remonte' : 'AlmerysCallController.ValiderTraitementRemontee',
  // ------- REPORTING REMONTE CALL TICKETING
  '/call/ticketing/remonte/get-reporting' : 'AlmerysCallController.GetReportingRemonteeCall',
  // -------- GESTION SAISIE
  '/call/ticketing/saisie/init-traitement-saisie' : 'AlmerysCallController.InitTraitementSaisie',
  // -- meme fonctionnalité que anulation remonte '/call/ticketing/saisie/annuler-traitement-saisie' : 'AlmerysCallController.AnnulerTraitementSaisie',
  '/call/ticketing/saisie/valider-traitement-saisie' : 'AlmerysCallController.ValiderTraitementSaisie',
  // -------- REPORTING SAISIE
  '/call/ticketing/saisie/get-reporting-saisie' : 'AlmerysCallController.GetReportingSaisieCall',
  // -------- GESTION UTILISATEUR REMONTEE CALL TICKETING
  '/call/ticketing/gestionuser/index' : 'AlmerysCallController.PageGestionUtilisateurRemonte',
  '/call/ticketing/get-niveau' : 'AlmerysCallController.GetListNiveauUtilisateurRemonte',
  '/call/ticketing/gestionuser/get-list-utilisateur' : 'AlmerysCallController.GetListUtilisateurRemonteCall',
  '/call/ticketing/gestionuser/insert-new-utilisateur' : 'AlmerysCallController.InsertUtilisateurRemonteCall',
  '/call/ticketing/gestionuser/update-niveau-utilisateur' : 'AlmerysCallController.UpdateNiveauUtilisateurRemonteCall',
  '/call/ticketing/gestionuser/delete-utilisateur' : 'AlmerysCallController.DeleteUtilisateurRemonteCall',

 
  // GGS
  '/getLsCALLdetails':'AlmerysUserNewController.getListeCALLdetails',
  '/getLsQualite':'TypeEcouteController.getListeQualite',
  '/getLsMotifNq':'TypeEcouteController.getListeMotifNq',
  '/getLsEvaluateur':'TypeEcouteController.getListeEvaluateur',
  '/getListeEcouteisoEole':'EcouteController.getListeEcouteTabIsoEole',
  '/listeEcouteIsoEole':'EcouteController.getListeEcouteIsoEole',
  'get /updateEcouteByIdIsoEole': 'EcouteController.findEcouteByIdUpdateIsoEole',
  '/getEcouteAllIsoEoleStat':'StatistiqueController.getEcouteAllIsoEoleStat',
 
  // CSS
  '/masqueCss': 'AlmerysUserNewController.indexCss',
  '/getLsMutuelleDetails':'AlmerysUserNewController.getListeMutuelleDetails',
  '/getLsConformite':'TypeEcouteController.getListeConformite',
  '/getListeEcouteCss':'EcouteController.getListeEcouteTabCss',
  '/listeEcouteCss':'EcouteController.getListeEcouteCss',
  '/getEcouteAllCss':'StatistiqueController.getEcouteAllCss',
  'get /updateEcouteByIdCss': 'EcouteController.findEcouteByIdUpdateCss',
  '/statistiqueCss':'StatistiqueController.indexCss',
  '/getDataTemplateCss':'StatistiqueController.getDataTemplateCss',
  '/getDataCssNotation':'StatistiqueController.getDataCssNotation',
  '/getEcouteCss':'StatistiqueController.getEcouteCss',
  '/getEcouteAllCssStat':'StatistiqueController.getEcouteAllCssStat',
 
   // LAMIE
   '/masqueLamie': 'AlmerysUserNewController.indexLamie',
   '/getListeEcouteLamie':'EcouteController.getListeEcouteTabLamie',
   '/listeEcouteLamie':'EcouteController.getListeEcouteLamie',
   '/getEcouteAllLamie':'StatistiqueController.getEcouteAllLamie',
   'get /updateEcouteByIdLamie': 'EcouteController.findEcouteByIdUpdateLamie',
   '/statistiqueLamie':'StatistiqueController.indexLamie',
   '/getDataTemplateLamie':'StatistiqueController.getDataTemplateLamie',
   '/getDataLamieNotation':'StatistiqueController.getDataLamieNotation',
   '/getEcouteLamie':'StatistiqueController.getEcouteLamie',
   '/getEcouteAllLamieStat':'StatistiqueController.getEcouteAllLamieStat',

 
  // JB AS
  '/masqueBriantAs': 'AlmerysUserNewController.indexBriantAs',
  '/listeEcouteBriantAs':'EcouteController.getListeEcouteBriantAs',
  'get /getLsEcouteBriantAs': 'EcouteController.getListeEcouteTabBriantAs',
  'get /updateEcouteByIdBriantAs': 'EcouteController.findEcouteByIdUpdateBriantAs',
  '/statistiqueBriantAs':'StatistiqueController.indexBriantAs',
  '/getDataTemplateBriantAs':'StatistiqueController.getDataTemplateBriantAs',
  '/getDataBriantAsNotation':'StatistiqueController.getDataBriantAsNotation',
  '/getEcouteBriantAs':'StatistiqueController.getEcouteBriantAs',
  '/getEcouteAllBriantAs':'StatistiqueController.getEcouteAllBriantAs',
 
 
 
  /**
   * Routes GRILLES CQ
   */
  '/get-etapes-grille' : 'CQAlmController.recupererEtapesGrille',
  '/test_cq' : 'CQAlmController.CQAlmTest',
 
 
  //Etat CQ GGS
  '/getTypeEtatCQdetails':'AlmerysUserNewController.getListeTypeEtatCQdetails',
  '/getLsEtatCQdetails':'AlmerysUserNewController.getListeEtatCQdetails',
  '/statistiqueSuiviCQ':'StatistiqueController.indexSuiviCQ',
  '/enregistrerEtatCQ':'NoteController.enregistrerEtatCQ',
  '/getEcouteAllIsoEoleStatCQ':'StatistiqueController.getEcouteAllIsoEoleStatCQ',
 
  '/getDataDoctocareSatisfaitProcedure':'StatistiqueController.getDataDoctocareSatisfaitProcedure',
  /***************************************************************************
   *                                                                          *
   * Custom routes here...                                                    *
   *              /PageHeurePauseAlmerys                                                            *
   * If a request to a URL doesn't match any of the custom routes above, it   *
   * is matched against Sails route blueprints. See `config/blueprints.js`    *
   * for configuration options and examples.                                  *
   *                                                                          *
   ***************************************************************************/
 
};