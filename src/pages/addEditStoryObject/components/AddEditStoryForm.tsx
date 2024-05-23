import { Button } from "@/components/ui/button"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { formFieldStyle } from "@/pages/register/utils"
import { StoryBaseType } from "@/utils/types/story.types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { storyFormSchema } from "../utils"
import CoverPictureForm from "./CoverPictureForm"
import { createNewStoryRequest, updateStoryRequest } from "@/requests/story.requests"
import { makeRequest } from "@/requests/request.handler"
import { useNavigate } from "react-router-dom"
import GenresForm from "./GenresForm"
import { GenreType } from "@/utils/types/genre.types"

const AddEditStoryForm = ({ story, imageSrc }: { story: StoryBaseType, imageSrc: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [genres, setGenres] = useState<GenreType[]>(story.genres || [])
  const [subGenres, setSubGenres] = useState<GenreType[]>(story.subGenres || [])
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof storyFormSchema>>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: story,
  })

  const onSubmit = (values: z.infer<typeof storyFormSchema>) => {
    const futureStory: StoryBaseType = { ...story, ...values, genres, subGenres }
    const request = story.id
      ? () => updateStoryRequest(story.id, futureStory)
      : () => createNewStoryRequest(futureStory)

    makeRequest({
      request,
      setIsLoading,
      onSuccessEffect: () => navigate("/my-stories"),
    })
  }

  return (<Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <div className='flex flex-row gap-8'>
        <div className='w-1/3 h-full'>
          <CoverPictureForm storyId={story.id || 0} coverPicture={imageSrc} />
        </div>
        <div className='w-2/3 flex flex-col gap-8 justify-center'>
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
            name="description"
            render={({ field }) => (
              <FormItem style={formFieldStyle}>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className='max-h-[100px] min-h-[100px] h-[100px]'
                    placeholder="Describe your story"
                    typeof="description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <GenresForm genres={genres} setGenres={setGenres} subGenres={subGenres} setSubGenres={setSubGenres} /> 
        </div>
      </div>
      <FormField
        control={form.control}
        name="preview"
        render={({ field }) => (
          <FormItem style={formFieldStyle}>
            <FormLabel>Preview</FormLabel>
            <FormControl>
              <Textarea
                disabled={isLoading}
                className='max-h-[400px] min-h-[400px] h-[400px] mb-4'
                placeholder="Write a preview to catch their attention..."
                typeof="preview"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '8px' }}>
        <Button disabled={isLoading} type="submit">Submit</Button>
      </div>
    </form>
  </Form>)
}

export default AddEditStoryForm