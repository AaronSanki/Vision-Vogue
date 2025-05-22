export default function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        req.userId = req.user._id
        return next()
    }
    res.json({success: false, message: "Unauthorized"})
}