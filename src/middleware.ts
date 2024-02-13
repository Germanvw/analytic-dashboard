import { NextRequest, NextResponse } from "next/server";
import { analytics } from "./utils/analtytics";
import { ActionEnum } from "./types/actionEnum.types";

export default async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname === "/") {
    try {
      analytics.track(ActionEnum.HomepageVisited, {
        page: req.nextUrl.pathname,
        country: req.geo?.country,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return NextResponse.next();
}

export const matcher = {
  matchet: ["/"],
};
