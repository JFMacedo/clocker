import { addHours, differenceInHours, format } from 'date-fns'

import firebaseServer from '../../services/firebaseServer'

const db = firebaseServer.firestore()
const profile = db.collection('profiles')
const schedule = db.collection('schedule')
const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)
const blocksList = []
for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++) {
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  blocksList.push(time)
}

async function getUserId(username) {
  const profileDoc = await profile
    .where('username', '==', username)
    .get()

  if(!profileDoc.docs.length) {
    return false
  }

  const { userId } = profileDoc.docs[0].data()

  return userId
}

async function setScheduled(req, res) {
  const userId = await getUserId(req.body.username)
  const docId = `${req.body.date}'${req.body.time}'${userId}`
  const doc = await schedule.doc(docId).get()
  
  if(doc.exists) {
    return res.status(400).json({ message: 'Time blocked!' })
  }

  const block = await schedule.doc(docId).set({
    userId,
    date: req.body.date,
    time: req.body.time,
    name: req.body.name,
    phone: req.body.phone
  })

  return res.status(200).json(block)
}

async function getScheduled(req, res) {
  try {
    const userId = await getUserId(req.query.username)
    if(!userId) {
      return res.status(404).json({ message: 'Invalid username!' })
    }
    const snapshot = await schedule
      .where('userId', '==', userId)
      .where('date', '==', req.query.date)
      .get()

    const docs = snapshot.docs.map(doc => doc.data())
    const result = blocksList.map(time => ({
      time,
      isBlocked: !!docs.find(doc => doc.time === time)
    }))

    return res.status(200).json(result)
  } catch (error) {
    console.error(`FB ERRO: ${ error }`)
    return res.status(401)
  }
}

const methods = {
  POST: setScheduled,
  GET: getScheduled
}

export default async (req, res) => methods[req.method]
  ? methods[req.method](req, res)
  : res.status(405)