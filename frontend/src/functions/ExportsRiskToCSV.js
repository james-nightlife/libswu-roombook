import { DateToDatetime } from "./DateToDatetime";

const ExportRisksToCSV = (data) => {
    const newdata = [];
    for(var i = 0; i < data.length; i++){
        newdata.push({
            id: i+1,
            detail: data[i].detail,
            location: data[i].location,
            reporter: data[i].reporter,
            status: (!data[i].status ? 'รอดำเนินการ' : data[i].status),
            createdAt: DateToDatetime(data[i].createdAt, 'en-us'),
            feedback: data[i].feedback,
            initialized_date: DateToDatetime(data[i].initialized_date, 'en-us'),
            finalized_date: DateToDatetime(data[i].finalized_date, 'en-us'),
        })
    }
    return newdata;
}

export {ExportRisksToCSV}