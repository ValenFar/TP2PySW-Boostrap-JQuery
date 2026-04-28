$(document).ready(function(){

  $(".card").click(function(){
    $(this).toggleClass("flipped");
  });
  
  $(".estrellas input").click(function(){
    let valor = $(this).attr("id");
    console.log("Seleccionaste: " + valor);
  
  });
});
