const router = require('express').Router()
const {requireAdmin} = require('../utils')
const rateLimit = require("express-rate-limit");



router.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 1000
}))


router.post('/verify', requireAdmin, (req, res) => {
    res.sendStatus(200)
})

router.post('/logout', (req, res) => {
    res.clearCookie('adminToken')
    res.sendStatus(200)
})

router.post('/login', async (req, res) => {

    const {password} = req.body

    if (!(password === process.env.ADMIN_TOKEN_PW)) {

        res.sendStatus(400)
    } else {

        res.cookie('adminToken', process.env.ADMIN_TOKEN, {expires: 0})


        res.sendStatus(200)
    }

})

router.post('/pi', requireAdmin, async (req, res) => {

    const ip = await global.db.collection('pi_hostname')
        .find({})
        .sort({created_at: -1})
        .limit(1)
        .project({_id: 0, hostname: 1})
        .next()

    res.json(ip)
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
