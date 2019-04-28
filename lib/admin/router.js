const router = require('express').Router()
const {requireAdmin, check} = require('../utils')


router.post('/verify', requireAdmin, (req, res) => {
    res.sendStatus(200)
})

router.post('/logout', (req, res) => {
    res.clearCookie('adminToken')
    res.sendStatus(200)
})

router.post('/login', async (req, res) => {

    const {password} = req.body

    if (!check(password)) {


        res.sendStatus(400)
    } else {

        res.cookie('adminToken', process.env.ADMIN_TOKEN_PW, {expires: 2e12, httpOnly: true})

        console.log(`login success: ip = ${req.ip}`)

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
