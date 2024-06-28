import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FormField, FormItem, FormLabel, FormControl, FormMessage, Form } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { createNewDiscussionThread } from "@/requests/discussion.thread.requests"
import { makeRequest } from "@/requests/request.handler"
import { zodResolver } from "@hookform/resolvers/zod"
import { Separator } from "@radix-ui/react-dropdown-menu"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { formFieldStyle, replyNoteSchema } from "../utils"

const ReplyDialog = ({
  discussionId,
  mainThreadId
}: {
  discussionId: number | string
  mainThreadId?: number | string | undefined
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm<z.infer<typeof replyNoteSchema>>({
    resolver: zodResolver(replyNoteSchema),
    defaultValues: {
      content: ""
    },
  })

  const onSubmit = async (values: z.infer<typeof replyNoteSchema>) => {
    const payload = { content: values.content, discussionId, mainThreadId }
    makeRequest({ request: () => createNewDiscussionThread(payload), setIsLoading })
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Leave a reply!</DialogTitle>
        <DialogDescription>Share your thoughts with the world!</DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem style={formFieldStyle}>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className='max-h-[300px] min-h-[300px] h-[300px]'
                    placeholder="Write a reply..."
                    typeof="content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
            <Button disabled={isLoading} type="submit">Submit</Button>
          </div>
        </form>
      </Form>
    </DialogContent >
  )
}

export default ReplyDialog