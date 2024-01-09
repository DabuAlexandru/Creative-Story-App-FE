
import * as React from "react"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router-dom";
import { cva } from "class-variance-authority";

const navigationMenuBarStyle = cva(
  "absolute top-0 left-0 w-full h-11 px-4 bg-slate-900 justify-between"
)

const navigationMenuBlankStyle = cva(
  "group inline-flex h-9 w-max items-center justify-start rounded-md bg-background px-4 py-2 text-sm font-medium data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
)

export function NavigationMenuDemo() {
  return (
    <NavigationMenu className={navigationMenuBarStyle()}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuBlankStyle()}>
            Creative App
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link to="/discover">
            Discover Stories
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className={navigationMenuTriggerStyle()}>
          <Link to="/my-stories">
            My Stories
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      {/* float right list */}
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink className={navigationMenuBlankStyle()}>
            <span>
              Logged in as 
              <span className="text-lime-400 font-bold"> User </span>
              <span className="text-red-500 underline">Log out?</span>
            </span>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
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