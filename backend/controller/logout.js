exports.logout = async (req, res) => {

  const userId = req.user?.id

// validations
  if (!userId) {
    return res.status(401).json({
      sucess: false,
      message: "unauthorized user"
    })
  }

  // clear the token value present in the request (req.user)
  try {
    res.user = {id: ''}
    res.clearCookie("token") // clear the token cookie
    res.status(200).json({
      sucess: true,
      message: "Logged out successfully"
    })
    try {
      localStorage.clear(); //if in case there are any data stored in local storage, clear all the data present
    } catch {}
    
  } catch (err) {
    res.status(400).json({
      sucess: false,
      message: err.message
    })
  }
}