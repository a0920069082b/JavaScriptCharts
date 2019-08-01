window.onload = function () {
    const Data = [10, 15, 20, 67, 68, 90, 99, 22, 49, 35];
    const MaxNum = Math.ceil(Math.max(...Data) / 10) * 10;//最大數值
    BeginCanvas(Data, MaxNum);
}

//開始繪製Charts
function BeginCanvas(Data, MaxNum) {
    const Charts = document.getElementById("Charts");
    const ctx = Charts.getContext("2d");
    const cvWidth = 800; //Canvas的寬度
    const cvHeight = 500; //Canvas的高度
    const cvXStart = 100; //X座標的起點
    const cvYStart = 50; //Y座標的起點
    const cvXEnd = cvXStart + cvWidth; //X座標的終點
    const cvYEnd = cvYStart + cvHeight; //Y座標的終點
    let YEndScale = 0;

    //Canvas初始化
    ctx.beginPath();

    //圖表框線(Y軸)
    ctx.moveTo(cvXStart, cvYStart); //起始位置 (x，y)
    ctx.lineTo(cvXStart, cvYEnd); //結束位置 (x，y)
    //圖表框線(X軸)
    ctx.moveTo(cvXStart, cvYEnd); //起始位置 (x，y)
    ctx.lineTo(cvXEnd, cvYEnd); //結束位置 (x，y)

    //繪製X軸刻度
    XScale(ctx, Data.length, Data.length, cvXStart, cvYEnd, cvWidth);

    //繪製Y軸刻度
    YEndScale = YScale(ctx, MaxNum, Data.length, Data.length, cvYEnd, cvXStart, cvHeight, 0);

    //繪製資料
    DrawBarChart(ctx, Data.length, Data, MaxNum, cvXStart, cvWidth, cvYEnd, YEndScale);

    //開始繪製
    ctx.stroke();
}

//繪製X軸刻度
function XScale(ctx, RunCount, ScaleCount, XStart, YCenter, XWidth) {
    let Start = 0; //起始位置
    if (RunCount >= 0) {
        //計算起始位置
        Start = XStart + ((XWidth - 50) / ScaleCount) * (ScaleCount - RunCount);

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
function YScale(ctx, MaxNum, RunCount, ScaleCount, YStart, XCenter, Yheight, Start) {
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
        return YScale(ctx, MaxNum, RunCount, ScaleCount, YStart, XCenter, Yheight, Start);
    } else {
        return Start;
    }
}

function DrawBarChart(ctx, RunCount, Data, MaxNum, XStart, XWidth, cvYEnd, cvHeight) {

    let Start = 0;
    let BarHeight = 0;
    let BarWidth = 0;
    const DataCount = Data.length;
    if (RunCount > 0) {
        //計算起始位置
        Start = XStart + ((XWidth - 50) / DataCount) * (DataCount - (RunCount - 1));

        //計算高度
        BarHeight = cvYEnd - (Data[DataCount - RunCount] / MaxNum) * (cvYEnd - cvHeight);

        //計算寬度
        BarWidth = (XWidth / 2) / DataCount;

        //繪製長條圖
        ctx.fillStyle = '#9f9'
        ctx.fillRect(Start - (BarWidth / 2), BarHeight, BarWidth, (cvYEnd - BarHeight)); //x, y, width, height
       
        //顯示資料
        ctx.font = "15px Arial";
        ctx.fillStyle = "#000";
        ctx.fillText(Data[DataCount - RunCount], Start - 10, BarHeight - 10);

        RunCount--;
        DrawBarChart(ctx, RunCount, Data, MaxNum, XStart, XWidth, cvYEnd, cvHeight);
    } else {
        return;
    }
}