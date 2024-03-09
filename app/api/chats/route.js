import { connectDB } from "@/config/database";
import { USER_ROLES } from "@/constants/userRoles";
import Chat from "@/models/chat";
import Client from "@/models/client";
import ServiceProvider from "@/models/serviceProvider";
import checkAuth from "@/utils/checkAuth";
import { errorResponse, successResponse } from "@/utils/sendResponse";

export const GET = async (req) => {
  try {
    const { _id: userId, role } = await checkAuth(req);
    if (!userId || !role) return errorResponse(403, "Please login first!");

    await connectDB();

    let user;
    if (role === "client")
      user = await Client.findById(userId).populate({
        path: "chats",
        populate: {
          path: "client serviceProvider",
          select: "name email profilePicture",
        },
      });
    if (role === "serviceProvider")
      user = await ServiceProvider.findById(userId).populate({
        path: "chats",
        populate: {
          path: "client serviceProvider",
          select: "name email profilePicture",
        },
      });

    if (!user) return errorResponse(403, "Account not found");

    const chats = user.chats.map((chat) => {
      let otherUser;
      if (role === USER_ROLES.client) otherUser = chat.serviceProvider;
      if (role === USER_ROLES.serviceProvider) otherUser = chat.client;

      otherUser = otherUser.toObject();
      otherUser = {
        _id: otherUser._id,
        name: otherUser.name,
        email: otherUser.email,
        profilePicture: otherUser.profilePicture
          ? `/api/file/${otherUser.profilePicture}`
          : undefined,
      };

      return {
        _id: chat._id,
        user: otherUser,
      };
    });

    return successResponse(200, "Chats", { chats });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const POST = async (req) => {
  try {
    const { _id: clientId, role } = await checkAuth(req);
    if (!clientId || !role) return errorResponse(403, "Please login first!");
    if (role !== USER_ROLES.client)
      return errorResponse(403, "Unauthorized to Initiate Chat");

    const { serviceProviderId } = await req.json();
    if (!serviceProviderId)
      return errorResponse(403, "Please select a Service Provider");

    await connectDB();

    const client = await Client.findById(clientId).populate("chats");
    if (!client) return errorResponse(403, "Account not found");

    const serviceProvider = await ServiceProvider.findById(
      serviceProviderId
    ).populate("chats");
    if (!serviceProvider)
      return errorResponse(403, "Service Provider not found");

    if (
      client.chats.find(
        (chat) => chat.serviceProvider.toString() === serviceProviderId
      )
    )
      return errorResponse(409, "Chat already exists");

    const chat = await Chat.create({
      client: clientId,
      serviceProvider: serviceProviderId,
    });

    client.chats.push(chat._id);
    await client.save();

    serviceProvider.chats.push(chat._id);
    await serviceProvider.save();

    return successResponse(201, "Chat created", { chatId: chat._id });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
