import { Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import AuthButton from "./auth/AuthButton.server";
import AvatarComponent from "./AvatarComponent";

const Nav = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link href={"/"}>
        <h1 className="font-bold">
          Job
          <span className="text-blue-700">T</span>
          rackr
        </h1>
      </Link>
      <div className="hidden items-center space-x-4 md:flex">
        <Link href={"/interviews"}>Interviews</Link>
        <Link href={"/applications"}>Applications</Link>
        <Link href={"/profile"}>
          <AvatarComponent />
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
            <SheetClose asChild>
              <Link href={"/interviews"}>Interviews</Link>
            </SheetClose>
            <SheetClose asChild>
              <Link href={"/applications"}>Applications</Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Nav;
