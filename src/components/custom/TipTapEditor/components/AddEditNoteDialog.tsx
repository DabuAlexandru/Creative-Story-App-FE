import { Button } from '@/components/ui/button'
import { DialogHeader, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { NoteType, getNewNote } from '@/utils/types/section.types'
import { formFieldStyle, sectionNoteSchema } from '../utils'
import { useContext, useState } from 'react'
import { z } from 'zod'
import { makeRequest } from '@/requests/request.handler'
import { createNewSectionNote, updateSectionNote } from '@/requests/section.note.requests'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Separator } from '@radix-ui/react-dropdown-menu'
import { TipTopEditorContext } from '@/utils/providers/TipTapEditorProvider'

const AddEditNoteDialog = ({
  note,
  onReceiveResponse
}: {
  note?: NoteType
  onReceiveResponse: (note: NoteType) => void
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { sectionId } = useContext(TipTopEditorContext)

  const form = useForm<z.infer<typeof sectionNoteSchema>>({
    resolver: zodResolver(sectionNoteSchema),
    defaultValues: {
      title: note?.title || "",
      content: note?.content || ""
    },
  })

  const isEditMode = Boolean(note?.id)

  const onSubmit = async (values: z.infer<typeof sectionNoteSchema>) => {
    let oldNote = note
    if (!oldNote) {
      oldNote = getNewNote()
    }
    const editedNote: NoteType = { ...oldNote, ...values }
    const request = isEditMode
      ? () => updateSectionNote(oldNote.id, editedNote)
      : () => createNewSectionNote(sectionId, editedNote)
    makeRequest({
      request,
      setIsLoading,
      displaySuccessMessage: true,
      successMessage: 'Note Updated!',
      onReceiveResponse,
      onSuccessEffect: () => {
        form.reset()
      }
    })
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{isEditMode ? 'Edit Note' : 'Add Note'}</DialogTitle>
        <DialogDescription>
          Keep a memo here about important events in the story! Consistency is key!
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem style={formFieldStyle}>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input disabled={isLoading} type="title" placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    placeholder="Write your memos here"
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

export default AddEditNoteDialog