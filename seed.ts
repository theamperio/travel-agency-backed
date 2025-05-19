import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Package from './models/Package';

// Load environment variables
dotenv.config();

const packages: mongoose.Document[] = [];// Define your packages array with the data you want to seed

// Connect to MongoDB and seed data
const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('Connected to MongoDB');
    
    // Clear existing data
    await Package.deleteMany({});
    console.log('Cleared existing packages');
    
    // Insert new data 
    await Package.insertMany(packages);
    console.log('Packages seeded successfully');
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

// Run the seed function
seedData();