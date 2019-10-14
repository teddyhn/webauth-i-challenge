function isLoggedIn(req, res, next) {
    req.session && req.session.userId ?
    next() :
    res.status(400).json({ message: "Must be logged in to perform that action" });
}

module.exports = isLoggedIn;