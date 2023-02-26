exports.validateCookie = async (req, res) => {
    const userId = req.user?.id
    // validations
    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized user"
        })
    }
    res.status(200).json({
        sucess: true,
        message: "cookies and token are verified"
    })
}