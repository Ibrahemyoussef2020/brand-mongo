

const customStringIncludes = (list:string[] | [] , item:string):boolean => {

  const checkout = list?.some((e:string) => e === item ? true : false)
    
  return checkout;
}

export default customStringIncludes