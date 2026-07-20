import OpenAI from 'openai'

// Initialize OpenAI client (it will throw on API calls if not provided, which we will handle gracefully)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'MISSING_API_KEY', // Fallback to prevent crash on init
})

const isAiConfigured = () => {
  return process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key'
}

/**
 * Parses raw resume text into structured JSON.
 * @param {string} resumeText - Raw text extracted from a resume PDF/Word doc.
 * @returns {Promise<Object>} Structured data: { skills: [], experience: '', education: '' }
 */
export const parseResumeText = async (resumeText) => {
  if (!isAiConfigured()) {
    throw new Error('OpenAI API is not configured. Please set OPENAI_API_KEY.')
  }

  const prompt = `
  You are an expert HR AI. Extract the following information from the resume text provided below.
  Respond STRICTLY with a JSON object in this exact format:
  {
    "skills": ["skill1", "skill2"],
    "experience": "A short 2-3 sentence summary of work experience.",
    "education": "A short 1-2 sentence summary of educational background."
  }
  
  Resume Text:
  """
  ${resumeText}
  """
  `

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.1,
    })

    const result = JSON.parse(completion.choices[0].message.content)
    return result
  } catch (error) {
    console.error('Error parsing resume with AI:', error)
    throw error
  }
}

/**
 * Generates semantic embeddings for a string of text.
 * @param {string} text - Text to embed.
 * @returns {Promise<number[]>} Array of floating point numbers (vector embedding).
 */
export const generateEmbedding = async (text) => {
  if (!isAiConfigured()) {
    throw new Error('OpenAI API is not configured. Please set OPENAI_API_KEY.')
  }

  try {
    const response = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    })
    return response.data[0].embedding
  } catch (error) {
    console.error('Error generating embedding:', error)
    throw error
  }
}

/**
 * Evaluates the match between a job description and a candidate's resume data.
 * @param {string} jobDescription - Full text of job requirement.
 * @param {Object} candidateData - { skills: [], experience: '', education: '' }
 * @returns {Promise<Object>} { score: number (0-100), reasoning: string }
 */
export const evaluateMatch = async (jobDescription, candidateData) => {
  if (!isAiConfigured()) {
    throw new Error('OpenAI API is not configured. Please set OPENAI_API_KEY.')
  }

  const prompt = `
  You are an expert Technical Recruiter. 
  Evaluate how well the candidate matches the job description.
  
  Job Description:
  """
  ${jobDescription}
  """
  
  Candidate Data:
  """
  ${JSON.stringify(candidateData)}
  """
  
  Respond STRICTLY with a JSON object in this format:
  {
    "score": 85, // Integer between 0 and 100
    "reasoning": "A 2-3 sentence explanation of why this score was given."
  }
  `

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })

    const result = JSON.parse(completion.choices[0].message.content)
    return result
  } catch (error) {
    console.error('Error evaluating match:', error)
    throw error
  }
}
