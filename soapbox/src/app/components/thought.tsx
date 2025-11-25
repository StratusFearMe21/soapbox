export interface FullThought {
  thought: Thought,
  likeCount: number,
  replyCount: number,
  replies?: Thought[],
}

interface CountObj {
  count: number;
}

export interface Thought {
  id: string,
  created_at: string,
  user_id: string,
  text_content: string,
  parent_thought: string,
  profile?: Profile,
  like_count?: number | CountObj[],
  reply_count?: number | CountObj[],
  is_liked?: boolean,
}

export interface Profile {
  id?: string,
  username?: string,
  nickname?: string,
  bio?: string,
  created_at?: string,
  last_edited?: string,
  thoughts?: Thought[],
}