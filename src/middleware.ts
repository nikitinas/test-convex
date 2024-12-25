import {
    convexAuthNextjsMiddleware,
} from "@convex-dev/auth/nextjs/server";
import { NextResponse } from "next/server";

console.log("middleware");
export default convexAuthNextjsMiddleware((request) => {
    console.log("### middleware", request.url);
    return NextResponse.next();
}, {
    verbose: true,
    cookieConfig: { maxAge: 60 * 60 * 5 } // 5 minutes
});

export const config = {
    // The following matcher runs middleware on all routes
    // except static assets.
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};