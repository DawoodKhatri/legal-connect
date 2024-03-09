import { connectDB } from "@/config/database";
import Chat from "@/models/chat";
import Client from "@/models/client";
import Message from "@/models/message";
import ServiceProvider from "@/models/serviceProvider";
import checkAuth from "@/utils/checkAuth";
import { errorResponse, successResponse } from "@/utils/sendResponse";
import uploadDocument from "@/utils/uploadDocument";

export const GET = async (req, { params: { chatId } }) => {
  try {
    const { _id: userId, role } = await checkAuth(req);
    if (!userId || !role) return errorResponse(403, "Please login first!");

    await connectDB();

    let user;
    if (role === "client") user = await Client.findById(userId);
    if (role === "serviceProvider")
      user = await ServiceProvider.findById(userId);

    if (!user) return errorResponse(403, "Account not found");

    if (!user.chats.includes(chatId))
      return errorResponse(403, "Unauthorized to access this chat");

    const chat = await Chat.findById(chatId).populate([
      {
        path: "client serviceProvider",
        select: "name email profilePicture",
      },
      { path: "messages", populate: { path: "document" } },
    ]);

    const otherUser = role === "client" ? chat.serviceProvider : chat.client;

    let arrangedMessages = chat.messages.map(
      ({ sender, content, document, time }) => ({
        type: sender === role ? "sent" : "received",
        content,
        ...(document
          ? {
              document: {
                name: document.name,
                path: `/api/file/${document.path}`,
                size: document.size,
              },
            }
          : {}),
        time,
      })
    );

    return successResponse(200, "Chat", {
      chat: { _id: chat._id, user: otherUser, messages: arrangedMessages },
    });
  } catch (error) {
    return errorResponse(500, error.message);
  }
};

export const PUT = async (req, { params: { chatId } }) => {
  try {
    const { _id: userId, role } = await checkAuth(req);
    if (!userId || !role) return errorResponse(403, "Please login first!");

    await connectDB();

    let user;
    if (role === "client") user = await Client.findById(userId);
    if (role === "serviceProvider")
      user = await ServiceProvider.findById(userId);

    if (!user) return errorResponse(403, "Account not found");

    if (!user.chats.includes(chatId))
      return errorResponse(403, "Unauthorized to access this chat");

    const chat = await Chat.findById(chatId);
    if (!chat) return errorResponse(404, "Chat not found");

    const form = Object.fromEntries(await req.formData());

    const { content, document } = form;

    if (!content && !document)
      return errorResponse(400, "Message or document is required");

    const message = await Message.create({
      sender: role,
    });

    if (document) {
      const messageDocument = await uploadDocument(
        document.name,
        document,
        `Chat-Documents/${chatId}`
      );

      message.document = messageDocument;
    }
    if (content) {
      message.content = content;
    }
    await message.save();

    chat.messages.push(message._id);
    await chat.save();

    return successResponse(201, "Message sent");
  } catch (error) {
    return errorResponse(500, error.message);
  }
};
