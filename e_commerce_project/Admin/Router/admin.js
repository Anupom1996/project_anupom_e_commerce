const express = require('express')
const router = express.Router()
const bcrypt=require('bcryptjs')
const AdminCollection = require('../AdminSchema/adminschema')
const schemaValidation = require('../Validation/Adminvalidation')
const auth = require('../../Middleware_project/auth')
router.post('/adminRegistration', async (req, res) => {
    try {

        const adminReqbody = new AdminCollection(req.body)
        console.log(adminReqbody)

        schemaValidation(req.body.AdminPassword, req.body.AdminEmail, req.body.AdminFirstName, req.body.AdminLastName, req.body.AdminPhone)
        await adminReqbody.save()

        res.status(200).send({
            status:"success",
            message: "You Are Successfully Registered",
            adminReqbody
        })

    } catch (e) {
        res.status(500).send({
            status:"failed",
            message: "Internal Server problem",
            e
        })

    }
})
router.post('/Adminlogin', async (req, res) => {
    try {
       console.log(req.body.AdminEmail,req.body.AdminPassword)
       //const user = await AdminCollection.findByCredentials(req.body.AdminEmail, req.body.AdminPassword)
//postman r jonno AdminEmail AdminPassword

        
        const user = await AdminCollection.findOne({ AdminEmail:req.body.AdminEmail })
        
        if (!user) {
            
            return res.status(400).send("Email do not Exist")
            
        }

        const isMatch = await bcrypt.compare(req.body.AdminPassword, user.AdminPassword)

        if (!isMatch) {
            return res.status(400).send({
                err:"Password do not Exist"})
        }





    
        const token = await user.generateAuthToken()

        res.send({ user, token })

    } catch (e) {

        res.status(500).send(
           { message :"errore",e},
           console.log(e)
        )
    }
})
router.get('/Adminlogin/me', auth, async (req, res) => {
    res.send(req.user)
})

///admin logout....

router.post('/Adminlogout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send({
            message: "You are Logoff"
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

//////.Admin Registration Delete..........

router.delete('/AdminDelete', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.send({
            message: "Successfully deleted the record"

        })
    } catch (e) {
        res.status(500).send(e)
    }
})

////Admin Logout all................

router.post('/AdminlogoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send(e)
    }
})

////AdminDetails Update.......
/*
*/
router.patch('/AdminDetailsUpdate', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['AdminFirstName', 'AdminLastName', 'AdminPhone', 'AdminPassword']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.send(req.user)
    } catch (e) {
        res.status(400).send(e)
    }
})
module.exports = router