$(document).ready(function() {
    var forma = $('#forma');
    var i = $('#forma').length;
    
 $(document).on('click', '#addButton', function(){
          $('<div class = "space"></div>\n\t\t<div class="col-12 form-group hoverButtonEdit editButton" id = divButton' + i +' value="' + i + '" data-toggle="modal" data-target="#modalButton">\n\t\t\t <button class="btn btn-primary" type="button" name="button' + i +'" id="button'+i+'" style="width: 130;" value = "Primary">Button</button>\n\t\t\t<button id="removeButton" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none;"><i class="fa fa-close"></i></button> <div class= "inline" > \n\t\t</div>\n').appendTo(forma);
          i++;
          return false;  
  });
  
 $(document).on('click', '#removeButton', function(){
      if( i > 0 ) {
          var id = $(this).attr('value');
          $('#divButton'+id).fadeOut(300, function(){ 
              $(this).remove();
          });
     }
      return false;
  });
   $(document).on('click', '.editButton', function(){
    // impede que o form envie o post
    var defaultDanger = 'fetchStyleButtonDanger btn-xs btn btn-danger';
    var defaultDefault = 'fetchStyleButtonDefault btn-xs btn btn-Default';
    var defaultInfo = 'fetchStyleButtonInfo btn-xs btn btn-Info';
    var defaultPrimary = 'fetchStyleButtonPrimary btn-xs btn btn-Primary';
    var defaultWarning = 'fetchStyleButtonWarning btn-xs btn btn-Warning';
    var defaultSuccess = 'fetchStyleButtonSuccess btn-xs btn btn-Success';
    $('#fetchStyleButtonDanger').attr('class',defaultDanger);
    $('#fetchStyleButtonInfo').attr('class',defaultInfo);
    $('#fetchStyleButtonPrimary').attr('class',defaultPrimary);
    $('#fetchStyleButtonWarning').attr('class',defaultWarning);
    $('#fetchStyleButtonSuccess').attr('class',defaultSuccess);
    $('#fetchStyleButtonDefault').attr('class',defaultDefault);
    event.preventDefault();
    var i = $(this).attr('value');
    var nameButton = $('#button'+i).attr('name'); 
    var widthButton = $('#button'+i).width();
    var heightButton = $('#button'+i).height();
    var divButton = $('#divButton'+i).attr('class').replace(/col-/g, '').replace(/ form-group hoverButtonEdit editButton/g, '');
    var typeButton = $('#button'+i).attr('type');
    var styleButton = $('#button'+i).attr('value');
    var classe =  'fetchStyleButton'+styleButton+' btn-xs btn btn-'+styleButton + ' selected';
    
    //atribui um valor para o campo com id fetchHiddenButton
    $(fetchHiddenButton).val(i);
    $(fetchTypeButton).val(typeButton);
    $(fetchNameButton).val(nameButton);
    $(fetchWidthButton).val(widthButton);
    $(fetchHeightButton).val(heightButton);
    $(fetchDivButton).val(divButton);
    $('#fetchStyleButton'+styleButton).attr('class',classe);
  });

     $(document).on('click', '.selected', function(){
        console.log("yes");
     });
  $(document).on('click', '#salvarButton', function(){
    var inputTypeButton = document.getElementById('fetchTypeButton');
    var inputNameButton = document.getElementById('fetchNameButton');
    var inputWidthButton = document.getElementById('fetchWidthButton');
    var inputHeightButton = document.getElementById('fetchHeightButton');
    var inputDivButton = document.getElementById('fetchDivButton');
    var id = $('#fetchHiddenButton').attr('value');
    var novoNameButton = inputNameButton.value;
    var novoWidthButton = parseInt(inputWidthButton.value)+26;
    var novoHeightButton = parseInt(inputHeightButton.value) + 14;
    var novoDivButton = "col-" + inputDivButton.value + " form-group hoverButtonEdit editButton";
    var novoTypeButton = inputTypeButton.value;
    var novoStyleButton = $("#butoesEstilos").find('.selected').val();
    $('#button'+id).attr("value",novoStyleButton);
    novoStyleButton = "btn btn-"+novoStyleButton;
    $('#button'+id).attr('name',novoNameButton);
    novoNameButton = novoNameButton.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
    });
    $('#button'+id).html(novoNameButton);
    $('#divButton'+id).attr('class',novoDivButton);
    $('#button'+id).css("width",novoWidthButton);
    $('#button'+id).css("height",novoHeightButton);
    $('#button'+id).attr("type",novoTypeButton);
    $('#button'+id).attr("class",novoStyleButton);
  });
});

$(document).ready(function() {
  var forma = $('#forma');
  var i = $('#forma').length;
                 
 $(document).on('click', '#addNumber', function(){
    $('<div class = "space"></div>\n\t\t<div class="col-12 form-group hoverButton editNumber" id = divNumber' + i +' value="' + i + '" data-toggle="modal" data-target="#modalNumber">\n\t\t\t<label id="labelNumber' + i +'"">Numero: </label><span id = "requiredNumber'+i+'" style="color:red;"></span> <button id="removeNumber" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none;"><i class="fa fa-close"></i></button>\n\t\t\t<input type="number" class="form-control number' + i +'" id="number' + i +'" name="number' + i +'" value="" min="0" max="100" step="10"/> \n\t\t</div>\n').appendTo(forma);
    $('<div class = "space"></div>\n\t\t<div class="col-12 form-group hoverButton editNumber" id = divNumber_' + i +' value="' + i + '" data-toggle="modal" data-target="#modalNumber">\n\t\t\t<label id="labelNumber_' + i +'"">Numero: </label><span id = "requiredNumber_'+i+'" style="color:red;"></span> <button id="removeNumber" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none;"><i class="fa fa-close"></i></button>\n\t\t\t<input type="number" class="form-control number_' + i +' number' + i +'" id="number' + i +'" name="number' + i +'" value="<?=$this->rs[\'number'+i+'\']?>" min="0" max="100" step="10"/> \n\t\t</div>\n').appendTo(formaMirror);
    i++;
    // updateSource();
    return false;
  }); 
 $(document).on('click', '#removeNumber', function(){
      if( i > 0 ) {
          var id = $(this).attr('value');
          $('#divNumber'+id).fadeOut(300, function(){ 
              $(this).remove();
          });
     }
      return false;
  });
});
  $(document).on('click', '.editNumber', function(){
    // impede que o form envie o post
    event.preventDefault();
    var i = $(this).attr('value');
    var nameNumber = $('.number'+i).attr('name'); 
    var labelNumber = document.getElementById('labelNumber'+i).textContent;    
    var widthNumber = $('.number'+i).width();
    var heightNumber = $('.number'+i).height();
    var idNumber = $('.number'+i).attr('id');
    var divNumber = $('#divNumber'+i).attr('class').replace(/col-/g, '').replace(/form-group hoverButton editNumber/g, '');
    var typeNumber = $('.number'+i).attr('type');
    var requiredNumber = $('.number'+i).attr('required');
    var minNumber = $('.number'+i).attr('min');
    var maxNumber = $('.number'+i).attr('max');
    var stepNumber = $('.number'+i).attr('step');   
    //atribui um valor para o campo com id fetchHiddenNumber
    $(fetchHiddenNumber).val(i);
    $(fetchLabelNumber).val(labelNumber);
    $(fetchNameNumber).val(nameNumber);
    $(fetchWidthNumber).val(widthNumber);
    $(fetchHeightNumber).val(heightNumber);
    $(fetchIdNumber).val(idNumber);
    $(fetchDivNumber).val(divNumber);
    $(fetchTypeNumber).val(typeNumber);
    $(fetchMinNumber).val(minNumber);
    $(fetchMaxNumber).val(maxNumber);
    $(fetchStepNumber).val(stepNumber);
    if (requiredNumber == "required") {
      $(fetchRequiredNumber).val("sim");        
    } else {
      $(fetchRequiredNumber).val("nao");  
    }
  });
  $(document).on('click', '#salvarNumber', function(){

    var inputLabelNumber = document.getElementById('fetchLabelNumber');
    var inputNameNumber = document.getElementById('fetchNameNumber');
    var inputWidthNumber = document.getElementById('fetchWidthNumber');
    var inputHeightNumber = document.getElementById('fetchHeightNumber');
    var inputMinNumber = document.getElementById('fetchMinNumber');
    var inputMaxNumber = document.getElementById('fetchMaxNumber');
    var inputStepNumber = document.getElementById('fetchStepNumber');
    var inputIdNumber = document.getElementById('fetchIdNumber');
    var inputDivNumber = document.getElementById('fetchDivNumber');
    var inputTypeNumber = document.getElementById('fetchTypeNumber');
    var inputRequiredNumber = document.getElementById('fetchRequiredNumber');
    var id = $('#fetchHiddenNumber').attr('value');
    var novoLabelNumber = inputLabelNumber.value;
    var novoNameNumber = inputNameNumber.value;
    var novoNameNumberMirror = "<?=$this->rs['" + inputNameNumber.value + "']?>";
    var novoWidthNumber = parseInt(inputWidthNumber.value)+26;
    var novoHeightNumber = parseInt(inputHeightNumber.value) + 14;
    var novoMinNumber = parseInt(inputMinNumber.value);
    var novoMaxNumber = parseInt(inputMaxNumber.value);
    var novoStepNumber = parseInt(inputStepNumber.value);
    var novoIdNumber = inputIdNumber.value;
    var novoDivNumber = "col-" + inputDivNumber.value + " form-group hoverButton editNumber";
    var novoTypeNumber = inputTypeNumber.value;
    var novoRequiredNumber;
    if ((inputRequiredNumber.value == 'sim')) {   
      novoRequiredNumber == "required";
      $('.Number'+id).prop('required',true);
      document.getElementById('requiredNumber'+id).innerHTML = "*";
      document.getElementById('requiredNumber_'+id).innerHTML = "*";
    } else if ((inputRequiredNumber.value == 'nao')){
      novoRequiredNumber == "";        
      $('.Number'+id).prop('required',false);
      document.getElementById('requiredNumber'+id).innerHTML = "";
      document.getElementById('requiredNumber_'+id).innerHTML = "";
    }
    $('.number'+id).attr('name',novoNameNumber);
    $('.number_'+id).attr('name',novoNameNumber);
    $('.number_'+id).attr('value',novoNameNumberMirror);
    $('.number_'+id).attr('id',novoIdNumber);
    $('.number_'+id).attr('min',novoMinNumber);
    $('.number_'+id).attr('max',novoMaxNumber);
    $('.number_'+id).attr('step',novoStepNumber);
    $('.number'+id).attr('id',novoIdNumber);
    $('.number'+id).attr('min',novoMinNumber);
    $('.number'+id).attr('max',novoMaxNumber);
    $('.number'+id).attr('step',novoStepNumber);
    $('#divNumber'+id).attr('class',novoDivNumber);
    $('#divNumber_'+id).attr('class',novoDivNumber);
    $('.number'+id).css("width",novoWidthNumber);
    $('.number'+id).css("height",novoHeightNumber);
    $('.number'+id).attr("type",novoTypeNumber);
    $('.number_'+id).css("width",novoWidthNumber);
    $('.number_'+id).css("height",novoHeightNumber);
    $('.number_'+id).attr("type",novoTypeNumber);
    document.getElementById('labelNumber'+id).innerHTML = novoLabelNumber;
    document.getElementById('labelNumber_'+id).innerHTML = novoLabelNumber;
  });

$(document).ready(function() {
  var forma = $('#forma');
  var i = $('#forma').length;
                 
 $(document).on('click', '#addText', function(){
    $('<div class = "space"></div>\n\t\t<div class="col-12 form-group hoverButton editText" id = divText' + i +' value="' + i + '" data-toggle="modal" data-target="#modalText">\n\t\t\t<label id="labelText' + i +'" for="text' + i +'">Texto: </label><span id = "requiredText'+i+'" style="color:red;"></span> <button id="removeText" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none;"><i class="fa fa-close"></i></button>\n\t\t\t<input type="text" class="form-control text' + i +'" id="text' + i +'" name="text' + i +'" value="" placeholder="Digite o seu texto"/> \n\t\t</div>\n').appendTo(forma);
    $('<div class = "space"></div>\n\t\t<div class="col-12 form-group hoverButton editText" id = divText' + i +' value="' + i + '" data-toggle="modal" data-target="#modalText">\n\t\t\t<label id="labelText_' + i +'" for="text' + i +'">Texto: </label><span id = "requiredText'+i+'" style="color:red;"></span> <button id="removeText" class=" btn btn-danger btn-sm" value="' + i + '" style="display: none;"><i class="fa fa-close"></i></button>\n\t\t\t<input type="text" class="form-control textA' + i +' text' + i +'" id="text' + i +'" name="text' + i +'" value="<?=$this->rs[\'text'+i+'\']?>" placeholder="Digite o seu texto"/> \n\t\t</div>\n').appendTo(formaMirror);
    i++;
    // updateSource();
    return false;
  }); 
 $(document).on('click', '#removeText', function(){
      if( i > 0 ) {
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
    $(fetchLabelText).val(labelText);
    $(fetchPlaceholderText).val(placeholderText);
    $(fetchNameText).val(nameText);
    $(fetchWidthText).val(widthText);
    $(fetchHeightText).val(heightText);
    $(fetchIdText).val(idText);
    $(fetchDivText).val(divText);
    $(fetchTypeText).val(typeText);
    if (requiredText == "required") {
      $(fetchRequiredText).val("sim");        
    } else {
      $(fetchRequiredText).val("nao");  
    }
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
    $('.text'+id).css("width",novoWidthText);
    $('.text'+id).css("height",novoHeightText);
    $('.text'+id).attr("type",novoTypeText);
    document.getElementById('labelText'+id).innerHTML = novoLabelText;
    document.getElementById('labelText_'+id).innerHTML = novoLabelText;
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
    var k = $('#forma').length;
    var j = $('.inputsCheckbox').length + 1;
    var divOptionsBox = $('#divOptionsBox');

   $(document).on('click', '#addOptionsBox', function(){
      $('<div class = "space"></div>\n\t<div class="col-12 form-group hoverButton" id = divOptionsBox' + k +' value ="'+k+'">\n\t\t<a class = "editOptionsBox" data-toggle="modal" data-target="#modalOptionsBox" id="labelOptionsBox' + k +'" name = "Checkbox:" value = "' + k +'">Checkbox:</a><span id = "requiredOptionsBox'+k+'" style="color:red;"></span> <button id="removeOptionsBox" style="display: none;" class=" btn btn-danger btn-sm" value="' + k + '"> <i class="fa fa-close"></i></button> <button id="addOptionsBoxInput'+ k +'" style="display: none;" class=" addOptionsBoxInput btn btn-success btn-sm" value="'+ k +'"> <i class="fa fa-plus"></i></button> <button id="removeOptionsBoxInput'+ k +'" style="display: none;" class=" removeOptionsBoxInput btn btn-warning btn-sm" value="'+k+'"> <i class="fa fa-minus"></i></button>\n\t\t<div class = "inputsOptionsBox'+ k +'" id = "inputsOptionsBox' + k +'"><input type="hidden" name="optionsBoxHidden'+k+'" class="optionsBoxHidden'+k+'" value="" />\n\t\t\t</div>\n\t </div>').appendTo(forma);
      k++;
      return false;
    });
    $(document).on('click', '.addOptionsBoxInput', function(){
      var idOptionsBox = $(this).attr('value');
      var qtde = $('.optionsBox'+idOptionsBox).length + 1;
      $('\n\t\t\t<input type="checkbox" size="20" name="optionsBox'+idOptionsBox+'[]" class="optionsBox'+idOptionsBox+'" id =  "option'+j+'" value="Opção '+j+'" /> \n\t\t\t<span data-toggle="modal" data-target="#modalOptions" class="editOption optionSpan'+idOptionsBox+'" id = "optionSpan'+j+'" value="'+j+'">Opção '+j+'<br></span> \n\t\t\t').appendTo(".inputsOptionsBox"+idOptionsBox);
      $('#removeCheckboxInput'+idOptionsBox).attr('value',idOptionsBox);
      j++;
      return false;
    });

    $(document).on('click', '.editOption', function(){
      // impede que o form envie o post
      event.preventDefault();
      var i = $(this).attr('value');
      var idOption = $('#optionSpan'+i).attr('id');
      // var valueOption = $('.option'+i).attr('value');
      var contentOption = $('#optionSpan'+i).html().replace(/<br>/g, '').trim();
      $(fetchOption).val(contentOption);
      // $(fetchValue).val(valueOption);
      $(fetchHiddenOption).val(i);
    });

    var i = 0;
    $(document).on('click', '#salvarOption', function(){
      var id = $('#fetchHiddenOption').attr('value');
      var inputOptionSpan = document.getElementById('fetchOption');    
      // var valueOption = document.getElementById('fetchValue');    
      var novoValue = inputOptionSpan.value;
      // $('#optionSpan'+id).attr('class',novoDivTextTag);
      $('#optionSpan'+id).html(novoValue + "<br>");
      // document.getElementById('#optionSpan'+id).innerHTML = novoOptionSpan + "<br>";
      $('#option'+id).attr('value',novoValue);
    });

    $(document).on('click', '.editOptionsBox', function(){
      event.preventDefault();
      var i = $(this).attr('value');
      console.log(i);
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
      $('#labelOptionsBox'+id).attr("name",novoLabelOptionsBox);
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
