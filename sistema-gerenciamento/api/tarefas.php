<?php
require __DIR__ . '/_supabase.php';
header('Content-Type: application/json; charset=utf-8');

$metodo = $_SERVER['REQUEST_METHOD'];
$in = json_decode(file_get_contents('php://input'), true) ?? [];
$statusValidos = ['pendente', 'andamento', 'concluida'];

try {
    if ($metodo === 'GET') {
        echo json_encode(supabase('GET', '?select=*&order=id.desc'));
    } elseif ($metodo === 'POST') {
        $titulo = trim($in['titulo'] ?? '');
        if ($titulo === '') { http_response_code(422); echo json_encode(['erro' => 'Título obrigatório']); exit; }
        $r = supabase('POST', '', [
            'titulo' => mb_substr($titulo, 0, 150),
            'responsavel' => mb_substr(trim($in['responsavel'] ?? ''), 0, 100),
        ]);
        http_response_code(201);
        echo json_encode(['id' => $r[0]['id'] ?? null]);
    } elseif ($metodo === 'PUT') {
        $status = $in['status'] ?? '';
        if (!in_array($status, $statusValidos, true)) { http_response_code(422); echo json_encode(['erro' => 'Status inválido']); exit; }
        supabase('PATCH', '?id=eq.' . (int) ($in['id'] ?? 0), ['status' => $status]);
        echo json_encode(['ok' => true]);
    } elseif ($metodo === 'DELETE') {
        supabase('DELETE', '?id=eq.' . (int) ($_GET['id'] ?? 0));
        echo json_encode(['ok' => true]);
    } else {
        http_response_code(405);
        echo json_encode(['erro' => 'Método não permitido']);
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['erro' => 'Erro ao acessar o banco de dados']);
}
