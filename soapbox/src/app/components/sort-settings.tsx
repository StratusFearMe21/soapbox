import {Popover, PopoverTrigger, PopoverContent} from "@/app/components/ui/popover";
import {useState} from "react";
import {Button} from "@/app/components/ui/button";
import {Command, CommandGroup, CommandItem, CommandList} from "@/app/components/ui/command";
import {ArrowLeft, ArrowRight, Check} from "lucide-react";
import {getSortOrder, getSortType, getTimeframe, SortOrder, SortType, Timeframe} from "@/app/components/sort-enums";
import {Card} from "@/app/components/ui/card";

interface SortTypeProps {
  sortType: SortType,
  setSortType: (sortType: SortType) => void,
}

function SortTypeDropdown( { sortType, setSortType }: SortTypeProps ) {
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"glass"}
          role={"combobox"}
          aria-expanded={open}
          className={"mt-2 mb-2 w-full"}
        >
          Sort By: {getSortType(sortType)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-40 glass"}>
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

function SortOrderDropdown( { sortOrder, setSortOrder } : SortOrderProps ) {
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"glass"}
          role={"combobox"}
          aria-expanded={open}
          className={"mt-2 mb-2 w-full"}
        >
          Sort Order: {getSortOrder(sortOrder)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-40 glass"}>
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

interface TimeframeProps {
  timeframe: Timeframe,
  setTimeframe: (timeframe: Timeframe) => void
}

function TimeframeDropdown( { timeframe, setTimeframe } : TimeframeProps ) {
  const [ open, setOpen ] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"glass"}
          role={"combobox"}
          aria-expanded={open}
          className={"mt-2 mb-2 w-full"}
        >
          TIMEFRAME: {getTimeframe(timeframe)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className={"w-40 glass"}>
        <Command className={"text-sm font-medium "}>
          <CommandList >
            <CommandGroup>
              <CommandItem
                key={"DAY"}
                value={"DAY"}
                onSelect={() => {
                  setTimeframe(Timeframe.DAY)
                  setOpen(false)
                }}
              >
                DAY
                <Check className={"size-6 text-white " + (getTimeframe(timeframe) === "DAY" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>

              <CommandItem
                key={"WEEK"}
                value={"WEEK"}
                onSelect={() => {
                  setTimeframe(Timeframe.WEEK)
                  setOpen(false)
                }}
              >
                WEEK
                <Check className={"size-6 text-white " + (getTimeframe(timeframe) === "WEEK" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>

              <CommandItem
                key={"MONTH"}
                value={"MONTH"}
                onSelect={() => {
                  setTimeframe(Timeframe.MONTH)
                  setOpen(false)
                }}
              >
                MONTH
                <Check className={"size-6 text-white " + (getTimeframe(timeframe) === "MONTH" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>

              <CommandItem
                key={"YEAR"}
                value={"YEAR"}
                onSelect={() => {
                  setTimeframe(Timeframe.YEAR)
                  setOpen(false)
                }}
              >
                YEAR
                <Check className={"size-6 text-white " + (getTimeframe(timeframe) === "YEAR" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>

              <CommandItem
                key={"ALL-TIME"}
                value={"ALL-TIME"}
                onSelect={() => {
                  setTimeframe(Timeframe.ALLTIME)
                  setOpen(false)
                }}
              >
                ALL-TIME
                <Check className={"size-6 text-white " + (getTimeframe(timeframe) === "ALL-TIME" ? "opacity-100" : "opacity-0")}/>

              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface SortSettingsProps {
  page: number,
  setPage: (page: number) => void,
  isNextPage: boolean,
  sortType: SortType,
  setSortType: (sortType: SortType) => void,
  sortOrder: SortOrder,
  setSortOrder: (sortOrder: SortOrder) => void
  timeframe: Timeframe,
  setTimeframe: (timeframe: Timeframe) => void
}

export default function SortSettings( {page, setPage, isNextPage, sortType, setSortType, sortOrder, setSortOrder, timeframe, setTimeframe} : SortSettingsProps ) {
  const onPrevPage = async () => {
    setPage(page - 1);
  }

  const onNextPage = async () => {
    setPage(page + 1);
  }

  return (
    <Card className={"fixed top-0 right-0 z-30 flex flex-col justify-center items-center rounded-md m-8 p-4"}>
      <SortTypeDropdown sortType={sortType} setSortType={setSortType}/>
      <SortOrderDropdown sortOrder={sortOrder} setSortOrder={setSortOrder}/>
      <TimeframeDropdown timeframe={timeframe} setTimeframe={setTimeframe}/>

      <div className={"h-px bg-white/20 w-[50%] my-2"}/>

      <div className={"flex flex-row justify-center items-center"}>
        <Button
          variant={"glass"}
          className={"mt-2 mb-0"}
          disabled={page === 1}
          onClick={onPrevPage}
        >
          <ArrowLeft/>
        </Button>
        <Button
          variant={"glass"}
          className={"mt-2 mb-0"}
          disabled={!isNextPage}
          onClick={onNextPage}
        >
          <ArrowRight/>
        </Button>
      </div>
    </Card>
  )
}