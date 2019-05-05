async function asyncWrap(asyncFn) {

    return function(req, res, next) {

        try {

            asyncFn(req, res, next)
        } catch (e) {

            next(e)
        }
    }
}

module.exports = {
    asyncWrap,
}
