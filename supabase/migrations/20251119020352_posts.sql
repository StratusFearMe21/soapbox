-- Create posts table
CREATE TABLE posts (
    post_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    post_timestamp TIMESTAMP WITH TIMEZONE DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    text_content TEXT NOT NULL,
    like_count INTEGER DEFAULT 0,
    reply_count INTEGER DEFAULT 0
);

alter table posts enable row level security;

-- Create indexes for frequently queried columns
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_post_timestamp ON posts(post_timestamp);
CREATE INDEX idx_posts_like_count ON posts(like_count);

create policy "public can read posts"
on public.posts
for select to anon
using (true);
