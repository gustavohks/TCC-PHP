<!DOCTYPE html>
<html>
<head>
    <title>index</title>
    <?php
require_once"header.php";
require_once"connect.php";
require_once"configuracao.php";
    ?>
</head>
<body>

<?php
require_once"menu.php";
?>
<div class="container">
        <div class="card card-container">
            <!-- <img class="profile-img-card" src="//lh3.googleusercontent.com/-6V8xOA6M7BA/AAAAAAAAAAI/AAAAAAAAAAA/rzlHcD0KYwo/photo.jpg?sz=120" alt="" /> -->
            <img id="profile-img" class="profile-img-card" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" />
            <p id="profile-name" class="profile-name-card"></p>
            <form class="form-signin" action="#" method="POST" autocomplete="off">
                <span id="reauth-email" class="reauth-email"></span>
                <input type="email" id="emailVerificar" name="emailVerificar" class="form-control" placeholder="Email address" required autofocus>
                <input type="password" id="senhaVerificar" name="senhaVerificar" class="form-control" placeholder="Password" required>
                <div id="remember" class="checkbox">
                    <label>
                        <input type="checkbox" value="remember-me"> Lembrar-me
                    </label>
                </div>
                <button id="entrar" name="entrar" class="btn btn-lg btn-primary btn-block btn-signin" type="submit">Entrar</button>
            </form><!-- /form -->
            <a href="#" class="forgot-password">
               Esqueceu sua senha?
            </a>
        </div><!-- /card-container -->
    </div><!-- /container -->
<?php
require_once"rodape.php";
if (isset($_POST['entrar'])) {
    $email = $_POST['emailVerificar'];
    $senha = $_POST['senhaVerificar'];
    // echo $email;
    // echo $senha;
    if ( (!empty($email)) and (!empty($senha)) )  {
        $sql = "SELECT * FROM cadastrados WHERE email = '".$email."' AND password = '".$senha."' " ;
        // echo $sql;
        $resultado = mysqli_query($cadastrados,$sql);
        $total = mysqli_num_rows($resultado);
        if ($total == '') {
            echo ("<SCRIPT LANGUAGE='JavaScript'>
                window.alert('Email ou senha incorreta!')
                window.location.href='login.php';
                </SCRIPT>"
                );
            
        } elseif ($total > 0){
            $_SESSION['emailVerificar'] = $email;
            $_SESSION['senhaVerificar'] = $senha;
            echo ("<SCRIPT LANGUAGE='JavaScript'>
                window.alert('Logado!')
                window.location.href='index.php';
                </SCRIPT>"
                );
            }
        
            
        

    }else{
        echo ("<SCRIPT LANGUAGE='JavaScript'>
            window.alert('Email ou senha incorreta')
            window.location.href='login.php';
            </SCRIPT>"
        );
        // echo "batata";
        }
        } 
?>
</body>
</html>

