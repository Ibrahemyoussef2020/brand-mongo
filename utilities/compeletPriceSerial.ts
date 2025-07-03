const compeletPriceSerial = (number:number|string) => {
    const originalLength = 2;
    const length =  number.toString().length
    for (let index = 0; index <= originalLength ; index++) {     
        number = `${number}`   
        if (index === originalLength) {
        return number.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
        }
    } 
}

export default compeletPriceSerial