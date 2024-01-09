import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

const MyStories = () => {
  return (
    <Card>
      <CardHeader>MyStories<Separator className='my-3' /></CardHeader>
      <CardContent className='mb-4'>
        <div className='w-100 align-items-start'>
          <span>Journal</span>
          <div>Journal Entries</div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MyStories