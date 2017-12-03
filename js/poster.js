var pc = new PhotoClip('.view', {
  size: [document.documentElement.clientWidth,document.documentElement.clientHeight],
  outputSize: document.documentElement.clientWidth,
  //adaptive: ['60%', '80%'],
  file: '#file',
  // view: '#view',
  ok: '.clipBtn',
  //img: 'img/mm.jpg',
  loadStart: function() {
    console.log('开始读取照片');
    $('.poster').hide();
    $('.clip').fadeIn(800);
    $('.html2canvas').show();
  },
  loadComplete: function() {
    console.log('照片读取完成');
  },
  done: function(dataUrl) {
    $('.poster .bg').attr('src',dataUrl);
    $('.clip').fadeOut();
    $('.poster').fadeIn(800);
    setTimeout(function(){
      html2canvas(document.querySelector('.html2canvas'), {
        onrendered: function(canvas) {
          $('.html2canvas').hide();
          // $('.layer').after(canvas);
          $('.final').attr('src',canvas.toDataURL());
        },
        // logging : true,
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