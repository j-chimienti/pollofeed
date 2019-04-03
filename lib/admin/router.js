const router = require('express').Router()
const {requireAdmin} = require('../utils')
const compare = require('tsscmp')



router.post('/verify', requireAdmin, (req, res) => {
    res.sendStatus(200)
})

router.post('/logout', (req, res) => {
    res.clearCookie('adminToken')
    res.sendStatus(200)
})

router.post('/login', async (req, res) => {

    const {password} = req.body

    if (!compare(password, process.env.ADMIN_TOKEN_PW)) {


        res.sendStatus(400)
    } else {

        res.cookie('adminToken', process.env.ADMIN_TOKEN_PW, {expires: 0, httpOnly: true})


        res.sendStatus(200)
    }

})


router.get('/pi/hn', requireAdmin, async (req, res, next) => {

    const updateResult = await global.db.collection('pi_ctl')
        .updateOne({update_hostname: false}, {
            $set: {
                update_hostname: true,
                acknowledged: false,
                updated_at: new Date()
            }
        }, {upsert: true})

    const {result: {ok}} = updateResult
    res.sendStatus(updateResult && ok ? 200 : 304)
})


module.exports = router
