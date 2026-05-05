import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Moon, Sun, Menu } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

export function Navbar() {
    const navigate = useNavigate()

    const user = true;

    const [theme, setTheme] = React.useState("light")

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light"
        setTheme(newTheme)
        document.documentElement.classList.toggle("dark")
    }

    const handleLogout = () => {
        console.log("Logout clicked")
    }

    const NavLinks = () => (
        <div className="flex flex-col gap-4">


            {!user ? (
                <>
                    <Button onClick={() => navigate("/login")}>Login</Button>
                    <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                </>
            ) : (
                <>
                    <Button variant="ghost" onClick={() => navigate("/my-learning")}>
                        My Learning
                    </Button>
                    <Button variant="ghost" onClick={() => navigate("/profile")}>
                        Profile
                    </Button>
                    <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                        Dashboard
                    </Button>
                    <Button onClick={handleLogout} className="text-red-500">
                        Logout
                    </Button>
                </>
            )}
        </div>
    )

    return (
        <nav className="border-b bg-white dark:bg-gray-900 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-2">
                    <div className="text-2xl">🎓</div>
                    <Link to="/" className="font-bold text-lg">
                        E-Learning
                    </Link>
                </div>

                {/* RIGHT (DESKTOP) */}
                <div className="hidden md:flex items-center gap-3">



                    {!user ? (
                        <>
                            <Button onClick={() => navigate("/login")}>Login</Button>
                            <Button onClick={() => navigate("/signup")}>Sign Up</Button>
                        </>
                    ) : (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>

                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => navigate("/my-learning")}>
                                    My Learning
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/profile")}>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                                    Dashboard
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={handleLogout}>
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}


                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
                    </Button>

                </div>

                {/* MOBILE HAMBURGER */}
                <div className="md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu />
                            </Button>
                        </SheetTrigger>

                        <SheetContent side="right" className="w-72">
                            <NavLinks />
                        </SheetContent>
                    </Sheet>
                </div>

            </div>
        </nav>
    )
}