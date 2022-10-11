import mongo from 'mongoose'

const mongoaddr = `mongodb://user:pass@ip:27017/hihan`

mongo.connect(mongoaddr)

// const scoreSchema =
