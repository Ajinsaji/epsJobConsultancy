import { Job } from '../models/Job.js';
import { Candidate } from '../models/Candidate.js';
import { Company } from '../models/Company.js';

export const SearchRepository = {
  /**
   * Search jobs using text index
   */
  searchJobs: async (query, filters, limit, skip) => {
    const match = { isActive: true };
    if (query) {
      match.$text = { $search: query };
    }
    
    // Apply filters
    if (filters.location) match.location = { $regex: filters.location, $options: 'i' };
    if (filters.jobType) match.jobType = filters.jobType;
    
    return Job.find(match)
      .populate('companyId', 'companyName logo')
      .skip(skip)
      .limit(limit)
      .lean();
  },

  countJobs: async (query, filters) => {
    const match = { isActive: true };
    if (query) {
      match.$text = { $search: query };
    }
    if (filters.location) match.location = { $regex: filters.location, $options: 'i' };
    if (filters.jobType) match.jobType = filters.jobType;
    return Job.countDocuments(match);
  },

  /**
   * Search candidates using text index
   */
  searchCandidates: async (query, filters, limit, skip) => {
    const match = {};
    if (query) {
      match.$text = { $search: query };
    }
    
    // Apply filters
    if (filters.location) match.location = { $regex: filters.location, $options: 'i' };
    if (filters.experienceYears) match.experienceYears = { $gte: Number(filters.experienceYears) };
    
    return Candidate.find(match)
      .select('fullName title skills experience location photo experienceYears')
      .skip(skip)
      .limit(limit)
      .lean();
  },

  countCandidates: async (query, filters) => {
    const match = {};
    if (query) {
      match.$text = { $search: query };
    }
    if (filters.location) match.location = { $regex: filters.location, $options: 'i' };
    if (filters.experienceYears) match.experienceYears = { $gte: Number(filters.experienceYears) };
    return Candidate.countDocuments(match);
  },

  /**
   * Search companies using text index
   */
  searchCompanies: async (query, filters, limit, skip) => {
    const match = {};
    if (query) {
      match.$text = { $search: query };
    }
    
    if (filters.location) match.location = { $regex: filters.location, $options: 'i' };
    if (filters.industry) match.industry = { $regex: filters.industry, $options: 'i' };
    
    return Company.find(match)
      .select('companyName industry location logo companySize verified')
      .skip(skip)
      .limit(limit)
      .lean();
  },

  countCompanies: async (query, filters) => {
    const match = {};
    if (query) {
      match.$text = { $search: query };
    }
    if (filters.location) match.location = { $regex: filters.location, $options: 'i' };
    if (filters.industry) match.industry = { $regex: filters.industry, $options: 'i' };
    return Company.countDocuments(match);
  },
};
