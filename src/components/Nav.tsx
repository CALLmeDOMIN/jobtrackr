import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { auth } from "@/auth";
import AuthButton from "./auth/AuthButton.server";

const Nav = async () => {
  const session = await auth();

  return (
    <div className="flex justify-between p-4 items-center">
      <Link href={"/"}>
        <h1 className="font-bold">
          Job
          <span className="text-blue-700">T</span>
          rackr
        </h1>
      </Link>
      <div className="md:flex items-center space-x-4 hidden">
        <Link href={"/interviews"}>Interviews</Link>
        <Link href={"/applications"}>Applications</Link>
        <Link href={"/profile"}>
          {session?.user?.image ? (
            <Avatar>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>{session?.user?.name}</AvatarFallback>
            </Avatar>
          ) : (
            <p> Hello, {session?.user?.name} </p>
          )}
        </Link>
        <AuthButton />
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <button className="md:hidden">
            <Menu />
          </button>
        </SheetTrigger>
        <SheetContent>
          <div className="flex flex-col items-center space-y-4 pt-10">
            <Link href={"/interviews"}>Interviews</Link>
            <Link href={"/applications"}>Applications</Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Nav;
