import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ReactNode, useState } from 'react'
import ReplyDialog from './ReplyDialog'

const ReplyDialogWrapper = ({
  children,
  discussionId,
  mainThreadId
}: {
  children: ReactNode;
  discussionId: number | string;
  mainThreadId?: number | string | undefined;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <ReplyDialog discussionId={discussionId} mainThreadId={mainThreadId} />
    </Dialog>
  )
}

export default ReplyDialogWrapper