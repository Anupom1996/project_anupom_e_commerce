const schemaValidation = (password, email, firstname, lastname, phone) => {

  var pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%!]).{6,20}$/
  var mail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  var phoneNo = /^[789]\d{9}$/
  //check the phone no is correct format or not start [7.8.9] and 10 degit and not contain [00000]

  // if (!(/^[789]\d{9}$/).test(phone) || (/0{5,}/).test(phone)) {
  //   console.log("phone no is not correct format")
  //   throw new Error("Phone no is Not Valid")
  // }

  //find the first letter using slice in first name.....
  const firstLetterOfFirstNmae = firstname.slice(0, 1)

  //find the last name using slice  in last name......
  const firstLetterOfLastNmae = lastname.slice(0, 1)

  //check the first lettor of first name capital ot not....
  if (firstLetterOfFirstNmae >= 'a' && firstLetterOfFirstNmae <= 'z') {

    console.log("in First name First letter Should be capital")
    throw new Error('First Name is  not valid')
  }

  //check the first letter of last name.........Capital or not...
  if (firstLetterOfLastNmae >= 'a' && firstLetterOfLastNmae <= 'z') {

    console.log("in Last name First letter Should be capital")
    throw new Error('last Name is  not valid')
  }

  //Check the password one charachter upper and lower and special[@!#$%] and numeric number....
  if (!password.match(pass)) {
    console.log("password not valid")
    throw new Error('password invalid')

  }

  //check the email id using regulae expression wright or not.......
  if (!email.match(mail)) {
    console.log("email id is incorrect")
    throw new Error('invalid email id')
  }



}
module.exports = schemaValidation