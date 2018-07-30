<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <title>足球竞猜</title>
    <link href="{pigcms{$static_path}css/commmon.css?123456" rel="stylesheet" type="text/css">
    <link href="{pigcms{$static_path}css/soccer.css" rel="stylesheet" type="text/css">
    <script src="{pigcms{$static_path}js/jquery1.11.3.js"></script>
</head>
<body>
<div class="wx_container soccer_bgImg">
    <header class="wx_header">
        <div class="soccer_headImgBox clear_space ">
            <img src="{pigcms{$static_path}images/soccer/header.png" alt="images" class="soccer_headImg">
        </div>
    </header>
    <div class="wx_main">
        <div class="soccer_nav">
            <div class="soccer_nav_box">
                <div class="soccer_nav_content clear_space">
                    <img src="{pigcms{$static_path}images/soccer/jiangbei.png" alt="jiangbei" class="soccer_nav_img">
                    <span class="soccer_nav_word">我的积分</span>
                    <span class="soccer_nav_integral">50000</span>
                </div>
            </div>
            <div class="soccer_nav_box">
                <div class="soccer_nav_content clear_space">
                    <img src="{pigcms{$static_path}images/soccer/qiuyi.png" alt="qiuyi" class="soccer_nav_img">
                    <span class="soccer_nav_word">我的订单</span>
                </div>
                <div class="soccer_nav_content clear_space">
                    <img src="{pigcms{$static_path}images/soccer/zuqiu.png" alt="zuqiu" class="soccer_nav_img">
                    <span class="soccer_nav_word">规 则</span>
                </div>
            </div>
        </div>
        <!-- 1 -->
        <div class="soccer_main_box">
            <!-- 时间 -->
            <div class="soccer_game_message">
                <span>1/8决赛 06.30 22:00 开赛</span>
                <span>参与截至: 06.30 22.05</span>
            </div>
            <!-- 比赛国家 -->
            <h2 class="soccer_game_country">
            <span class="soccer_span_country">门啊牙</span>
                <span class="soccer_span_VS">VS</span>
                <span class="soccer_span_country">普罗米修斯</span>
            </h2>
            <!-- 倍率 -->
            <div class="soccer_game_integral">
                <div class="soccer_integral_box" id="country3_Integral">
                    1.5倍
                    <div class="soccer_integral_integral" >猜</div>
                </div>
                <div class="soccer_integral_box" id="country4_Integral">
                    1.5倍
                    <div class="soccer_integral_integral" >猜</div>
                </div>
            </div>
            <!-- 倍率 提醒 -->
            <div class="soccer_integral_message soccer_normal_font">
                赛果玩法 参加上线1000积分 只能选择一方
            </div>
            <!-- 国家国旗 -->
            <div class="soccer_country_flag">
                <div class="soccer_flag_box">
                    <div class="soccer_flag_img_box soccer_flag_left soccer_unclick" id="country3">
                        <img src="{pigcms{$static_path}images/soccer/flag/11.png" alt="11" class="soccer_unclick">
                        <div></div>
                    </div>
                </div>
                <div class="soccer_flag_box">
                    <div class="soccer_flag_img_box soccer_flag_right" id="country4">
                        <img src="{pigcms{$static_path}images/soccer/flag/12.png" alt="12" class="soccer_unclick">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 2 -->
        <div class="soccer_main_box">
            <!-- 时间 -->
            <div class="soccer_game_message">
                <span>1/8决赛 06.30 22:00 开赛</span>
                <span>参与截至: 06.30 22.05</span>
            </div>
            <!-- 比赛国家 -->
            <h2 class="soccer_game_country">
                <span class="soccer_span_country">门牙</span>
                <span class="soccer_span_VS">VS</span>
                <span class="soccer_span_country">普罗米修斯</span>
            </h2>
            <!-- 倍率 -->
            <div class="soccer_game_integral">
                <div class="soccer_integral_box" id="country1_Integral">
                    1.5倍
                    <div class="soccer_integral_integral">猜</div>
                </div>
                <div class="soccer_integral_box" id="country2_Integral">
                    1.5倍
                    <div class="soccer_integral_integral">猜</div>
                </div>
            </div>
            <!-- 倍率 提醒 -->
            <div class="soccer_integral_message soccer_normal_font">
                赛果玩法 参加上线1000积分 只能选择一方
            </div>
            <!-- 国家国旗 -->
            <div class="soccer_country_flag">
                <div class="soccer_flag_box">
                    <div class="soccer_flag_img_box soccer_flag_left" id="country1">
                        <img src="{pigcms{$static_path}images/soccer/flag/11.png" alt="11">
                        <div></div>
                    </div>
                </div>
                <div class="soccer_flag_box">
                    <div class="soccer_flag_img_box soccer_flag_right" id="country2">
                        <img src="{pigcms{$static_path}images/soccer/flag/12.png" alt="12">
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
        <footer class="wx_footer soccer_bottom">

            <div class="soccer_bottom_message">
                投
                <span>100</span>积分,猜中可得
                <span>500</span>积分
            </div>
            <div class="soccer_bottom_content_box">
                <div class="soccer_bottom_content" id="clearAll">清空投注</div>
                <div class="soccer_bottom_content">确认投注</div>
            </div>
        </footer>
        <div class="soccer_space"></div>
    </div>
</div>
<!-- 足球js -->
<script src="{pigcms{$static_path}js/soccer.js"></script>
<script>
    // 1
    $("#country1").click(function () {
        football("country1_Integral","country1");
    });
    // 2
    $("#country2").click(function () {
        football("country2_Integral","country2");
    });
    //3

    $("#country3").click(function () {
        //country3_Integral
        football("country3_Integral","country3");
    });
    //4

    $("#country4").click(function () {
        football("country4_Integral","country4");
    });
    // country4_Integral
        
     //213
     function football(id,clickId) {
            let $win = $("#" + clickId).find("div");
            let $brotherWin = $("#" + clickId).parent().siblings().find(".soccer_win");
            let $country = $("#" + id);
            let $integral = $("#" + id).find("div");
            let $borther = $("#" + id).siblings();
            let $bortherIntegral = $borther.find("div");
            if ($borther.hasClass("soccer_integral_boxC")) {
                $borther.removeClass("soccer_integral_boxC");
                $borther.removeClass("soccer_integral_boxC");
                $bortherIntegral.attr("class", "soccer_integral_integral");
                $bortherIntegral.text("猜");
                $bortherIntegral.css("font-size", "");
                $brotherWin.removeClass("soccer_win");
            }
            $country.addClass("soccer_integral_boxC");
            $win.addClass("soccer_win");
            $integral.attr("class", "soccer_integral_integralC");
            let intestalNum = $integral.text();
            if ($integral.text() != "猜") {
                $integral.text(parseInt(intestalNum) + 50);
                console.log(intestalNum);

                if (parseInt(intestalNum) + 50 >= 1000) {
                    $integral.text(1000);
                    $integral.css("font-size", ".6rem");
                }
            } else {
                $integral.text(100);
            }
        }
</script>
<script>
     $("#clearAll").click(function () {
            let $integralBox = $(".soccer_integral_boxC");
            let $win = $(".soccer_win");
            let $integral = $(".soccer_integral_integralC");
            if ($integralBox.length != 0) {
                $integralBox.removeClass("soccer_integral_boxC");
                $integral.text("猜");
                $integral.attr("class", "soccer_integral_integral");
                $win.removeClass("soccer_win");
            }
        });
</script>
</body>
</html>