<?php 
    header('Content-Type:text/html;charset=utf-8');
    $resUrl = "https://moment.douban.com/api/auth_authors/rec?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6";
    $allUrl = "https://moment.douban.com/api/auth_authors/all?alt=json&apikey=0bcf52793711959c236df76ba534c0d4&app_version=1.7.4&count=20&douban_udid=d623045db9fcb0d5243174c1bf1a675f887047c0&start=0&udid=9a34d8b038ff38971050199b0c5ee9c60c6d1ca3&version=6";
    $resResult = file_get_contents($resUrl);
    $allResult = file_get_contents($allUrl);

    $resResult = json_decode($resResult,true);
    $allResult = json_decode($allResult,true);

     echo json_encode(array("rec"=>$resResult,"all"=>$allResult));

?>