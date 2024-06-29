import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { ReactNode, useCallback, useState } from 'react'
import ReplyDialog from './ReplyDialog'
import { DiscussionThreadType } from '@/utils/types/discussion.types';
import { toast } from '@/components/ui/use-toast';

const ReplyDialogWrapper = ({
  children,
  discussionId,
  mainThreadId,
  onCreateNewComment
}: {
  children: ReactNode;
  discussionId: number | string;
  mainThreadId?: number | string | undefined;
  onCreateNewComment: (newComment: DiscussionThreadType) => void
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const onSubmitEffect = useCallback((newComment: DiscussionThreadType) => {
    toast({ title: "New reply added!" })
    onCreateNewComment(newComment)
    setIsOpen(false)
  }, [])

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <ReplyDialog discussionId={discussionId} mainThreadId={mainThreadId} onSubmitEffect={onSubmitEffect} />
    </Dialog>
  )
}

export default ReplyDialogWrapper