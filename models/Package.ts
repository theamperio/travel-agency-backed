import mongoose, { Schema, Document } from 'mongoose';

// Interface for Itinerary
interface Itinerary {
  day: number;
  title: string;
  description: string;
  image: string;
}

// Interface for Amenity
interface Amenity {
  icon: string;
  name: string;
}

// Interface for Package Document
export interface IPackage extends Document {
  title: string;
  destination: string;
  description: string;
  longDescription: string;
  duration: string;
  groupSize: string;
  price: string;
  realPrice: string;
  rating: number;
  reviewCount: number;
  images: string[];
  included: string[];
  notIncluded: string[];
  itinerary: Itinerary[];
  highlights: string[];
  amenities: Amenity[];
}

// Schema for Itinerary
const ItinerarySchema = new Schema<Itinerary>({
  day: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

// Schema for Amenity
const AmenitySchema = new Schema<Amenity>({
  icon: { type: String, required: true },
  name: { type: String, required: true }
});

// Schema for Package
const PackageSchema = new Schema<IPackage>({
  title: { type: String, required: true },
  destination: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  duration: { type: String, required: true },
  groupSize: { type: String, required: true },
  price: { type: String, required: true },
  realPrice: { type: String, required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  images: [{ type: String, required: true }],
  included: [{ type: String, required: true }],
  notIncluded: [{ type: String, required: true }],
  itinerary: [ItinerarySchema],
  highlights: [{ type: String, required: true }],
  amenities: [AmenitySchema]
}, {
  timestamps: true
});

// Add text indexes for better search performance
PackageSchema.index({ title: 'text', destination: 'text', description: 'text' });

export default mongoose.model<IPackage>('Package', PackageSchema);