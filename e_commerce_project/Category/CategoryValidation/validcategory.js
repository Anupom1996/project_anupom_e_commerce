//function validIdOrNot(body)
const validIdOrNot=async function(body)
{
    console.log(body)
    const BrandCollection = require('../../Brand/BrandSchema/brandschema')
    const brandsId = {}
    for (let index = 0; index < body.length; index++) {

      brandsId[index] = body[index]

      var findId =  await BrandCollection.findById({ _id: brandsId[index] })
      
      if (!findId) {
          console.log("id is not match")
       /* return res.status(400).send({
          message: "Id is not Match"
        })*/
        return new Error('id is not match')
      }

    }
}
module.exports=validIdOrNot