import {
  faBook,
  faComments,
  faGear,
  faHouse,
  faListCheck,
  faSwatchbook,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Splace Classroom",
  navMenuItems: [
    {
      label: "Dashboard",
      href: "/",
      icon: faHouse,
    },
    {
      label: "Forum Discussion",
      href: "/discuss",
      icon: faComments,
    },
  ],
  navMenuItemsInstructor: [
    {
      label: "Dashboard",
      href: "/",
      icon: faHouse,
    },
    {
      label: "Quiz",
      href: "/quiz",
      icon: faListCheck,
    },
  ],
  navMenuItemsAdmin: [
    {
      label: "Dashboard",
      href: "/",
      icon: faHouse,
    },
    {
      label: "Users",
      icon: faUsers,
      href: "/admin/users",
    },
    {
      label: "Class",
      icon: faSwatchbook,
      href: "/admin/classes",
    },
    {
      label: "Course",
      icon: faBook,
      href: "/admin/courses",
    },
    {
      label: "Settings",
      icon: faGear,
      href: "/admin/settings",
    },
  ],
};
