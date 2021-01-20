$(document).ready(function() {
  $('#mois').MonthPicker({
    SelectedMonth:new Date().getFullYear() +'/' + (new Date().getMonth()+1),
    ShowIcon: false,
    MonthFormat: 'yy/mm',
    Button: false
  });

  convertToWeekPicker($("#sem"));
});

var date_deb = '';
var date_fin = '';

$("#mode").change(function () {
  $("#div-week").removeClass('hidden');
  $("#div-month").removeClass('hidden');
  if(Number(this.value)===0){
    $("#div-month").addClass('hidden');
  }else{
    $("#div-week").addClass('hidden');
  }
})
