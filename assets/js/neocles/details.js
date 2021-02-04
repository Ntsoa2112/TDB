console.log("ticket :" + 20);
for(var i=0; i< 20; i++){
    $("#tache"+i).click(function(){
    if(!$("#che"+i).length){
        $("#chem"+i).append(                   
        $(          
        "<input type='text' name='chem1' id='che"+i+"' required>",
        ));
    }else{
        if($("#che"+i).length){
            $("#che"+i).remove();
        }
    }
    });
}
