
//https://css-tricks.com/make-a-view-source-button/
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
        var $phpVars = [];
        var $teste = [];
        var $results = [];
        var $resultsNomes = [];
        var $resultsOption = [];
        var $resultsInputValues = [];
        var $resultsInputValuesIsolado = [];
        var $grouped = [];
        var $idsString;
        var $tableVars;
        var $ooVars;
        var $nomesMerged;
        var $nomesMergedNormal;
        var $nomesValues;
        var $hiddenValues;
        var $valuesOptionsString;
        $("#crudAux").html("");
        $("#crud").html("");
        $('#botoes').hide();
        //mapeia todos os inputs e cria uma array de objetos
        $('#forma input[name]').each(function() {
          $results.push({
              name: this.name,
              type: this.type
            });
          $resultsInputValues.push({
              name: this.name,
              type: this.type,
              value: this.value
            });
          // unique

          // percorrer vetor for

          // dentro for

        }).get();

        $('#forma input[type=checkbox]').each(function() {
          $teste.push({
              name: this.name,
              value: this.value
            });
        }).get();

        var endData = [];
        var finalData = [];
        for (var i = 0; i < $teste.length; ++i) {
            var name = $teste[i].name;

            if (endData[name] === undefined)
                endData[name] = [];

            endData[name].push($teste[i].value);
        }

        for (var ed in endData) {
            var a = [ed];

            for (var i = 0; i < endData[ed].length; ++i) {
                a.push(endData[ed][i]);
            }

            finalData.push(a);
        }
        var $combineValues = [];
        for (var i = 0; i < finalData.length; i++) {            
              finalData[i].shift();
              $combineValues[i] = ("\n\t " + finalData[i] + "\n\t");
        }
        $combineValuesMerged = $combineValues.join('');

        console.log($combineValuesMerged);
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
        
        //cria uma array de strings para os diferentes tipos de inputs
        $results.map(function(item) {
          if (item['type'] == "text") {
            //cria uma array com tipos texto
            $resultsNomes.push(item['name']);
          } else if ((item['type'] == "checkbox") || (item['type'] == "radio")) {
            //cria uma array com tipos option
              $resultsOption.push(item['name']);
          }
        });


        //concatena as arrays de strings
        var $mergeNomes = $resultsNomes.concat($resultsOption);  
        //cria uma string com os elementos da array
        $nomesMerged = ("$"+$mergeNomes.join(', $')).replace(/\[\]/g, ''); 
        $nomesMergedNormal = ($mergeNomes.join(', ')).replace(/\[\]/g, '');
        $nomesValues = "\'$"+($mergeNomes.join('\', \'$') + "\'").replace(/\[\]/g, '');
        // $hiddenValues = ($resultsInputValuesIsolado.join(''));
        // $valuesOptionsString = $resultsInputValuesIsolado.join('');
        // console.log($valuesOptionsString);
        //cria as variaveis de php
        var $combinarNomes = [];
        for (var i = 0; i < $mergeNomes.length; i++) {            
              $combinarNomes[i] = ("\n\tif (isset($_POST['"+ $mergeNomes[i] +"'])) {\n\t\t$" + $mergeNomes[i] + " = $_POST['" + $mergeNomes[i] + "'];\n\t} else {\n\t\t$" + $mergeNomes[i] + " = '';\n\t}").replace(/\[\]/g, '');
        }
        $phpVars = $combinarNomes.join('');
        //modifica as arrays de strings para criar novas variáveis
        var $combinarNomesTables = [];
        var $combinarNomesOo = [];
        var $combinarHidden = [];
        var $combinarSelecionadas = [];
        for (var i = 0; i < $mergeNomes.length; i++) {
                $combinarNomesTables[i] = ("\n\t      &lt;th scope=\"col\">" + $mergeNomes[i] + "&lt;/th>").replace(/\[\]/g, '');
                $combinarNomesOo[i] = ("\n\t    &lt;td>&lt;?=$this->rs[\"" + $mergeNomes[i] + "\"]?>&lt;/td>").replace(/\[\]/g, '');
                $combinarSelecionadas[i] = ("\n\t  $selecionadas_" + $mergeNomes[i] + " = explode(',', $this->rs['" +  $mergeNomes[i] + "]);").replace(/ \,\)/g, ')').replace(/\[\]/g, '');
                $combinarHidden[i] = ("\n\t  $popular_" + $mergeNomes[i] + "= array(" +  $resultsInputValuesIsolado[i] + ");").replace(/ \,\)/g, ')').replace(/\[\]/g, '');
        }  
        // console.log($combinarHidden);
        //unifica as arrays e cria uma unica string 
        $tableVars = $combinarNomesTables.join('');
        $ooVars = $combinarNomesOo.join('');
        $hiddenVars = $combinarHidden.join('');
        $selecionadasVars = $combinarSelecionadas.join('');
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

            $("<pre />", {
        "html": '&lt;?php\n\nrequire_once(\"classes/crud.class.php\");\n\n$site = new Crud;\n\nif (isset($_POST[\'cadastrar\'])) {\n\t' + $phpVars +   '\n\n\t$site->cadastrar('+ $nomesMerged  +');' + '\n\n } elseif (isset($_GET[\'cadastrarForm\'])) {\n\n\t$site->cadastrarForm();\n\n} elseif (isset($_POST[\'editar\'])) {\n\n\t$id   = $_POST[\'id\'];\t' + $phpVars + '\n\n\t$site->editar($id, '+ $nomesMerged +');' + '\n\n} elseif (isset($_POST[\'editarForm\'])) {\n\n\t$id = (int) $_POST[\'id\'];\n\n\t$site->editarForm($id);\n\n} elseif (isset($_POST[\'excluir\'])) {\n\n\t$id = (int) $_POST[\'id\'];\n\n\t$site->excluir($id);\n\n} else {\n\n\t$site->listar();\n\n}\n\n?>' +
            $("#crudAux")
              .html()
              .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})
              .replace(/button id="remove(.+)\/button/g, '')
              .replace(/, /g, '')
              .replace(/button data-toggle(.+)\/button/g, '')
              .replace(/hoverButton/g, '')        
              .replace(/style="position: relative; left: 0px; top: 0px;"/g, '')
              .replace(/^\s*[\r\n]/gm, '')
              .replace(/&lt;&gt;/g, '')
              .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>'),
            "class": "prettyprint"
           }).appendTo("#crud");
       
          $("<pre />", {
      "html": '&lt;?php\n\nclass Crud {\n\n\tpublic $local;\n\tpublic $user;\n\tpublic $pass;\n\tpublic $banco;\n\tpublic $conecta;\n\tpublic $prepara;\n\tpublic $rs;\n\tpublic $sql;\n\n\tpublic function __construct(){\n\n\t\t$this->conecta(\'localhost\',\'root\',\'\',\'mercado\');\n\n\t\t$this->header();\n\n\t\t$this->menu();\n\n\t}\n\n\tpublic function __destruct(){\n\n\t\t$this->footer();\n\n\t}\n\n\tpublic function listar(){\n\n\t?>\n\n\t&lt;table class="table">\n\t  &lt;thead>\n\t    &lt;tr>\n\t      &lt;th scope="col">DEL&lt/th>\n\t      &lt;th scope="col">EDIT&lt;/th>\n\t      &lt;th scope="col">ID&lt;/th>'+$tableVars +   '\n\t    &lt;/tr>\n\t  &lt;/thead>\n\t  &lt;tbody>\n\n\t&lt?php\n\n\t$this->sql       = "SELECT id,'+$nomesMergedNormal+' FROM produto";\n\t$this->prepara   = mysqli_query($this->conecta, $this->sql);\n\twhile ($this->rs = mysqli_fetch_array($this->prepara)) {\n\n\t?>\n\t  &lt;tr>\n\t    &lt;td scope="row">\n\t\t&lt;form method="POST" action="index.php">\n\t\t  &lt;input type="hidden" name="id" value="&lt;?=$this->rs["id"]?>">\n\t\t  &lt;input type="submit" name="excluir" value="X" class="btn btn-danger">\n\t\t&lt;/form>\n\t    &lt;/td>\n\t    &lt;td scope="row">\n\t\t&lt;form method="POST" action="index.php">\n\t\t  &lt;input type="hidden" name="id" value=" &lt;?=$this->rs["id"]?>">\n\t\t  &lt;input type="submit" name="editarForm" value="Editar" class="btn btn-info">\n\t\t&lt;/form>\n\t    &lt;/td>\n\t    &lt;td>&lt;?=$this->rs["id"]?>&lt;/td>'+$ooVars +   '\n\t  &lt;/tr>\n\n\t&lt;?php\n\n\t}\n\n\t?>\n\t  &lt;/tbody>\n\t&lt;/table>\n\n\t&lt;?php\n\n\t}\n\n\tpublic function cadastrar('+$nomesMerged+'){\n\n\t  $this->sql = "INSERT INTO produto ('+$nomesMergedNormal+') VALUES ('+$nomesValues+')";\n\n\t  if(mysqli_query($this->conecta, $this->sql)){\n\t    echo \'&lt;p class="alert alert-success">Cadastrado com sucesso&lt;/p>\';  \n\t  } else {\n\t    echo \'&lt;p class="alert alert-danger">deu pau na kombi&lt;/p>\';\n\t  }\n\n\t$this->listar();\n\n\t}\n\n\tpublic function cadastrarForm(){\n\n\t  ?>\n\n\t  &lt;form method="POST">\n\t  &lt;div class="container">\n\t    &lt;div class="row">\n\     '+$htmlCadastro+'\n\t      &lt;div class="col-12 form-group">&lt;button type="submit" name="cadastrar" class="btn btn-info">Cadastrar&lt;/button>&lt;/div>\n\t    &lt;/div>\n\t  &lt;/div>\n\t  &lt;/form>\n\t  &lt;?php\n\t}\n\n\tpublic function editar($id, '+$nomesMerged+'){\n\n\t  $this->sql = "UPDATE produto SET '+$nomesMergedNormal+' = '+$nomesValues+' WHERE id = " . $id;\n\n\t  if(mysqli_query($this->conecta, $this->sql)){\n\t    echo \'&lt;p class="alert alert-success">Editado com sucesso&lt;/p>\';\n\t  } else {;\n\t  echo \'&lt;p class="alert alert-danger">deu pau na kombi&lt;/p>\';\n\t  };\n\n\t  $this->listar();\n\n\t}\n\n\tpublic function editarForm($id){\n\t  $this->sql = "SELECT id,'+$nomesMergedNormal+' FROM produto WHERE id = " .$id;\n\t  $this->rs  = mysqli_fetch_array(mysqli_query($this->conecta, $this->sql));\n\t'+$selecionadasVars+$hiddenVars+'\n\t?>\n\n\t  &lt;form method="POST">\n\t  &lt;div class="container">\n\t    &lt;div class="row">\n\t\t&lt;input type="hidden" name="id" value="&lt;?=$this->rs[\'id\']?>" class="form-group">\n'+$htmlEdicao+'\n\t\t&lt;div class="col-12 form-group">&lt;button type="submit" name="editar" class="btn btn-info">Editar&lt;/button>&lt;/div>\n\t    &lt;/div>\n\t  &lt;/div>\n\t  &lt;/form>\n\t  &lt?php\n\t}\n\n\tpublic function excluir($id){\n\n\t  $this->sql = "DELETE FROM produto WHERE id = ".$id;\n\n\t    if(mysqli_query($this->conecta, $this->sql)){\n\t\techo \'&lt;p class="alert alert-success">Excluído com sucesso&lt;/p>\';\n\t    } else\n\t\techo \'&lt;p class="alert alert-danger">deu pau na kombi&lt;/p>\'; {\n\t    }\n\n\t    $this->listar();\n\t}\n\n\tpublic function conecta($local,$user,$pass,$banco){\n\n\t  $this->conecta = mysqli_connect($local,$user,$pass,$banco);\n\t}\n\n\tpublic function header(){\n\t  ?>\n\n\t\t&lt;!DOCTYPE html>\n\t\t&lt;html>\n\t\t&lt;head>\n\t\t\t&lt;meta charset="utf-8">\n\t\t\t&lt;meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n\t\t\t&lt;link href="https://fonts.googleapis.com/css?family=Nunito+Sans" rel="stylesheet">\n\t\t\t&lt;link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.1.0/css/all.css" integrity="sha384-lKuwvrZot6UHsBSfcMvOkWwlCMgc0TaWr+30HWe3a4ltaBwTZhyTEggF5tJv8tbt" crossorigin="anonymous">\n\t\t\t&lt;link rel="stylesheet" href="css/bootstrap.min.css">\n\t\t\t&lt;link rel="stylesheet" href="css/estilos.css">\n\t\t\t&lt;link rel="stylesheet" href="css/media.css">\n\t\t\t&lt;title>CRUD&lt;/title>\n\t\t&lt;/head>\n\t\t&lt;body>\n\n\t\t&lt;div class="container-fluid">\n\t  &lt;?php\n\t}\n\n\tpublic function footer(){\n\n\t  ?>\n\t\t&lt;/div>\n\t\t\t&lt;script src="js/jquery-3.3.1.slim.min.js">&lt;\/script>\n\t\t\t&lt;script src="js/popper.min.js">&lt;\/script>\n\t\t\t&lt;script src="js/bootstrap.min.js">&lt;\/script>\n\t\t&lt;/body>\n\t\t&lt;/html>\n\t  &lt;?php\n\t}\n\n\tpublic function menu(){\n\n\t  ?>\n\n\t\t&lt;p>\n\t\t&lt;nav class="navbar navbar-expand-lg navbar-dark bg-primary">\n\t\t\t&lt;a class="navbar-brand" href="#">CRUD&lt;/a>\n\t\t\t&lt;button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">&lt;span class="navbar-toggler-icon">&lt;/span>&lt;/button>\n\t\t\t&lt;div class="collapse navbar-collapse" id="navbarNav">\n\t\t\t  &lt;ul class="navbar-nav">\n\t\t\t    &lt;li class="nav-item">\n\t\t\t\t&lt;a class="nav-link" href="index.php">Listagem&lt;/a>\n\t\t\t    &lt;/li>\n\t\t\t    &lt;li class="nav-item">\n\t\t\t\t&lt;a class="nav-link" href="?cadastrarForm">Cadastrar&lt;/a>\n\t\t\t    &lt;/li>\n\t\t\t  &lt;/ul>\n\t\t&lt;/div>\n\t\t&lt;/nav>\n\t\t&lt;/p>\n\t  &lt;?php\n\t}\n\n}\n?>' +
          $("#crudAux")
            .html()
            .replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]})       
            // .replace(/^\s*[\r\n]/gm, '')
            .replace(/&lt;&gt;/g, '')
            .replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi,'<a href="$1">$1</a>'),
          "class": "prettyprint"
         }).appendTo("#crud");
    }); 
});

