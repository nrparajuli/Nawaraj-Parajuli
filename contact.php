<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Replace with your receiving email address
    $to_email = 'nawaraj.parajuli@prnc.tu.edu.np';

    // Get form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    // Check for empty fields
    if (empty($name) || empty($email) || empty($subject) || empty($message)) {
        echo "All fields are required.";
    } else {
        // Set email headers
        $headers = "From: $name <$email>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        // Compose email message
        $email_message = "Name: $name<br>";
        $email_message .= "Email: $email<br>";
        $email_message .= "Subject: $subject<br>";
        $email_message .= "Message:<br>$message<br>";

        // Send email
        if (mail($to_email, $subject, $email_message, $headers)) {
            echo "Your message has been sent successfully!";
        } else {
            echo "Something went wrong. Please try again later.";
        }
    }
}
?>
