<?php

// Only allow POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Method Not Allowed";
    exit;
}

// Get data safely
$name = trim($_POST['name'] ?? '');
$email = trim($_POST['email'] ?? '');
$subject = trim($_POST['subject'] ?? 'No Subject');
$message = trim($_POST['message'] ?? '');

// Validation
if (!$name || !$email || !$message) {
    http_response_code(400);
    echo "All fields are required.";
    exit;
}

// Email destination
$to = "nawaraj.parajuli@prnc.tu.edu.np";

// Email content
$body = "New Contact Message\n\n";
$body .= "Name: $name\n";
$body .= "Email: $email\n";
$body .= "Subject: $subject\n\n";
$body .= "Message:\n$message\n";

// Headers
$headers = "From: noreply@yourdomain.com\r\n";
$headers .= "Reply-To: $email\r\n";

// Send email
if (mail($to, $subject, $body, $headers)) {
    echo "OK - Message Sent Successfully";
} else {
    http_response_code(500);
    echo "Failed to send message";
}

?>