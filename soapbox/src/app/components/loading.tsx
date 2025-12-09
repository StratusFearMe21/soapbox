import { LoaderCircle } from 'lucide-react';

export default function Loading() {
  return (
    <div className={"top-0 left-0 absolute w-full h-full flex items-center justify-center m-0 p-0"}>
      <LoaderCircle
        className={"size-16 animate-spin m-0 p-0"}
        strokeWidth={2.8}
      />
    </div>
  )
}