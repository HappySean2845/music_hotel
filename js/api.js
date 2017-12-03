function $_GET(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
var validate = {
  isEmpty: function(val) {
    if (val == "") {
      return false;
    } else {
      return true;
    }
  },
  isMobile: function(val) {
    if (val == "") {
      return false;
    }
    if (!val.match(/^1[3|4|5|7|8][0-9]\d{4,8}$/) || val.length != 11) {
      return false;
    } else {
      return true;
    }
  },
}
//获取code然后登录获取用户信息接口
function login(code,successCB){
  var timestamp = Math.floor(new Date().getTime()/1000);
  var sign = md5(code+timestamp+Config.SIGN_KEY);
  $.ajax({
    url : Config.API_URL+'login.php',
    type : 'GET',
    data : {
      code      : code,
      timestamp : timestamp,
      sign      : sign
    },
    dataType : 'json',
    success : function(data){
      if(data.status=='success'){
        localStorage.id = data.user.id
        successCB(data);
      }else{
        window.location.href = Config.LOGIN_URL;
      }
    }
  })
}
//上传照片 img:base64
function uploadImage(id,image,successCB){
  var timestamp = Math.floor(new Date().getTime()/1000);
  var sign = md5(id.toString()+timestamp.toString()+Config.SIGN_KEY);
  $.ajax({
    url : Config.API_URL+'upload_image.php',
    type : 'POST',
    data : {
      id           : id,
      image        : image,
      timestamp    : timestamp,
      sign         : sign,
    },
    dataType : 'json',
    success : function(data){
      console.log('上传照片返回',data);
      if(data.status=='success'){
        alert('图片上传成功!')
        successCB(data);
      }else{
        alert('上传失败，请稍后再试');
      }
    }
  })

}
//完善用户信息
//id是login接口返回的id
//image:base64的
//sobg_list 数组？待定
function complete_user(id,image,name,record_name,song_list,mobile,successCB){
  var timestamp = Math.floor(new Date().getTime()/1000);
  var sign = md5(id.toString()+timestamp.toString()+Config.SIGN_KEY);
  if(!validate.isEmpty(name)){
    alert('请填写姓名');
    return;
  }else{
    for (var i = 0; i < MaskWord.text.length; i ++) {
      if(name.indexOf(MaskWord.text[i]) > -1) {
        console.log('有屏蔽字，屏蔽字为：',MaskWord.text[i]);
        alert('含有屏蔽字')
        break;
        return;
      }
    }
  }
  if(!validate.isEmpty(record_name)){
    alert('请填写唱片名');
    return;
  }else{
    for (var i = 0; i < MaskWord.text.length; i ++) {
      if(record_name.indexOf(MaskWord.text[i]) > -1) {
        console.log('有屏蔽字，屏蔽字为：',MaskWord.text[i]);
        alert('含有屏蔽字');
        break;
        return;
      }
    }
  }
  if(!validate.isMobile(mobile)){
    alert('请填写正确的手机');
    return;
  }
  $.ajax({
    url : Config.API_URL+'complete_user.php',
    type : 'POST',
    data : {
      id           : id,
      image        : image,
      name         : name,
      recorde_name : recorde_name,
      song_list    : song_list,
      mobile       : mobile,
      timestamp    : timestamp,
      sign         : sign,
    },
    success : function(data){
      console.log('完善用户信息返回',data);
      successCB(data);
    }
  })
}
//点赞操作，
function follow(id,follow_id,successCB){
  var timestamp = Math.floor(new Date().getTime()/1000);
  var sign = md5(id+follow_id+timestamp+Config.SIGN_KEY);
  $.ajax({
    url : Config.API_URL+'follow.php',
    type : 'GET',
    data : {
      id           : id,
      follow_id    : follow_id,
      timestamp    : timestamp,
      sign         : sign,
    },
    success : function(data){
      console.log('完善用户信息返回',data);
      successCB(data);
    }
  })
}
//查看排行榜 id是当前用户id
function getRank(id){
  var timestamp = Math.floor(new Date().getTime()/1000);
  var sign = md5(id.toString()+timestamp.toString()+Config.SIGN_KEY);
  $.ajax({
    url : Config.API_URL+'rank.php',
    type : 'GET',
    data : {
      id           : id,
      timestamp    : timestamp,
      sign         : sign,
    },
    success : function(data){
      console.log('获取排行榜返回',data);
      successCB(data);
    }
  })
}
//查看单个用户详情
function getDetail(id,detail_id){
  var timestamp = Math.floor(new Date().getTime()/1000);
  var sign = md5(id.toString()+detail_id.toString()+timestamp.toString()+Config.SIGN_KEY);
  $.ajax({
    url : Config.API_URL+'detail.php',
    type : 'GET',
    data : {
      id           : id,
      check_id     : detail_id,
      timestamp    : timestamp,
      sign         : sign,
    },
    success : function(data){
      console.log('查看个人歌单详情返回',data);
      successCB(data);
    }
  })
}