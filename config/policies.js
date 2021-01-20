/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your controllers.
 * You can apply one or more policies to a given controller, or protect
 * its actions individually.
 *
 * Any policy file (e.g. `api/policies/authenticated.js`) can be accessed
 * below by its filename, minus the extension, (e.g. "authenticated")
 *
 * For more information on how policies work, see:
 * http://sailsjs.org/#!/documentation/concepts/Policies
 *
 * For more information on configuring policies, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.policies.html
 */


module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions (`true` allows public     *
  * access)                                                                  *
  *                                                                          *
  ***************************************************************************/

  // '*': true,

  /***************************************************************************
  *                                                                          *
  * Here's an example of mapping some policies to run before a controller    *
  * and its actions                                                          *
  *                                                                          *
  ***************************************************************************/
	// RabbitController: {

		// Apply the `false` policy as the default for all of RabbitController's actions
		// (`false` prevents all access, which ensures that nothing bad happens to our rabbits)
		// '*': false,

		// For the action `nurture`, apply the 'isRabbitMother' policy
		// (this overrides `false` above)
		// nurture	: 'isRabbitMother',

		// Apply the `isNiceToAnimals` AND `hasRabbitFood` policies
		// before letting any users feed our rabbits
		// feed : ['isNiceToAnimals', 'hasRabbitFood']
	// }

  // Authentification Controller
  AuthController : {
    '*': ['isHost']
  },
  // Ajax Controller

  AjaxController : {
    '*': ['isHost']
  },

  // Operateur Controller
  OperateurController : {
    //'*': ['isHost'],
    suivis	: ['isHost','isLoggedIn'],
    suivisByOpAd	: ['isHost','isLoggedIn', 'checkQuota'],
    //getCryptedKey : true,
    //suivisByOp : true,
    //getMoyenneLdt : true,
    //ldtByOpJson : true,
    //loadErreurCq: true,
    //loadListErreurCq : true,
  },

  // Ldt Controller
  LdtController : {
    '*': ['isHost'],
    getLdtByID : ['isHost','isLoggedIn'],
    getVitesseOP : ['isHost','isLoggedIn'],
    getDashData : ['isHost','isLoggedIn'],
    getLsDossier : ['isHost','isLoggedIn'],
    getLsDepartement : ['isHost','isLoggedIn'],
    getLsDepartementGroupe : ['isHost','isLoggedIn'],
    getLsGroupe : ['isHost','isLoggedIn'],
    getGrapheDossier : ['isHost','isLoggedIn'],
    wsGrapheDossier : ['isHost','isLoggedIn'],
    getldtop : ['isHost','isLoggedIn'],
    suivisOp : ['isHost','isLoggedIn','isCpPlus'],
    anomalieOp : ['isHost','isLoggedIn','isCpPlus', 'checkQuota'],
    suivisHeureOp : ['isHost','isLoggedIn','isCpPlus', 'checkQuota'],
    anomalieOp : ['isHost','isLoggedIn','isCpPlus'],
    suivisHeureOp : ['isHost','isLoggedIn','isCpPlus'],
    suivisOpMensuel : ['isHost','isLoggedIn','isCpPlus'],
    createExcelDetailee : ['isHost','isLoggedIn','isCpPlus'],
    DashboardOp : ['isHost','isLoggedIn','isCpPlus'],
  },

  //Menagement Controller
  ManagementController : {
    '*': true,
    getLsDossierAdmin : ['isHost','isLoggedIn','isCpPlus'],
    getPresence : ['isHost','isLoggedIn','isCpPlus'],
    getRetard : ['isHost','isLoggedIn','isCpPlus'],
    getRetardParDepartement : ['isHost','isLoggedIn','isCpPlus', 'checkQuota'],
    getRetardParDepartement : ['isHost','isLoggedIn','isCpPlus'],
    index : ['isHost','isLoggedIn','isCpPlus'],
    dashCp : ['isHost','isLoggedIn','isCpPlus'],
  },

  // Almerys Controller
  AlmerysController : {
    '*': ['isHost'],
    gestion : ['isHost','isLoggedIn','isCpPlus'],
    gestionAjax :['isHost','isLoggedIn','isCpPlus'],
    modifSpec : ['isHost','isLoggedIn','isCpPlus'],
    gestionSpec : ['isHost','isLoggedIn','isCpPlus'],
    stock : ['isHost','isLoggedIn','isCpPlus'],
	  PageHeureNonProdAlmerys: ['isHost','isLoggedIn','isCpPlus', 'checkQuota'],
    PageHeureNonProdAlmerys: ['isHost','isLoggedIn','isCpPlus'],
  },

  AlmerysCallController : {
    '*': ['isHost','isLoggedIn'],
    'PageTraitementRemonte': ['isHost','isLoggedIn', 'isUserRemonteCall'],
    'PageGestionUtilisateurRemonte': ['isHost','isLoggedIn', 'isUserAdminRemonteCall'],
    // getNombreLotAlmerys : ['isHost','isLoggedIn','isCpPlus'],
    getNombreLotAlmerys : ['isHost','isLoggedIn','isCpPlus', 'checkQuota'],
    'GetReportingSaisieCall' : ['isHost','isLoggedIn', 'isUserExportSaisie'],
    PageHeureNonProdCall : ['checkQuota']
  },

  // Lien Operation Dossier Controller
  LienOperDossierController : {
    '*': ['isHost','isLoggedIn'],
    index : ['checkQuota']
  },

  // Dossier Controller
  DossierController : {
    '*': ['isHost','isLoggedIn','isCpPlus'],
  },

  // Etape Controller
  EtapeController : {
    '*': ['isHost','isLoggedIn'],
  },

  // PresenceController
  PresenceController : {
    '*': ['isHost','isLoggedIn'],
    showPhinDbByID :['isHost','isLoggedIn','isAdmin'],
  },

  // DashboardController
  DashboardController : {
    '*': ['isHost','isLoggedIn'],
    dashboardSuivis : ['isHost','isLoggedIn','isCpPlus']
  },

  //
  ReservationSalleController : {
    '*': ['isHost','isLoggedIn'],
  },

  //
  ReservationOstieController : {
    '*': ['isLoggedIn'],
  },

  //
  EchantillonController : {
    '*': ['isHost','isLoggedIn','isCpPlus'],
  },

  //
  AlmerysUserNewController : {
    '*': ['isHost','isLoggedIn']
  },

  //
  MotifAppelController : {
    '*': ['isHost','isLoggedIn']
  },

  //
  SpecialiteController : {
    '*': ['isHost','isLoggedIn']
  },

  //
  StatistiqueController : {
    '*': ['isHost','isLoggedIn'],
    indexDoctocare : ['checkQuota'],
    indexBriantAs : ['checkQuota'],
    indexBriant : ['checkQuota'],
    indexCodelis : ['checkQuota'],
    index : ['checkQuota'],
    indexAS : ['checkQuota'],
    indexIsoEole : ['checkQuota'],
  },

  //
  ModeController : {
    '*': ['isHost','isLoggedIn']
  },

  //
  MotifNonConformiteController : {
    '*': ['isHost','isLoggedIn']
  },


  TypeEcouteController : {
    '*': ['isHost','isLoggedIn']
  },

  AppreciationController : {
    '*': ['isHost','isLoggedIn']
  },

  NoteController : {
    '*': ['isHost','isLoggedIn']
  },

  EcouteController : {
    '*': ['isHost','isLoggedIn']
  },

  SuiviEcouteController : {
    '*': ['isHost','isLoggedIn']
  },

  PrimeController : {
    '*': ['isHost','isLoggedIn']
  },

  DetourageController : {
    '*': ['isHost','isLoggedIn','isCpPlus'],
    reporting : ['checkQuota']
  },

  CQAlmController : {
    '*': ['isHost','isLoggedIn'],
    'index': ['isHost','isLoggedIn','isCq'],
    reporting : ['checkQuota'],
    suiviIndicateur : ['checkQuota']
  },

  GestionHoraireController : {
    '*': ['isHost','isLoggedIn','isCpPlus'],
    realGestionHoraire : ['checkQuota']
  },

  GestionCongeController : {
    '*': ['isHost','isLoggedIn','isCpPlus']
  },

  GestionHSController : {
    '*': ['isHost','isLoggedIn','isCpPlus']
  },

  // plan 2D
  Plan2dController : {
    '*': ['isHost','isLoggedIn','isAdmin'],
	'getCoordonneeWithLogOn':true,
	'changePlanDonneeBaseDeDonnee':true,
	'changePlanDonneeBaseDeDonneeWithPersonne':true
  },
  OSMController : {
    '*':true,
    'index': ['isHost','isLoggedIn','isCpPlus']
  },
  ClassiqueController : {
    '*': ['isHost'],
    'ReportinIndex': ['isHost','isLoggedIn','isCpPlus', 'checkQuota']
    // 'ReportinIndex': ['isHost','isLoggedIn','isCpPlus']
  },
  SolimuController : {
    '*': ['isLoggedIn','isCpPlus'],
    IndexReporting : ['checkQuota'],
    IndexReportingOP : ['checkQuota']
  },

  NeoclesController : {
    '*': ['isHost','isLoggedIn', 'isNeocles', 'isFormateur']
  },

  NeoclesReportingController : {
    '*': ['isHost','isLoggedIn', 'isNeocles']
  },

  NeoclesAdministrationController : {
    '*': ['isHost','isLoggedIn', 'isNeocles', 'isFormateur'],
  },
  CentralisationController : {
    '*' : ['isHost', 'isLoggedIn'],
    consommation_dossier : ['checkQuota'],
    vitesse_qualite : ['checkQuota'],
    Index : ['checkQuota']
  }






};
