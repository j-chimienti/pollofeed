function createUser(user, pwd, roles = [{role: 'readWrite', db: ''}]) {

    return db.createUser({
        user,
        pwd,
        roles
    })
}

module.exports = {
    createUser,
}
