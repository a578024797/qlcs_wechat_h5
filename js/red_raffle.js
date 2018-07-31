//没整合js 还没写完  不想ajax直接在方法里写 想传参调用
function initLucky(options) {
    //把所有需要的变量都放到一个对象中
    let defaultOption = initOption(options);
    drawBorder(defaultOption);
    //初始化对象 考虑是否用构造函数还是用方法来写初始化(考虑到仅仅是存点变量,还是选择方法)
    function initOption(_option) {
        console.log(document.getElementById(`${_option.id}`));
        var optionA = {
            father: document.getElementById(`${_option.id}`).parentNode, //canvas父级对象
            canvas: document.getElementById(`${_option.id}`), //对象
            canvasW: document.getElementById(`${_option.id}`).parentNode.offsetWidth, //宽 this指向的是windows !!! 怕严格模式下 有错误改了
            canvasH: document.getElementById(`${_option.id}`).parentNode.offsetHeight, //高
            context: document.getElementById(`${_option.id}`).getContext("2d"), //上下文对象
            productsList: _option.textlist, //产品列表
            // lengthAA:  _option.textlist.length, //获取不到this.productsList为什么?? this指向的是windows !!!
            baseRadian: Math.PI / 180 * 360 / _option.textlist.length, //默认弧度
            backgroundImg: _option.backgroundImg, // 背景图片
            clickImg: _option.clickImg, //点击按钮图片
            alternateColor: _option.alternateColor, //交替颜色
            alternateColor2: _option.alternateColor2, //交替颜色2
            stratRadian: _option.stratRadian, //启示弧度
            wordSub: _option.wordSub, //截取字符串得长度 (我用的 substring())
            timer: "", // 保存 setinterval
            roateRadian: 0, // 默认转得时候的角度
            luckPosition: 0, //默认中奖位置
            cacheImg: "", //canvas缓存
            frequency: _option.frequency, //次数 限制几次抽奖
            flagTimes: 0, //设置权限只能点击一次
            onlyone: 0, //单击设置
            domain: _option.domain, //点击执行接口得地址
            result: "1", //接口返回信息
            success: _option.success ? _option.success : "", //成功回调函数
            shelter: _option.shelter ? _option.shelter : false, //是否开启遮罩层
            ceng: "", //遮罩层
        }
        //设置canvas的宽高
        optionA.canvas.width = optionA.canvasW;
        optionA.canvas.height = optionA.canvasH;
        createCache(optionA);
        createCeng(optionA);
        return optionA;
    } //end


    //由于图片闪烁 尝试下网上说的双缓存
    function createCache(_option) {
        if (!_option.cacheImg) {
            let cacheCanvas = document.createElement("canvas");
            let cacheContext = cacheCanvas.getContext("2d");
            let img = new Image();
            img.onload = function () {
                cacheCanvas.width = _option.canvasH / 3.2 * (img.width / img.height);
                cacheCanvas.height = _option.canvasH / 3.2;
                cacheContext.drawImage(img, 0, 0,
                    _option.canvasH / 3.2 * (img.width / img.height),
                    _option.canvasH / 3.2);
                // _option.cacheImg = cacheCanvas; //如果等图片加载完在赋值会报错
            }
            img.src = _option.clickImg;
            _option.cacheImg = cacheCanvas; //这样不会报错,但是点击得图片会消失 目前只出现在火狐
        }
    } //end
    //绘制最外层边框
    function drawBorder(_option) {
        //因为插件自带提示 是context为了方便,赋值一下
        let context = _option.context;
        //让所有图形的基本点都在最中间
        context.translate(_option.canvasW / 2, _option.canvasH / 2);
        //保存
        context.save();
        context.beginPath();
        let img = new Image();
        img.onload = function () {
            if (_option.cacheImg) {
                //由于给的图形是长方形,所以我绝对已高为单位做半径
                context.drawImage(img, -_option.canvasH / 2, -_option.canvasH / 2, _option.canvasH,
                    _option
                    .canvasH);
                //ps 由于第一次加载 可能会出现图片记载不出来得情况
                //这么做感觉有点愚蠢 谁有更好办法清联系我 578024797
                let img2 = new Image();
                img2.onload = function () {
                    //本来想写在外面的 但是由于层级顺序只能写在里面了
                    drawProducts(_option);
                    //点击事件
                    registeClick(_option);
                }
                img2.src = _option.clickImg;

            }

        }
        img.src = _option.backgroundImg;

        //恢复
        context.restore();
    } //end

    //绘制产品
    function drawProducts(_option) {
        let context = _option.context;
        //保存
        for (let index = 0; index < _option.productsList.length; index++) {
            let sAngle = _option.baseRadian * index + _option.stratRadian;
            context.save();
            context.beginPath();
            context.rotate(_option.roateRadian * Math.PI / 180); //settimeout时候得角度 单纯调页面请注视
            //判断颜色
            if (index % 2 === 0) {
                context.fillStyle = _option.alternateColor;
                // context.fillStyle = "#000"; //test
            } else {
                context.fillStyle = _option.alternateColor2;
            }

            //ps 上下间距有点误差 我怎么总感觉是背景图得原因那...
            //绘制大圆
            context.arc(0, 0, _option.canvasH / 2.25, sAngle, sAngle + _option.baseRadian, false);
            //绘制小圆
            context.arc(0, 0, _option.canvasH / 6.5, sAngle + _option.baseRadian, sAngle, false);

            context.fill();
            //绘制产品
            context.fillStyle = "#fff";
            /*
                字体行高 都是根据canvas得宽来的,我并没有根据产品得数量来判断,
                一策划没给我产品个数范围,出的图也没有考虑(4个奖品还抽啥 回家过家家得了) 
                二手机页奖品超过10个 感觉会字体变得越来越小,太小导致看不清
             */
            let fontWeight = _option.canvasH / 100 * 6; //文字适配根据canvas得宽
            let lineHeight = _option.canvasH / 11; //行高
            let lineHeight2 = _option.canvasH / 13.5; //行高2
            context.font = `${fontWeight}px Microsoft YaHei`;
            let tranX = 0 + Math.cos(sAngle + _option.baseRadian / 2) * _option.canvasH / 2.25;
            let tranY = 0 + Math.sin(sAngle + _option.baseRadian / 2) * _option.canvasH / 2.25;
            context.translate(tranX, tranY);
            context.rotate(sAngle + _option.baseRadian / 2 + Math.PI / 2);
            let textTimes = Math.ceil(_option.productsList[index].length / _option.wordSub)
            //获取在字符串中得数字
            var stringContainsNumber = _option.productsList[index].replace(/[^0-9]/ig, "");
            for (let j = 0; j < textTimes; j++) {
                //概述下判断, 之前写的是根据字数判断,导致很不美观
                /* 
                    判断字符串截取位置  _option.wordSub * (j+1) 如果大于 numberIndex数字在字符串得位置
                    就认为碰到数字了(字符串只有一个数字!!!!) 然后判断_option.wordSub * j与 numberIndex 有没有
                    字符了 有就渲染出来 没有 直接 substring(numberIndex);
                    由于 第一次渲染跟第二次渲染文字得行高不同 所以判断了下 j === 0
                 */
                if (j === 0) {
                    if (stringContainsNumber !== "") {
                        let numberIndex = _option.productsList[index].indexOf(
                            stringContainsNumber);
                        if (_option.wordSub * (j + 1) > numberIndex) {
                            if (_option.productsList[index].substring(_option.wordSub * j,
                                    numberIndex)) {
                                context.fillText(_option.productsList[index].substring(_option.wordSub * j,
                                        numberIndex), -context.measureText(
                                        _option.productsList[index]
                                        .substring(_option.wordSub * j, numberIndex)).width /
                                    2,
                                    lineHeight *
                                    (j + 1));
                                context.fillText(_option.productsList[index].substring(numberIndex), -context.measureText(
                                        _option.productsList[index]
                                        .substring(numberIndex)).width / 2,
                                    lineHeight *
                                    (j + 2));
                                break;
                            } else {
                                context.fillText(_option.productsList[index].substring(numberIndex), -context.measureText(
                                        _option.productsList[index]
                                        .substring(numberIndex)).width / 2,
                                    lineHeight *
                                    (j + 1));
                                break;
                            }

                        };
                    }
                    context.fillText(_option.productsList[index].substring(_option.wordSub * j, _option.wordSub *
                            (
                                j + 1)), -context.measureText(
                            _option.productsList[index]
                            .substring(_option.wordSub * j, _option.wordSub * (j + 1))).width / 2,
                        lineHeight *
                        (j + 1));
                } else {
                    if (stringContainsNumber !== "") {
                        let numberIndex = _option.productsList[index].indexOf(
                            stringContainsNumber);
                        if (_option.wordSub * (j + 1) > numberIndex) {
                            if (_option.productsList[index].substring(_option.wordSub * j,
                                    numberIndex)) {
                                context.fillText(_option.productsList[index].substring(_option.wordSub * j,
                                        numberIndex), -context.measureText(
                                        _option.productsList[index]
                                        .substring(_option.wordSub * j, numberIndex)).width /
                                    2,
                                    lineHeight2 *
                                    (j) + lineHeight);
                                context.fillText(_option.productsList[index].substring(numberIndex), -context.measureText(
                                        _option.productsList[index]
                                        .substring(numberIndex)).width / 2,
                                    lineHeight2 *
                                    (j + 1) + lineHeight);
                                break;
                            } else {
                                context.fillText(_option.productsList[index].substring(numberIndex), -context.measureText(
                                        _option.productsList[index]
                                        .substring(numberIndex)).width / 2,
                                    lineHeight2 *
                                    (j) + lineHeight);
                                break;
                            }

                        };
                    }
                    context.fillText(_option.productsList[index].substring(_option.wordSub * j, _option.wordSub *
                            (
                                j + 1)), -context.measureText(
                            _option.productsList[index]
                            .substring(_option.wordSub * j, _option.wordSub * (j + 1))).width / 2,
                        lineHeight2 *
                        (j) + lineHeight);
                }

            }

            context.restore();
        }
        //绘制点击按钮F
        drawClick(_option);
    } //end

    //绘制点击按钮
    function drawClick(_option) {
        _option.context.drawImage(_option.cacheImg, 0 - _option.cacheImg.width / 2, 0 - (_option.cacheImg
            .height /
            2) - ((1 - (_option.cacheImg.width / _option.cacheImg.height)) * _option.cacheImg.height /
            2));
        //老方案 误删
        // let img = new Image();
        // img.onload = function () {
        //     //此段 代码算出 图片得宽高比 使展示得图品等比例 然后绝对居中
        //     _option.context.drawImage(img, 0 - (_option.canvasH / 3.2 * (img.width / img.height)) / 2,
        //         0 - _option.canvasH / 6.4 - (1 - (img.width / img.height)) * _option.canvasH / 6.4,
        //         _option.canvasH / 3.2 * (img.width / img.height),
        //         _option.canvasH / 3.2);
        //     //在click时间加载后注册
        //registeClick(_option);
        // }
        // img.src = _option.clickImg;
    } //end

    //注册点击事件 判断 触发事件的位置在不在clickImg的坐标范围内(最后写)
    //点击后先执行ajax 获取 中奖得数组 然后根据数据转动到中奖位置 (先用固定代替)
    function registeClick(_option) {
        let position_minX = parseInt(_option.canvasW) / 2 - _option.cacheImg.width / 2;
        let position_maxX = parseInt(_option.canvasW) / 2 + _option.cacheImg.width / 2;
        let position_minH = parseInt(_option.canvasH) / 2 - _option.cacheImg.height / 2;
        let position_maxH = parseInt(_option.canvasH) / 2 + _option.cacheImg.height / 2;
        _option.canvas.onclick = function (e) {
            console.log(_option.onlyone);
            //判断鼠标点击是否在范围点击抽奖范围内, 
            if ((e.offsetX >= position_minX && e.offsetX <= position_maxX) && (e.offsetY >= position_minH &&
                    e.offsetY <= position_maxH)) {
                //判断当前旋转是否结束 
                if (_option.onlyone === 0) {
                    if (_option.ceng !== "") {
                        _option.father.appendChild(_option.ceng);
                    }
                    _option.onlyone = 1;
                    //执行接口 每次点击需要获取得数据 判断domain地址是否为空 为空(测试)给个假得
                    if (_option.domain !== undefined && _option !== "" && _option !== null) {
                        //同时执行error跟success什么鬼.
                        $.ajax({
                            type: 'POST',
                            url: _option.domain,
                            data: {},
                            async: false, //由于ajax异步会限制性 ajax后面的代码 所以 我改为同步执行 ajax只要有问题后面代码就不执行
                            dataType: 'json',
                            // jsonpCallback: "showData",
                            // crossDomain: true,
                            success: function (result) {
                                if (result === null) {
                                    console.log("如果你发现在执行error方法后又进到这里了,他跟jquery_code文件冲突了")
                                    console.log("result返回结果为空 如果依然想要旋转 请注释 280 281 并修改31行 result = 1");
                                    _option.result = "error"; //测试得时候可以去除
                                    _option.onlyone = 0; //测试得时候可以去除
                                    _option.luckPosition = 1;
                                } else {
                                    if (result.error == 1) {
                                        console.log("ajax返回error结果错误 如果依然想要旋转 请注释 289 290 并修改31行 result = 1");
                                        _option.onlyone = 0; //测试得时候去掉
                                        _option.result = "error"; //测试得时候可以去除
                                    } else if (result.error == 0) {
                                        //设置成功方法所需要的数据
                                        let lucy = result.name;
                                        let position = _option.productsList.indexOf(lucy);
                                        _option.luckPosition = position; //获奖位置
                                        _option.result = result; //保存result结果
                                        _option.frequency = result.frequency //更新总抽奖次数
                                    }
                                }
                            },
                            error: function () {
                                console.log("ajax返回错误,如果你依然想要他旋转请注释 位置 303 304 并修改31行 result = 1")
                                _option.onlyone = 0;
                                _option.result = "error"; //测试得时候可以去除

                            }
                        });
                    } else {
                        console.log("你并没有写domain,如果你依然想要他旋转请注释 位置 311 312 并修改31行 result = 1")
                        _option.luckPosition = 2;
                        // _option.onlyone = 0; //测试去掉
                        // _option.result = "error"; //测试得时候可以去除
                    }
                    console.log("转盘position =========== " + _option.luckPosition);

                    //判断总次数 如果大于抽奖次数则不旋转(抽奖总次数每次掉ajax都会更新)      
                    if (_option.flagTimes < _option.frequency && _option.result !== "error" && _option.result !== "") {
                        _option.flagTimes++;
                        _option.timer = setInterval(function () {


                            //变速改
                            if (turnSpeed(_option) === 0) {
                                clearPromise(_option).then(function (result) {
                                    //回复角度
                                    _option.roateRadian = 0;
                                    //延迟0.8秒 执行获奖方法
                                    setTimeout(() => {
                                        console.log(result);
                                        if (_option.success) {
                                            // _option.result = {
                                            //     "error": 0,
                                            //     "msg": null,
                                            //     "type": "2",
                                            //     "name": "5元优惠券",
                                            //     "score": "100",
                                            //     "hc_id": "00000007499328"
                                            // }
                                            _option.success(_option.result);
                                        } else {
                                            console.log("如果需要回调,清添加success");
                                        }
                                        _option.onlyone = 0;
                                        console.log(_option.ceng);
                                        if (_option.ceng !== "") {
                                             _option.father.removeChild(_option.ceng);
                                        }
                                    }, 700);
                                }).catch(function () {
                                    console.log("错误了")
                                });
                                return; //如果不加return 清除完之后还会执行几次!!!
                            }
                            _option.roateRadian += turnSpeed(_option);
                            drawProducts(_option);
                        }, 1) //setinterval end
                    } else {
                        return false;
                    } // 旋转 end
                } //onlyone end
            } //判断点击范围
        } //onclick end
    } // end

    //用来清除interval
    function clearPromise(_option) {
        clearInterval(_option.timer);
        return new Promise(function (resolve, reject) {
            resolve('OK');
        });
    } //end
    //旋转速度
    function turnSpeed(_option) {
        // _option.roateRadian * Math.PI / 180 >= Math.PI * 2 * 3 -
        //     Math.PI / 2 -
        //     _option.baseRadian / 2 - _option.baseRadian *
        //     _option.luckPosition
        //((旋转弧度与 旋转圈数-90弧度-默认弧度得一半-产品位置)*10)向下去整 在用10-这个比 等于radian需要加得度数
        var pp = Math.floor(((_option.roateRadian * Math.PI / 180) / (Math.PI * 2 * 5 - Math.PI / 2 - _option.baseRadian / 2 -
            _option.baseRadian * _option.luckPosition)) * 10);
        // console.log(pp);
        return 10 - pp;
    }
    //创建遮罩层
    function createCeng(_option) {
        //默认父级元素 position releative 没有请自己加上
        let ceng = "";
        if (_option.shelter) {
            ceng = document.createElement("div");
            ceng.style.position = "absolute";
            ceng.style.left = 0;
            ceng.style.top = 0;
            ceng.style.zIndex = 999;
            ceng.style.width = _option.father.offsetWidth + "px";
            ceng.style.height = _option.father.offsetHeight + "px";
        }
        _option.ceng = ceng;
    } //end

}