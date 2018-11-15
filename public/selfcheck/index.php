<script defer>(()=>{setTimeout(location.reload,1000);})();</script>
<style>
body {
  background-color: black;
  color: white;
  text-align: center;
  margin: 10vw;
  font-size: 8vw;
}
* { overflow: hidden; }
.flex-center {
  align-items: center;
  display: flex;
  justify-content: center;
}
.position-ref {
  position: relative;
}
.content {
  text-align: center;
}
.anim-bound {
  -webkit-animation: bounce-text 2s infinite cubic-bezier(0.245, 0.325, 0.67, 1.51);
  animation: bounce-text 2s infinite cubic-bezier(0.245, 0.325, 0.67, 1.51);
}
@-webkit-keyframes bounce-text {
  60% {
    font-size: 7vw;
  }
  100% {
    font-size: 7vw;
  }
}
@keyframes bounce-text {
  60% {
    font-size: 7vw;
  }
  100% {
    font-size: 7vw;
  }
}
</style>
<body class="flex-center position-ref">
  <div class="content">
    <div class="anim-bound">I'm <?= system('hostname') ?>.<br>I'm fine.</div>
  </div>
</body>
