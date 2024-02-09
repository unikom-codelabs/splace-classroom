export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Splace Classroom",
	navMenuItems: [
		{
			label: "Dashboard",
			href: "/",
			icon: 'ic:round-home',
		},
	],
	navMenuItemsInstructor: [
		{
			label: "Dashboard",
			href: "/",
			icon: 'ic:round-home',
		},
		{
			label: "Quiz",
			href: "/quiz",
			icon: "carbon:task-tools",
		},
		
	],
	navMenuItemsAdmin: [
	{
			label: "Dashboard",
			href: "/",
			icon: 'ic:round-home',
		},
    {
      label: 'Users',
      icon: "fa6-solid:users",
      href: '/admin/users',
    },
    {
      label: 'Class',
      icon: 'mingcute:black-board-fill',
      href: '/admin/classes',
    },
    {
      label: 'Course',
      icon: 'fluent:book-24-filled',
      href: '/admin/courses',
		},
	],

};
