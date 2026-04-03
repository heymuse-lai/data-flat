checkToken()

renderUname()

logout()


// 封裝數據函式
// token失效 提示用戶 並清除localstage資料 並跳轉login
const getData = async () => {
    // const data = localStorage.getItem('userMsg') ? JSON.parse(localStorage.getItem('userMsg')) : {}
    // const { token } = data
    // console.log(token);
    // 請求頭參數

    try {
        const res = await axios({
            url: '/dashboard',
            method: 'GET',
            // headers: {
            //     Authorization: token
            // }

        })
        const { overview, year } = res.data
        // console.log(res.data.data.overview)
        renderOverview(overview)
        renderoverYear(year)

    } catch (err) {
        // console.dir(err)
        // if (err.response.status === 401) {
        //     showToast('登錄過期，請重新登錄')
        //     localStorage.removeItem('userMsg')
        //     setTimeout(() => {
        //         location.href = './login.html'
        //     }, 1500)

        // }

    }
}
getData()
// 獲取數據 渲染頁面首頁


// 渲染頁面 overview
const renderOverview = (overview) => {
    // 數據的鍵和頁面的類名一致
    Object.keys(overview).forEach(item => {
        document.querySelector(`.${item}`).innerHTML = overview[item]
    })
}

// 渲染折線圖 renderoverYear
const renderoverYear = (year) => {
    console.log(year)
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector('#line'))

    // 指定图表的配置项和数据
    const option = {
        title: {
            text: '2022全學科薪資走勢',
            top: 10,
            left: 20

        },
        grid: {
            top: '20%',
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: year.map(item => item.month)
        },
        yAxis: {
            splitLine: {
                // show:false,
                lineStyle: {
                    type: 'dashed',
                }
            }
        },
        series: [
            {
                data: year.map(item => item.salary),
                type: 'line',
                symbolSize: 10,
                lineStyle: {
                    width: 10,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 1,
                        y2: 0,
                        colorStops: [{
                            offset: 0, color: '#499CEA' // 0% 处的颜色
                        }, {
                            offset: 1, color: '#5B7AE4' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },
                },
                smooth: true,
                areaStyle: {
                                        color: {
                        type: 'linear',
                        x: 0,
                        y: 1,
                        x2: 0,
                        y2: 0,
                        colorStops: [{
                            offset: 1, color: '#A6D4F5' // 0% 处的颜色
                        }, {
                            offset: 0, color: 'rgba(255,255,255,0.5)' // 100% 处的颜色
                        }],
                        global: false // 缺省为 false
                    },

                }

            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


}


