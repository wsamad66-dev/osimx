export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      // Hero Section
      S.documentTypeListItem('hero').title('🏠 Hero Section'),

      // Étudiants
      S.documentTypeListItem('student').title('👥 Étudiants'),

      // Student Documents
      S.documentTypeListItem('studentDocument').title('📄 Student Documents'),

      // Navigation
      S.listItem()
        .title('�� Navigation / Header')
        .child(
          S.document()
            .schemaType('navigation')
            .documentId('main-navigation')
        ),

      S.divider(),

      // BLOG - Articles
      S.documentTypeListItem('blogPost').title('📝 Articles de Blog'),

      // BLOG - Auteurs
      S.documentTypeListItem('blogAuthor').title('✍️ Auteurs'),

      S.divider(),

      // Leads
      S.documentTypeListItem('lead').title('📅 Leads'),

      // Partners
      S.documentTypeListItem('partner').title('🤝 Partenaires'),

      S.divider(),

      // Admin types
      S.documentTypeListItem('adminLead').title('📋 Admin Leads'),
      S.documentTypeListItem('adminStudentDocument').title('📑 Admin Documents'),
      S.documentTypeListItem('destination').title('🌍 Destinations'),
      S.documentTypeListItem('teamMember').title('👤 Équipe'),
    ])
