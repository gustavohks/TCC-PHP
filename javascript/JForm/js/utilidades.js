//script para o funcionamento das tabs
$('.btn').mouseup(function() { this.blur() })
function openTab(evt, nome) {
    var i, tabcontent, tabcontentSource,  tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    tabcontentSource = document.getElementsByClassName("tabcontentSource");
    tabcontentCrud = document.getElementsByClassName("tabcontentCrud");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    for (i = 0; i < tabcontentSource.length; i++) {
        tabcontentSource[i].style.display = "none";
    }
    for (i = 0; i < tabcontentSource.length; i++) {
        tabcontentCrud[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(nome).style.display = "block";
    evt.currentTarget.className += " active";
}
    document.getElementById("defaultOpen").click();

//mostra os botoes
$(document).ready(function (){
    $('.tabEditor').on('click', function(e){
      $('#botoes').show();
    });
});
//permite arrastar os elementos
$("#forma")
  .sortable({
    placeholder: "element-placeholder",
    start: function(e, ui) {
      ui.item.popover('hide');
    }
})
.disableSelection();


//seleciona o primeiro item do modal
$('#modalText').on('shown.bs.modal', function () {
    $('#fetchLabelText').focus();
}) 
// atribui atalhos para salvar e fechar
var KEYCODE_ENTER = 13;
var KEYCODE_ESC = 27;
$(document).keyup(function(e) {
  if (e.keyCode == KEYCODE_ENTER) $('.salvar').click();
  if (e.keyCode == KEYCODE_ESC) $('.fechar').click();
});

//esconde os botões
$(document).ready(function () {
  $(document).on('mouseenter', '.hoverButton', function () {
      $(this).find(":button").show();
  }).on('mouseleave', '.hoverButton', function () {
      $(this).find(":button").hide();
  });
});   
//esconde os botões
$(document).ready(function () {
  $(document).on('mouseenter', '.hoverButtonEdit', function () {
      $(this).find("#removeButton").show();
  }).on('mouseleave', '.hoverButtonEdit', function () {
      $(this).find("#removeButton").hide();
  });
});    

 $(document).on('click', '.btn-xs', function(){
    var style = $(this).val();
    var classe =  'fetchStyleButton'+style+' btn-xs btn btn-'+style+' selected';
    var defaultDanger = 'fetchStyleButtonDanger btn-xs btn btn-danger';
    var defaultDefault = 'fetchStyleButtonDefault btn-xs btn btn-Default';
    var defaultInfo = 'fetchStyleButtonInfo btn-xs btn btn-Info';
    var defaultPrimary = 'fetchStyleButtonPrimary btn-xs btn btn-Primary';
    var defaultWarning = 'fetchStyleButtonWarning btn-xs btn btn-Warning';
    var defaultSuccess = 'fetchStyleButtonSuccess btn-xs btn btn-Success';
    switch(style) {
    case "Default":
      $('#fetchStyleButton'+style).attr('class',classe);
      $('#fetchStyleButtonDanger').attr('class',defaultDanger);
      $('#fetchStyleButtonInfo').attr('class',defaultInfo);
      $('#fetchStyleButtonPrimary').attr('class',defaultPrimary);
      $('#fetchStyleButtonWarning').attr('class',defaultWarning);
      $('#fetchStyleButtonSuccess').attr('class',defaultSuccess);
        break;
    case "Danger":
      $('#fetchStyleButton'+style).attr('class',classe);
      $('#fetchStyleButtonDefault').attr('class',defaultDefault);
      $('#fetchStyleButtonInfo').attr('class',defaultInfo);
      $('#fetchStyleButtonPrimary').attr('class',defaultPrimary);
      $('#fetchStyleButtonWarning').attr('class',defaultWarning);        
      $('#fetchStyleButtonSuccess').attr('class',defaultSuccess);
        break;
    case "Info":
      $('#fetchStyleButton'+style).attr('class',classe);
      $('#fetchStyleButtonDanger').attr('class',defaultDanger);
      $('#fetchStyleButtonDefault').attr('class',defaultDefault);
      $('#fetchStyleButtonPrimary').attr('class',defaultPrimary);
      $('#fetchStyleButtonWarning').attr('class',defaultWarning);        
      $('#fetchStyleButtonSuccess').attr('class',defaultSuccess);
        break;
    case "Primary":
      $('#fetchStyleButton'+style).attr('class',classe);
      $('#fetchStyleButtonDanger').attr('class',defaultDanger);
      $('#fetchStyleButtonInfo').attr('class',defaultInfo);
      $('#fetchStyleButtonDefault').attr('class',defaultDefault);
      $('#fetchStyleButtonWarning').attr('class',defaultWarning);     
      $('#fetchStyleButtonSuccess').attr('class',defaultSuccess);
        break;
    case "Warning":
      $('#fetchStyleButton'+style).attr('class',classe);
      $('#fetchStyleButtonDanger').attr('class',defaultDanger);
      $('#fetchStyleButtonInfo').attr('class',defaultInfo);
      $('#fetchStyleButtonPrimary').attr('class',defaultPrimary);
      $('#fetchStyleButtonDefault').attr('class',defaultDefault);        
      $('#fetchStyleButtonSuccess').attr('class',defaultSuccess);
        break;
    case "Success":
      $('#fetchStyleButton'+style).attr('class',classe);
      $('#fetchStyleButtonDanger').attr('class',defaultDanger);
      $('#fetchStyleButtonInfo').attr('class',defaultInfo);
      $('#fetchStyleButtonPrimary').attr('class',defaultPrimary);
      $('#fetchStyleButtonWarning').attr('class',defaultWarning);
      $('#fetchStyleButtonDefault').attr('class',defaultDefault);     
        break;
    default:
        
    }
});

