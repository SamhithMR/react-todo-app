const { usermodel } = require('../model/todos')

exports.getUserEmail = async (req, res) => {
    const userId = req.user?.id

    // validations
    if (!userId) {
        return res.status(401).json({
            sucess: false,
            message: "unauthorized user"
        })
    }
    try {
        const resp = await usermodel.findOne({_id: userId})
        if(!resp){return res.status(404).json({message:"user not found"})}
        res.status(200).json({email:resp.email})

    } catch (err) {
        res.status(400).json({
            sucess: false,
            message: err.message
        })
    }
}