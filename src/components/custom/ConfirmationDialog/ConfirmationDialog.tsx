import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ReactNode, useState } from "react";

export function ConfirmationDialog({
  children,
  question,
  onConfirm,
  onReject = () => { },
  confirmText = "Confirm",
  rejectText = "Cancel",
}: {
  children: ReactNode;
  question: string;
  onConfirm: () => void;
  onReject?: () => void;
  confirmText?: string;
  rejectText?: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onRejectEvent = () => {
    setIsOpen(false)
    onReject()
  }

  const onConfirmEvent = () => {
    setIsOpen(false)
    onConfirm()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogDescription>
            {question}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onRejectEvent}>
            {rejectText}
          </Button>
          <Button variant="default" onClick={onConfirmEvent}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
