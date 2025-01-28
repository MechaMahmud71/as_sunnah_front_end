"use-client"

import { Button } from "@/components/ui/Button";
import { Role } from "@/util/enum/role.enum";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {

  const [userRole, setUserRole] = useState<string | null>(null); // Default to null
  const router = useRouter();

  useEffect(() => {
    const role = Cookies.get("role") as string;
    setUserRole(role); // Set role after hydration
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("userName");
    Cookies.remove("role");
    Cookies.remove("userId");
    router.push("/auth/login");
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="text-xl font-bold">
          {
            userRole === Role.USER ? (
              <Link href="/donation" >Donation System</Link>
            ) : (<p>Donation System</p>)
          }
        </div>
        <div className="flex items-center">
          {userRole === Role.USER && <Link className="mr-3 p-2 bg-blue-500 rounded" href="/donation/user">Your Donation </Link>}
          <Button onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}
