export const BASE_URL = 'http://107.22.17.111:3000';

export const ENDPOINTS = {
  jobSeekerLogin: '/job-seeker/login',
  JobSeekerRegister: '/job-seeker/register',
  jobSeekerUpdatePass: '/job-seeker/update-password/',
  jobSeekerUpdateProfile: '/job-seeker/update/',
  jobGetSingleUser: "/job-seeker/get/",

  recruiterLogin: '/recruiter/login',
  recruiterRegister: '/recruiter/register',
  recruiterUpdatePass: '/recruiter/update-password/',
  recruiterUpdateProfile: '/recruiter/update/',

  // Jobs
  createJob: "/jobs/create",
  getJobs: "/jobs/getAll/",
  deleteJob: "/jobs/delete/",
  createJobRequest: "/job-requests/create",
  getSingleJob: "/jobs/",
  searchJob: "/jobs/search/",
  jobRequest: "/job-requests/recruiter/",
  getRecruiterJobs: "/jobs/getByRecruiter/",
  jobSeekerJobRequest: "/job-requests/job-seeker/",
  saveJob: "/saved-jobs/save",
  removeSave: "/saved-jobs/remove/",
  getSavedJobs: "/saved-jobs/get/",
  jobRequestAction: "/job-requests/action/"
};
