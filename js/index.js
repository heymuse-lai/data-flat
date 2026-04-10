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
        console.log(res);

        const { overview, year, salaryData, groupData } = res.data
        // console.log(res.data.data.overview)
        renderOverview(overview)
        renderoverYear(year)
        rendersalaryData(salaryData)
        renderGroupdata(groupData)
        renderGender(salaryData)

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
    // console.log(year)
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.querySelector('#line'))

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

// 渲染薪資分佈
const rendersalaryData = (salaryData) => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(document.querySelector('#salary'))
    // console.log(salaryData);


    const option = {
        title: {
            text: '班級薪資分佈',
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            bottom: '5%',
            left: 'center'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                // emphasis: {
                //     label: {
                //         show: false,
                //         fontSize: 40,
                //         fontWeight: 'bold'
                //     }
                // },
                labelLine: {
                    show: false
                },
                // data: [
                //     { value: 1048, name: 'Search Engine' },
                //     { value: 735, name: 'Direct' },
                //     { value: 580, name: 'Email' },
                //     { value: 484, name: 'Union Ads' },
                // ]
                data: salaryData.map(item => {
                    return { value: item.b_count + item.g_count, name: item.label }
                })
            }
        ],
        color: ['#F9A222', '#5197FC', '#38BCFA', '#2FD296']

    }
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

}

// 渲染班級每組薪資
const renderGroupdata = (groupData) => {
    // console.log(groupData)
    // 1.初始化
    const myChart = echarts.init(document.querySelector('#lines'))
    // 2.配置項
    const option = {
        grid: {
            left: 70, top: 30, right: 30, bottom: 50
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            splitLine: {
                lineStyle: 'dashed',
                color: '#ccc',
            },
            axisLabel: {
                color: '#999',
            },

            // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            data: groupData[1].map(item => item.name)
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    color: '#999',
                },
            }

        },
        series: [
            {
                // data: [120, 200, 150, 80, 70, 110, 130],
                data: groupData[1].map(item => item.hope_salary),
                type: 'bar',
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#30D7A2' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(255,255,255,0.5)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
            },

            {
                // data: [120, 200, 150, 80, 70, 110, 130],
                data: groupData[1].map(item => item.salary),

                type: 'bar',
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: '#4FA2EA' // 0% 处的颜色
                    }, {
                        offset: 1, color: 'rgba(255,255,255,0.5)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                },
            }

        ]
    }
    // 3.使用配置項
    myChart.setOption(option)
    // console.log(option)
    document.querySelector('#btns').addEventListener('click', (e) => {
        // console.log(e);
        // if(e.target.tagName === 'BUTTON')  // 這樣寫也可以
        if (e.target.type === 'button') {
            // 排它
            document.querySelector('#btns').querySelector('.btn-blue').classList.remove('btn-blue')
            //添加
            e.target.classList.add('btn-blue')
            // 切換數據
            // console.log(e.target.innerHTML)
            // console.log(groupData[e.target.innerHTML]);
            const grade = e.target.innerHTML
            option.xAxis.data = groupData[grade].map(item => item.name)
            option.series[0].data = groupData[grade].map(item => item.hope_salary)
            option.series[1].data = groupData[grade].map(item => item.salary)

            // 重新渲染圖表
            myChart.setOption(option)


        }

    })


}

// 渲染男女配置圖
const renderGender = (salaryData) => {
    console.log(salaryData)
    // 初始化
    const myChart = echarts.init(document.querySelector('#gender'))
    // 配置項
    const option = {

        tooltip: {},
        
        title: [
            {
                text: '男女薪資分佈',
                top: 10,
                left: 10,
                textStyle: {
                    fontSize: 16
                },
            },
            {
                text: '男生',
                top: '45%',
                left: '50%',
                textStyle: {
                    fontSize: 12
                },
            },
            {
                text: '女生',
                top: '85%',
                left: '50%',
                textStyle: {
                    fontSize: 12
                },
            },

        ],
        color: ['#F9A222', '#5197FC', '#38BCFA', '#2FD296'],


        series: [
            {
                name: '男生',
                type: 'pie',
                radius: ['20%', '30%'],
                center: ['50%', '30%'],
                // data: [
                //     { value: 40, name: 'rose 1' },
                //     { value: 38, name: 'rose 2' },
                //     { value: 32, name: 'rose 3' },
                //     { value: 30, name: 'rose 4' },
                // ]
                data:salaryData.map(item =>{
                    return {value:item.b_count,name:item.label}
                })
            },
            {
                name: '女生',
                type: 'pie',
                radius: ['20%', '30%'],
                center: ['50%', '70%'],
                // data: [
                //     { value: 40, name: 'rose 1' },
                //     { value: 38, name: 'rose 2' },
                //     { value: 32, name: 'rose 3' },
                //     { value: 30, name: 'rose 4' },
                // ]
                data:salaryData.map(item =>{
                    return {value:item.g_count,name:item.label}
                })
            }
        ]
    }

    // 使用配置項
    myChart.setOption(option)
}
