import { connectDB } from "@/config/database";
import { VERIFICATION_STATUS } from "@/constants/verificationStatus";
import Client from "@/models/client";
import ServiceProvider from "@/models/serviceProvider";
import checkAuth from "@/utils/checkAuth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const clientId = await checkAuth(req);
    if (!clientId) return errorResponse(403, "Please login first");

    await connectDB();

    let client = await Client.findById(clientId);
    if (!client) return errorResponse(403, "Account not found");

    let serviceProviders = await ServiceProvider.find({
      "verificationStatus.status": VERIFICATION_STATUS.Verified,
    });

    serviceProviders = serviceProviders.map(
      ({ name, skills, experience, profilePicture }) => ({
        name,
        skills,
        experience,
        profilePicture: `/api/file/${profilePicture}`,
      })
    );

    return successResponse(200, "Service Providers", { serviceProviders });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
