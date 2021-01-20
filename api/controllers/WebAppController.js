/**
 * WebAppController
 *
 * @description :: Server-side logic for managing Webapps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index:function(req,res){
       return res.view('pages/Gpao_web_app/index',{layout:false});
    }
};

