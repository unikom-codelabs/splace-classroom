"use client";
import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarBrand,
	NavbarItem,
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import { SearchIcon} from "@/components/icons";
import { useContext, useEffect } from "react";
import { MenuContext } from "@/app/context/MenuContext";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown,DropdownItem, DropdownMenu,DropdownTrigger,Avatar,AvatarIcon } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { User } from "@/types";
export const Header = () => {
	const router = useRouter()
	const { toggle  } = useContext(MenuContext);
	const { data: session } = useSession();
  const userData = session?.user as User
	const path = usePathname();
	const handleSignOut = () =>{
		signOut()
	}

	return (
		<NextUINavbar disableAnimation isBordered maxWidth="full" position="sticky" className="h-[10vh] z-30 bg-white">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<FontAwesomeIcon icon={faBars} onClick={toggle} className="fa-lg"/>
				<NavbarBrand as="li" className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<p className="font-bold text-inherit">{siteConfig.name}</p>
					</NextLink>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent as="div" justify="end">
				{/* <ThemeSwitch /> */}
				{session == null ? (
					<NavbarItem className="flex gap-3">
						<Button
							as={Link}
							href="/auth/login"
							variant="flat"
							radius="sm"
							className="bg-dark-blue text-white font-bold"
						>
							Login
						</Button>
					</NavbarItem>
				):(
					<Dropdown placement="bottom-end">
						<DropdownTrigger>
							<Avatar
								isBordered
								as="button"
								color="primary"
								size="sm"
								icon={<AvatarIcon/>}
								classNames={{
									base: "bg-gradient-to-br from-[#00acdf] to-[#7879FF]",
									icon: "text-black/80",
								}}
							/>
						</DropdownTrigger>
						<DropdownMenu aria-label="Profile Actions" variant="flat">
							<DropdownItem textValue="Action list" key="profile" className="h-14 gap-2">
								<p className="font-semibold">Signed in as</p>
								<p className="font-semibold">{userData?.username}</p>
							</DropdownItem>
							<DropdownItem key="logout" color="danger" onClick={handleSignOut}>
								Log Out
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				)}
      </NavbarContent>
		</NextUINavbar>
	);
};
