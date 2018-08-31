$(document).ready(function() {
  var forma = $('#forma');
  var i = $('#forma').length;
                 
 $(document).on('click', '#addText', function(){
    $('<div class = "space"></div>\n\t\t<div class="col-12 form-group hoverButton editText" id = divText' + i +' value="' + i + '" data-toggle="modal" data-target="#modalText">\n\t\t\t<label id="labelText' + i +'" for="text' + i +'">Texto: </label><span id = "requiredText'+i+'" style="color:red;"></span> <button id="removeText" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none;"><i class="fa fa-close"></i></button>\n\t\t\t<input type="text" class="form-control text' + i +'" id="text' + i +'" name="text' + i +'" value="" placeholder="Digite o seu texto"/> \n\t\t</div>\n').appendTo(forma);
    $('<div class = "space"></div>\n\t\t<div class="col-12 form-group hoverButton editText" id = divText' + i +' value="' + i + '" data-toggle="modal" data-target="#modalText">\n\t\t\t<label id="labelText' + i +'" for="text' + i +'">Texto: </label><span id = "requiredText'+i+'" style="color:red;"></span> <button id="removeText" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none;"><i class="fa fa-close"></i></button>\n\t\t\t<input type="text" class="form-control textA' + i +' text' + i +'" id="text' + i +'" name="text' + i +'" value="<?=$this->rs[\'text'+i+'\']?>" placeholder="Digite o seu texto"/> \n\t\t</div>\n').appendTo(formaMirror);
    i++;
    // updateSource();
    return false;
  }); 
 $(document).on('click', '#removeText', function(){
      if( i > 0 ) {
          //$(this).parent().remove();
          //i--;
          var id = $(this).attr('value');
          $('#divText'+id).fadeOut(300, function(){ 
              $(this).remove();
          });
     }
      return false;
  });
});
$(document).on('click', '.editText', function(){

  // impede que o form envie o post
  event.preventDefault();
  var i = $(this).attr('value');
  // var id = $(this).parent().find("input[type='hidden']").val();
  // var idLabel = $(this).parent().find("input[type='hidden']").val();

  // if (id.match(/^[0-9]+$/) != null) {
  //   id = "text" + id;
  //   idLabel = "labelText" + idLabel;
  // } else{
  //   id = id;
  //   idLabel = idLabel;
  // }
  // pega os dados de forma individual do form
  // var placeholder = $('#text'+id).val();
  var placeholderText = $('.text'+i).attr('placeholder'); 
  var nameText = $('.text'+i).attr('name'); 
  var labelText = document.getElementById('labelText'+i).textContent;
  var widthText = $('.text'+i).width();
  var heightText = $('.text'+i).height();
  var idText = $('.text'+i).attr('id');
  var divText = $('#divText'+i).attr('class').replace(/col-/g, '').replace(/form-group hoverButton editText/g, '');
  var typeText = $('.text'+i).attr('type');
  var requiredText = $('.text'+i).attr('required');

  //atribui um valor para o campo com id fetchHiddenText
  $(fetchHiddenText).val(i);
  // $('#fetchPlaceholderText').attr('placeholder',placeholderText);
  $(fetchPlaceholderText).val(placeholderText);
  // $('#fetchNameText').attr('name',nameText);
  $(fetchNameText).val(nameText);
  // $('#fetchLabelText').attr('value',labelText);
  $(fetchLabelText).val(labelText);
  // $('#fetchWidthText').attr('width',widthText);
  $(fetchWidthText).val(widthText);
  $(fetchHeightText).val(heightText);
  // $('#fetchIdText').attr('name',idText);
  $(fetchIdText).val(idText);
  // $('#fetchDivText').attr('class',divText);
  $(fetchDivText).val(divText);
  // $('#fetchTypeText').attr('type',typeText);
  $(fetchTypeText).val(typeText);
  // $('#fetchRequiredText').attr('required',requiredText);
  if (requiredText == "required") {
  $(fetchRequiredText).val("sim");        
  } else {
  $(fetchRequiredText).val("nao");  
  }
  // $('#salvarText').attr('value',id);
});

$(document).on('click', '#salvarText', function(){
  var inputPlaceholderText = document.getElementById('fetchPlaceholderText');
  var inputLabelText = document.getElementById('fetchLabelText');
  var inputNameText = document.getElementById('fetchNameText');
  var inputWidthText = document.getElementById('fetchWidthText');
  var inputHeightText = document.getElementById('fetchHeightText');
  var inputIdText = document.getElementById('fetchIdText');
  var inputDivText = document.getElementById('fetchDivText');
  var inputTypeText = document.getElementById('fetchTypeText');
  var inputRequiredText = document.getElementById('fetchRequiredText');
  var id = $('#fetchHiddenText').attr('value');
  // var id = $(this).attr('value');
  // alert(id);
  var novoPlaceholderText = inputPlaceholderText.value;
  var novoLabelText = inputLabelText.value;
  var novoNameText = inputNameText.value;
  var novoNameTextMirror = "<?=$this->rs['" + inputNameText.value + "']?>";
  var novoWidthText = parseInt(inputWidthText.value)+26;
  var novoHeightText = parseInt(inputHeightText.value) + 14;
  var novoIdText = inputIdText.value;
  var novoDivText = "col-" + inputDivText.value + " form-group hoverButton editText";
  var novoTypeText = inputTypeText.value;
  var novoRequiredText;

  if ((inputRequiredText.value == 'sim')) {   
    novoRequiredText == "required";
    $('.text'+id).prop('required',true);
    document.getElementById('requiredText'+id).innerHTML = "*";
  } else if ((inputRequiredText.value == 'nao')){
    novoRequiredText == "";        
    $('.text'+id).prop('required',false);
    document.getElementById('requiredText'+id).innerHTML = "";
  }

  $('.text'+id).attr('placeholder',novoPlaceholderText);
  $('.text'+id).attr('name',novoNameText);
  $('.textA'+id).attr('value',novoNameTextMirror);
  $('.text'+id).attr('id',novoIdText);
  $('#divText'+id).attr('class',novoDivText);
  // $('.editText').attr('value', novoIdText);
  // $("#mainTable").css("width", "100");
  $('.text'+id).css("width",novoWidthText);
  $('.text'+id).css("height",novoHeightText);
  $('.text'+id).attr("type",novoTypeText);
  document.getElementById('labelText'+id).innerHTML = novoLabelText;
});

  $(document).ready(function() {
      var forma = $('#forma');
      var i = $('#forma').length;
                     
     $(document).on('click', '#addTextTag', function(){
              $('<div class = "space"></div>\n\t<div class="col-12 form-group hoverButton editTextTag" id = divTextTag' + i +' value= "'+i+'" data-toggle="modal" data-target="#modalTextTag">\n\t\t<h3 id="textTag' + i +'" class="textTag' + i +'">Título: </h3> <button id="removeTextTag" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none; margin-bottom:10px"><i class="fa fa-close"></i></button> \n\t</div>\n').appendTo(forma);
              i++;
              // updateSource();
              return false;
      }); 
     $(document).on('click', '#removeTextTag', function(){
              if( i > 0 ) {
                  //$(this).parent().remove();
                  //i--;
                  var id = $(this).attr('value');
                  $('#divTextTag'+id).fadeOut(300, function(){ 
                      $(this).remove();
                  });
             }
              return false;
      });
  });

    $(document).on('click', '.editTextTag', function(){

      // impede que o form envie o post
      event.preventDefault();
      var i = $(this).attr('value');

      var contentTextTag = $('.textTag'+i).html();
      var idTextTag = $('.textTag'+i).attr('id');
      var typeTextTag = $('.textTag'+i).get(0).tagName.toLowerCase(); 
      var divTextTag = $('#divTextTag'+i).attr('class').replace(/col-/g, '').replace(/form-group hoverButton editTextTag/g, '');
      $(fetchHiddenTextTag).val(i);
      $(fetchContentTextTag).val(contentTextTag);
      $(fetchTypeTextTag).val(typeTextTag);
      $(fetchDivTextTag).val(divTextTag);
      $(fetchIdTextTag).val(idTextTag);
      // alert(contentTextTag);

    });
    var i = 0;
    $(document).on('click', '#salvarTextTag', function(){
      var id = $('#fetchHiddenTextTag').attr('value');
      var idTextTag = $('.textTag'+id).attr('id');      
      var classTextTag = $('.textTag'+id).attr('class');      
      var inputContentTextTag = document.getElementById('fetchContentTextTag');
      var inputIdTextTag = document.getElementById('fetchIdTextTag');
      var inputDivTextTag = document.getElementById('fetchDivTextTag');
      var inputTypeTextTag = document.getElementById('fetchTypeTextTag');      
      var novoContentTextTag = inputContentTextTag.value;
      var novoIdTextTag = inputIdTextTag.value;
      var novoDivTextTag = "col-" + inputDivTextTag.value + " form-group hoverButton editTextTag";
      var novoTypeTextTag = inputTypeTextTag.value;
      $('.textTag'+id).replaceWith("<"+novoTypeTextTag+" class="+classTextTag+" id="+novoIdTextTag+" "+">"+novoContentTextTag+"</"+novoTypeTextTag+">");
      $('#divTextTag'+id).attr('class',novoDivTextTag);
    });

$(document).ready(function() {
    var forma = $('#forma');
    var i = $('#forma').length;
    
   $(document).on('click', '#addSubmit', function(){
        if (i<2) {
            $('<div class="col-3 form-group inline showhim" id = divSubmit'+i+'><button class="btn btn-success" type="submit" id="submit" style="width: 130; ">Submit</button> <div class= "inline" ><button id="removeSubmit" class="showme btn btn-danger btn-sm" value="' + i + '"><i class="fa fa-close"></button></div></div>').appendTo(forma);
            i++;
            return false;
        }    
    });
    
   $(document).on('click', '#removeSubmit', function(){
                var id = $(this).attr('value');
                $('#divSubmit'+id).fadeOut(300, function(){ 
                    $(this).remove();
                });
                i--;
            return false;
    });
});

$(document).ready(function() {
    var forma = $('#forma');
    var i = $('#forma').length;
    
   $(document).on('click', '#addReset', function(){
        console.log(i);
        if (i<2) {
            $('<div class="col-3 form-group inline showhim" id = divReset'+i+'><button class="btn btn-warning" type="reset" id="reset" style="width: 130; ">Reset</button> <div class= "inline" ><button id="removeReset" class="showme btn btn-danger btn-sm" value="' + i + '" ><i class="fa fa-close"></button></div></div>').appendTo(forma);
            i++;
            return false;
        }
    });
    
   $(document).on('click', '#removeReset', function(){
                var id = $(this).attr('value');
                $('#divReset'+id).fadeOut(300, function(){ 
                    $(this).remove();
                });
                i--;
            return false;
    });
});

$(document).ready(function() {
    var forma = $('#forma');
    var k = $('#forma').length;
    var j = $('.inputsCheckbox').length + 1;
    var divOptionsBox = $('#divOptionsBox');

   $(document).on('click', '#addOptionsBox', function(){
      $('<div class = "space"></div>\n\t<div class="col-12 form-group hoverButton" id = divOptionsBox' + k +' value ="'+k+'">\n\t\t<label class = "editOptionsBox" data-toggle="modal" data-target="#modalOptionsBox" id="labelOptionsBox' + k +'" value = "'+k+'">Checkbox: </label><span id = "requiredOptionsBox'+k+'" style="color:red;"></span> <button id="removeOptionsBox" style="display: none;" class=" btn btn-danger btn-sm" value="' + k + '"> <i class="fa fa-close"></i></button> <button id="addOptionsBoxInput'+ k +'" style="display: none;" class=" addOptionsBoxInput btn btn-success btn-sm" value="'+ k +'"> <i class="fa fa-plus"></i></button> <button id="removeOptionsBoxInput'+ k +'" style="display: none;" class=" removeOptionsBoxInput btn btn-warning btn-sm" value="'+k+'"> <i class="fa fa-minus"></i></button>\n\t\t<div class = "inputsOptionsBox'+ k +'" id = "inputsOptionsBox' + k +'">\n\t\t\t</div>\n\t </div>').appendTo(forma);
      k++;
      return false;
    });

    $(document).on('click', '.addOptionsBoxInput', function(){
      var idOptionsBox = $(this).attr('value');
      var qtde = $('.optionsBox'+idOptionsBox).length + 1;
      $('\n\t\t\t<input type="checkbox" size="20" name="optionsBox'+idOptionsBox+'[]" class="optionsBox'+idOptionsBox+' option'+j+'" value="optionsBox'+j+'" /> \n\t\t\t<span data-toggle="modal" data-target="#modalOptions" class="editOption optionSpan'+idOptionsBox+'" id = "optionSpan'+j+'" value="'+j+'">Opção '+qtde+' <br></span> \n\t\t\t').appendTo(".inputsOptionsBox"+idOptionsBox);
      $('#removeCheckboxInput'+idOptionsBox).attr('value',idOptionsBox);
      j++;
      return false;
    });

    $(document).on('click', '.editOption', function(){
      // impede que o form envie o post
      event.preventDefault();
      var i = $(this).attr('value');
      var idOption = $('#optionSpan'+i).attr('id');
      var valueOption = $('.option'+i).attr('value');
      var contentOption = $('#optionSpan'+i).html().replace(/<br>/g, '').trim();
      $(fetchOption).val(contentOption);
      $(fetchValue).val(valueOption);
      $(fetchHiddenOption).val(i);
    });

    var i = 0;
    $(document).on('click', '#salvarOption', function(){
      var id = $('#fetchHiddenOption').attr('value');
      var inputOptionSpan = document.getElementById('fetchOption');    
      var valueOption = document.getElementById('fetchValue');    
      var novoOptionSpan = inputOptionSpan.value;
      var novoValue = valueOption.value;
      // $('#optionSpan'+id).attr('class',novoDivTextTag);
      $('#optionSpan'+id).html(novoOptionSpan + "<br>");
      // document.getElementById('#optionSpan'+id).innerHTML = novoOptionSpan + "<br>";
      $('.option'+id).attr('value',novoValue);
    });

    $(document).on('click', '.editOptionsBox', function(){
      event.preventDefault();
      var i = $(this).attr('value');
      var labelOptionsBox = document.getElementById('labelOptionsBox'+i).textContent;
      var typeOptionsBox = $('.optionsBox'+i).attr('type');
      var divOptionsBox = $('#divOptionsBox'+i).attr('class').replace(/col-/g, '').replace(/form-group hoverButton/g, '');
      var nameOptionsBox = $('.optionsBox'+i).attr('name').replace(/\[\]/g, '');
      $(fetchHiddenOptionsBox).val(i);
      $(fetchLabelOptionsBox).val(labelOptionsBox);
      $(fetchDivOptionsBox).val(divOptionsBox);
      $(fetchTypeOptionsBox).val(typeOptionsBox);
      $(fetchNameOptionsBox).val(nameOptionsBox);
    });

    var i = 0;
    $(document).on('click', '#salvarOptionsBox', function(){
      var inputLabelOptionsBox = document.getElementById('fetchLabelOptionsBox');
      var inputTypeOptionsBox = document.getElementById('fetchTypeOptionsBox');
      var inputDivOptionsBox = document.getElementById('fetchDivOptionsBox');
      var inputNameOptionsBox = document.getElementById('fetchNameOptionsBox');
      var id = $('#fetchHiddenOptionsBox').attr('value');
      var novoLabelOptionsBox = inputLabelOptionsBox.value;
      var novoTypeOptionsBox = inputTypeOptionsBox.value;
      var novoRequiredOptionsBox;
      var novoDivOptionsBox = "col-" + inputDivOptionsBox.value + " form-group hoverButton";
      var novoNameOptionsBox = inputNameOptionsBox.value +"[]";

      $('#divOptionsBox'+id).attr('class',novoDivOptionsBox);
      $('.optionsBox'+id).attr('name',novoNameOptionsBox);
      $('.optionsBox'+id).attr("type",novoTypeOptionsBox);
      document.getElementById('labelOptionsBox'+id).innerHTML = novoLabelOptionsBox;

    });

    $(document).on('click', '.removeOptionsBoxInput', function(){
      if (j > 1) {
        var idOptionsBox = $(this).attr('value');
        var qtde = $('.optionsBox'+idOptionsBox).length;
        $('.optionsBox'+idOptionsBox).last().remove();
        $('.optionSpan'+idOptionsBox).last().remove();
        j--;
        return false;
      }
    });    

    $(document).on('click', '#removeOptionsBox', function(){
      if( k > 0 ) {
          //$(this).parent().remove();
          //i--;
          var id = $(this).attr('value');
          $('#divOptionsBox'+id).fadeOut(300, function(){ 
              $(this).remove();
          });
     }
      return false;
    });  
});


// function updateSource() {
// $('#source').load(document.URL +  ' #source');
// }
// function updateSource(){
//      var content = $("#source").html();
//      source.setValue(this.cleanContent(content));
//      // source.autoFormatRange(
//      //   { line: 0, ch: 0 },
//      //   { line: source.lastLine()+1, ch: 0 }
//      // );
// }; 

//     function cleanContent(content) {
//      return $("#source")
//          .replace(/\t/, '')
//          .replace(/ ui-draggable| element/gi, '')
//          .replace(/col-4/g, 'lol')
//          .replace(/ data-(.+)="(.+)"/g, '');
//     };

// function copyToClipboard(text) {

//    var textArea = document.createElement( "textarea" );
//    textArea.value = text;
//    document.body.appendChild( textArea );

//    textArea.select();

//    try {
//       var successful = document.execCommand( 'copy' );
//       var msg = successful ? 'successful' : 'unsuccessful';
//       alert('Copying text command was ' + msg);
//    } catch (err) {
//       alert('Oops, unable to copy');
//    }

//    document.body.removeChild( textArea );
// }

// $('#copyHTML').click( function()
//  {
//  });

// $(document).ready(function(){
//     $("#copyHTML").click(function(){
//      var clipboardText = "";
//      clipboardText = $('#source').html();
//      copyToClipboard(clipboardText);
//     });
// }); -->

        //remove elementos duplicados
        // var $uniqueOptions = [];
        // $.each($resultsOption, function(i, el){
        //     if($.inArray(el, $uniqueOptions) === -1) $uniqueOptions.push(el);
        // });
        // var $uniqueNomes = [];
        // $.each($resultsNomes, function(i, el){
        //     if($.inArray(el, $uniqueNomes) === -1) $uniqueNomes.push(el);
        // }); -->