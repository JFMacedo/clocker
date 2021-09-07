import { addHours, differenceInHours, format } from 'date-fns'

import firebaseServer from '../../services/firebaseServer'

const db = firebaseServer.firestore()
const profile = db.collection('profiles')
const schedule = db.collection('schedule')
const startAt = new Date(2021, 1, 1, 8, 0)
const endAt = new Date(2021, 1, 1, 17, 0)
const totalHours = differenceInHours(endAt, startAt)
const timeBlocks = []
for(let blockIndex = 0; blockIndex <= totalHours; blockIndex++) {
  const time = format(addHours(startAt, blockIndex), 'HH:mm')
  timeBlocks.push(time)
}

async function getUserId(username) {
  const profileDoc = await profile
    .where('username', '==', username)
    .get()

  const { userId } = profileDoc.docs[0].data()

  return userId
}

async function setScheduled(req, res) {
  const userId = await getUserId(req.body.username)
  const doc = await schedule.doc(`${ userId }#${ req.body.when }`).get()
  
  if(doc.exists) {
    return res.status(400).json({ message: 'Time blocked!' })
  }

  const block = await schedule.doc(`${ userId }#${ req.body.when }`).set({
    userId,
    when: req.body.when,
    name: req.body.name,
    phone: req.body.phone
  })

  return res.status(200).json(block)
}

function getScheduled(req, res) {
  try {
    // const profileDoc = await profile
    //   .where('usernam e', '==', req.query.username)
    //   .get()
    // const snapshot = await schedule
    //   .where('userId', '==', profileDoc.userId)
    //   .where('when', '==', req.query.when)
    //   .get()
    return res.status(200).json(timeBlocks)
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