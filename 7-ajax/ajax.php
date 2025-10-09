<?php
/*
Author: Javed Ur Rehman
Website: https://www.allphptricks.com
*/

// Switch to JSON responses for AJAX
header('Content-Type: application/json; charset=UTF-8');

function respond($status, $message, $extra = []) {
    echo json_encode(array_merge([
        'status' => $status,
        'message' => $message,
    ], $extra));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond('error', 'Invalid request method.');
}

$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

if ($name === '') {
    respond('error', 'Name is required.');
}
if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond('error', 'Valid email is required.');
}
if ($message === '') {
    respond('error', 'Message is required.');
}

// Example: here you could send an email or save to DB
// For local dev, we skip mail() to avoid failures.
// $to = 'youremail@yourdomain.com';
// $subject = 'Contact Form Email';
// $html = "<p>New email is received from " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "</p><p>" . nl2br(htmlspecialchars($message, ENT_QUOTES, 'UTF-8')) . "</p>";
// $headers = "MIME-Version: 1.0\r\n" .
//            "Content-type:text/html;charset=UTF-8\r\n" .
//            "From: <{$email}>\r\n";
// if (!@mail($to, $subject, $html, $headers)) {
//     respond('error', 'Failed to send email.');
// }

respond('success', 'Thanks! Your message has been received.', [
    'data' => [
        'name' => $name,
        'email' => $email,
    ]
]);