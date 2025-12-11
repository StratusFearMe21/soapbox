import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter, DialogTitle,
  DialogTrigger
} from "@/app/components/ui/dialog";
import {Button} from "@/app/components/ui/button";

interface ConfirmDialogProps {
  buttonText?: string;
  mainText: string,
  confirmText: string,
  cancelText: string,
  onConfirm: () => void,
}

export function ConfirmDialog(
  { buttonText, mainText, confirmText, cancelText, onConfirm } : ConfirmDialogProps
)
{
  return (
    <Dialog>
      <DialogTrigger asChild>
            <Button
              variant={"glass"}
              className={"text-xs w-fit h-6 m-0"}
            >{buttonText}</Button>
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