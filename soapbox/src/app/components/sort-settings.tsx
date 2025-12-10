import {Popover, PopoverTrigger, PopoverContent} from "@/app/components/ui/popover";
import {useState} from "react";
import {Button} from "@/app/components/ui/button";
import {Command, CommandGroup, CommandItem, CommandList} from "@/app/components/ui/command";
import {Check} from "lucide-react";
import {getSortOrder, getSortType, SortOrder, SortType} from "@/app/components/sort-enums";

interface SortTypeProps {
  sortType: SortType,
  setSortType: (sortType: SortType) => void,
}

export function SortTypeDropdown( { sortType, setSortType }: SortTypeProps ) {
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"glass"}
          role={"combobox"}
          aria-expanded={open}
          className={"mt-4 mb-2"}
        >
          Sort By: {getSortType(sortType)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-32 glass"}>
        <Command className={"text-sm font-medium "}>
          <CommandList >
            <CommandGroup>
              <CommandItem
                className={"hover:bg-input"}
                key={"LIKES"}
                value={"LIKES"}
                onSelect={() => {
                  setSortType(SortType.LIKES)
                  setOpen(false)
              }}
              >
                LIKES
                <Check className={"size-6 text-white " + (getSortType(sortType) === "LIKES" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>

              <CommandItem
                key={"DATE"}
                value={"DATE"}
                onSelect={() => {
                  setSortType(SortType.DATE)
                  setOpen(false)
                }}
              >
                DATE
                <Check className={"size-6 text-white " + (getSortType(sortType) === "DATE" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface SortOrderProps {
  sortOrder: SortOrder,
  setSortOrder: (sortOrder: SortOrder) => void
}

export function SortOrderDropdown( { sortOrder, setSortOrder } : SortOrderProps ) {
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"glass"}
          role={"combobox"}
          aria-expanded={open}
          className={"mt-2 mb-2"}
        >
          Sort Order: {getSortOrder(sortOrder)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-32 glass"}>
        <Command className={"text-sm font-medium "}>
          <CommandList >
            <CommandGroup>
              <CommandItem
                key={"DESC"}
                value={"DESC"}
                onSelect={() => {
                  setSortOrder(SortOrder.DESC)
                  setOpen(false)
                }}
              >
                DESC
                <Check className={"size-6 text-white " + (getSortOrder(sortOrder) === "DESC" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>

              <CommandItem
                key={"ASC"}
                value={"ASC"}
                onSelect={() => {
                  setSortOrder(SortOrder.ASC)
                  setOpen(false)
                }}
              >
                ASC
                <Check className={"size-6 text-white " + (getSortOrder(sortOrder) === "ASC" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface SortSettingsProps {
  sortType: SortType,
  setSortType: (sortType: SortType) => void,
  sortOrder: SortOrder,
  setSortOrder: (sortOrder: SortOrder) => void
}

export default function SortSettings( {sortType, setSortType, sortOrder, setSortOrder} : SortSettingsProps ) {
  return (
    <div className={"absolute top-0 right-0 z-30 flex flex-col"}>
      <SortTypeDropdown sortType={sortType} setSortType={setSortType} />
      <SortOrderDropdown sortOrder={sortOrder} setSortOrder={setSortOrder} />
    </div>
  )
}