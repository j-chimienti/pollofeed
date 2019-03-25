var feed = require('./bin/feed')

feed().then(() => process.exit(0))
    .catch(() => {
        process.exit(1)
    })
