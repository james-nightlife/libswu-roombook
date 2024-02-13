const UserEditInputControl = (input) => {
    const username = sessionStorage.getItem('username');

    if(input.username === username){
        return(true)
    }else{
        return(false)
    }
}

export {UserEditInputControl}