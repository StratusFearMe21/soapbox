import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter, DialogTitle,
  DialogTrigger
} from "@/app/components/ui/dialog";
import {Button} from "@/app/components/ui/button";
import {ReactNode} from "react";

interface ConfirmDialogProps {
  buttonText?: string;
  mainText: string,
  confirmText: string,
  cancelText: string,
  onConfirm: () => void,
  children: ReactNode,
}

export function ConfirmDialog(
  { buttonText, mainText, confirmText, cancelText, onConfirm, children }: ConfirmDialogProps
)
{
  return (
    <Dialog>
      <DialogTrigger asChild>
        {
          buttonText ?
            <Button
              variant={"glass"}
              className={"text-xs w-fit h-6 m-0"}
            >{buttonText}</Button>
          :
            <div
              className="ring-offset-background focus:ring-ring data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-100 transition-transform hover:scale-120 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            >
              {children}
            </div>
        }

      </DialogTrigger>
      <DialogContent className={"glass"}>
        <DialogTitle hidden/>

        <DialogDescription
          className={"flex flex-col w-full text-center font-medium"}
        >
          {mainText}
        </DialogDescription>
        <DialogFooter className={"flex flex-row w-full justify-center items-center"}>

          <Button
            variant={"glass"}
            className={"text-xs w-fit h-6 m-0"}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>

          <DialogClose className={""} asChild>
            <Button
              variant={"glass"}
              className={"text-xs w-fit h-6 m-0"}
            >{cancelText}
            </Button>
          </DialogClose>

        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}