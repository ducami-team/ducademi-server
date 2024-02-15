export const isDifferentUtil = (target : any, comparsion : any) : boolean=>{
    if(target !== comparsion) {
        return true;
    }
    return false;
}

export const isSameUtil = (target:any, comparsion : any) :boolean =>{
    if(target ===comparsion) {
        return true;
    }
    return false;
} 