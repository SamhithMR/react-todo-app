import dotenv from 'dotenv'
dotenv.config()
const config = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT : process.env.PORT,
    SECRTKEY:process.env.SECRTKEY,
    FRONTEND: process.env.FRONTEND
}
export default config