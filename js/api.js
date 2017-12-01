//获取code然后登录获取用户信息接口
function login(code,successCB){
  var timestamp = Math.floor(new Date.getTime()/1000);
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
      successCB();
    }
  })
}