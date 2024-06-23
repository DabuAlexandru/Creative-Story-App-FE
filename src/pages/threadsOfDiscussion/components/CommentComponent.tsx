import AuthorAvatar from "@/components/custom/AuthorAvatar/AuthorAvatar";
import { Button } from "@/components/ui/button";
import { DiscussionThreadType } from "@/utils/types/discussion.types";
import { ArrowDownIcon, ArrowUpIcon, ThickArrowDownIcon, ThickArrowUpIcon } from "@radix-ui/react-icons";
import dayjs from "dayjs";
import { useState } from "react";
import CommentThreadComponent from "./CommentThreadComponent";

export const CommentComponent = ({ comment, level = 0 }: { comment: DiscussionThreadType, level?: number }) => {
  const [showComments, setShowComments] = useState<boolean>(false);

  const handleToggleComments = () => {
    setShowComments(!showComments);
  };

  const threadHasComments = Boolean(comment?.commentsCount)

  return (
    <>
      <div key={comment.id} className="p-6 mb-4 bg-slate-800 rounded-lg shadow">
        <div className="mb-4">
          <div className="ml-4 text-slate-500 flex gap-2 items-center">
            <AuthorAvatar author={comment.author} className="size-8" />
            <span className="text-sm font-semibold">{comment.author.penName}</span>
          </div>
        </div>
        <div>
          <p className="mb-4 text-slate-300">{comment.content}</p>
          <div className="flex justify-between items-center text-slate-300">
            <span className="text-sm font-semibold text-slate-500">Creation Date: {dayjs(comment.createdOn).format('YYYY-MM-DD HH:mm')}</span>
            <div className="flex items-center gap-4">
              <div className="flex items-center bg-slate-700 rounded-full">
                <Button className="p-0 h-6 w-8 rounded-l-full" variant={'ghost'}>
                  <ThickArrowUpIcon />
                </Button>
                <Button className="p-0 h-6 w-8 rounded-r-full" variant={'ghost'}>
                  <ThickArrowDownIcon />
                </Button>
              </div>
              <div className="flex items-center bg-slate-700 rounded-full px-2">
                <span>{Math.ceil(Math.random() * 100)}</span>
              </div>
              <button className="select-none flex items-center gap-1 text-slate-500 hover:text-slate-300">
                <span>Reply</span>
              </button>
              <button
                disabled={!threadHasComments}
                onClick={handleToggleComments}
                className={`select-none flex items-center gap-1 text-slate-500 ${threadHasComments ? 'hover:text-slate-300' : 'pointer-events-none opacity-50'}`}
              >
                <span>{showComments ? 'Hide Comments' : 'Show Comments'}</span>
                {showComments ? <ArrowUpIcon /> : <ArrowDownIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
      {showComments ? <CommentThreadComponent commentId={comment.id} commentsCount={comment.commentsCount} level={level + 1} /> : null}
    </>
  );
};