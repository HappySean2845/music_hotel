var img_base64 = '';
var layer_index = 1;
var is_click_change_layer = false;
var pc = new PhotoClip('.view', {
  size: [document.documentElement.clientWidth,document.documentElement.clientWidth],
  // size: [document.documentElement.clientWidth,document.documentElement.clientHeight],
  outputSize: document.documentElement.clientWidth,
  //adaptive: ['60%', '80%'],
  file: '#file',
  // view: '#view',
  ok: '.clipBtn',
  //img: 'img/mm.jpg',
  loadStart: function() {
    console.log('开始读取照片');
    $('.part_3').hide();
    $('.poster').hide();
    $('.shake_page').hide();
    $('.clip').fadeIn(800);
    $('.html2canvas').show();
    $('.poster .layer').attr('src','img/layer/'+layer_index+'.png')
  },
  loadComplete: function() {
    console.log('照片读取完成');
  },
  done: function(dataUrl) {
    $('.poster .bg').attr('src',dataUrl);
    setTimeout(function(){
      grayscale(document.getElementById("gray"));
    },200)
    $('.clip').fadeOut();
    $('.poster').fadeIn(800);
    setTimeout(function(){
      html2canvas(document.querySelector('.html2canvas')).then(function(canvas) {
        $('.html2canvas').hide();
        // $('.layer').after(canvas);
        img_base64 = canvas.toDataURL("image/jpeg", 1);
        $('.final').attr('src',img_base64).show();
      });
    },1000)

  },
  fail: function(msg) {
    alert(msg);
  }
});
function changePic(){
  $('#file').click();
}
$('.clip_hint').click(function(){
  changePic();
})
function changeLayer(){
  if(!is_click_change_layer){
    is_click_change_layer = true
    if(layer_index<4){
      layer_index++
    }else{
      layer_index = 1;
    }
    $('.html2canvas').fadeIn(800);
    $('.final').hide();
    $('.poster .layer').attr('src','img/layer/'+layer_index+'.png');
    setTimeout(function(){
      html2canvas(document.querySelector('.html2canvas')).then(function(canvas) {
        $('.html2canvas').hide();
        // $('.layer').after(canvas);
        img_base64 = canvas.toDataURL("image/jpeg", 1);
        $('.final').attr('src',img_base64).show();
      });
    },800)
    setTimeout(function(){
      is_click_change_layer = false;
    },1000)
  }
}
//点击set自己的分享
$('.btn_group .submit').click(function(){
  addWeiXinEvent('self',localStorage.id);
})
$('.btn_group .poster_share').click(function(){
  addWeiXinEvent('self',localStorage.id);
})