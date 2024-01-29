
   <?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
// Файлы phpmailer
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$tel = $_POST['tel'];
$text = $_POST['text'];
//$file = $_FILES['myfile'];

// Формирование самого письма
$title = "Форма зворотнього зв'язку";
$body = "
    <h2>Залишено контактні дані:</h2>
    <b>Имя:</b> $name<br>
    <b>Телеграм:</b> $tel<br>
    <b>Пошта:</b> $email<br>
    <b>Повідомлення:</b> $text<br>
<br>
";

// Настройки PHPMailer
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();   
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) {$GLOBALS['status'][] = $str;};

    // Настройки вашей почты
    $mail->Host       = 'smtp.gmail.com'; // SMTP сервера вашей почты
    $mail->Username   = 'semenets.usa@gmail.com'; // Логин на почте
    $mail->Password   = 'xxzaplzgxvclzksw'; // Пароль на почте
    $mail->SMTPSecure = 'TLS';
    $mail->Port       = 587;
    $mail->setFrom('semenets.usa@gmail.com', 'name'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('semenets.usa@gmail.com');  
    

// Отправка сообщения
$mail->isHTML(true);
$mail->Subject = $title;
$mail->Body = $body;    

// Проверяем отравленность сообщения
if ($mail->send()) 
        {header('location:../index.html');} 
else {$result = "error";}

} catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}


   
    
