import {Popover, PopoverTrigger} from "@/app/components/ui/popover";
import {useState} from "react";
import {Button} from "@/app/components/ui/button";

export function SortDropdown() {
  const [ open, setOpen ] = useState<boolean>(false);
  const [ value, setValue ] = useState<string>('');

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"glass"}
        >
        </Button>
      </PopoverTrigger>
    </Popover>
  )
}

export default function SortSettings() {
  return (
    <div className={"absolute top-0 right-0"}>
      <SortDropdown/>
    </div>
  )
}