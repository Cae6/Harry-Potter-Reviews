import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let analysis
export default class AnalysisDAO {
  static async injectDB(conn) {
    if(analysis) {
      return
    } try {
      analysis = await conn.db(process.env.HPOTTER_NS).collection('analysis')
      console.log("Analysis collection initialized:", analysis); 
    } catch(e) {
      console.error(`unable to establish connection handle in analysisDAO: ${e}`)
    }
  }
  static async addAnalysis(HpottersId, user, text, lastModified) {
    try {
      const analysisDoc = {
        name: user.name,
        user_id: user._id,
        lastModified: lastModified,
        analysis: text,
        Hpotters_id: new ObjectId(HpottersId)
      }
      return await analysis.insertOne(analysisDoc)
    } catch(e) {
      console.error(`unable to post analysis: ${e}`)
      console.error(e)
      return { error: e }
    }
  }

  static async updateAnalysis(analysisId, userId, text, lastModified) {
    try {
      const updateResponse = await analysis.updateOne(
        { user_id: userId, _id: new ObjectId(analysisId)},
        { $set: { analysis: text, lastModified: lastModified } }
      )
      return updateResponse
    } catch(e) {
        console.error(`unable to update analysis: ${e}`)
        console.error(e)
        return { error: e }
        }
    }

    static async deleteAnalysis(analysisId, userId) {
        try {
            const deleteResponse = await analysis.deleteOne({
                _id: new ObjectId(analysisId),
                user_id: userId,
            })
            console.log("Delete response:", deleteResponse);
            return deleteResponse
        } catch(e) {
            console.error(`unable to delete analysis: ${e}`)
            console.error(e)
            return { error: e }
        }
    }
}

