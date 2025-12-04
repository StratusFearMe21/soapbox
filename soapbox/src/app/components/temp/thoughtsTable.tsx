"use client";

export interface Thought {
  id: number,
  created_at: string,
  user_id: string,
  text_content: string
}

interface ThoughtProp {
  thought: Thought
}

interface ThoughtsTableProps {
  thoughts?: Thought[]
}

function ThoughtRow({ thought }: ThoughtProp) {
  return (
    <tr key={thought.id} className={"border-b border-white/10 hover:bg-white/5 transition-colors"}>
      <td className="p-4 text-white/80 font-mono text-xs">{thought.id}</td>
      <td className="p-4 text-white/80 text-sm">{thought.created_at}</td>
      <td className="p-4 text-white/80 font-mono text-xs">{thought.user_id}</td>
      <td className="p-4 text-white">{thought.text_content}</td>
    </tr>
  )
}

export function ThoughtsTable({thoughts}: ThoughtsTableProps) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/20 bg-black/20 backdrop-blur-md">
      <table className={"w-full text-left"}>
        <thead className="bg-white/10 text-white font-semibold">
        <tr>
          <th className="p-4" scope="col">ID</th>
          <th className="p-4" scope="col">Timestamp</th>
          <th className="p-4" scope="col">User ID</th>
          <th className="p-4" scope="col">Text Content</th>
        </tr>
        {thoughts?.map((item) => (
          <ThoughtRow key={item.id} thought={item} />
        ))}
        </thead>
      </table>
    </div>
  )
}