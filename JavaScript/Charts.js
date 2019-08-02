window.onload = function () {
    const Data = {
        charts: {
            type: 'Line', //Bar 長條圖 , Line 折線圖
            width: 800,
            height: 500
        },
        title: {
            text: '身高長條圖'
        },
        yAxis: {
            text: '身高'
        },
        xAxis: {
            text: '人'
        },
        series: {
            Ydata: [10, 15, 20, 67, 68, 90, 99, 22, 49, 35],
            Xdata: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
            //StyleColor: ['#800000', '#FF3333', '#A0522D', '#FF7744', '#FFFF77', '#66FF66', '#0066FF', '#003377', '#9932CC', '#B088FF']
        }
    };

    BeginCanvas(Data);
}

//開始繪製Charts
function BeginCanvas(Data) {
    const Charts = document.getElementById("Charts");
    const ctx = Charts.getContext("2d");
    const cvWidth = Data.charts.width; //圖表的寬度
    const cvHeight = Data.charts.height;; //圖表的高度
    const cvXStart = 100; //X座標的起點
    const cvYStart = 50; //Y座標的起點
    const cvXEnd = cvXStart + cvWidth; //X座標的終點
    const cvYEnd = cvYStart + cvHeight; //Y座標的終點
    const DataCount = Data.series.Xdata.length;
    const MaxNum = Math.ceil(Math.max(...Data.series.Ydata) / 10) * 10;//最大數值
    let YEndScale = 0;

    ctx.clearRect(0, 0, Charts.width, Charts.height);
    //Canvas初始化
    ctx.beginPath();

    //圖表標題
    ctx.font = '26px Arial';
    ctx.fillText(Data.title.text, cvXStart + 400, 40);

    //圖表框線(Y軸)
    ctx.moveTo(cvXStart, cvYStart); //起始位置 (x，y)
    ctx.lineTo(cvXStart, cvYEnd); //結束位置 (x，y)
    //圖表框線(X軸)
    ctx.moveTo(cvXStart, cvYEnd); //起始位置 (x，y)
    ctx.lineTo(cvXEnd, cvYEnd); //結束位置 (x，y)

    //繪製X軸刻度
    XScale(ctx, Data.series.Xdata, DataCount, DataCount, cvXStart, cvYEnd, cvWidth);

    //繪製Y軸刻度
    YEndScale = YScale(ctx, MaxNum, DataCount, DataCount, cvYEnd, cvXStart, cvHeight, 0);

    //開始繪製
    ctx.stroke();
    ctx.closePath();

    //Canvas初始化
    ctx.beginPath();

    //X軸標題
    ctx.font = '16px Arial';
    ctx.fillText(Data.xAxis.text, cvXStart + 400, cvYEnd + 50);

    //Y軸標題
    ctx.font = '16px Arial';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    let YText = Data.yAxis.text.split('');
    for (let i = 0; i < YText.length; i++) {
        ctx.fillText(YText[i], cvXStart - 70, cvYStart + 250 + 20 * i);
    }

    //開始繪製
    ctx.stroke();
    ctx.closePath();

    if (Data.charts.type == 'Bar')
        DrawBarChart(ctx, DataCount, Data.series, MaxNum, cvXStart, cvWidth, cvYEnd, YEndScale); //繪製長條圖
    else if (Data.charts.type == 'Line')
        DrawLineChart(ctx, DataCount, Data.series, MaxNum, cvXStart, cvWidth, cvYEnd, YEndScale); //繪製折線圖  
}

//繪製X軸刻度
function XScale(ctx, Data, RunCount, ScaleCount, XStart, YCenter, XWidth) {
    let Start = 0; //起始位置
    if (RunCount >= 0) {
        //計算起始位置
        Start = XStart + ((XWidth - 50) / ScaleCount) * (ScaleCount - RunCount);

        //圖表刻度
        ctx.moveTo(Start, YCenter + 10); //起始位置 (x，y)
        ctx.lineTo(Start, YCenter - 10); //結束位置 (x，y)

        //X軸輸出
        if (ScaleCount - RunCount > 0) {
            ctx.font = '15px Arial';
            ctx.fillText(Data[ScaleCount - (RunCount + 1)], Start, YCenter + 25);
        }


        RunCount--;
        XScale(ctx, Data, RunCount, ScaleCount, XStart, YCenter, XWidth)
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
        ctx.font = '15px Arial';
        ctx.fillText(Data, XCenter - 40, Start);

        RunCount--;
        return YScale(ctx, MaxNum, RunCount, ScaleCount, YStart, XCenter, Yheight, Start);
    } else {
        return Start;
    }
}

//繪製長條圖
function DrawBarChart(ctx, RunCount, Data, MaxNum, XStart, XWidth, cvYEnd, cvHeight) {
    let Start = 0;
    let BarHeight = 0;
    let BarWidth = 0;
    const DataCount = Data.Ydata.length;
    if (RunCount > 0) {
        //Canvas初始化
        ctx.beginPath();

        //計算起始位置
        Start = XStart + ((XWidth - 50) / DataCount) * (DataCount - (RunCount - 1));

        //計算高度
        BarHeight = cvYEnd - (Data.Ydata[DataCount - RunCount] / MaxNum) * (cvYEnd - cvHeight);

        //計算寬度
        BarWidth = (XWidth / 2) / DataCount;

        //繪製長條圖
        ctx.fillStyle = Data.StyleColor[DataCount - RunCount];
        ctx.fillRect(Start - (BarWidth / 2), BarHeight, BarWidth, (cvYEnd - BarHeight)); //x, y, width, height

        //顯示資料
        ctx.font = '15px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(Data.Ydata[DataCount - RunCount], Start, BarHeight - 10);

        RunCount--;
        DrawBarChart(ctx, RunCount, Data, MaxNum, XStart, XWidth, cvYEnd, cvHeight);
        //開始繪製
        ctx.stroke();
        ctx.closePath();
    } else {
        return;
    }
}

//繪製折線圖
function DrawLineChart(ctx, RunCount, Data, MaxNum, XStart, XWidth, cvYEnd, cvHeight) {
    let X_Start = 0;
    let X_End = 0;
    let Y_Start = 0;
    let Y_End = 0;
    let BarWidth = 0;
    const DataCount = Data.Ydata.length;
    if (RunCount > 0) {
        //計算起始位置
        X_Start = XStart + ((XWidth - 50) / DataCount) * (DataCount - (RunCount - 1));
        X_End = XStart + ((XWidth - 50) / DataCount) * (DataCount - (RunCount - 2));

        //計算高度
        Y_Start = cvYEnd - (Data.Ydata[DataCount - RunCount] / MaxNum) * (cvYEnd - cvHeight);
        Y_End = cvYEnd - (Data.Ydata[DataCount - (RunCount - 1)] / MaxNum) * (cvYEnd - cvHeight);

        //計算寬度
        BarWidth = (XWidth / 2) / DataCount;

        //Canvas初始化
        ctx.beginPath();

        //繪製折線圖
        ctx.strokeStyle = '#59F';
        ctx.lineWidth = 2.5;
        ctx.moveTo(X_Start, Y_Start);
        ctx.lineTo(X_End, Y_End);

        //開始繪製
        ctx.stroke();
        ctx.closePath();

        //Canvas初始化
        ctx.beginPath();

        //繪製圓點
        ctx.arc(X_Start, Y_Start, 4, 0, 2 * Math.PI);
        ctx.fillStyle = '#59F';
        ctx.fill();

        //顯示資料
        ctx.font = '15px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(Data.Ydata[DataCount - RunCount], X_Start, Y_Start - 30);

        //開始繪製
        ctx.stroke();
        ctx.closePath();

        RunCount--;
        DrawLineChart(ctx, RunCount, Data, MaxNum, XStart, XWidth, cvYEnd, cvHeight);
    } else {
        return;
    }
}