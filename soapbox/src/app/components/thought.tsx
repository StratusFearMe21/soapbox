export interface FullThought {
  thought: Thought,
  likeCount: number,
  replyCount: number,
  replies?: Thought[],
}


export interface Thought {
  id: string,
  created_at: string,
  user_id: string,
  text_content: string,
  parent_thought: string,
  profile?: Profile,
  like_count?: number,
  reply_count?: number,
  follow_count?: number,
  is_liked?: boolean,
  is_following?: boolean,
}

export interface Profile {
  id?: string,
  username?: string,
  nickname?: string,
  bio?: string,
  created_at?: string,
  last_edited?: string,
  is_following?: boolean,
  thoughts?: Thought[],
}
