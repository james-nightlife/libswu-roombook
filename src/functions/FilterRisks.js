const FilterRisks = (raw, inputs) => {
    return raw.filter(obj => {
        const locationFilter = obj.location === inputs.location || !inputs.location;
        const statusFilter = inputs.status !== 'รอดำเนินการ' ? 
          (obj.status === inputs.status || !inputs.status) :
          (obj.status === inputs.status || !inputs.status || !obj.status);
        const firstDateFilter = new Date(obj.createdAt).getTime() >= new Date(inputs.firstdate).getTime() || !inputs.firstdate;
        const lastDateFilter = new Date(obj.createdAt).getTime() <= new Date(`${inputs.enddate} 23:59:59`).getTime() || !inputs.enddate;
        const keywordFilter = !inputs.keyword ||
          (obj.detail.toLowerCase().includes(inputs.keyword.toLowerCase()) ||
          obj.reporter.toLowerCase().includes(inputs.keyword.toLowerCase()));
        return(
            locationFilter && 
            statusFilter && 
            firstDateFilter && 
            lastDateFilter && 
            keywordFilter);
      });
}

export {FilterRisks};