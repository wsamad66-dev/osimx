export const structure = (S: any) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Navigation / Header')
        .child(
          S.editor()
            .schemaType('navigation')
            .documentId('main-navigation')
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item: any) => !['navigation'].includes(item.getId() || '')
      ),
    ])
