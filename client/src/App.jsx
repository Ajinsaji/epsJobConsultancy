import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Layout from './layouts/Layout'
import PublicLayout from './layouts/PublicLayout'
import CandidateLayout from './layouts/CandidateLayout'
import CompanyLayout from './layouts/CompanyLayout'
import EPSLayout from './layouts/EPSLayout'
import {
  HomePage,
  JobsPage,
  AboutPage,
  ServicesPage,
  ContactPage,
  LoginPage,
  RegisterPage,
  ForgotPasswordPage,
  AdminLoginPage,
} from './pages/public'



import {
  CandidateDashboard,
  CandidateProfile,
  JobSearch,
  AppliedJobs,
  SavedJobs,
  Notifications,
  ResumeBuilder,
  ResumeAnalyzer,
} from './pages/candidate'
import {
  EPSDashboard,
  ManageCandidates,
  ManageJobs,
  Applications,
  Interviews,
  Analytics,
  HomepageCMS,
} from './pages/eps'
import {
  CompanyDashboard,
  CompanyProfile,
  CompanyJobs,
  ShortlistedCandidates,
  FeedbackPage,
  TalentSearch,
  CandidateProfileView,
  SavedCandidates,
  CommunicationCenter,
} from './pages/company'





import {
  AdminDashboard,
  ManageUsers,

  ManageCompanies,
  ManageSubscriptions,
  SystemLogs,
} from './pages/admin'
import { ProtectedRoute } from './routes/ProtectedRoute'


export default function App() {
  return (
    <Routes>
      {/* Public marketing */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs" element={<JobsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/super-admin" element={<AdminLoginPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      </Route>

      {/* Candidate SaaS */}
      <Route path="/candidate" element={<ProtectedRoute role="candidate" />}>

        <Route element={<CandidateLayout />}>
          <Route index element={<CandidateDashboard />} />
          <Route path="profile" element={<CandidateProfile />} />
          <Route path="jobs" element={<JobSearch />} />
          <Route path="applied" element={<AppliedJobs />} />
          <Route path="saved" element={<SavedJobs />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="resume-builder" element={<ResumeBuilder />} />
          <Route path="resume-analyzer" element={<ResumeAnalyzer />} />
        </Route>
      </Route>

      {/* Company SaaS */}
      <Route path="/company" element={<ProtectedRoute role="company" />}>
        <Route element={<CompanyLayout />}>
          <Route index element={<CompanyDashboard />} />
          <Route path="profile" element={<CompanyProfile />} />
          <Route path="jobs" element={<CompanyJobs />} />
          <Route path="saved" element={<SavedCandidates />} />
          <Route path="shortlisted" element={<ShortlistedCandidates />} />
          <Route path="feedback" element={<FeedbackPage />} />

          <Route path="talent-search" element={<TalentSearch />} />
          <Route path="candidates/:id" element={<CandidateProfileView />} />
          <Route path="communications" element={<CommunicationCenter />} />


        </Route>

      </Route>

      {/* EPS admin SaaS */}
      <Route path="/eps" element={<ProtectedRoute role="eps_admin" />}>
        <Route element={<EPSLayout />}>
          <Route index element={<EPSDashboard />} />
          <Route path="manage-candidates" element={<ManageCandidates />} />
          <Route path="manage-jobs" element={<ManageJobs />} />
          <Route path="applications" element={<Applications />} />
          <Route path="interviews" element={<Interviews />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="homepage" element={<HomepageCMS />} />
        </Route>
      </Route>



      {/* Fallback */}
      <Route path="*" element={<Layout.NotFound />} />
    </Routes>
  )
}

