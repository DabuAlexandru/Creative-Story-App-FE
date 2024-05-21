import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FlexibleObject } from "@/utils/types/general.types"
import { Cross2Icon } from "@radix-ui/react-icons"


const BadgesContainer = ({
  elements,
  IdKey,
  labelKey,
  onRemoveItem
}: {
  elements: FlexibleObject[]
  IdKey: string
  labelKey: string
  onRemoveItem: (id: number | string) => void
}) => {
  return (
    <Card>
      <CardContent className="p-2">
        {elements.map(element => (
          <Badge key={element[IdKey]} className="rounded-full m-1">
            <div className="select-none flex gap-1 items-center mt-[-1px]">
              <span>{element[labelKey]}</span>
              <Button
                variant='secondary'
                className='w-[20px] h-[20px] rounded-full p-1 mt-[1px]'
                onClick={(e) => {
                  e.preventDefault()
                  onRemoveItem(element[IdKey])
                }}
              >
                <Cross2Icon />
              </Button>
            </div>
          </Badge>
        ))}
      </CardContent>
    </Card>
  )
}

export default BadgesContainer