
export default {
  getUrlKey: function (name) {
    return decodeURIComponent(
      (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  },
  delUrlParam: function (url, ref) {
    // 如果不包括此参数
    if (url.indexOf(ref) == -1)
      return url;
    var arr_url = url.split('?');
    var base = arr_url[0];
    var arr_param = arr_url[1].split('&');
    var index = -1;
    for (let i = 0; i < arr_param.length; i++) {
      var paired = arr_param[i].split('=');
      if (paired[0] == ref) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      return url;
    } else {
      arr_param.splice(index, 1);
      return base + "?" + arr_param.join('&');
    }
  },
  //将base64转换为文件
  dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename + '.' + mime.split('/')[1], { type: mime });
  },
  //复制内容到剪贴板
  copyToClip(content) {
    var aux = document.createElement("input");
    aux.setAttribute("value", content);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
    alert('复制成功')
  },
  setTitle(title) {
    document.title = title;
    var i = document.createElement('iframe');
    //i.src = '/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9);
    };
    document.body.appendChild(i);
  },
  isCardID(sId) {
    var iSum = 0;
    var info = "";
    if (!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误";
    sId = sId.replace(/x$/i, "a");
    if (aCity[parseInt(sId.substr(0, 2))] == null) return "你的身份证地区非法";
    let sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-" + Number(sId.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate())) return "身份证上的出生日期非法";
    for (var i = 17; i >= 0; i--) iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) return "你输入的身份证号非法";
    aCity[parseInt]
    return true;
  },
  // 姓名校验
  isName(name) {
    return regName.test(name);
  },
  isPhone(phone) {
    return phoneReg.test(phone);
  },
  getBlob(url, callback) {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.onload = () => {
      callback(xhr.response)
    }
    xhr.send()
  },
  getArraybuffer(url, callback) {
    const request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
      callback(request.response); // 请求回来的arraybuffer的音频文件
      //下面就是解码操作 buffer节点
    }
    request.send();
  },
  arraysum(arr) {
    var s = 0;
    arr.forEach(function(val, idx, arr) {
      s += val;
    }, 0);
    
    return s;
  },
  isIOS () {
    let isIphone = navigator.userAgent.includes('iPhone')
    let isIpad = navigator.userAgent.includes('iPad')
    return isIphone || isIpad
  }
}

export function formatdate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
};

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
};

//1.验证身份证是否有误
var aCity = {
  11: "北京", 12: "天津", 13: "河北", 14: "山西", 15: "内蒙古", 21: "辽宁",
  22: "吉林", 23: "黑龙江", 31: "上海", 32: "江苏", 33: "浙江", 34: "安徽",
  35: "福建", 36: "江西", 37: "山东", 41: "河南", 42: "湖北", 43: "湖南",
  44: "广东", 45: "广西", 46: "海南", 50: "重庆", 51: "四川", 52: "贵州",
  53: "云南", 54: "西藏", 61: "陕西", 62: "甘肃", 63: "青海", 64: "宁夏",
  65: "新疆", 71: "台湾", 81: "香港", 82: "澳门", 91: "国外"
}


var phoneReg = /^(((1[3456789][0-9]{1})|(15[0-9]{1}))+\d{8})$/;
var regName = /^[\u4e00-\u9fa5]{2,4}$/;


