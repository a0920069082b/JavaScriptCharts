window.onload = function () {
    BeginCanvas(10);
}

//開始繪製Charts
function BeginCanvas(DataCount) {
    const Charts = document.getElementById("Charts");
    const ctx = Charts.getContext("2d");
    const cvWidth = 800; //Canvas的寬度
    const cvHeight = 500; //Canvas的高度
    const cvXStart = 100; //X座標的起點
    const cvYStart = 50; //Y座標的起點
    const cvXEnd = cvXStart + cvWidth; //X座標的終點
    const cvYEnd = cvYStart + cvHeight; //Y座標的終點
    const MaxNum = 100; //最大數值
    //Canvas初始化
    ctx.beginPath();

    //圖表框線(Y軸)
    ctx.moveTo(cvXStart, cvYStart); //起始位置 (x，y)
    ctx.lineTo(cvXStart, cvYEnd); //結束位置 (x，y)
    //圖表框線(X軸)
    ctx.moveTo(cvXStart, cvYEnd); //起始位置 (x，y)
    ctx.lineTo(cvXEnd, cvYEnd); //結束位置 (x，y)

    //繪製X軸刻度
    XScale(ctx, DataCount, DataCount, cvXStart, cvYEnd, cvWidth);

    //繪製Y軸刻度
    YScale(ctx, MaxNum, DataCount, DataCount, cvYEnd, cvXStart, cvHeight);

    //開始繪製
    ctx.stroke();
}

//繪製X軸刻度
function XScale(ctx, RunCount, ScaleCount, XStart, YCenter, XWidth) {
    let Start = 0; //起始位置
    if (RunCount >= 0) {
        //計算起始位置
        Start = XStart + ((XWidth - 50) / ScaleCount) * (ScaleCount - RunCount);
        console.log(Start);

        //圖表刻度
        ctx.moveTo(Start, YCenter + 10); //起始位置 (x，y)
        ctx.lineTo(Start, YCenter - 10); //結束位置 (x，y)

        //數字
        ctx.font = "15px Arial";
        ctx.fillText(ScaleCount - RunCount, Start - 5, YCenter + 25);

        RunCount--;
        XScale(ctx, RunCount, ScaleCount, XStart, YCenter, XWidth)
    } else {
        return;
    }
}

//繪製Y軸刻度
function YScale(ctx, MaxNum, RunCount, ScaleCount, YStart, XCenter, Yheight) {
    let Start = 0; //計算起始位置
    let Data = 0;
    if (RunCount >= 0) {
        //計算資料數值
        Start = YStart - ((Yheight - 50) / ScaleCount) * (ScaleCount - RunCount);
        Data = (MaxNum / ScaleCount) * (ScaleCount - RunCount);

        //圖表刻度
        ctx.moveTo(XCenter - 10, Start); //起始位置 (x，y)
        ctx.lineTo(XCenter + 10, Start); //結束位置 (x，y)

        //數字
        ctx.font = "15px Arial";
        ctx.fillText(Data, XCenter - 40, Start);

        RunCount--;
        YScale(ctx, MaxNum, RunCount, ScaleCount, YStart, XCenter, Yheight);
    } else {
        return;
    }

}