function ProductValidate(price)
{
    //console.log(price)
    
    //var priceEcil=Math.ceil(price)
    //console.log(priceEcil)
   
    var min=1
    var max=100000
    var a= /^[-+]?[0-9]+\.[0-9]+$/
    if(price<min)
    {
        
            console.log("price must be greater than 0 ")
            throw new Error('price must be greater than 0 ')
        
        
    }
    else{
        if(/^[-+]?[0-9]+\.[0-9]+$/.test(price))
        {
            console.log(" do not grant fractional number")
            throw new Error(' do not grant fractional number')
        }
    }
    
}

module.exports=ProductValidate