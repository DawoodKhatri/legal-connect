import { getUrl } from "@/utils/storage";
import { NextResponse } from "next/server";

export const GET = async (req, { params: { path } }) => {
  const downloadUrl = await getUrl(path.join("/"));
  return NextResponse.redirect(downloadUrl);
};
