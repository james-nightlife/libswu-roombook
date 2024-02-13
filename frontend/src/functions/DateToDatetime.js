const DateToDatetime = (data, locale='th-th') => {
    if(data){
        const date = new Date(data);
        return(date.toLocaleString(locale));
    }else{
        return('');
    }
}

export {DateToDatetime};