
const selectDate = (num:number = 1) => {
    const currentDate = new Date();
   currentDate.setDate(currentDate.getDate() + num)

  return  currentDate.toDateString()
  
}

export default selectDate