/**
 * Plan2dController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  
    // index
  index: function(req, res)
  {
      res.view( 'pages/plan2d', {layout : false});
  },
  getCoordonneeWithLogOn: function(req,res) {
		var plan=req.param('type_plan');
	//	console.log("PLAN VALUE indew ===> "+plan);
	  var query="SELECT id,plan,id_logon,p_logon.id_pers,coordonnee_y,coordonnee_x,key,ip,connected,nom,prenom,adresse_mac FROM plan2d_coordonnee LEFT JOIN p_logon on p_logon.mac_adress=plan2d_coordonnee.adresse_mac LEFT JOIN r_personnel on r_personnel.id_pers=p_logon.id_pers where plan="+plan;
	//		console.log(query);
	   Ldt.query(query, function(er, returnedData) {
	     var arrayObject= [];
	     async.eachSeries(returnedData.rows,function(planVal, outerCB){
         var objetRetour={};
          objetRetour.id=planVal.id;
          objetRetour.plan=planVal.plan;
          objetRetour.id_logon=planVal.id_pers;
          objetRetour.coordonnee_x=planVal.coordonnee_x;
          objetRetour.coordonnee_y=planVal.coordonnee_y;
          objetRetour.key=planVal.key;
          objetRetour.ip=planVal.ip;
          objetRetour.connected=planVal.connected;
          objetRetour.nom=planVal.nom;
          objetRetour.prenom=planVal.prenom;
          objetRetour.adresse_mac=planVal.adresse_mac;
		  
         // if(planVal.id_logon!==null || planVal.id_logon!='undefined' || planVal.id_logon!='' || planVal.id)
         if(Number.isInteger(planVal.id_pers))
          {
            async.series([
              function(callback){
                SocketService.getLdtWithTypeLDT(planVal.id_logon,callback)
              },
              function(callback){
                SocketService.getifHasCongeNow(planVal.id_logon,callback);
              }
            ],function(error,valeurldt){
				//console.log(valeurldt[1]);
              valeurldt[0].forEach(function(dataLDT){
                objetRetour.id_type_ldt= dataLDT.id_type_ldt;
                objetRetour.libelle= dataLDT.libelle;
                objetRetour.productif= dataLDT.productif;
                objetRetour.num_dossier= dataLDT.num_dossier;
                objetRetour.id_etape= dataLDT.id_etape;
                objetRetour.etape_libelle= dataLDT.etape_libelle;
         
              });
			    objetRetour.Statusconge=valeurldt[1].toString();
              arrayObject.push(objetRetour);
              outerCB();
            });
          }
          else
          {
            objetRetour.id_type_ldt= '';
            objetRetour.libelle= '';
            objetRetour.productif= '';
            objetRetour.num_dossier= '';
            objetRetour.id_etape= '';
            objetRetour.etape_libelle= '';
            objetRetour.Statusconge='';
            arrayObject.push(objetRetour);
            outerCB();
          }
       }, function(err,result){
	       // EACH TERMINER
         return res.json(arrayObject);
       });
	   })
  },
  changePlanDonneeBaseDeDonnee: function(req,res) {
		 var	query = "UPDATE plan2d_coordonnee set coordonnee_x="+req.param("x")+",coordonnee_y="+req.param("y")+"  WHERE id="+req.param("id")+"";
		console.log(query);
	   Ldt.query(query, function(er, returnedData) {
		    if(er) return res.badRequest(er);
		   return res.ok(JSON.stringify({status : 'ok'}));
	   })
  },
  changePlanDonneeBaseDeDonneeWithPersonne: function(req,res){
	   var query= "UPDATE plan2d_coordonnee set coordonnee_x="+req.param("x")+",coordonnee_y="+req.param("y")+",adresse_mac='"+req.param('adresse_mac')+"'  WHERE id="+req.param("id")+"";
	   	console.log(query);
	   Ldt.query(query, function(er, returnedData) {
		   if(er) return res.badRequest(er);
		   return res.ok(JSON.stringify({status : 'ok'}));
		});
  },
};

