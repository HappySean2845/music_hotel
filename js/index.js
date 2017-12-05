$(function() {
  var pic_base64 = '';
  var p1_btn = document.getElementById("p1_btn");
  var dis_tim = 1000;
  var timeout = undefined;
  createParallax();
  //长按屏幕
  var sTime = 0;
  var eTime = 0;
  var flag = false;
  p1_btn.addEventListener('touchstart', function(event) {
    sTime = new Date().getTime();
    timeout = setTimeout(function(){
      flag = true;
      togglePage2();
    }, dis_tim);
    event.preventDefault();
  }, false);

  p1_btn.addEventListener('touchmove', function(event) {
    event.preventDefault();
  });

  p1_btn.addEventListener('touchend', function(event) {
    event.preventDefault();
    eTime = new Date().getTime();
    if(eTime - sTime >= dis_tim && !flag){
      togglePage2()
    }else {
      console.log('长按');
      clearTimeout(timeout);
    }
  });
  function togglePage2(){
    $('.part_1').removeClass('animate');
    $('.part_1').fadeOut(500);
    $('.part_2').fadeIn(500);
    $('.part_2').addClass('animate');
  }

  setTimeout(function() {
    $(".part_1").addClass("animate");
  }, 500);

  var p2_note = document.querySelector('.part_2').querySelectorAll('.note');
  for(var i = 0; i < 3; i++){
    (function(t){
      var item = p2_note[t];
      item.onclick = function(){
        $(item).prev().css('display', 'block');
        togglePage3(t);
      };
    })(i);
  }

  function togglePage3(t){
    $('.part_2').removeClass('animate');
    $('.part_2').fadeOut(500);
    $('.part_3').fadeIn(500);
    $('.part_3').addClass('animate');
    $($('.part_3 .head_bg')[t]).removeClass('hide');
    addKeyTouchFun();
  }


  function createParallax(){
    var scene_1 = $('.layer_1').get(0);
    var parallax = new Parallax(scene_1, {
      pointerEvents: true,
    });
    var scene_2 = $('.layer_2').get(0);
    var parallax = new Parallax(scene_2, {
      pointerEvents: true,
    });
    var scene_3 = $('.layer_3').get(0);
    var parallax = new Parallax(scene_3, {
      pointerEvents: true,
    });
  }

  function addKeyTouchFun(){
    var key = document.getElementById("key");
    var max_length = 4;
    var dis_touch = '';
    var st_pos = 0;
    key.addEventListener('touchstart', function(event){
      console.log('开始拖动', event);
      st_pos = parseInt(event.targetTouches[0].pageX);
    });

    key.addEventListener('touchmove', function(event){
      event.preventDefault();
      console.log('滑动继续');
      dis_touch = pxToRem(event.targetTouches[0].pageX - st_pos);

      if(dis_touch > max_length) {
        dis_touch = max_length;
      }
      $(key).css('transition', 'none').css('transform', 'translateX(' + dis_touch + 'rem');
    });

    key.addEventListener('touchend', function(event){
      console.log('停止滑动', event);
      var dis_touch = event.changedTouches[0].pageX / 100;
      if(dis_touch < max_length-10) {
        dis_touch = 0;
        $(key).css('transition', 'all 0.5s').css('transform', 'translateX(' + dis_touch + 'rem');
      }else {
        //上传照片
          changePic();
      }
    });
  }
  var iframe = getXiamiPlayer();
  $('.btn_group').after(iframe);
  //登录
  var code = $_GET('code');
  console.log('code:',code);
  if(!localStorage.id||localStorage.id=='undefined'){
    login(code,function(data){
      console.log(data)
    })
  }
  $('.submit').click(function(){
    uploadImage(localStorage.id,img_base64,function(data){
      console.log("进入留资页面");
      $(".poster").fadeOut(500);
      $("#infoContainer").fadeIn(500);
    })
  })
  $("#infoContainer .btn_confirm").click(function(){
    complete_user(localStorage.id,window.img_base64,$("#name").val(),$("#record_name").val(),window.user_given_music_list,$("#mobile").val(),function(){
      alert("留资成功");   //跳转到排行榜界面
      $("#infoContainer").fadeOut(500);
      $("#topContainer").fadeIn(500);
      getRank(localStorage.id,function(o){
        // if(o&&o.length>=1){
        console.log('list',o);
          var inner = "";
        var d = JSON.parse(o)["list"];
        if(!d) return;
        for(var i = 0;i<d.length;i++){
            var eachLine = '<li>' +
              '<span class="icon"><img src="img/darre/darre_music_name_19.png" alt=""></span>' +
              '<span class="record_name">'+d[i].record_name+' </span>' +
              '<span class="star"><img src="img/darre/darre_music_star_22.png" alt="">'+d[i].follow+' </span>' +
              '<span class="play"><img src="img/darre/darre_music_play_19.png" alt=""></span></li>';
            inner = inner + eachLine;
          }
        $(".top_list ul").html(inner);
      });
    })
  })
  $("#topContainer .how").click(function(){
    console.log("出玩法提示");
    $("#topContainer .help").fadeIn(500);
  })
  $("#topContainer .help").click(function(){
    console.log("移除玩法提示");
    $("#topContainer .help").fadeOut(500);
  })
});