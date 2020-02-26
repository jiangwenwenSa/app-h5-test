(function() {
    if (!shareDetail) return;
    window.mijwed = window.location.hostname == "m.mijwed.com";
    function shareStatistic(datas,title,defeated){
        if(defeated){datas.fail=defeated};
        datas.share_to=title;
        $.post( window.location.origin + (mijwed?'/weixin-share.html':'/mobile/weixin-share.html'),datas,function(e){
            
        })
    }
    var jsApiList = [
        'checkJsApi',
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'onMenuShareQQ',
        'onMenuShareQZone',
        'chooseImage',
        'previewImage',
        'uploadImage',
        'getLocalImgData'
    ]
    // 在分享配置中添加额外需要的wx方法 传入数组
    if (shareDetail.jsApiList) {
        jsApiList = jsApiList.concat(shareDetail.jsApiList)
    }
    if (location.host === "m.mijwed.com" || location.host === "www.lexiwed.com") {
        // 扫描二维码 - 需要公众号绑定的域名才能用
        jsApiList.push('scanQRCode')
    }
    wx.config({
        debug: false,// 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印
        appId:appId,// 必填，公众号的唯一标识
        timestamp:timestamp,// 必填，生成签名的时间戳
        nonceStr:nonceStr,// 必填，生成签名的随机串
        signature:signature,// 必填，签名，见附录1
        jsApiList: jsApiList // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });  
    wx.ready(function() {
        var link = shareDetail.link!='' ? shareDetail.link : window.location.href;
        shareDetail.imgUrl = shareDetail.imgUrl ? shareDetail.imgUrl : 'https://files.mijwed.com/static/common/images/share.png'
        var datas={
            share_to: '',
            share_content: shareDetail.desc,
            share_link: link,
            from_type: '3g',
            share_photo: shareDetail.imgUrl,
            referer_url: window.location.href,
            share_title: shareDetail.title,
        };
        // 分享到朋友圈
        wx.onMenuShareTimeline({
            title: shareDetail.title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareDetail.imgUrl, // 分享图标
            desc: shareDetail.desc,
            success: function(res) {
                // 用户确认分享后执行的回调函数
                shareStatistic(datas,'分享到朋友圈');
            },
            cancel: function(res) {
                // 用户取消分享后执行的回调函数
                shareStatistic(datas,'分享到朋友圈',1);
            }
        });
        // 分享给朋友
        wx.onMenuShareAppMessage({
            title: shareDetail.title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareDetail.imgUrl, // 分享图标
            desc: shareDetail.desc,
            success: function(res) {
                // 用户确认分享后执行的回调函数
                console.log("share success")
                shareStatistic(datas,'分享给朋友');
            },
            cancel: function(res) {
                // 用户取消分享后执行的回调函数
                shareStatistic(datas,'分享给朋友',1);
            }
        });
        //分享到QQ
        wx.onMenuShareQQ({
            title: shareDetail.title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareDetail.imgUrl, // 分享图标
            desc: shareDetail.desc,
            success: function(res) {
                // 用户确认分享后执行的回调函数
                shareStatistic(datas,'分享到QQ');
            },
            cancel: function(res) {
                // 用户取消分享后执行的回调函数
                shareStatistic(datas,'分享到QQ',1);
            }
        });
        //分享到腾讯微博
        wx.onMenuShareWeibo({
            title: shareDetail.title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareDetail.imgUrl, // 分享图标
            desc: shareDetail.desc,
            success: function(res) {
                // 用户确认分享后执行的回调函数
                shareStatistic(datas,'分享到腾讯微博');
            },
            cancel: function(res) {
                // 用户取消分享后执行的回调函数
                shareStatistic(datas,'分享到QQ',1);
            }
        });
        //分享到QQ空间
        wx.onMenuShareQZone({
            title: shareDetail.title, // 分享标题
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: shareDetail.imgUrl, // 分享图标
            desc: shareDetail.desc,
            success: function(res) {
                // 用户确认分享后执行的回调函数
                shareStatistic(datas,'分享到QQ空间');
            },
            cancel: function(res) {
                // 用户取消分享后执行的回调函数
                shareStatistic(datas,'分享到QQ空间',1);
            }
        });
    });
})()