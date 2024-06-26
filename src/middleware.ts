import { NextRequest, NextResponse } from "next/server";
import admin from "./lib/firebase/firebaseAdmin";

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const authData = request.cookies.get("auth");
  if (authData) {
    const authValues = JSON.parse(String(authData.value));

    // Acceder a las propiedades del objeto auth
    const isAuthenticated = authValues.isAuthenticated;
    const token = authValues.token;

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const isTokenValid = decodedToken.exp > Date.now() / 1000;

    if (isAuthenticated && isTokenValid) {
      return NextResponse.next();
    } else {
      url.pathname = "/admin/iniciar-sesion";
      return NextResponse.redirect(url);
    }
  } else {
    url.pathname = "/admin/iniciar-sesion";
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/admin",
    "/admin/clientes",
    "/admin/productos",
    "/admin/clientes/:path*",
    "/admin/canjear-puntos",
    "/admin/cargar-puntos",
  ],
};
