// src/db/index.ts
import mongoose, { ConnectOptions } from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect('mongodb://your-mongodb-connection-url', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

const disconnectFromDatabase = async (): Promise<void> => {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
};

export { connectToDatabase, disconnectFromDatabase };
