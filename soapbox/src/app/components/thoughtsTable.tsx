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
    <tr key={thought.id} className={"[&>*]:p-4 [&>*]:border-4 [&>*]:border-white"}>
      <td>{thought.id}</td>
      <td>{thought.created_at}</td>
      <td>{thought.user_id}</td>
      <td>{thought.text_content}</td>
    </tr>
  )
}

export function ThoughtsTable({thoughts}: ThoughtsTableProps) {
  return (
    <table className={"border-4 border-white w-[90%]"}>
      <thead>
      <tr className={"[&>*]:p-4 [&>*]:border-4 [&>*]:border-white"}>
        <th scope="col">ID</th>
        <th scope="col">Timestamp</th>
        <th scope="col">User ID</th>
        <th scope="col">Text Content</th>
      </tr>
      {thoughts?.map((item) => (
        <ThoughtRow key={item.id} thought={item} />
      ))}
      </thead>
    </table>
  )
}