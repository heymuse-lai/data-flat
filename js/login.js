// 獲取按鈕#btn-login .login-form
// serialize 插件 提取數據
// 判斷用戶輸入資料
// 發送請求 判斷嚮應結果 提示用戶 axios別名方法

const loginForm = document.querySelector('.login-form')
    // 獲取按鈕#btn-login
document.querySelector('#btn-login').addEventListener('click', async e =>{
    // serialize 插件 提取數據
    const data =  serialize(loginForm, {hash: true , empty : true})
    console.log(data);
    if (!data.username || !data.password){
        return showToast('名字或密碼不得為空')
    }
    if (data.username.length < 8 || data.username.length > 30){
        return showToast('名字不符合規定')
    }
    if (data.password.length < 6 || data.password.length > 30){
        return showToast('密碼不符合規定')
    }
    // 發送請求 判斷嚮應結果 提示用戶 axios別名方法
    try {
    const res = await axios.post('/login', data )
    //本地存儲
    const obj = {}
    obj.username = res.data.data.username
    obj.token = res.data.data.token
    localStorage.setItem('userMsg',JSON.stringify(obj))
    showToast(res.data.message)
    setTimeout (()=>{
        location.href = './index.html'
    },1500)


    }catch(err){
        showToast(err.response.data.message)
        
    }
})
