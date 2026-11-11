<?php
// Cliente mínimo da API REST do Supabase (usa apenas cURL).
function supabase(string $metodo, string $query = '', ?array $corpo = null): array {
    $url = getenv('SUPABASE_URL');
    $key = getenv('SUPABASE_SERVICE_ROLE_KEY');

    // Fallback para XAMPP/WAMP: copie config.local.example.php para config.local.php
    if ((!$url || !$key) && file_exists(__DIR__ . '/config.local.php')) {
        [$url, $key] = require __DIR__ . '/config.local.php';
    }
    if (!$url || !$key) throw new RuntimeException('Supabase não configurado');

    $ch = curl_init(rtrim($url, '/') . '/rest/v1/tarefas' . $query);
    curl_setopt_array($ch, [
        CURLOPT_CUSTOMREQUEST => $metodo,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'apikey: ' . $key,
            'Authorization: Bearer ' . $key,
            'Content-Type: application/json',
            'Prefer: return=representation',
        ],
    ]);
    if ($corpo !== null) curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($corpo));

    $resp = curl_exec($ch);
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($resp === false || $http >= 400) throw new RuntimeException('Erro Supabase: ' . $http);
    return json_decode($resp, true) ?? [];
}
