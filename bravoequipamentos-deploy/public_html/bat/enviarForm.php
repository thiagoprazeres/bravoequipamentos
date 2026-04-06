<?php
header('Content-Type: application/json; charset=utf-8');

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
		http_response_code(400);
		echo json_encode(['success' => false, 'message' => 'Por favor preencha todos os campos antes de enviar.']);
		die();
	}
	else
	{
		$body = 
		'Nome: '.$_POST['nome'].'<br>
		Telefone: '.$_POST['telefone'].'<br>
		Email: '.$_POST['email'].'<br>
		Empresa: '.$_POST['empresa'].'<br>
		Mensagem: '.nl2br($_POST['mensagem']);
		
		$enviouEmail = enviaEmail('Bravo Equipamentos', 'contato@bravoequipamentos.com', $_POST['nome'], $_POST['email'], '[Contato Bravo] '.date("d/m/Y - H:i:s"), $body);
		
		if($enviouEmail)
		{
			echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso']);
		}
		else
		{
			http_response_code(500);
			echo json_encode(['success' => false, 'message' => 'Erro ao enviar, por favor tente novamente mais tarde.']);
		}
	}
}
else
{
	http_response_code(400);
	echo json_encode(['success' => false, 'message' => 'Requisição inválida']);
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
