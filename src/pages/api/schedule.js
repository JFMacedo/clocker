import firebaseServer from '../../services/firebaseServer'

const db = firebaseServer.firestore()
const schedule = db.collection('schedule')

export default async (req, res) => {
  const [, token] = req.headers.authorization.split(' ')
  if(!token){
    return res.status(401)
  }
  try {
    const { user_id } = await firebaseServer.auth().verifyIdToken(token)
    const snapshot = await schedule
      .where('userId', '==', user_id)
      .where('date', '==', req.query.date)
      .get()

    const docs = snapshot.docs.map(doc => doc.data())
  
    return res.status(200).json(docs)
  } catch (error) {
    console.error(`FB ERRO: ${ error }`)
    return res.status(401)
  }
}