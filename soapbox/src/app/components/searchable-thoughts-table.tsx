'use client';
import { Thought, ThoughtsTable } from "@/app/components/temp/thoughtsTable";
import { Input } from "@/app/components/ui/input";
import { useState, useEffect } from "react";

interface SearchableThoughtsTableProps {
  thoughts: Thought[];
}

export function SearchableThoughtsTable({ thoughts }: SearchableThoughtsTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredThoughts, setFilteredThoughts] = useState<Thought[]>(thoughts);

  // Filter thoughts whenever search query changes
  useEffect(() => {
    const filtered = thoughts.filter(thought => 
      thought.text_content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      thought.user_id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredThoughts(filtered);
  }, [searchQuery, thoughts]);

  return (
    <>
      <div className="w-[90%] max-w-md">
        <Input
          type="text"
          placeholder="Search thoughts by content or user ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full"
        />
      </div>
      <ThoughtsTable thoughts={filteredThoughts} />
    </>
  )
}