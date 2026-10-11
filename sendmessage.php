<?php
// Telegram credentials — keep secret
$botToken = "YOUR_NEW_TOKEN_HERE";   // put your new token here
$chatId = "5276002396";              // your Telegram ID

// Get form data
$data = json_decode(file_get_contents("php://input"), true);
$name = htmlspecialchars($data['name']);
$message = htmlspecialchars($data['message']);

$text = "💬 New Suggestion from $name:\n\n$message";

// Send to Telegram
$url = "https://api.telegram.org/bot$botToken/sendMessage";
$params = [
    'chat_id' => $chatId,
    'text' => $text
];

$options = [
    'http' => [
        'method'  => 'POST',
        'header'  => "Content-Type:application/x-www-form-urlencoded\r\n",
        'content' => http_build_query($params)
    ]
];
$context  = stream_context_create($options);
$result = file_get_contents($url, false, $context);

echo json_encode(["success" => $result ? true : false]);
?>
