import NativeShare from 'nativeshare'
import {hex_sha1} from "@/js/MD5.js"

export default function(imgSrc,ticket) {
    var url = window.location.href;
    var title = '女装头条';
    var desc = '为你精选优质热门的服装行业资讯，带你了解服装行业近期最新动态';
    var time = Math.round(new Date().getTime() / 1000);
    var nonceStr = Math.random().toString(36).substr(2);

    var string1 = 'jsapi_ticket=' + ticket + '&noncestr=' + nonceStr + '&timestamp=' + time + '&url=' + url;
    var signature = hex_sha1(string1);
    var nativeShare = new NativeShare({
        wechatConfig: {
            appId: 'wx73498eb68db5c46d',
            timestamp: time,
            nonceStr: nonceStr,
            signature: signature,
        },
        // 让你修改的分享的文案同步到标签里，比如title文案会同步到<title>标签中
        // 这样可以让一些不支持分享的浏览器也能修改部分文案，默认都不会同步
        syncDescToTag: true,
        syncIconToTag: true,
        syncTitleToTag: true,
    });
    nativeShare.setShareData({
        icon: imgSrc,
        link: url,
        title: title,
        desc: desc,
        from: '@fa-ge',
    });
}
