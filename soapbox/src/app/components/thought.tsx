export interface Thought {
  id: string,
  created_at: string,
  user_id: string,
  text_content: string,
  parent_thought: string,
  profile?: Profile,
}

export interface Profile {
  id?: string,
  username?: string,
  nickname?: string,
  bio?: string,
  created_at?: string,
  last_edited?: string,
}