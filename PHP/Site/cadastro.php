<?php
require_once"header.php";
require_once"connect.php";
require_once"configuracao.php";
  session_start();

  if (isset($_GET['novo'])) {
    session_destroy();
    session_start();
  $_SESSION['nome'] = '';
  $_SESSION['prependedtext'] = '';
  $_SESSION['cpf'] = '';
  $_SESSION['dtnasc'] = '';
  $_SESSION['sexo'] = '';
  $_SESSION['telefone'] = '';
  $_SESSION['celular'] = '';
  $_SESSION['password'] = '';
  $_SESSION['cep'] = '';
  $_SESSION['rua'] = '';
  $_SESSION['numero'] = '';
  $_SESSION['bairro'] = '';
  $_SESSION['cidade'] = '';
  $_SESSION['estado'] = '';


  }

   ?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
    
	<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
<link href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css">
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="css-custom.css">
<script src="cadastro-js.js"></script>
</head>
<body>
<?php
include_once"menu.php";
?>
<!DOCTYPE html>
<head>
    
</head>
<body>
<form class="form-horizontal" action="validarCadastro.php" method="POST">
<fieldset>
<div class="panel panel-primary text-center">
    <div class="panel-heading" style="width: 25%; border-radius: 900px; background-color: #e6e6e6 ; border: 0px; margin: 0 auto; color: #333333; margin-top: 28px; font-size: 32px; font-family: Impact;">Cadastro de Cliente</div>
    
    <div class="panel-body">
<div class="form-group">
<!--
<div class="form-group">   
<div class="col-md-4 control-label">
    <img id="logo" src="http://blogdoporao.com.br/wp-content/uploads/2016/12/Faculdade-pitagoras.png"/>
</div>
<div class="col-md-4 control-label">
    <h1>Cadastro de Cliente</h1>
    
</div>
</div>
    -->
<div class="col-md-11 control-label"> 
        <p class="help-block"><h11>*</h11> Campo Obrigatório </p>
</div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-2 control-label" for="nome">Nome <h11>*</h11></label>  
  <div class="col-md-8">
  <input id="nome" name="nome"  value="<?=$_SESSION['nome'];?>" class="form-control input-md"  type="text">
  </div>
</div>

<!-- Text input-->
<div class="form-group">
  <label class="col-md-2 control-label" >CPF <h11>*</h11></label>  
  <div class="col-md-2">
  <input id="cpf" name="cpf" value="<?=$_SESSION['cpf'];?>" placeholder="Apenas números" maxlength="11" class="form-control input-md"  type="text" maxlength="11" pattern="[0-9]+$">
  </div>
  
  <label class="col-md-1 control-label" >Nascimento<h11>*</h11></label>  
  <div class="col-md-2">
  <input id="dtnasc" name="dtnasc"  value="<?=$_SESSION['dtnasc'];?>" placeholder="DD/MM/AAAA" class="form-control input-md" required="" type="date" maxlength="10" OnKeyPress="formatar('##/##/####', this)" onBlur="showhide()">
</div>

<!-- Multiple Radios (inline) -->


  <div class="col-md-7" name="sexo" style="width:320px; "> 
    <label class="col-md-3 control-label" style="width: 80px;" >
      Sexo <h11>*</h11>
    </label>
    <label >
      <input name="sexo" value="feminino" type="radio" style="margin-top: 10px;"<?=($_SESSION['sexo'] == 'feminino' ? 'checked' : '')?>>
      Feminino 
    </label>
    <label >
      <input name="sexo" value="masculino" type="radio" style="margin-top: 10px; margin-left: 5px;"<?=($_SESSION['sexo'] == 'masculino' ? 'checked' : '')?>> 
      Masculino
    </label>
  </div>

</div>

<!-- Prepended text-->
<div class="form-group">
  <label class="col-md-2 control-label" for="telefone">Telefone <h11>*</h11></label>
  <div class="col-md-2">
    <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
      <input id="telefone" name="telefone"  value="<?=$_SESSION['telefone'];?>" class="form-control" placeholder="XX XXXXX-XXXX" required="" type="text" maxlength="13" pattern="\[0-9]{2}\ [0-9]{4,6}-[0-9]{3,4}$"
      OnKeyPress="formatar('## ####-####', this)">
    </div>
  </div>
  
    <label class="col-md-1 control-label" for="celular">Celular</label>
     <div class="col-md-2">
    <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-earphone"></i></span>
      <input id="celular" name="celular"  value="<?=$_SESSION['celular'];?>" class="form-control" placeholder="XX XXXXX-XXXX" type="text" maxlength="13"  pattern="\[0-9]{2}\ [0-9]{4,6}-[0-9]{3,4}$"
      OnKeyPress="formatar('## #####-####', this)">
    </div>
  </div>
 </div> 

<!-- Prepended text-->
<div class="form-group">
  <label class="col-md-2 control-label" for="prependedtext">Email <h11>*</h11></label>
  <div class="col-md-5">
    <div class="input-group">
      <span class="input-group-addon"><i class="glyphicon glyphicon-envelope"></i></span>
      <input id="prependedtext" name="prependedtext"  value="<?=$_SESSION['prependedtext'];?>" class="form-control" placeholder="email@email.com" required="" type="text" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" >
    </div>
  </div>
</div>

<!-- passowrd input-->
<div class="form-group">
  <label class="col-md-2 control-label" for="password">Senha <h11>*</h11></label>  
  <div class="col-md-2">
  <input id="password" name="password"  maxlength="25" minlength="7" class="form-control input-md" required="" type="password" >
  </div>


<!-- Search input-->
<div class="form-group">
  <label class="col-md-2 control-label" for="CEP">CEP <h11>*</h11></label>
  <div class="col-md-2">
    <input id="cep" name="cep" placeholder="Apenas números" maxlength="8"  value="<?=$_SESSION['cep'];?>" minlength="8"class="form-control input-md" required="" value="" type="search" maxlength="8" pattern="[0-9]+$">
  </div>
  <div class="col-md-2">
      <button type="button" class="btn btn-primary" onclick="pesquisacep(cep.value)">Pesquisar</button>
    </div>
</div>

<!-- Prepended text-->
<div class="form-group">
  <label class="col-md-2 control-label" for="rua">Endereço</label>
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-addon">Rua</span>
      <input id="rua" name="rua" class="form-control" placeholder=""  value="<?=$_SESSION['rua'];?>" required="" readonly="readonly" type="text">
    </div>
    
  </div>
    <div class="col-md-2">
    <div class="input-group">
      <span class="input-group-addon">Nº <h11>*</h11></span>
      <input id="numero" name="numero" class="form-control" placeholder="" required=""  value="<?=$_SESSION['numero'];?>" type="text">
    </div>
    
  </div>
  
  <div class="col-md-3">
    <div class="input-group">
      <span class="input-group-addon">Bairro</span>
      <input id="bairro" name="bairro" class="form-control" placeholder="" required=""  value="<?=$_SESSION['bairro'];?>" readonly="readonly" type="text">
    </div>
    
  </div>
</div>

<div class="form-group">
  <label class="col-md-2 control-label" for="cidade"></label>
  <div class="col-md-4">
    <div class="input-group">
      <span class="input-group-addon">Cidade</span>
      <input id="cidade" name="cidade" class="form-control" placeholder="" required=""  value="<?=$_SESSION['cidade'];?>" readonly="readonly" type="text">
    </div>
    
  </div>
  
   <div class="col-md-2">
    <div class="input-group">
      <span class="input-group-addon">Estado</span>
      <input id="estado" name="estado" class="form-control" placeholder="" required=""   value="<?=$_SESSION['estado'];?>" readonly="readonly" type="text">
    </div>
    
  </div>
</div>
<!-- Button (Double) -->

<div class="form-group">

  <label class="col-md-2 control-label" for="Cadastrar"></label>
  <div class="col-md-8">
    <button id="Cadastrar" name="Cadastrar" class="btn btn-success" type="Submit" >Cadastrar</button>
    <button id="Cancelar" name="Cancelar" class="btn btn-danger" type="Reset">Cancelar</button>
  </div>
</div>

</div>
</div>


</fieldset>
</form>

</body>
</html>
<?php
include_once"rodape.php";
?>
</body>
</html>