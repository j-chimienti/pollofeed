var feed = require('./bin/feed')

    setInterval(() => {

        feed().then(() => {

            console.log('fed', new Date().toLocaleTimeString())
        })
    }, 1000 * 60 * 30)
