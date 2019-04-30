<?php

$content = '';
/* Ловим УТМ метки */
if (isset($_COOKIE['utmCampaign'])) {
    $content .= '<br><br><p>UTM</p>
        utmCampaign:'.$_COOKIE['utmCampaign'].'<br>
        utmSource:'.$_COOKIE['utmSource'].'<br>
        utmMedium:'.$_COOKIE['utmMedium'].'<br>
        utmTerm:'.$_COOKIE['utmTerm'].'<br>
        utmContent:'.$_COOKIE['utmContent'].'<br><br>
        pmSource:'.$_COOKIE['pmSource'].'<br>
        pmBlock:'.$_COOKIE['pmBlock'].'<br>
        pmPosition:'.$_COOKIE['pmPosition'].'<br>
    ';
}

/* Ловим Регион */
if (isset($_COOKIE['y_region'])) {
    $content .= '<br><br><p>Region</p>
        Страна:'.$_COOKIE['y_country'].'<br>
        Регион:'.$_COOKIE['y_region'].'<br>
        Город:'.$_COOKIE['y_city'].'<br>
    ';
}

/*IP*/
$content .= '<br><br><p>IP: '.$_SERVER['REMOTE_ADDR'].'</p>';

/*
* Денис Герасимов http://rek9.ru/
* Данный скрипт обрабатывает форм и отправляет ее на email
* В письме вы увидите utm метки, если использовали их в рекламной кампании
* Измените в данном скрипте:
* 1. Тему письма (13 строчку)
* 2. Введите ваш email, на который отправлять обработанную форму (36 строчка)
* 3. Email, с которого отправлять письмо (39 строчка)
* 4. Имя, с которого отправляется письмо (40 строчка)
* 5. URL, на который будет переадресация, при успешной отправке формы (45 строчка)
*/
    $subject = 'Почта пришла!!!';                      // тема письма , вместо многоточия вставьте ваш домен
    $content .= '<hr>';

    if(isset($_POST['name'])) {
        $name = substr(htmlspecialchars(trim($_POST['name'])), 0, 100);
        $content .= '<b>Имя: </b>' . $name . '<br>';
    }
    if(isset($_POST['phone'])) {
        $phone = substr(htmlspecialchars(trim($_POST['phone'])), 0, 100);
        $content .= '<b>Телефон: </b>' . $phone . '<br>';
    }
    if(isset($_POST[''])) {
        $val = substr(htmlspecialchars(trim($_POST[''])), 0, 100);
        $content .= '<b>: </b>' . $val . '<br>';
    }
    if(isset($_POST['app-square'])) {
        $val = substr(htmlspecialchars(trim($_POST['app-square'])), 0, 100);
        $content .= '<b>Площадь квартиры: </b>' . $val . '<br>';
    }
    if(isset($_POST['app-room-count'])) {
        $val = substr(htmlspecialchars(trim($_POST['app-room-count'])), 0, 100);
        $content .= '<b>Количество комнат: </b>' . $val . '<br>';
    }
    if(isset($_POST['app-materials-black'])) {
        $content .= '<b>Черновые материалы</b><br>';
    }
    if(isset($_POST['app-materials-clean'])) {
        $content .= '<b>Чистовые материалы</b><br>';
    }
    if(isset($_POST['dismantling-of-old-electricians'])) {
        $content .= '<b>Демонтаж старой электрики</b><br>';
    }
    if(isset($_POST['dismantling-of-old-coatings'])) {
        $content .= '<b>Демонтаж старых покрытий</b><br>';
    }
    if(isset($_POST['installation-of-stretch-ceiling'])) {
        $content .= '<b>Монтаж натяжных потолков</b><br>';
    }
    if(isset($_POST['installation-of-interior-doors'])) {
        $content .= '<b>Установка межкомнатных дверей</b><br>';
    }
    if(isset($_POST['cabling'])) {
        $content .= '<b>Прокладка кабелей</b><br>';
    }
    if(isset($_POST['primer-walls-and-floor'])) {
        $content .= '<b>Грунтовка стен и пола</b><br>';
    }
    if(isset($_POST['putty-and-plaster-walls'])) {
        $content .= '<b>Шпатлевка и штукатурка стен</b><br>';
    }
    if(isset($_POST['linoleum-flooring-carpet'])) {
        $content .= '<b>Настил линолиума, ковролина</b><br>';
    }
    if(isset($_POST['electrical-installation'])) {
        $content .= '<b>Монтаж электроточки</b><br>';
    }
    if(isset($_POST['app-rep-type'])) {
        $val = substr(htmlspecialchars(trim($_POST['app-rep-type'])), 0, 100);
        $content .= '<b>Тип ремонта:</b>';

        if ($val == 'redecorating') {
            $content .= 'косметический';
        }

        if ($val == 'overhaul') {
            $content .= 'капитальный';
        }

        if ($val == 'euro') {
            $content .= 'евро';
        }

        if ($val == 'all') {
            $content .= 'расчитать все 3';
        }

        $content .= '<br>';
    }

	$content .= '<b>Заявка пришла со страницы:</b> ' . $_SERVER["HTTP_REFERER"] .'<br>'; // строчка, в которой передается UTM метки если есть
    $content .= '<hr>';
    // подключаем файл класса для отправки почты
    require 'class.phpmailer.php';

    $mail = new PHPMailer();
    $mail->AddAddress('valery.dyachuk@gmail.com');      	// кому - адрес, Имя (например, 'email@ rek9.ru','Денис Герасимов')
    $mail->IsHTML(true);                        				// выставляем формат письма HTML 
    $mail->CharSet = "UTF-8";                   				// кодировка
	$mail->From = "info@sk-bolshevik.ru";					        	// email, с которого отправиться письмо
	$mail->FromName = "Bolshevik";					    // откого письмо
    $mail->Body = $content;
    $mail->Subject = $subject;

    // отправляем наше письмо		
	
	if ($mail->Send()) header('Location: ../');                 // в поле Location можно настроить переадресацию
	else { die ('Mailer Error: ' . $mail->ErrorInfo); }
?>
