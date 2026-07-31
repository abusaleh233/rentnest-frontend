'use client';

import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { House, Menu, LayoutDashboard, LogOut, User, LogIn, } from "lucide-react";
import { Avatar, AvatarFallback, } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, } from "@/components/ui/sheet";

export default function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get("token"));
    setRole(Cookies.get("role") || "");
  }, []);

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl shadow-md">

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <House className="text-indigo-600" />
          <span className="text-2xl font-bold">
            Rent<span className="text-indigo-600">Nest</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/">Home</Link>
          <Link href="/properties">Properties</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">

          {!isLoggedIn ? (
            <>
              <Button
                asChild
                className="rounded-xl border border-indigo-600 bg-white px-5 py-2 font-semibold text-indigo-600 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-600 hover:text-white hover:shadow-lg"
              >
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>

              <Button
                asChild
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:from-indigo-700 hover:to-violet-700 hover:shadow-xl"
              >
                <Link href="/register">
                  <User className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>

              <DropdownMenuTrigger asChild>
                <Avatar className="h-11 w-11 cursor-pointer border-2 border-indigo-500 shadow-md transition-all hover:scale-105 hover:shadow-lg">
                  <AvatarFallback className="bg-indigo-600 text-base font-bold text-white">
                    SA
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                className="w-56 rounded-xl border bg-white p-2 shadow-xl"
              >

                <DropdownMenuItem asChild>
                  <Link
                    href={
                      role === "ADMIN"
                        ? "/dashboard/admin"
                        : role === "OWNER"
                          ? "/dashboard/owner"
                          : "/dashboard/user"
                    }
                    className="flex w-full items-center gap-3 rounded-lg bg-slate-100 px-3 py-2 font-medium transition hover:bg-indigo-600 hover:text-white"
                  >
                    <LayoutDashboard className="h-5 w-5" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="my-2" />

                <DropdownMenuItem
                  onClick={logout}
                  className="flex cursor-pointer items-center gap-3 rounded-lg bg-red-50 px-3 py-2 font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
                >
                  <LogOut className="h-5 w-5" />
                  Logout
                </DropdownMenuItem>

              </DropdownMenuContent>

            </DropdownMenu>
          )}

        </div>

        {/* Mobile Menu */}
        <Sheet>

          <SheetTrigger asChild>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu />
            </Button>

          </SheetTrigger>

          <SheetContent side="right">

            <div className="mt-8 flex flex-col gap-5">

              <Link href="/">Home</Link>
              <Link href="/properties">Properties</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Contact</Link>

            </div>

          </SheetContent>

        </Sheet>

      </div>

    </header>
  );
}