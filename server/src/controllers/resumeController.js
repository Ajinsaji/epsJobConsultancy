import { asyncHandler } from '../utils/asyncHandler.js'
import pdfParse from 'pdf-parse/lib/pdf-parse.js'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'MISSING_API_KEY',
})

const isAiConfigured = () => {
  return process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key'
}

export const analyzeResume = asyncHandler(async (req, res) => {
  const file = req.file

  if (!file) {
    return res.status(400).json({ message: 'No resume file uploaded' })
  }

  if (!isAiConfigured()) {
    return res.status(503).json({ 
      message: 'Service Unavailable: AI Configuration is missing. Please set OPENAI_API_KEY.' 
    })
  }

  try {
    // We assume the file buffer is available via multer (memory storage)
    // If it's disk storage, we'd read from file.path
    const pdfData = await pdfParse(file.buffer || req.file.path)
    const resumeText = pdfData.text

    const prompt = `
    You are an expert HR AI. Analyze the following resume text and evaluate its quality.
    Respond STRICTLY with a JSON object in this exact format:
    {
      "score": 85, // Integer between 0 and 100 based on quality for ATS systems
      "skillsCount": 15,
      "strengths": ["Strength 1", "Strength 2"],
      "improvements": ["Improvement 1", "Improvement 2"]
    }
    
    Resume Text:
    """
    ${resumeText}
    """
    `

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.2,
    })

    const analysis = JSON.parse(completion.choices[0].message.content)

    res.json({
      message: 'Analysis complete',
      analysis
    })
  } catch (error) {
    console.error('AI Resume Analysis Error:', error)
    if (error.message.includes('API key')) {
       return res.status(503).json({ message: 'Service Unavailable: AI Configuration is missing.' })
    }
    res.status(500).json({ message: 'Failed to analyze resume' })
  }
})
