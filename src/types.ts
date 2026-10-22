export type WindowId =
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'research'
  | 'contact'

export type Project = {
  title: string
  acronym: string
  status: string
  focus: string
  stack: string[]
  accent: string
  description: string
  details: string[]
}
