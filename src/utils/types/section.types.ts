
export type SectionType = {
  id: number
  title: string
  creationDate: Date
  lastModifiedDate: Date
  storyId: number
  displayOrder: number
}

export type SectionWithContentType = SectionType & { content: string }

export const emptySection: SectionType = {
  id: 0,
  title: '',
  creationDate: new Date(),
  lastModifiedDate: new Date(),
  storyId: 0,
  displayOrder: 0
}

export const getNewSection = (): SectionType => ({
  ...emptySection,
  title: 'New Section',
  creationDate: new Date(),
  lastModifiedDate: new Date(),
})

export type NoteType = {
  id: number
  title: string
  content: string
  creationDate: Date
  lastModifiedDate: Date
  storyId: number
}

export const emptyNote: NoteType = {
  id: 0,
  title: '',
  content: '',
  creationDate: new Date(),
  lastModifiedDate: new Date(),
  storyId: 0
}

export const getNewNote = (): NoteType => ({
  ...emptyNote,
  creationDate: new Date(),
  lastModifiedDate: new Date()
})
