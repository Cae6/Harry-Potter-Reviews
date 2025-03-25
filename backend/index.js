
import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import HpottersDAO from './dao/HpottersDAO.js'
import AnalysisDAO from './dao/analysisDAO.js'



async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient(process.env.HPOTTER_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await HpottersDAO.injectDB(client)
    await AnalysisDAO.injectDB(client)
   

    app.listen(port, () => {
        console.log('server is running on port:' + port);
        })
    
      } catch (e) {
        console.error(e);
        process.exit(1)
      }
    }
    main().catch(console.error);