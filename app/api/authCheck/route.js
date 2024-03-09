import { USER_ROLES } from "@/constants/userRoles";
import Admin from "@/models/admin";
import Client from "@/models/client";
import ServiceProvider from "@/models/serviceProvider";
import checkAuth from "@/utils/checkAuth";
import { errorResponse, successResponse } from "@/utils/sendResponse";
export const GET = async (req) => {
  try {
    const { _id: userId, role } = await checkAuth(req);
    if (!userId || !role) return errorResponse(403, "Logged out");

    let user;

    if (role === USER_ROLES.admin) user = await Admin.findById(userId);
    if (role === USER_ROLES.serviceProvider)
      user = await ServiceProvider.findById(userId);
    if (role === USER_ROLES.client) user = await Client.findById(userId);

    if (!user) {
      const response = errorResponse(403, "Logged out");
      response.cookies.delete("token");
      return response;
    }

    if (user.profilePicture)
      user.profilePicture = `/api/file/${user.profilePicture}`;

    return successResponse(200, "Logged in", { user: { ...user._doc, role } });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
