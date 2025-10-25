import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");

  if (!code) {
    return NextResponse.redirect(new URL("/login?error=missing_code", req.url));
  }

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      code,
      client_id: process.env.Client_Id!,
      client_secret: process.env.Client_Secret!,
      redirect_uri: "http://localhost:3000/api/auth/google",
      grant_type: "authorization_code",
    }),
  });

  if (!tokenRes.ok) {
    return NextResponse.redirect(
      new URL("/login?error=token_exchange_failed", req.url)
    );
  }

  const { access_token, id_token } = await tokenRes.json();

  const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!userRes.ok) {
    return NextResponse.redirect(
      new URL("/login?error=userinfo_failed", req.url)
    );
  }

  const user = await userRes.json();
  console.log("===============Now i need user==============");
  console.log(user);

  //   // Set cookie with ID token (or session token)
  //   cookies().set("token", id_token, {
  //     httpOnly: true,
  //     path: "/",
  //     maxAge: 60 * 60 * 24 * 7, // 1 week
  //   });

  return NextResponse.redirect(new URL("/dashboard", req.url));
}
