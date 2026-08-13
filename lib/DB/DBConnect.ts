import mongoose from 'mongoose';

const connectToDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; // If already connected, do nothing
  }

  mongoose.connection.on('connected', () => {
    console.log('MongoDB connected successfully');
  });

  mongoose.connection.on('error', (err) => {
    console.log('MongoDB connection error. Please make sure MongoDB is running. ' + err);
  });

  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      throw new Error('MONGODB_URI is not defined in the environment variables');
    }

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.log('Db not connected');
    console.log(error);
    throw error; // Reject by throwing the error
  }
};

export default connectToDB;