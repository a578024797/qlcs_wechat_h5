        //进度条
        function progressLine(options) {
            let defaultObj = {
                progressId: "progressLine", //进度条得id
                progressBgColor: "#2321ad", //进度条背景颜色
                progressFaBgColor: "#d30065", //没有进度得时候得背景颜色
                progressImgId: "progressImg", //进度条图片
                progressRate: "30" // 进度条进度 百分比
            };
            let finallObj = $.extend({}.defaultObj, options); //最后得对象
            progresssStart();
            // 更改默认属性
            function progresssStart() {
                let progress = $("#" + finallObj.progressId);
                let progressFater = $("#" + finallObj.progressId).parent();
                let progressImg = $("#" + finallObj.progressImgId)
                // progress.css("width", finallObj.progressRate + "%");
                progress.css("backgroundColor", finallObj.progressBgColor);
                progress.animate({
                    width: finallObj.progressRate + "%",
                }, 1000);
                progressFater.css("backgroundColor", finallObj.progressFaBgColor);
                // progressImg.css("left", finallObj.progressRate + "%");
                progressImg.animate({
                    left: finallObj.progressRate + "%",
                }, 1000)
            }
        }