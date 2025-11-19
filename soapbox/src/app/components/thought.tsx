export interface Thought {
  id: string,
  created_at: string,
  user_id: string,
  text_content: string,
  profile?: {
    id?: string,
    username?: string,
    nickname?: string,
  }
}