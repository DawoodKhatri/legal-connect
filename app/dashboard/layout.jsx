"use client";
import { AuthContext, CommonContext } from "@/providers/contextProvider";
import { useContext, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { USER_ROLES } from "@/constants/userRoles";

const UserDashboardLayout = ({ children }) => {
  const { isUserLoggedIn } = useContext(CommonContext);
  const { userDetails } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (isUserLoggedIn === true && userDetails?.role !== USER_ROLES.admin) {
      pathname === "/dashboard" && router.push("/dashboard/profile");
    } else if (isUserLoggedIn === false) {
      router.replace("/login");
    }
  }, [isUserLoggedIn, userDetails]);
  return children;
};

export default UserDashboardLayout;
