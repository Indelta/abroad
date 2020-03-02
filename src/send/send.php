<?php

    $name = isset($_POST['name']) ? $_POST['name'] : 'No name';
    $phone = isset($_POST['phone']) ? preg_replace('/[^0-9]/g', '', $_POST['phone']) : 'no phone';
    $email = isset($_POST['email']) ? $_POST['email'] : "";
    $type = isset($_POST['type']) ? $_POST['type'] : '';
    $message = isset($_POST['message']) ? $_POST['message'] : '';

    $mail_body = "
        <p>Имя: $name</p>
        <p>Телефон: $phone</p>
        <p>E-mail: $email</p>
        <p>Сообщение от пользователя: $message</p>
        <p>Форма: $type</p>
    ";

    $to = "travel@mice.by, deltastream.dev@gmail.com";
    $sub = '=?utf-8?B?' . base64_encode("Заявка с $server_name") . '?=';
    $headers = "Content-type: text/html; charset=utf-8 \r\n";
    $headers .= "From: $server_name\r\n";

    if (mail("$to", "$sub", "$mail_body", "$headers")) {
        echo json_encode(array(
            'error' => false,
            'message' => 'ok'
        ));
    }
    else echo json_encode(array(
        'error' => true,
        'message' => 'mail was not send'
    ));
?>