import nodemailer from 'nodemailer'

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

// Client base URL for links
const clientUrl = process.env.CLIENT_ORIGIN || 'http://localhost:5173'

/**
 * Helper to send email using Nodemailer
 */
async function sendMailHelper(options) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    throw new Error('Email credentials not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env')
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || `"EPS Consultancy" <${process.env.EMAIL_USER}>`,
      ...options,
    })
    return info
  } catch (error) {
    console.error('Email failed to send:', error)
    throw error
  }
}

export async function sendVerificationEmail(user, token) {
  const url = `${clientUrl}/verify-email?token=${token}`
  const options = {
    to: user.email,
    subject: 'Verify Your EPS Account Email',
    text: `Hello ${user.name},\n\nPlease verify your email by clicking the link below:\n\n${url}\n\nThis link will expire in 24 hours.\n\nBest regards,\nEPS Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #1f2937;">
        <h2 style="color: #1d3557;">Verify Your Account</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Thank you for registering on EPS Job Consultancy Platform. Please verify your email by clicking the button below:</p>
        <div style="margin: 24px 0;">
          <a href="${url}" style="background-color: #00b4d8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Verify Email Address</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p><a href="${url}">${url}</a></p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #6b7280;">This link is valid for 24 hours. If you did not sign up for this account, please ignore this email.</p>
      </div>
    `,
  }
  return sendMailHelper(options)
}

export async function sendPasswordResetEmail(user, token) {
  const url = `${clientUrl}/reset-password?token=${token}`
  const options = {
    to: user.email,
    subject: 'Reset Your EPS Account Password',
    text: `Hello ${user.name},\n\nYou requested a password reset. Please use the link below to set a new password:\n\n${url}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email.\n\nBest regards,\nEPS Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #1f2937;">
        <h2 style="color: #1d3557;">Reset Your Password</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>You are receiving this email because we received a password reset request for your account.</p>
        <div style="margin: 24px 0;">
          <a href="${url}" style="background-color: #e63946; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Reset Password</a>
        </div>
        <p>Or copy and paste this link in your browser:</p>
        <p><a href="${url}">${url}</a></p>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #6b7280;">This link is valid for 1 hour. If you did not request a password reset, no further action is required.</p>
      </div>
    `,
  }
  return sendMailHelper(options)
}

export async function sendWelcomeEmail(user) {
  const options = {
    to: user.email,
    subject: 'Welcome to EPS Job Consultancy Platform!',
    text: `Hello ${user.name},\n\nYour account has been successfully verified! You can now log in and complete your profile.\n\nWelcome aboard,\nEPS Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #1f2937;">
        <h2 style="color: #1d3557;">Welcome Aboard!</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>Your email has been verified and your account is now fully active.</p>
        <p>Here are your next steps:</p>
        <ol>
          <li>Log in to your account</li>
          <li>Complete your profile details</li>
          <li>Upload your resume to get matched with jobs</li>
        </ol>
        <div style="margin: 24px 0;">
          <a href="${clientUrl}/login" style="background-color: #1d3557; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Log In Now</a>
        </div>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #6b7280;">Thank you for choosing EPS Consultancy.</p>
      </div>
    `,
  }
  return sendMailHelper(options)
}

export async function sendApplicationStatusEmail(user, job, status, remarks) {
  const options = {
    to: user.email,
    subject: `Application Status Updated: ${job.title}`,
    text: `Hello ${user.name},\n\nYour application for the position of "${job.title}" has been updated to "${status}".\n\nRemarks: ${remarks || 'None'}\n\nCheck your dashboard for updates.\n\nBest regards,\nEPS Team`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #1f2937;">
        <h2 style="color: #1d3557;">Application Update</h2>
        <p>Hello <strong>${user.name}</strong>,</p>
        <p>The status of your application for <strong>${job.title}</strong> at <strong>${job.companyId ? job.companyId.companyName : 'Partner Company'}</strong> has been updated.</p>
        <div style="background-color: #f3f4f6; padding: 15px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #00b4d8;">
          <p style="margin: 0; font-size: 16px;"><strong>New Status:</strong> ${status}</p>
          ${remarks ? `<p style="margin: 10px 0 0 0; color: #4b5563;"><strong>Remarks:</strong> ${remarks}</p>` : ''}
        </div>
        <div style="margin: 24px 0;">
          <a href="${clientUrl}/candidate/applied" style="background-color: #1d3557; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">View Applications</a>
        </div>
        <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
        <p style="font-size: 12px; color: #6b7280;">This is an automated system notification.</p>
      </div>
    `,
  }
  return sendMailHelper(options)
}
