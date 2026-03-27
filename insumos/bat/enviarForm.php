<?
if(isset($_POST['mensagem']))
{

	if(
	   trim($_POST['nome']) == "" || 
	   trim($_POST['telefone']) == "" || 
	   trim($_POST['mensagem']) == "" || 
	   trim($_POST['email']) == "" || 
	   trim($_POST['empresa']) == "" 
	   ) 
	{
		?>
		<script>
        alert('Por favor preencha todos os campos antes de enviar.');
		history.go(-1);
        </script>
		<?
		die();
	}
	else
	{
		$body = 
		'Nome: '.$_POST['nome'].'
		Telefone: '.$_POST['telefone'].'
		Email: '.$_POST['email'].'
		Empresa: '.$_POST['empresa'].'
		Mensagem: '.nl2br($_POST['mensagem']);
		
		$enviouEmail = enviaEmail('Bravo Equipamentos', 'contato@bravoequipamentos.com', $_POST['nome'], $_POST['email'], '[Contato Bravo]'.date("d/m/Y - h:i:s"), $body);
		
		if($enviouEmail)
		{
			header("location: ../mensagemSucesso.php");
				
		}
		else
		{
			?>
			<script>
			alert('Erro ao enviar, por favor tente novamente mais tarde.');
			history.go(-1);
			</script>
			<?		
		}
	}

}

function enviaEmail($nomeDestino = '', $emailDestino = '', $nomeRemetente = '', $emailRemetente = '', $assunto = '', $body = '', $headers = '')
{
	 //Montando headers da mensagem
     $headers = "MIME-Version: 1.0\n";
     $headers .= "Content-type: text/html; charset=utf-8\n";
     $headers .= "From: {$nomeRemetente} <{$emailRemetente}>\n";
     $headers .= "Return-Path: {$nomeRemetente} <{$emailRemetente}>\n";
     $headers .= "MIME-Version: 1.0\n";
     $headers .= "X-Priority: 3\n";
     $headers .= "Reply-To: {$nomeRemetente} <{$emailRemetente}> \n";
     
     if(@mail("{$nomeDestino} <{$emailDestino}>", $assunto, $body, $headers)) 
     {
        //Enviado com sucesso
        return true; 
     }
     else
     {
        //Erro ao enviar
        return false;
     }
}

?>