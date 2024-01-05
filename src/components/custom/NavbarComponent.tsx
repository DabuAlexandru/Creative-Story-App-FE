import React, { useContext } from "react";
import { UserContext } from "@/utils/providers/UserContextProvider";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"

type ClassValue = string | { [key: string]: boolean } | undefined | null | false;

const classNames = (...args: ClassValue[]): string => {
  return args
    .filter((arg) => !!arg)
    .map((arg) => {
      if (typeof arg === 'string') {
        return arg;
      } else if (typeof arg === 'object' && arg) {
        return Object.keys((arg as object)).filter((key) => arg[key]);
      }
      return '';
    })
    .flat()
    .join(' ');
};

const NavigationMenubarComponent = () => {
  // const { user, isLogged, logout } = useContext<any>(UserContext);

  // if (!isLogged) {
  //   return null;
  // }

  return <NavigationMenuDemo />
};

// const ListItem = React.forwardRef(({ className, children, title, ...props }: any, forwardedRef) => (
//   <li>
//     <NavigationMenu.Link asChild>
//       <a className={classNames('ListItemLink', className)} {...props} ref={forwardedRef}>
//         <div className="ListItemHeading">{title}</div>
//         <p className="ListItemText">{children}</p>
//       </a>
//     </NavigationMenu.Link>
//   </li>
// ));

const NavigationMenuDemo = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default NavigationMenubarComponent;
