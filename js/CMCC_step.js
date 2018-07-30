// CMCC 项目 所需要得 大多数js 整合  这个js  基于 jq mobiscroll 使用版本2.62


//选择年月日
function showDate(id, endTime) {
    var now = new Date(),
        max = new Date(now.getFullYear(), now.getMonth(), now.getDate() + endTime),
        min = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    var opt = {};
    opt.date = {
        preset: 'date'
    };
    opt.datetime = {
        preset: 'datetime'
    };
    opt.time = {
        preset: 'time'
    };
    opt.default = {
        /* android 
        android-holo
        android-holo-light
        android-ics
        android-ics-light */
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: false,
        dayText: '日',
        monthText: '月',
        yearText: '年',
        dateOrder: 'yymmdd', //面板中日期排列格式
        nowText: "明天",
        minDate: min,
        maxDate: max,
        // endYear: (new Date()).getFullYear()
        // startYear: min,  //开始年份
        // // minDate: new Date(),
        // endYear: max  //结束年份
    };
    $(`#${id}`).mobiscroll($.extend(opt['date'], opt['default']));
}


//显示时间 8:00 到 17:00
function showDateHour(id) {
    var now = new Date(),
        max = new Date(now.getFullYear(), now.getMonth(), now.getDate()),
        min = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var opt = {};
    opt.date = {
        preset: 'date'
    };
    opt.datetime = {
        preset: 'datetime'
    };
    opt.time = {
        preset: 'time'
    };
    opt.default = {
        /* android 
        android-holo
        android-holo-light
        android-ics
        android-ics-light */
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: false,
        dayText: '日',
        monthText: '月',
        yearText: '年',
        hourText: '时',
        minuteText: '分',

        timeWheels: 'HH:00',
        timeFormat: 'HH:ii',
        minDate: new Date(2018, 1, 30, 8, 00),
        maxDate: new Date(2018, 1, 30, 17, 00),


        // maxDate: max,
        // endYear: (new Date()).getFullYear()
        // startYear: min,  //开始年份
        // // minDate: new Date(),
        // endYear: max  //结束年份
    };
    $(`#${id}`).mobiscroll($.extend(opt['time'], opt['default']));
}


//展示 树状图

//一列
function trOne(id, array) {
    return $('#' + id + '>li').eq(array[0]).text();
}
//两列
function trTwo(id, array) {
    return $('#' + id + '>li').eq(array[0]).children('span').text() + ' ' + $('#' + id + '>li')
        .eq(array[0]).find('ul li').eq(array[1]).text().trim(' ');
}



//树状图
function showTreeList(id, name, fn, headText, fn2) {
    $('#' + id).mobiscroll().treelist({
        theme: 'android-ics light',
        mode: 'scroller',
        display: 'bottom',
        lang: 'zh',
        placeholder:'点击选择',
        cancelText: "取消",
        headerText: headText || '预约办理地址',
        formatResult: function (array) {
            //添加 name
            $("#" + id + "_dummy").attr("name", name);
            $("#" + id + "_dummy").attr("date-id", 11);
            $("#" + id + "_dummy").attr("placeholder", "点击选择");
            //两列
            // resultVal(id,array);
            return fn(id, array);
        },
        onSelect: fn2 ? fn2 : "",
    });
}


//表单验证
function proving(arr, id) {
    if(arr.hasOwnProperty('f_name')){
        if(!proName(arr.f_name)){
            return false;
        };
    }
    if(arr.hasOwnProperty('f_phone')){
        if(!proPhone(arr.f_phone)){
            return false;
        };
    }
    if(arr.hasOwnProperty('f_identity')){
        if(!proID(arr.f_identity)){
            return false;
        };
    }
    if(arr.hasOwnProperty('f_time')){
        if(!prodate(arr.f_time)){
            return false;
        };
    }
    if(arr.hasOwnProperty('begin_time')&&arr.hasOwnProperty('end_time')){
        if(!probeginEnd(arr.begin_time,arr.end_time)){
            return false;
        };
    }
    if(arr.hasOwnProperty('f_address_dummy')){
        if(!proAddress(arr.f_address_dummy)){
            return false;
        };
    }
    if(arr.hasOwnProperty('f_area_dummy')){
        if(!proAddress_area(arr.f_area_dummy)){
            return false;
        };
    }
    if(arr.hasOwnProperty('f_street_dummy')){
        if(!proAddress_street(arr.f_street_dummy)){
            
            return false;
        };
    }
    if(arr.hasOwnProperty('f_village_dummy')){
        console.log(11)
        if(!proAddress_village(arr.f_village_dummy)){
            return false;
        };
    }
    if(arr.hasOwnProperty('f_address_detial')){
        if(!proAddress_detial(arr.f_address_detial)){
            return false;
        };
    }
    //姓名 校验
    function proName(name) {
        var regName = /^[\u4e00-\u9fa5]{2,4}$/;
        if (!regName.test(name)) {
            showError(id, "真实姓名填写有误")
            return false;
        }else{
            return true;
        }
    }
    // 电话 校验
    function proPhone(phone) {
        var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phone)) {
            showError(id, "电话号填写有误");
            return false;
        }else{
            return true;
        }
    };
    //身份证 校验
    function proID(sId) {
        let aCity={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"} 
        
            var iSum=0 ;
            var info="" ;
            if(!/^\d{17}(\d|x)$/i.test(sId)){ showError(id,"你输入的身份证长度或格式错误"); return false ;};
            sId=sId.replace(/x$/i,"a");
            if(aCity[parseInt(sId.substr(0,2))]==null){ showError(id,"你的身份证地区非法"); return false ;} ;
            sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2));
            var d=new Date(sBirthday.replace(/-/g,"/")) ;
            if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate())){showError(id,"身份证上的出生日期非法"); return false ;};
            for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
            if(iSum%11!=1){ showError(id,"你输入的身份证号非法"); return false ;}
            //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
            return true;
    }
    //时间 日期验证
    function prodate(time) {
        if(!time.length>0){
            showError(id, "时间不能为空")
            return false;
        }else{
            return true;
        }
    }
    //开始时间结束时间验证
    function probeginEnd(start,end) {
        if(start.length<=0){
            showError(id, "开始时间不能为空")
            return false;
        }else if(end.length<=0){
            showError(id, "结束时间不能为空")
            return false;
        }else if(start.slice(0,2).toString()-end.slice(0,2).toString()>=0){
            showError(id, "开始时间不能大于或等于结束时间")
            return false;
        }else{
            return true;
        }
    }
     //地址 日期验证
     function proAddress(address) {
        if(!address.length>0){
            showError(id, "地址不能为空")
            return false;
        }else{
            return true;
        }
    }
    //判断 地区
    function proAddress_area(address) {
        if(!address.length>0){
            showError(id, "地区不能为空")
            return false;
        }else{
            return true;
        }
    }
     //判断 街道
     function proAddress_street(address) {
        if(!address.length>0){
            showError(id, "街道不能为空")
            return false;
        }else{
            return true;
        }
    }
     //判断 地区
     function proAddress_village(address) {
        if(!address.length>0){
            showError(id, "小区不能为空")
            return false;
        }else{
            return true;
        }
    }
    //地址 详细地址
    function proAddress_detial(address) {
        if(!address.length>0){
            showError(id, "详细地址不能为空")
            return false;
        }else{
            return true;
        }
    }

    //   function isCardID(sId){ 
        // var iSum=0 ;
        // var info="" ;
        // if(!/^\d{17}(\d|x)$/i.test(sId)) return "你输入的身份证长度或格式错误"; 
        // sId=sId.replace(/x$/i,"a"); 
        // if(aCity[parseInt(sId.substr(0,2))]==null) return "你的身份证地区非法"; 
        // sBirthday=sId.substr(6,4)+"-"+Number(sId.substr(10,2))+"-"+Number(sId.substr(12,2)); 
        // var d=new Date(sBirthday.replace(/-/g,"/")) ;
        // if(sBirthday!=(d.getFullYear()+"-"+ (d.getMonth()+1) + "-" + d.getDate()))return "身份证上的出生日期非法"; 
        // for(var i = 17;i>=0;i --) iSum += (Math.pow(2,i) % 11) * parseInt(sId.charAt(17 - i),11) ;
        // if(iSum%11!=1) return "你输入的身份证号非法"; 
        // //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
        // return true;
    // }
}

//提示错误
function showError(id, content) {
    $("#" + id).text(content);
    // $("#" + id).show();
    $("#" + id).slideDown();
    setTimeout(function () {
        $("#" + id).slideUp();
    }, 3000);
}