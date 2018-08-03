/* 
    made in red
    结构 4个div 或者 3个div
    判断 是3个还是4个 
    然后在div内填充值
    具体展示形式可以随意修改 不局限div个数 更改initializeTime即可
 */
/*
要求 计算两个时间戳相减 然后拥有倒计时效果 只需要24小时内得计算
                            1. 模拟数据 随便用前一天得时间 与当前时间对比
                            2.  两个时间相减 当前时间-前一天时间 /1000 得到秒
                            3.  得到秒 之后 setinterval 让time--  然后在函数中输出效果
                            4.  当秒杀数小于0  就显示已超时
        计算方式 second = 时间戳(默认秒) - 小时 - 分钟  所有单位都换成秒 
 */
function invokingTime(id, time_out, fn) {

    let time_out_time = new Date(time_out.replace(/-/g,'/')).getTime();
    let nowTime = new Date().getTime();
    let total = (time_out_time - nowTime) / 1000 < 0 ? 0 : (time_out_time - nowTime) / 1000;
    let $divList = $(`#${id}`).find("div");
    let flagL = $divList.length;
    let firstList = initializeTime(total, flagL);
    for (let index = 0; index < flagL; index++) {
        $($divList[index]).html(firstList[index]);
    }
    if (total > 0) {
        showTime(total - 1, flagL, $divList,fn)
    }

    // 显示时间
    function showTime(times, flagL, divlist,fn) {
        let p = setInterval(function () {
            let timeList = initializeTime(times, flagL);
            // $(`#${id}`).html(`${day}:${hour}:${minute}:${second}`);
            for (let index = 0; index < flagL; index++) {
                $(divlist[index]).html(timeList[index]);
            }
            times--;
            if (times < 0) {
                clearInterval(p);
                for (let index = 0; index < divlist.length; index++) {
                    $(divlist[index]).html("00");
                }
                fn ? fn() : fn;
                // $('#sta_' + id).html('已超时');
                // $('#op_' + id).html("< a href= "{pigcms{:U('trader_issue_detail')}&id=" + id + "\">详情</ a>");

            }
        }, 1000);
        // timer[id] = p;
    }
    // 初始化时间
    function initializeTime(times, flag) {
        /* ---------------------------- 天 : 小时 : 分钟 :秒 */
        let day = Math.floor(times / (60 * 60 * 24)); //天
        let hour = Math.floor(times / (60 * 60)) - (day * 24); //小时
        let minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60); //秒
        let second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60); //秒
        /* ---------------------------- 小时:分钟:秒 */
        let newHour = Math.floor(times / (60 * 60))
        let newMinute = Math.floor(times / 60) - (newHour * 60);
        let newSecond = Math.floor(times) - (newHour * 60 * 60) - (newMinute * 60);;
        if (day <= 9) day = '0' + day;
        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        if (newHour <= 9) newHour = '0' + newHour;
        if (newMinute <= 9) newMinute = '0' + newMinute;
        if (newSecond <= 9) newSecond = '0' + newSecond;
        let flagC = flag ? flag : 4;
        switch (flagC) {
            case 3:
                return [newHour, newMinute, newSecond];
                break;
            default:
                return [day, hour, minute, second];
                break;
        }
    }
}
