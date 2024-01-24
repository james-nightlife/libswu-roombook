const RiskProcessInputControl = () => {
    const role = sessionStorage.getItem('role');
    if(
        role === 'admin' ||
        role === 'committee'
    ){
        return(false)
    }else{
        return(true)
    }
}

export {RiskProcessInputControl}