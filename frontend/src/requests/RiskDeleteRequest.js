const RiskDeleteRequest = async (token, id) => {
    return fetch(`${process.env.REACT_APP_SERVER}/risk/record/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            'lib-token': token,
        },
    }).then(async (res) =>  {
        const status = res.status;
        const data = await res.json();
        if(status === 200){
            return({...data,
                status: status,
                message: 'ดำเนินการลบรายงานความเสี่ยงเรียบร้อยแล้ว',
           });
        }else if(data.message === 'Token Invalid'){
            return ({...data,
                status: status,
           });
        }else{
            return ({...data,
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

export {RiskDeleteRequest};