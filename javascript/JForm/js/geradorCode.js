//https://css-tricks.com/make-a-view-source-button/
//https://stackoverflow.com/questions/14903849/converting-array-of-objects-into-array-of-arrays
//cria o conteudo da tab #source
$(document).ready(function(){
  $('.tabSource').on('click', function(e){
      $('#botoes').hide();
      $(".space").remove();
      //atualiza o conteudo da #source
      $("#source").html("");
      $("<pre />", {
  "html":   '&lt;!DOCTYPE html>\n&lt;html>\n&lt;head>\n\t&ltlink href="css/bootstrap.min.css" rel="stylesheet">\n\t&ltlink href="css/bootstrap-responsive.min.css" rel="stylesheet">\n\t&ltlink href="css/css-custom.css" rel="stylesheet">\n&lt;/head>\n&lt;form method="POST" action="" class="form-horizontal">\n  &ltdiv class="container">\n    &ltdiv class="row">\n\t' + 
      $("#forma")
        .html()
        .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})
        .replace(/button id="remove(.+)\/button/g, '')
        .replace(/button data-toggle(.+)\/button/g, '')
        .replace(/hoverButton/g, '')
        .replace(/style="position: relative; left: 0px; top: 0px;"/g, '')
        .replace(/^\s*[\r\n]/gm, '')
        .replace(/&lt;&gt;/g, '')
        .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>') + 
      '\n    &lt/div>\n  &lt/div>\n&lt;/form>\n&lt;/html>',
      "class": "prettyprint"
     }).appendTo("#source");
      prettyPrint();
  });
});
//gerador do crud
$(document).ready(function (){
    $('.tabCrud').on('click', function(e){
        // var $teste = [];
        var $results = [], $resultsNomes = [], $resultsOption = [], $resultsNumbers = [], $resultsOptionValues = [], $resultsOptionTypes = [], $a_Elements = [];
        $("#crud").html("");
        $('#botoes').hide();
        //mapeia todos os inputs e cria um vetor de objetos
        $('#forma input[name]').each(function() {
          $results.push({
              name: this.name,
              type: this.type
            });
        }).get();
        //mapeia todos os inputs do tipo checkbox e radio
        $('#forma input[type=checkbox],input[type=radio]').each(function() {
          $resultsOptionValues.push({
              name: this.name,
              value: this.value
            });
        }).get();
        //mapeia todos os elementos <a>
        $('#forma a').each(function() {
          $a_Elements.push({
              name: this.name
            });
        }).get();
        //converte para um vetor de strings
        $a_Elements = $a_Elements.map(function (obj) {
          return obj.name;
        });
        $('#forma input[type=tel]').each(function() {
          $resultsOptionTypes.push({
              value: this.value
            });
        }).get();
        //converte para um vetor de strings
        $resultsOptionTypes = $resultsOptionTypes.map(function (obj) {
          return obj.value;
        });
        //vetor para associar os nomes dos tipos checkbox e radio com seus respectivos valores
        var endData=[], dat='', row=[];
        for (var i=0; i<$resultsOptionValues.length; i++) {
            var obj=$resultsOptionValues[i], val='\''+obj.value+'\'';
            if (dat!=obj.name) {
                if (i) endData.push(row);
                dat = obj.name;
                row = [dat, val];
            } else {
                row.push(val);
            }
        }
        //vetor para pegar somente os valores
        endData.push(row);
        var $combineOptionValues = [];
        for (var i = 0; i < endData.length; i++) {    
              //remove o primeiro elemento do vetor        
              endData[i].shift();
              $combineOptionValues[i] = (endData[i]);
        }
        //remove items duplicados
        function remove_duplicates(objectsArray) {
            var usedObjects = {};
            for (var i=objectsArray.length - 1;i>=0;i--) {
                var so = JSON.stringify(objectsArray[i]);
                if (usedObjects[so]) {
                    objectsArray.splice(i, 1);

                } else {
                    usedObjects[so] = true;          
                }
            }
            return objectsArray;
        }
        $results = remove_duplicates($results);
        //cria um vetor de strings para os diferentes tipos de inputs
        $results.map(function(item) {
          if ((item['type'] == "text") || (item['type'] == "color") || (item['type'] == "email") || (item['type'] == "password")) {
            //cria um vetor com tipos texto
            $resultsNomes.push(item['name']);
          } else if ((item['type'] == "checkbox") || (item['type'] == "radio")) {
            //cria um vetor com tipos option
            $resultsOption.push(item['name']);
          } else if ((item['type'] == "number") || (item['type'] == "range")) {
            //cria um vetor com tipos option
            $resultsNumbers.push(item['name']);
          }
        });
        //verifica se a array existe
         if ($resultsOption.length === 0) {
          console.log("Empty array");
         } else {
            $resultsOption = $resultsOption.join(' ');    
            $resultsOption = $resultsOption.replace(/\[\]/g, '');
            $resultsOption = $resultsOption.split(" ");
         }
        //concatena as arrays de strings
        var $mergeNomes = $resultsNomes.concat($resultsNumbers, $resultsOption);
        //cria uma string com os elementos da array
        var $nomesMerged = ("$"+$mergeNomes.join(', $')).replace(/\[\]/g, '');
        var $nomesMergedNormal = ($mergeNomes.join(', ')).replace(/\[\]/g, '');
        var $nomesValues = "\'$"+($mergeNomes.join('\', \'$') + "\'").replace(/\[\]/g, '');
        var $combineOptionValuesMerged = "'"+$combineOptionValues.join('\',');
        var $nomesMergedNormalVetor = $nomesMergedNormal.split(" ");
        var $nomesValuesVetor = $nomesValues.split(" ");
        //cria as variaveis de php
        var $combinarNomes = [];
        for (var i = 0; i < $mergeNomes.length; i++) {            
              $combinarNomes[i] = ("\n\tif (isset($_POST['"+ $mergeNomes[i] +"'])) {\n\t\t$" + $mergeNomes[i] + " = $_POST['" + $mergeNomes[i] + "'];\n\t} else {\n\t\t$" + $mergeNomes[i] + " = '';\n\t}").replace(/\[\]/g, '');
        }
        //modifica as arrays de strings para criar novas variáveis
        var $combinarNomesTables = [], $combinarNomesOo = [], $combinarUpdate = [], $combinarSelecionadas = [], $combinarTitulosCheckboxes = [], $combinarCheckboxesDinamicos = [], $combinarCheckboxesValidation = [], $combinarHidden = [], $combinarNomesSql = [], $combinarNumbersSql = [], $combinarOptionsSql = [] ;
        for (var i = 0; i < $mergeNomes.length; i++) {
                $combinarNomesTables[i] = ("\n\t      &lt;th scope=\"col\">" + $mergeNomes[i] + "&lt;/th>").replace(/\[\]/g, '');
                $combinarNomesOo[i] = ("\n\t    &lt;td>&lt;?=$this->rs[\"" + $mergeNomes[i] + "\"]?>&lt;/td>").replace(/\[\]/g, '');
                $combinarUpdate[i] = ($nomesMergedNormalVetor[i]+"="+$nomesValuesVetor[i]).replace(/\[\]/g, '');
        //$this->sql = "UPDATE produto SET '+$nomesMergedNormal+' = '+$nomesValues+' WHERE id = " . $id;
        }       
        for (var i = 0; i < $resultsOption.length; i++) {
                $combinarHidden[i] = ("\n\t  $popular_" + $resultsOption[i] + " = array(" +  $combineOptionValues[i] + ");").replace(/ \,\)/g, ')').replace(/\[\]/g, '');
                $combinarSelecionadas[i] = ("\n\t  $selecionadas_" + $resultsOption[i] + " = explode(',', $this->rs['" +  $resultsOption[i] + "']);").replace(/ \,\)/g, ')').replace(/\[\]/g, '');
                $combinarCheckboxesDinamicos[i] = ("\n\t  &lt;label>" + $a_Elements[i] + "&lt;/label>&lt;br>&lt;?php\n\t\tforeach ($popular_"+$resultsOption[i]+" as $valor) {\n\t\t?>\n\t\t\t&lt;input type=\""+$resultsOptionTypes[i]+"\" name=\""+$resultsOption[i]+"[]\" value=\"&lt;?=$valor?>\" &lt;?=(in_array($valor, $selecionadas_"+$resultsOption[i]+")?'checked':'')?>> &lt;?=$valor?>&lt;br>\n\t\t&lt;?php } ?>");
                $combinarCheckboxesValidation[i] = ("\n\n\t  if (!empty($" + $resultsOption[i] + ")) {\n\t\t$" +  $resultsOption[i] + " = implode(',', $"+ $resultsOption[i] +");\n\t  } else {\n\t\t$"+ $resultsOption[i] +" = '';\n\t  }").replace(/ \,\)/g, ')').replace(/\[\]/g, '');
        }  
        for (var i = 0; i < $resultsNomes.length; i++) {
                $combinarNomesSql[i] = ("\n\t`" + $resultsNomes[i] + "` varchar(150) NOT NULL").replace(/\[\]/g, '');
        }  
        for (var i = 0; i < $resultsNumbers.length; i++) {
                $combinarNumbersSql[i] = ("\n\t`" + $resultsNumbers[i] + "` int(10) NOT NULL").replace(/\[\]/g, '');
        }  
        for (var i = 0; i < $resultsOption.length; i++) {
                $combinarOptionsSql[i] = ("\n\t`" + $resultsOption[i] + "` varchar(150) NOT NULL").replace(/\[\]/g, '');
        }
        var $mergeSql = $combinarNomesSql.concat($combinarNumbersSql, $combinarOptionsSql);
        //`nome` varchar(150) NOT NULL,
        console.log($mergeSql);
        //unifica as arrays e cria uma unica string 
        $mergeSql = $mergeSql.join(',');
        console.log($mergeSql);
        $combinarNomes = $combinarNomes.join('');
        $combinarNomesTables = $combinarNomesTables.join('');
        $combinarNomesOo = $combinarNomesOo.join('');
        $combinarHidden = $combinarHidden.join('');
        $combinarSelecionadas = $combinarSelecionadas.join('');
        $combinarTitulosCheckboxes = $combinarTitulosCheckboxes.join('');
        $combinarCheckboxesDinamicos = $combinarCheckboxesDinamicos.join('');
        $combinarCheckboxesValidation = $combinarCheckboxesValidation.join('');
        $combinarUpdate = $combinarUpdate.join(' ').replace(/,/g, '');
        $combinarUpdate = $combinarUpdate.split(" ");
        //pega o html dos campos do formulário       
        $(".space").remove();
        var $htmlCadastro = $("#forma")
        .html()
        .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})
        .replace(/button id="remove(.+)\/button/g, '')
        .replace(/button data-toggle(.+)\/button/g, '')
        .replace(/hoverButton/g, '')
        .replace(/&lt;div class="col-12"&gt;&lt;\/div&gt;/g, '')
        .replace(/style="position: relative; left: 0px; top: 0px;"/g, '')
        .replace(/^\s*[\r\n]/gm, '')
        .replace(/&lt;&gt;/g, '')
        .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>');
        $(".space").remove();
        var $htmlEdicao = $("#formaMirror")
        .html()
        .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})
        .replace(/button id="remove(.+)\/button/g, '')
        .replace(/button data-toggle(.+)\/button/g, '')
        .replace(/hoverButton/g, '')
        .replace(/&lt;div class="col-12"&gt;&lt;\/div&gt;/g, '')
        .replace(/style="position: relative; left: 0px; top: 0px;"/g, '')
        .replace(/^\s*[\r\n]/gm, '')
        .replace(/&lt;&gt;/g, '')
        .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>');

        //     $("<pre />", {
        // "html": 'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\nSET AUTOCOMMIT = 0;\nSTART TRANSACTION;\nSET time_zone = "-03:00";\n\n-- --------------------------------------------------------\n\n-- Table structure for table `cadastro`\n\nCREATE TABLE `cadastro` (\n\t`id` int(10) UNSIGNED NOT NULL,'+$mergeSql+'\n) ENGINE=InnoDB DEFAULT CHARSET=latin1;\n\n-- Indexes for table `cadastro`\n\nALTER TABLE `cadastro`\n\tADD PRIMARY KEY (`id`);\n\n-- AUTO_INCREMENT for table `cadastro`\n\nALTER TABLE `cadastro`\n\tMODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;\nCOMMIT;' +
        //   $("#crudAux")
        //     .html()
        //     .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})       
        //     // .replace(/^\s*[\r\n]/gm, '')
        //     .replace(/&lt;&gt;/g, '')
        //     .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>'),
        //   "class": "prettyprint"            
        //    }).appendTo("#crud");

            var sql = 
        'SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";\nSET AUTOCOMMIT = 0;\nSTART TRANSACTION;\nSET time_zone = "-03:00";\n\n-- --------------------------------------------------------\n\n-- Table structure for table `cadastro`\n\nCREATE TABLE `cadastro` (\n\t`id` int(10) UNSIGNED NOT NULL,'+$mergeSql+'\n) ENGINE=InnoDB DEFAULT CHARSET=latin1;\n\n-- Indexes for table `cadastro`\n\nALTER TABLE `cadastro`\n\tADD PRIMARY KEY (`id`);\n\n-- AUTO_INCREMENT for table `cadastro`\n\nALTER TABLE `cadastro`\n\tMODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;\nCOMMIT;'           
           ;

           $('#sql').attr('value',sql);

          var index = '<?php\n\nrequire_once(\"classes/crud.class.php\");\n\n$site = new Crud;\n\nif (isset($_POST[\'cadastrar\'])) {\n\t' + $combinarNomes +   '\n\n\t$site->cadastrar('+ $nomesMerged  +');' + '\n\n } elseif (isset($_GET[\'cadastrarForm\'])) {\n\n\t$site->cadastrarForm();\n\n} elseif (isset($_POST[\'editar\'])) {\n\n\t$id   = $_POST[\'id\'];\t' + $combinarNomes + '\n\n\t$site->editar($id, '+ $nomesMerged +');' + '\n\n} elseif (isset($_POST[\'editarForm\'])) {\n\n\t$id = (int) $_POST[\'id\'];\n\n\t$site->editarForm($id);\n\n} elseif (isset($_POST[\'excluir\'])) {\n\n\t$id = (int) $_POST[\'id\'];\n\n\t$site->excluir($id);\n\n} else {\n\n\t$site->listar();\n\n}\n\n?>';
           $('#indexphp').attr('value',index);
        
        var classes = ('<?php\n\nclass Crud {\n\n\tpublic $local;\n\tpublic $user;\n\tpublic $pass;\n\tpublic $banco;\n\tpublic $conecta;\n\tpublic $prepara;\n\tpublic $rs;\n\tpublic $sql;\n\n\tpublic function __construct(){\n\n\t\t$this->conecta(\'localhost\',\'root\',\'\',\'mercado\');\n\n\t\t$this->header();\n\n\t\t$this->menu();\n\n\t}\n\n\tpublic function __destruct(){\n\n\t\t$this->footer();\n\n\t}\n\n\tpublic function listar(){\n\n\t?>\n\n\t<table class="table">\n\t  <thead>\n\t    <tr>\n\t      <th scope="col">DEL&lt/th>\n\t      <th scope="col">EDIT</th>\n\t      <th scope="col">ID</th>'+$combinarNomesTables +   '\n\t    </tr>\n\t  </thead>\n\t  <tbody>\n\n\t<?php\n\n\t$this->sql       = "SELECT id,'+$nomesMergedNormal+' FROM produto";\n\t$this->prepara   = mysqli_query($this->conecta, $this->sql);\n\twhile ($this->rs = mysqli_fetch_array($this->prepara)) {\n\n\t?>\n\t  <tr>\n\t    <td scope="row">\n\t\t<form method="POST" action="index.php">\n\t\t  <input type="hidden" name="id" value="<?=$this->rs["id"]?>">\n\t\t  <input type="submit" name="excluir" value="X" class="btn btn-danger">\n\t\t</form>\n\t    </td>\n\t    <td scope="row">\n\t\t<form method="POST" action="index.php">\n\t\t  <input type="hidden" name="id" value=" <?=$this->rs["id"]?>">\n\t\t  <input type="submit" name="editarForm" value="Editar" class="btn btn-info">\n\t\t</form>\n\t    </td>\n\t    <td><?=$this->rs["id"]?></td>'+$combinarNomesOo +   '\n\t  </tr>\n\n\t<?php\n\n\t}\n\n\t?>\n\t  </tbody>\n\t</table>\n\n\t<?php\n\n\t}\n\n\tpublic function cadastrar('+$nomesMerged+'){'+$combinarCheckboxesValidation+'\n\t  $this->sql = "INSERT INTO produto ('+$nomesMergedNormal+') VALUES ('+$nomesValues+')";\n\n\t  if(mysqli_query($this->conecta, $this->sql)){\n\t    echo \'<p class="alert alert-success">Cadastrado com sucesso</p>\';  \n\t  } else {\n\t    echo \'<p class="alert alert-danger">deu pau na kombi</p>\';\n\t  }\n\n\t$this->listar();\n\n\t}\n\n\tpublic function cadastrarForm(){\n\n\t  ?>\n\n\t  <form method="POST">\n\t  <div class="container">\n\t    <div class="row">\n\     '+$htmlCadastro+'\n\t      <div class="col-12 form-group"><button type="submit" name="cadastrar" class="btn btn-info">Cadastrar</button></div>\n\t    </div>\n\t  </div>\n\t  </form>\n\t  <?php\n\t}\n\n\tpublic function editar($id, '+$nomesMerged+'){'+$combinarCheckboxesValidation+'\n\n\t  $this->sql = "UPDATE produto SET '+$combinarUpdate+' WHERE id = " . $id;\n\n\t  if(mysqli_query($this->conecta, $this->sql)){\n\t    echo \'<p class="alert alert-success">Editado com sucesso</p>\';\n\t  } else {;\n\t  echo \'<p class="alert alert-danger">deu pau na kombi</p>\';\n\t  };\n\n\t  $this->listar();\n\n\t}\n\n\tpublic function editarForm($id){\n\t  $this->sql = "SELECT id,'+$nomesMergedNormal+' FROM produto WHERE id = " .$id;\n\t  $this->rs  = mysqli_fetch_array(mysqli_query($this->conecta, $this->sql));\n\t'+$combinarSelecionadas+$combinarHidden+$combinarTitulosCheckboxes+'\n\t?>\n\n\t  <form method="POST">\n\t  <div class="container">\n\t    <div class="row"><div>\n\t\t<input type="hidden" name="id" value="<?=$this->rs[\'id\']?>" class="form-group">\n'+$htmlEdicao+'\n'+$combinarCheckboxesDinamicos+'\n\t\t<div class="col-12 form-group"><button type="submit" name="editar" class="btn btn-info">Editar</button></div></div>\n\t    </div>\n\t  </div>\n\t  </form>\n\t  &lt?php\n\t}\n\n\tpublic function excluir($id){\n\n\t  $this->sql = "DELETE FROM produto WHERE id = ".$id;\n\n\t    if(mysqli_query($this->conecta, $this->sql)){\n\t\techo \'<p class="alert alert-success">Excluído com sucesso</p>\';\n\t    } else\n\t\techo \'<p class="alert alert-danger">deu pau na kombi</p>\'; {\n\t    }\n\n\t    $this->listar();\n\t}\n\n\tpublic function conecta($local,$user,$pass,$banco){\n\n\t  $this->conecta = mysqli_connect($local,$user,$pass,$banco);\n\t}\n\n\tpublic function header(){\n\t  ?>\n\n\t\t<!DOCTYPE html>\n\t\t<html>\n\t\t<head>\n\t\t\t<meta charset="utf-8">\n\t\t\t<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n\t\t\t<link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">\n\t\t\t<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">\n\t\t\t<link rel="stylesheet" href="css/bootstrap.min.css">\n\t\t\t<link rel="stylesheet" href="css/estilos.css">\n\t\t\t<link rel="stylesheet" href="css/media.css">\n\t\t\t<title>CRUD</title>\n\t\t</head>\n\t\t<body>\n\n\t\t<div class="container-fluid">\n\t  <?php\n\t}\n\n\tpublic function footer(){\n\n\t  ?>\n\t\t</div>\n\t\t\t<script src="js/jquery-3.3.1.slim.min.js"><\/script>\n\t\t\t<script src="js/popper.min.js"><\/script>\n\t\t\t<script src="js/bootstrap.min.js"><\/script>\n\t\t</body>\n\t\t</html>\n\t  <?php\n\t}\n\n\tpublic function menu(){\n\n\t  ?>\n\n\t\t<p>\n\t\t<nav class="navbar navbar-expand-lg navbar-dark bg-primary">\n\t\t\t<a class="navbar-brand" href="#">CRUD</a>\n\t\t\t<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>\n\t\t\t<div class="collapse navbar-collapse" id="navbarNav">\n\t\t\t  <ul class="navbar-nav">\n\t\t\t    <li class="nav-item">\n\t\t\t\t<a class="nav-link" href="index.php">Listagem</a>\n\t\t\t    </li>\n\t\t\t    <li class="nav-item">\n\t\t\t\t<a class="nav-link" href="?cadastrarForm">Cadastrar</a>\n\t\t\t    </li>\n\t\t\t  </ul>\n\t\t</div>\n\t\t</nav>\n\t\t</p>\n\t  <?php\n\t}\n\n}\n?>').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&lt/g, '<');
           $('#classesphp').attr('value',classes);
        //     $("<pre />", {
        // "html": '&lt;?php\n\nrequire_once(\"classes/crud.class.php\");\n\n$site = new Crud;\n\nif (isset($_POST[\'cadastrar\'])) {\n\t' + $combinarNomes +   '\n\n\t$site->cadastrar('+ $nomesMerged  +');' + '\n\n } elseif (isset($_GET[\'cadastrarForm\'])) {\n\n\t$site->cadastrarForm();\n\n} elseif (isset($_POST[\'editar\'])) {\n\n\t$id   = $_POST[\'id\'];\t' + $combinarNomes + '\n\n\t$site->editar($id, '+ $nomesMerged +');' + '\n\n} elseif (isset($_POST[\'editarForm\'])) {\n\n\t$id = (int) $_POST[\'id\'];\n\n\t$site->editarForm($id);\n\n} elseif (isset($_POST[\'excluir\'])) {\n\n\t$id = (int) $_POST[\'id\'];\n\n\t$site->excluir($id);\n\n} else {\n\n\t$site->listar();\n\n}\n\n?>' +
        //   $("#crudAux")
        //     .html()
        //     .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})       
        //     // .replace(/^\s*[\r\n]/gm, '')
        //     .replace(/&lt;&gt;/g, '')
        //     .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>'),
        //   "class": "prettyprint"   
        //    }).appendTo("#crud");
       
      //     $("<pre />", {
      // "html": '&lt;?php\n\nclass Crud {\n\n\tpublic $local;\n\tpublic $user;\n\tpublic $pass;\n\tpublic $banco;\n\tpublic $conecta;\n\tpublic $prepara;\n\tpublic $rs;\n\tpublic $sql;\n\n\tpublic function __construct(){\n\n\t\t$this->conecta(\'localhost\',\'root\',\'\',\'mercado\');\n\n\t\t$this->header();\n\n\t\t$this->menu();\n\n\t}\n\n\tpublic function __destruct(){\n\n\t\t$this->footer();\n\n\t}\n\n\tpublic function listar(){\n\n\t?>\n\n\t&lt;table class="table">\n\t  &lt;thead>\n\t    &lt;tr>\n\t      &lt;th scope="col">DEL&lt/th>\n\t      &lt;th scope="col">EDIT&lt;/th>\n\t      &lt;th scope="col">ID&lt;/th>'+$combinarNomesTables +   '\n\t    &lt;/tr>\n\t  &lt;/thead>\n\t  &lt;tbody>\n\n\t&lt?php\n\n\t$this->sql       = "SELECT id,'+$nomesMergedNormal+' FROM produto";\n\t$this->prepara   = mysqli_query($this->conecta, $this->sql);\n\twhile ($this->rs = mysqli_fetch_array($this->prepara)) {\n\n\t?>\n\t  &lt;tr>\n\t    &lt;td scope="row">\n\t\t&lt;form method="POST" action="index.php">\n\t\t  &lt;input type="hidden" name="id" value="&lt;?=$this->rs["id"]?>">\n\t\t  &lt;input type="submit" name="excluir" value="X" class="btn btn-danger">\n\t\t&lt;/form>\n\t    &lt;/td>\n\t    &lt;td scope="row">\n\t\t&lt;form method="POST" action="index.php">\n\t\t  &lt;input type="hidden" name="id" value=" &lt;?=$this->rs["id"]?>">\n\t\t  &lt;input type="submit" name="editarForm" value="Editar" class="btn btn-info">\n\t\t&lt;/form>\n\t    &lt;/td>\n\t    &lt;td>&lt;?=$this->rs["id"]?>&lt;/td>'+$combinarNomesOo +   '\n\t  &lt;/tr>\n\n\t&lt;?php\n\n\t}\n\n\t?>\n\t  &lt;/tbody>\n\t&lt;/table>\n\n\t&lt;?php\n\n\t}\n\n\tpublic function cadastrar('+$nomesMerged+'){'+$combinarCheckboxesValidation+'\n\t  $this->sql = "INSERT INTO produto ('+$nomesMergedNormal+') VALUES ('+$nomesValues+')";\n\n\t  if(mysqli_query($this->conecta, $this->sql)){\n\t    echo \'&lt;p class="alert alert-success">Cadastrado com sucesso&lt;/p>\';  \n\t  } else {\n\t    echo \'&lt;p class="alert alert-danger">deu pau na kombi&lt;/p>\';\n\t  }\n\n\t$this->listar();\n\n\t}\n\n\tpublic function cadastrarForm(){\n\n\t  ?>\n\n\t  &lt;form method="POST">\n\t  &lt;div class="container">\n\t    &lt;div class="row">\n\     '+$htmlCadastro+'\n\t      &lt;div class="col-12 form-group">&lt;button type="submit" name="cadastrar" class="btn btn-info">Cadastrar&lt;/button>&lt;/div>\n\t    &lt;/div>\n\t  &lt;/div>\n\t  &lt;/form>\n\t  &lt;?php\n\t}\n\n\tpublic function editar($id, '+$nomesMerged+'){'+$combinarCheckboxesValidation+'\n\n\t  $this->sql = "UPDATE produto SET '+$combinarUpdate+' WHERE id = " . $id;\n\n\t  if(mysqli_query($this->conecta, $this->sql)){\n\t    echo \'&lt;p class="alert alert-success">Editado com sucesso&lt;/p>\';\n\t  } else {;\n\t  echo \'&lt;p class="alert alert-danger">deu pau na kombi&lt;/p>\';\n\t  };\n\n\t  $this->listar();\n\n\t}\n\n\tpublic function editarForm($id){\n\t  $this->sql = "SELECT id,'+$nomesMergedNormal+' FROM produto WHERE id = " .$id;\n\t  $this->rs  = mysqli_fetch_array(mysqli_query($this->conecta, $this->sql));\n\t'+$combinarSelecionadas+$combinarHidden+$combinarTitulosCheckboxes+'\n\t?>\n\n\t  &lt;form method="POST">\n\t  &lt;div class="container">\n\t    &lt;div class="row">&lt;div>\n\t\t&lt;input type="hidden" name="id" value="&lt;?=$this->rs[\'id\']?>" class="form-group">\n'+$htmlEdicao+'\n'+$combinarCheckboxesDinamicos+'\n\t\t&lt;div class="col-12 form-group">&lt;button type="submit" name="editar" class="btn btn-info">Editar&lt;/button>&lt;/div>&lt;/div>\n\t    &lt;/div>\n\t  &lt;/div>\n\t  &lt;/form>\n\t  &lt?php\n\t}\n\n\tpublic function excluir($id){\n\n\t  $this->sql = "DELETE FROM produto WHERE id = ".$id;\n\n\t    if(mysqli_query($this->conecta, $this->sql)){\n\t\techo \'&lt;p class="alert alert-success">Excluído com sucesso&lt;/p>\';\n\t    } else\n\t\techo \'&lt;p class="alert alert-danger">deu pau na kombi&lt;/p>\'; {\n\t    }\n\n\t    $this->listar();\n\t}\n\n\tpublic function conecta($local,$user,$pass,$banco){\n\n\t  $this->conecta = mysqli_connect($local,$user,$pass,$banco);\n\t}\n\n\tpublic function header(){\n\t  ?>\n\n\t\t&lt;!DOCTYPE html>\n\t\t&lt;html>\n\t\t&lt;head>\n\t\t\t&lt;meta charset="utf-8">\n\t\t\t&lt;meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n\t\t\t&lt;link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">\n\t\t\t&lt;link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">\n\t\t\t&lt;link rel="stylesheet" href="css/bootstrap.min.css">\n\t\t\t&lt;link rel="stylesheet" href="css/estilos.css">\n\t\t\t&lt;link rel="stylesheet" href="css/media.css">\n\t\t\t&lt;title>CRUD&lt;/title>\n\t\t&lt;/head>\n\t\t&lt;body>\n\n\t\t&lt;div class="container-fluid">\n\t  &lt;?php\n\t}\n\n\tpublic function footer(){\n\n\t  ?>\n\t\t&lt;/div>\n\t\t\t&lt;script src="js/jquery-3.3.1.slim.min.js">&lt;\/script>\n\t\t\t&lt;script src="js/popper.min.js">&lt;\/script>\n\t\t\t&lt;script src="js/bootstrap.min.js">&lt;\/script>\n\t\t&lt;/body>\n\t\t&lt;/html>\n\t  &lt;?php\n\t}\n\n\tpublic function menu(){\n\n\t  ?>\n\n\t\t&lt;p>\n\t\t&lt;nav class="navbar navbar-expand-lg navbar-dark bg-primary">\n\t\t\t&lt;a class="navbar-brand" href="#">CRUD&lt;/a>\n\t\t\t&lt;button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">&lt;span class="navbar-toggler-icon">&lt;/span>&lt;/button>\n\t\t\t&lt;div class="collapse navbar-collapse" id="navbarNav">\n\t\t\t  &lt;ul class="navbar-nav">\n\t\t\t    &lt;li class="nav-item">\n\t\t\t\t&lt;a class="nav-link" href="index.php">Listagem&lt;/a>\n\t\t\t    &lt;/li>\n\t\t\t    &lt;li class="nav-item">\n\t\t\t\t&lt;a class="nav-link" href="?cadastrarForm">Cadastrar&lt;/a>\n\t\t\t    &lt;/li>\n\t\t\t  &lt;/ul>\n\t\t&lt;/div>\n\t\t&lt;/nav>\n\t\t&lt;/p>\n\t  &lt;?php\n\t}\n\n}\n?>' + 
      //   $("#crudAux")
      //       .html()
      //       .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})       
      //       // .replace(/^\s*[\r\n]/gm, '')
      //       .replace(/&lt;&gt;/g, '')
      //       .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>'),
      //     "class": "prettyprint" 
      //    }).appendTo("#crud");


    }); 
});

