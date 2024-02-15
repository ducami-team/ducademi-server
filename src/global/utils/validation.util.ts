export const validationData = (data? : string | object) : boolean=>{
    if(data === undefined || data === null){
        return true;
    }
    return false;
}