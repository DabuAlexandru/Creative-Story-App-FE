import AuthorAvatar from "@/components/custom/AuthorAvatar/AuthorAvatar"
import { DiscussionType } from "@/utils/types/discussion.types"
import dayjs from "dayjs"

export const DiscussionTitlePreview = ({ discussion }: { discussion: DiscussionType }) => {
  return (
    <div key={`preview-${discussion.id}`} className="p-6 mb-4 bg-slate-800 rounded-lg shadow fixed left-0 right-0 top-14 z-10 border-slate-950 border-s-2 fixed-position">
      <div className="flex justify-between items-center">
        <div className="flex">
          <h2 className="text-xl font-bold">{discussion.title}</h2>
          <div className="ml-4 text-slate-500 flex gap-2 items-center">
            <AuthorAvatar author={discussion.author} className="size-8" />
            <span className="text-sm font-semibold">{discussion.author.penName}</span>
          </div>
        </div>
        <div>
          <span className="text-sm font-semibold text-slate-500 ">Creation Date: {dayjs(discussion.createdOn).format('YYYY-MM-DD HH:mm')}</span>
          <span className="ml-4 cursor-pointer text-blue-500">{discussion.commentsCount} comments</span>
        </div>
      </div>
    </div>
  )
}