import mongoose from "mongoose"

async function ConncetToDb() {
  if(mongoose.connections[0].readyState === 1)return
  await mongoose.connect(process.env.MONGO_URI)
 console.log('Connceted TO DB');
}

export default ConncetToDb
