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
        // console.log(res.data.data.overview)
        renderOverview(res.data.overview)

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

