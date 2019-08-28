(function (doc, win) {
    var maxwidth = 750;//PSD源图 宽度尺寸
    var oMeta = document.getElementById('viewport');
    var docE1 = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            oMeta.content = "width=device-width,initial-scale=1.0,user-scalable=no";
            var clientWidth = docE1.clientWidth;
            var sca = (clientWidth / maxwidth);
            sca = sca > 1 ? 1 : sca;
            oMeta.content = "width=" + maxwidth + ",minimum-scale=" + sca + ",maximum-scale=" + sca + ",user-scalable=no,minimal-ui";
        };
    var orientchange = function () { 
        setTimeout(function () {
            if (window.orientation == 180 || window.orientation == 0 || window.orientation == 90 || window.orientation == -90) {
                recalc();
            }
        }, 200);
    };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener("DOMContentLoaded", recalc, false);
    doc.addEventListener(resizeEvt, orientchange, false);//横竖屏切换执行
})(document, window)