import { Menu } from "lucide-react";
import Link from "next/link";

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
      <button>
        <Menu />
      </button>
    </div>
  );
};

export default Nav;
