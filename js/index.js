// $(function() {
  var from_page = $_GET('frompage');
  var video_web = document.getElementById('web');
  var video_hotel = document.getElementById('hotel');
  var bgm = document.getElementById('BGM');
  function playBgm(){
    $('.music_play').fadeIn();
    $(".music_play").addClass("xz");
    window.musicStart = true;
    bgm.play()
  }
  function stopBgm(){
    $('.music_play').fadeOut();
    $(".music_play").removeClass("xz");
    window.musicStart = false;
    bgm.pause()
  }
  window.musicStart = false;
  document.addEventListener('touchmove',function(e){
    e.preventDefault();
  })
  // togglePage3(2)
  if(from_page=='hotel'){
    addWeiXinEvent('hotel')
  }
  var loader = new resLoader({
    resources: [
      'img/cd.gif','img/layer/1.png','img/layer/2.png','img/layer/3.png','img/layer/4.png','img/layer/btn.png','img/layer/clip.png','img/p2_light_01.png','img/p2_light_02.png',
      'img/p2_light_03.png','img/darre/darre_htlp.png','video/web.mp4','video/hotel.mp4'
    ],
    onStart: function(total) {
      console.log('start:' + total);
    },
    onProgress: function(current, total) {
      // var percent = Math.floor(current / total * 100);
      // console.log(current + '/' + total);
    },
    onComplete: function(total) {
      setTimeout(function(){
        $('.loading span').fadeIn();
        $('.loading img').fadeIn();
        $('.loading').removeClass('loading')
      },2000)
      // $('.loading').hide();
      // $('.video').fadeIn();
      // $('.video').find('.'+from_page).show();
      // myVideo.play();
    }
  });
  $('.load span').click(function(){
    $('.load').hide();
    $('.video').fadeIn();
    playBgm()
    if(from_page=='web'){
      $('.web').show();
      video_web.play();
    }else{
      $('.hotel').show();
      video_hotel.play();
    }
  })
  //音乐开关
  $(".music_play").on("click",function () {
      if(window.musicStart){
        bgm.pause();
        $(".music_play").removeClass("xz");
        window.musicStart = false;
      }else{
        bgm.play();
        $(".music_play").addClass("xz");
        window.musicStart = true;
      }
    })
  var endVideo = function() {
    $(".video").hide();
    if(from_page=='web'){
      togglePage1();
    }else{
      toggleShakePage1();
    }
  }
  video_web.addEventListener("ended", endVideo);
  video_hotel.addEventListener("ended", endVideo);
  loader.start();
  //登录
  var code = $_GET('code');
  console.log('code:',code);
  if(!localStorage.id||localStorage.id=='undefined'){
    login(code,function(data){
      console.log(data)
    })
  }
  var pic_base64 = '';
  var p1_btn = document.getElementById("p1_btn");
  var dis_tim = 500;
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
    stopBgm();
    $('.part_1').removeClass('animate');
    $('.part_1').fadeOut(500);
    $('.part_2').fadeIn(500);
    $('.part_2').addClass('animate');
  }

  function togglePage1(){
    $(".part_1").fadeIn().addClass("animate");
  }

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
  $('.back').click(function(){
    $('.part_3').removeClass('animate').fadeOut();
    $($('.part_3 .head_bg')[0]).addClass('hide');
    $($('.part_3 .head_bg')[1]).addClass('hide');
    $($('.part_3 .head_bg')[2]).addClass('hide');
    togglePage2();
    $('.part_2 .note').eq(0).prev().hide();
    $('.part_2 .note').eq(1).prev().hide();
    $('.part_2 .note').eq(2).prev().hide();
  })
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
  $('#key').click(function(){
    changePic();
  })
  function addKeyTouchFun(){
    var key = document.getElementById("key");
    var max_length = 3.8;
    var dis_touch = '';
    var st_pos = 0;
    key.addEventListener('touchstart', function(event){
      event.preventDefault()
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
      // event.preventDefault()
      console.log('停止滑动', event);
      var dis_touch = pxToRem(event.changedTouches[0].pageX - st_pos);
      console.log(dis_touch);
      if(dis_touch >= max_length) {
        //上传照片
        // changePic();
        $('.part_3 .touch').hide();
        $('.click_file').fadeIn();
      }
      dis_touch = 0;
      $(key).css('transition', 'all 0.5s').css('transform', 'translateX(' + dis_touch + 'rem');
    });
  }
  $('.click_file').click(function(){
    changePic();
  })
  var iframe = getXiamiPlayer();
  $('.goto_rank').before(iframe);
  $('.btn_group_next .goto_rank').click(function(){
    $('.mask').show();
    uploadImage(localStorage.id,img_base64,function(data){
      // console.log(img_base64)
      $('.mask').hide();
      console.log("进入留资页面");
      $(".poster").fadeOut(500);
      $("#infoContainer").fadeIn(500);
    },function(err){
      $('.mask').hide();
    })
  })
  $('.submit').click(function(){
    $('.btn_group').fadeOut();
    $('.btn_group_next').fadeIn();
  })
  $("#infoContainer .btn_confirm").click(function(){
    complete_user(localStorage.id,'',$("#name").val(),$("#record_name").val(),window.user_given_music_list,$("#mobile").val(),function(data){
      goFollow(localStorage.id)
      // $("#infoContainer").fadeOut(500);
      // $("#topContainer").fadeIn(500);
      // getRank(localStorage.id,function(o){
      // // if(o&&o.length>=1){
      //   console.log('list',o);
      //   var inner = "";
      //   var d = o.list
      //   if(!d) return;
      //   for(var i = 0;i<d.length;i++){
      //     var eachLine = '<li>' +
      //       '<span class="icon"><img src="img/darre/darre_music_name_19.png" alt=""></span>' +
      //       '<span class="record_name">'+d[i].record_name+' </span>' +
      //       '<span class="star"><img src="img/darre/darre_music_star_22.png" alt="">'+d[i].follow+' </span>' +
      //       '<span class="play" onclick="goFollow('+d[i].id+')"><img src="img/darre/darre_music_play_19.png" alt=""></span></li>';
      //     inner = inner + eachLine;
      //   }
      //   $(".top_list ul").html(inner);
      // })
    })

  })
  function btnCancel(){
    goFollow(localStorage.id);
    // $('.share_mask').fadeIn();
  }
  $("#topContainer .how").click(function(){
    console.log("出玩法提示");
    $("#topContainer .help").fadeIn(500);
  })
  $("#topContainer .help").click(function(){
    console.log("移除玩法提示");
    $("#topContainer .help").fadeOut(500);
  })
  function goFollow(detail_id){
    window.location.href=Config.FOLLOW_URL+'?detail_id='+detail_id;
  }
  // 添加此方法即可
  function toggleShakePage1(){
    $('.shake_page').fadeIn(500);
    $(".shake_page .shake_p1").addClass("animate");
    setTimeout(function(){
      $(".shake_page").addClass("shake_part");
    }, 1000);
    shake();
  }

  // 摇一摇
  function shake(){
    if (window.DeviceMotionEvent) {
      window.addEventListener('devicemotion', shakeEventHandler, false);
    } else {
      alert('客官，您需要一个新手机');
    }

    var threshold = 4000;  //阀值
    var preX = preY = preZ = x = y = z = 0;
    var preTime = 0;

    function shakeEventHandler(event) {
      var acceleration = event.accelerationIncludingGravity;
      var curTime = new Date().getTime();
      var diffTime = curTime-preTime;

      if (diffTime > 100) {
        preTime = curTime;
        x = acceleration.x;
        y = acceleration.y;
        z = acceleration.z;

        var accelerationDiff = Math.abs(x + y + z - preX - preY - preZ) / diffTime * 10000;
        if (accelerationDiff > threshold) {
          // alert("摇一摇有惊喜！");
          toggleShakePage2();
        }
        preX = x;
        preY = y;
        preZ = z;
      }
    }
  }
  //再来一次
  $('.again').click(function(){
    window.location.href = 'http://www.adleading.com/huazhu/music_hotel/redirect.html?from='+from_page;
  });
  $('.btn_share').click(function(){
    $('.share_mask').fadeIn();
  });
  $('.poster_share').click(function(){
    $('.share_mask').fadeIn();
  });
  $('.btn_group_next .share').click(function(){
    $('.share_mask').fadeIn();
  });
  $('.share_mask').click(function(){
    $(this).fadeOut();
  });
  function toggleShakePage2(){
    $('.shake_page').removeClass('shake_part');
    $('.shake_page .shake_p1').removeClass('animate');
    $('.shake_page .shake_p1').fadeOut(500);
    $('.shake_page .shake_p2').fadeIn(500);
    $('.shake_page .shake_p2').addClass('animate');
  }

  $('#shake_btn').on('click', function(){
    // alert('上传图片');
    changePic();
  })

// });