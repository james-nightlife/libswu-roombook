const SignInRequest = async (credentials) => {
    return fetch(`${process.env.REACT_APP_SERVER}/user/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    }).then(async (res) => {
        const status = res.status;
        const data = await res.json();
        if(status === 200){
            return ({...data,
                status: status,
                message: `ยินดีต้อนรับ ${data.fullname}`,
           });
        }else{
            return ({...data,
                status: status,
                message: `ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง`,
           });
        }
    }).catch((data) => ({
        status: 404,
        message: `ระบบยืนยันตัวตนมีปัญหาขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก`
    }));
}

export {SignInRequest}