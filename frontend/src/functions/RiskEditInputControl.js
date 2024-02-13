const RiskEditInputControl = (risk) => {
    const role = sessionStorage.getItem('role');
    const username = sessionStorage.getItem('username');
    if(
        username === risk.reporter ||
        role === 'admin' ||
        role === 'committee'
    ){
        return(false)
    }else{
        return(true)
    }
}

export {RiskEditInputControl};