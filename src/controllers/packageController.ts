import { Request, Response } from 'express';
import Package, { IPackage } from '../models/Package';

// Get all packages
export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const packages = await Package.find();
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching packages', error });
  }
};

// Get a single package by ID
export const getPackageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const packageData = await Package.findOne({ packageId: id });
    
    if (!packageData) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.status(200).json(packageData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching package', error });
  }
};

// Create a new package
export const createPackage = async (req: Request, res: Response) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error creating package', error });
  }
};

// Update a package
export const updatePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPackage = await Package.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.status(200).json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: 'Error updating package', error });
  }
};

// Delete a package
export const deletePackage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPackage = await Package.findByIdAndDelete(id);
    
    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }
    
    res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting package', error });
  }
};

// Search packages with filters
export const searchPackages = async (req: Request, res: Response) => {
  try {
    const {
      title,
      destination,
      minPrice,
      maxPrice,
      duration,
      groupSize,
      rating,
      sortBy,
      sortOrder
    } = req.query;

    // Build filter object
    const filter: any = {};

    // Text search for title and destination
    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }

    if (destination) {
      filter.destination = { $regex: destination, $options: 'i' };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      filter.price = {};
      
      // Remove currency symbol and convert to number for comparison
      if (minPrice) {
        filter.price.$gte = minPrice;
      }
      
      if (maxPrice) {
        filter.price.$lte = maxPrice;
      }
    }

    // Duration filter
    if (duration) {
      filter.duration = { $regex: duration, $options: 'i' };
    }

    // Group size filter
    if (groupSize) {
      filter.groupSize = { $regex: groupSize, $options: 'i' };
    }

    // Rating filter
    if (rating) {
      filter.rating = { $gte: Number(rating) };
    }

    // Build sort options
    const sort: any = {};
    if (sortBy) {
      sort[sortBy as string] = sortOrder === 'desc' ? -1 : 1;
    } else {
      sort.createdAt = -1; // Default sort by creation date (newest first)
    }

    // Execute query
    const packages = await Package.find(filter).sort(sort);

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Error searching packages',
      error: (error as Error).message
    });
  }
};