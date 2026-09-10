import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/capacity_connect'

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined
}

let cached = global.mongooseCache

if (!cached) {
  cached = global.mongooseCache = { conn: null, promise: null }
}

export async function connectToDatabase() {
  if (cached?.conn) {
    return { conn: cached.conn, isConnected: true }
  }

  if (!cached?.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 500, // Quick 500ms timeout for instant fallback if MongoDB is unreachable
    }

    cached!.promise = mongoose.connect(MONGODB_URI, opts).then((m) => {
      return m
    }).catch((err) => {
      console.warn('MongoDB Connection Warning (falling back to mock state):', err.message)
      cached!.promise = null
      return null as any
    })
  }

  try {
    const conn = await cached!.promise
    if (conn) {
      cached!.conn = conn
      return { conn, isConnected: true }
    }
  } catch (error) {
    console.warn('Failed to resolve MongoDB connection. Operating in memory fallback mode.')
  }

  return { conn: null, isConnected: false }
}

