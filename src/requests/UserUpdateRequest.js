const UserUpdateRequest = async (input, id, token) => {
    return fetch(`${process.env.REACT_APP_SERVER}/user/record/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json", 
            'lib-token': token,
        },
        body: JSON.stringify(input)
    }).then(async (data) =>  {
        const status = data.status;
        const response = await data.json();
        if(status === 200){
            return({...response,
                status: status,
                message: 'ดำเนินการแก้ไขรายงานความเสี่ยงเรียบร้อยแล้ว',
           });
        }else{
            return({...response,
                status: status,
                message: 'เกิดเหตุขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
           });
        }
    })
    .catch((data) => ({
        status: 404,
        message: 'เกิดเหตุขัดข้องทางเทคนิค ขออภัยในความไม่สะดวก',
    }));
}

export {UserUpdateRequest};