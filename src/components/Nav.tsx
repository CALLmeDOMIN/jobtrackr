import { Menu } from "lucide-react";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import AuthButton from "./auth/AuthButton.server";
import AvatarComponent from "./AvatarComponent";

const Nav = () => {
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
            <Link href={"/interviews"}>Interviews</Link>
            <Link href={"/applications"}>Applications</Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Nav;
