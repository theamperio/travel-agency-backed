import { Router } from 'express';
import {
  getAllPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
  searchPackages
} from '../controllers/packageController';

const router = Router();

// GET all packages
router.get('/', getAllPackages);

// Search packages with filters
router.get('/search', searchPackages);

// GET a single package by ID
router.get('/:id', getPackageById);

// POST a new package
router.post('/', createPackage);

// PUT (update) a package
router.put('/:id', updatePackage);

// DELETE a package
router.delete('/:id', deletePackage);

export default router;