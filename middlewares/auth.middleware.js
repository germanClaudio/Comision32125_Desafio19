const logger = require('../utils/winston')

const authMiddleware = (req, res, next) => {
    logger.info(req.session)
    console.log('req.session authmiddleware: ', req.session)
    const flag = true
    if (!req.session?.username || !req.session?.admin) {
        // return res.status(401).send('<h1>No estas autorizado</h1>')     
        // return res.render('login', { flag } )
        return res.render('index', { userInfo, username, visits, flag })
    } 
    next()
}

module.exports = { 
    authMiddleware
}