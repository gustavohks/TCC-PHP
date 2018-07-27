<?php
session_start();
require_once"header.php";
require_once"connect.php";
require_once"configuracao.php";
$erro = "0";
$msg_erro = '';
if (isset($_POST['Cadastrar'])) {
	$prependedtext = $_POST['prependedtext'];
	$nome = $_POST['nome'];
	$cpf = $_POST['cpf'];
	$dtnasc = $_POST['dtnasc'];
	$sexo = $_POST['sexo'];
	$telefone = $_POST['telefone'];
	$celular = $_POST['celular'];
	$password = $_POST['password'];
	$cep = $_POST['cep'];
	$rua = $_POST['rua'];
	$numero = $_POST['numero'];
	$bairro = $_POST['bairro'];
	$cidade = $_POST['cidade'];
	$estado = $_POST['estado'];
	//session VALUES 
	
	// echo $sexo;
	//  echo "$prependedtext <br>"; echo "$nome <br>" ;  echo "$cpf <br>" ; echo "$dtnasc <br>" ; echo "$telefone <br>" ; echo "$celular <br>" ; echo "$password <br>" ; echo "$cep <br>" ; echo "$rua <br>" ; echo "$numero <br>" ; echo "$bairro <br>" ; echo "$cidade <br>" ; echo "$estado <br>" ;


// 	//validacao de dados
	if  (empty($nome) or empty($cpf) or empty($sexo) or empty($dtnasc) or empty($telefone) or empty($password) or empty($cep) or empty($rua) or empty($bairro) or empty($cidade) or empty($estado) or empty($prependedtext)) {
		$erro = "1";
		$msg_erro= "Preencha os campos corretamente";
	}else{
		$msgok = "Formulário enviado";
		$sql = "INSERT INTO cadastrados (nome, email, cpf, dtnasc, telefone, celular, sexo, password, cep , rua, numero, bairro, cidade, estado)
				VALUES ('$nome', '$prependedtext', '$cpf', '$dtnasc', '$telefone', '$celular', '$sexo', '$password', '$cep' , '$rua', '$numero', '$bairro', '$cidade', '$estado')";
		if (mysqli_query($cadastrados,$sql)) {
			session_destroy();
			session_start();
		} else {
			echo 'erro de cadastro: ' . $sql;
		}

	}
	if ($erro=="1"){
	$_SESSION['nome'] = $nome;
	$_SESSION['prependedtext'] = $prependedtext;
	$_SESSION['cpf'] = $cpf;
	$_SESSION['dtnasc'] = $dtnasc;
	$_SESSION['sexo'] = $sexo;
	$_SESSION['telefone'] = $telefone;
	$_SESSION['celular'] = $celular;
	$_SESSION['password'] = $password;
	$_SESSION['cep'] = $cep;
	$_SESSION['rua'] = $rua;
	$_SESSION['numero'] = $numero;
	$_SESSION['bairro'] = $bairro;
	$_SESSION['cidade'] = $cidade;
	$_SESSION['estado'] = $estado;
		echo ("<SCRIPT LANGUAGE='JavaScript'>
window.alert('".$msg_erro."')
window.location.href='cadastro.php';
</SCRIPT>"

);
	}
	else{
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
	echo ("<SCRIPT LANGUAGE='JavaScript'>
window.alert('Cadastro concluído com sucesso!')
window.location.href='login.php';
</SCRIPT>"
);
}	
}	

	


?>