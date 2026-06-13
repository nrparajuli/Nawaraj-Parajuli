<?php
// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Method Not Allowed";
    exit;
}

// Get form data safely
$name = htmlspecialchars($_POST['name'] ?? '');
$email = htmlspecialchars($_POST['email'] ?? '');
$subject = htmlspecialchars($_POST['subject'] ?? 'No Subject');
$message = htmlspecialchars($_POST['message'] ?? '');

// Validate fields
if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo "Please fill all required fields.";
    exit;
}

// Your receiving email
$to = "nawaraj.parajuli@prnc.tu.edu.np";

// Email content
$email_body = "
Name: $name
Email: $email
Subject: $subject

Message:
$message
";

// Headers (IMPORTANT for delivery)
$headers = "From: noreply@yourdomain.com\r\n";
$headers .= "Reply-To: $email\r\n";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    echo "OK";
} else {
    http_response_code(500);
    echo "Failed to send email.";
}
?>