-- Create post_interactions table to track user interactions (likes, etc.) with posts
CREATE TABLE post_interactions (
    interaction_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    interaction_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    post_id BIGINT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    
    -- Add unique constraint to prevent duplicate likes from same user on same post
    UNIQUE(user_id, post_id)
);

alter table post_interactions enable row level security;

-- Create indexes for frequently queried columns
CREATE INDEX idx_post_interactions_post_id ON post_interactions(post_id);
CREATE INDEX idx_post_interactions_user_id ON post_interactions(user_id);
CREATE INDEX idx_post_interactions_timestamp ON post_interactions(interaction_timestamp);
