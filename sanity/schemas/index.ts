import hero from './hero'
import student from './student'
import studentDocument from './studentDocument'
import navigation from './navigation'
import lead from './lead'
import partner from './partner'

// Blog schemas
import blogPost from './blogPost'
import blogAuthor from './blogAuthor'

// Admin schemas
import adminLead from './admin/lead'
import adminStudentDocument from './admin/studentDocument'
import destination from './admin/destination'
import teamMember from './admin/team'

export const schemaTypes = [
  hero,
  student,
  studentDocument,
  navigation,
  lead,
  partner,
  // Blog
  blogPost,
  blogAuthor,
  // Admin
  adminLead,
  adminStudentDocument,
  destination,
  teamMember,
]
