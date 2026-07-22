export const matchingConfig = {
  // Profiles for different job types (e.g., Software Engineer, Marketing)
  // For V1.0 we have a default profile.
  profiles: {
    default: {
      weights: {
        skills: 0.45,
        experience: 0.25,
        education: 0.15,
        certifications: 0.10,
        languages: 0.05
      }
    }
  },
  
  // Similarity threshold: below this score (0-1), don't consider it a match
  similarityThreshold: 0.20,

  // Cache Time to Live (TTL) in seconds (e.g., 24 hours)
  cacheTTL: 60 * 60 * 24
};
