$.ajax({
    url: "http://www.adleading.com/authorize_new/share_sample.php",
    type: "GET",
    // cache: true,
    data: {u: window.location.href},
    dataType: "jsonp",
    success: function(back) {
        wx.config({
            debug: false,
            appId: back.appId,
            timestamp: back.timestamp,
            nonceStr: back.nonceStr,
            signature: back.signature,
            jsApiList: [
                // 所有要调用的 API 都要加到这个列表中
                'onMenuShareTimeline',
                'onMenuShareAppMessage'
            ]
        });
    },
    error: function() {

    }
});

wx.ready(function() {
    // 在这里调用 e
    wx.error(function(res) {
        //console.log(res)
    });
    //                wx.hideOptionMenu();
    addWeiXinEvent('web');
});
var addWeiXinEvent = function(from,id) {
    if(from=='web'){
        $.shareUrl = Config.ORIGIN_WEB_URL;
        $.timelineTitle = "谁是这个音乐故事的主角？";
        $.shareAppDesc = "来体验与之不期而遇的美好";
        $.shareAppTitle = "谁是这个音乐故事的主角？";
    }else if(from=='hotel'){
        $.shareUrl = Config.ORIGIN_HOTEL_URL;
        $.timelineTitle = "你的朋友给了你一个会响的见面礼！";
        $.shareAppDesc = "点此立即查收";
        $.shareAppTitle = "你的朋友给了你一个会响的见面礼！";
    }else{
        if(!id){
            id = 4;
        }
        $.shareUrl = Config.FOLLOW_URL+'?detail_id='+id;
        $.timelineTitle = "谁是这个音乐故事的主角？";
        $.shareAppDesc = "来体验与之不期而遇的美好";
        $.shareAppTitle = "谁是这个音乐故事的主角？";
    }
    $.shareImage = "http://www.adleading.com/huazhu/landing_page/img/share.jpg";
    wx.onMenuShareAppMessage({
        title: $.shareAppTitle,
        desc: $.shareAppDesc,
        link: $.shareUrl,
        imgUrl: $.shareImage,
        trigger: function(res) {

        },
        success: function(res) {
            //                        _smq.push(['custom', '17-baojun', '730newMB-share']);
        },
        cancel: function(res) {

        },
        fail: function(res) {

        }
    });
    wx.onMenuShareTimeline({
        title: $.timelineTitle,
        link: $.shareUrl,
        imgUrl: $.shareImage,
        trigger: function(res) {
        },
        success: function(res) {
            //                        _smq.push(['custom', '17-baojun', '730newMB-share']);
        },
        cancel: function(res) {

        },
        fail: function(res) {
        }
    });
};
