<?php if (filter_input(INPUT_SERVER, 'REQUEST_METHOD') != 'POST') {
  $res = [
    'status' => 403,
    'statusText' => 'Forbidden',
    'Content-Type' => 'octet-stream',
  ];
  header("HTTP/1.1 ${res['status']} ${res['statusText']}");
  header("Content-Type: ${res['Content-Type']}");
  echo json_encode($res);
  return;
} ?>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="Description" content="just jsx.jp site.">
  <meta name="theme-color" content="black">
  <title>jsx.jp</title>
  <link rel="manifest" href="/manifest.json">
  <link rel="stylesheet" href="//<?= filter_input(INPUT_SERVER, 'HTTP_HOST') ?>/cdn/css/common.css">
  <script src="/cdn/js/common.js" defer></script>
  <script src="/cdn/js/app.js" defer></script>
  <script src="/cdn/js/channelio.js" defer></script>
<script src="https://www.gstatic.com/firebasejs/5.8.2/firebase.js"></script>
<script>
  const config = {
    apiKey: "AIzaSyAlGETt2oe_9zfGwuzdvKzNK9pdqrQqwgA",
    authDomain: "notification-aaa.firebaseapp.com",
    databaseURL: "https://notification-aaa.firebaseio.com",
    projectId: "notification-aaa",
    storageBucket: "notification-aaa.appspot.com",
    messagingSenderId: "592002215665"
  };
  firebase.initializeApp(config);
</script>
</head>
