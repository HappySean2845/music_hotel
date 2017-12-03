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
    success : function(data){
      localStorage.id = data.id
      successCB(data);
    }
  })
}
//完善用户信息
//id是login接口返回的id
//image:base64的
//sobg_list 数组？待定
function complete_user(id,image,name,record_name,song_list,mobile,successCB){
  var timestamp = Math.floor(new Date().getTime()/1000);
  var sign = md5(id+timestamp+Config.SIGN_KEY);
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