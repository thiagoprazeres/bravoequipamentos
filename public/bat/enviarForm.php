<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método não permitido']);
    exit;
}

$nome = isset($_POST['nome']) ? trim($_POST['nome']) : '';
$empresa = isset($_POST['empresa']) ? trim($_POST['empresa']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telefone = isset($_POST['telefone']) ? trim($_POST['telefone']) : '';
$mensagem = isset($_POST['mensagem']) ? trim($_POST['mensagem']) : '';

if (empty($nome) || empty($email) || empty($mensagem)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Campos obrigatórios não preenchidos']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Email inválido']);
    exit;
}

$to = 'contato@bravoequipamentos.com';
$subject = 'Novo contato via site - ' . $nome;

$body = "=== NOVO CONTATO VIA SITE ===\n\n";
$body .= "Nome: $nome\n";
if (!empty($empresa)) {
    $body .= "Empresa: $empresa\n";
}
$body .= "Email: $email\n";
if (!empty($telefone)) {
    $body .= "Telefone: $telefone\n";
}
$body .= "\nMensagem:\n$mensagem\n";
$body .= "\n---\n";
$body .= "Enviado em: " . date('d/m/Y H:i:s') . "\n";

$headers = "From: noreply@bravoequipamentos.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Mensagem enviada com sucesso']);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erro ao enviar mensagem']);
}
