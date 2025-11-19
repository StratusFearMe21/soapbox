-- Create post_revisions table to track edits and deletions
CREATE TABLE post_revisions (
    revision_id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    revision_timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    revision_type TEXT NOT NULL CHECK (revision_type IN ('edit', 'deletion')),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    associated_post_id BIGINT NOT NULL REFERENCES posts(post_id) ON DELETE CASCADE,
    content TEXT,  -- Store the content that was edited or deleted
    previous_content TEXT  -- Store the previous content for reference
);

alter table post_revisions enable row level security;

-- Create indexes for frequently queried columns
CREATE INDEX idx_post_revisions_post_id ON post_revisions(associated_post_id);
CREATE INDEX idx_post_revisions_user_id ON post_revisions(user_id);
CREATE INDEX idx_post_revisions_timestamp ON post_revisions(revision_timestamp);
CREATE INDEX idx_post_revisions_type ON post_revisions(revision_type);
