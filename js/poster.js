$('#file').change(function() {
  var file = this.files[0];
  console.log(file);
  if(file.size>=Config.MAX_PIC_SIZE){
    alert('图像大小超过限制');
    return;
  }else if(file.type.indexOf('gif')>-1){
    alert('无法上传GIF图片');
    return;
  }
  var reader = new FileReader();
  var canvas = document.getElementById("canvas").getContext("2d");
  reader.readAsDataURL(file);
  reader.addEventListener('load', function() {
    var img = document.createElement('img');
    img.src = reader.result;
    // img.width=remToPx(7.5);
    // img.height=remToPx(7.5);
    // console.log(img.src)
    canvas.drawImage(img,0,0,375,375)
  });
})