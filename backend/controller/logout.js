const logout = async (req, res) => {

  // clear the token value 
  try {
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

export default logout