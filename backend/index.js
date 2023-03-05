import app from './app.js'
import config from './config/index.js'

const PORT = config.PORT || 4000

app.listen(PORT, ()=>(console.log(`the port is listning to ${PORT}`)))