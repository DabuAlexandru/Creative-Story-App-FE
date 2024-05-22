
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link, useLocation } from "react-router-dom";
import { cva } from "class-variance-authority";
import { BellIcon, CaretDownIcon } from "@radix-ui/react-icons";
import { DropdownMenuUser } from "../DropdownMenuUser/DropdownMenuUser";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserContext } from "@/utils/providers/UserContextProvider";
import { extractSignatureFromString } from "@/utils/helpers/helper.string";
import { PictureContext } from "@/utils/providers/PicturesProvider";

const navigationMenuBarStyle = cva(
  "absolute top-0 left-0 w-full h-14 px-8 bg-slate-900 justify-between rounded-b-sm fixed"
)

const navigationMenuBlankStyle = cva(
  "group inline-flex h-full w-max items-center justify-start rounded-md px-4 py-2 text-lg font-bold data-[active]:bg-accent/50 data-[state=open]:bg-accent/50 bg-none text-white"
)

const navigationMenuNotificationsStyle = navigationMenuBlankStyle() + " px-[6px] py-[6px]"
const BellMenuItem = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink className={navigationMenuNotificationsStyle}>
        <BellIcon className="w-6 h-6" />
      </NavigationMenuLink>
    </NavigationMenuItem>
  )
}

const navigatioMenuAvatarStyle = navigationMenuBlankStyle() + " pl-1 pr-2"
const AvatarMenuItem = () => {
  const { profileInfo, profilePicture } = React.useContext(UserContext)
  const { getAndSetPictureURL } = React.useContext(PictureContext)
  const [profilePictureUrl, setProfilePictureUrl] = React.useState('')

  const signature = React.useMemo(() => extractSignatureFromString(profileInfo.penName), [profileInfo.penName])

  React.useEffect(() => {
    if (!profilePictureUrl && getAndSetPictureURL) {
      getAndSetPictureURL({ category: 'profile', fileName: profilePicture.fileName, setPictureUrl: setProfilePictureUrl })
    }
  }, [getAndSetPictureURL])

  return (
    <NavigationMenuItem className="flex items-center gap-1 justify-center">
      <DropdownMenuUser>
        <NavigationMenuLink className={navigatioMenuAvatarStyle}>
          <Avatar className='size-8'>
            <AvatarImage src={profilePictureUrl} alt="@shadcn" />
            <AvatarFallback>{signature}</AvatarFallback>
          </Avatar>
          <CaretDownIcon className="w-4 h-4" />
        </NavigationMenuLink>
      </DropdownMenuUser>
    </NavigationMenuItem>
  )
}

const RightSideMenuList = () => {
  return (
    <NavigationMenuList className="gap-2">
      <BellMenuItem />
      <AvatarMenuItem />
    </NavigationMenuList>
  )
}

const SelectablNavMenuItem = ({ route, label }: { route: string, label: string }) => {
  const { pathname } = useLocation()
  const isActive = React.useMemo(() => checkIsActive(pathname, route), [pathname, route])

  return <NavigationMenuItem className={navigationMenuTriggerStyle()} data-active={isActive}>
    <Link to={route} className="content-center h-full">{label}</Link>
  </NavigationMenuItem>
}

const getCurrentUrl = (pathname: string) => {
  return pathname.split(/[?#]/)[0]
}

const checkIsActive = (pathname: string, url: string) => {
  const current = getCurrentUrl(pathname)
  if (!current || !url) {
    return false
  }

  if (current === url) {
    return true
  }

  return false
}


export function NavigationMenuDemo() {
  return (
    <NavigationMenu className={navigationMenuBarStyle()}>
      <NavigationMenuList className="h-full">
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuBlankStyle()}>
            Creative App
          </NavigationMenuLink>
        </NavigationMenuItem>
        <SelectablNavMenuItem route="/discover" label="Discover Stories" />
        <SelectablNavMenuItem route="/my-stories" label="My Stories" />
      </NavigationMenuList>
      {/* float right list */}
      <RightSideMenuList />
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

export default NavigationMenuDemo;