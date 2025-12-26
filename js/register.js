//獲取btnDom 取得form資料 判斷資料是否為空 長度夠否
document.querySelector('#btn-register').addEventListener('click', async e =>{
    const data = serialize(document.querySelector('.register-form'), {hash:true , empty:true})
    console.log(data)
    if (!data.username) {
        return showToast('名字不得為空')
    }
    if (!data.password) {
        return showToast('密碼不得為空')
    }
    if (data.username.length < 8 || data.username.length > 30 ) {
        return showToast('名字不符合規定')
    }
    if (data.username.length < 6 || data.username.length > 30) {
        return showToast('密碼不符合規定')
    }
    const res = await axios.post('/register', data)
    console.log(res);
    
    showToast(res.message)
    setTimeout (() =>{
        location.href = './login.html'
    },2000)
    
})