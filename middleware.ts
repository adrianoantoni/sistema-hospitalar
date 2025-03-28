import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Rotas que requerem autenticação
const protectedRoutes = [
  "/admin/dashboard",
  "/paciente/dashboard",
  "/medico/dashboard",
  "/funcionario/dashboard",
  "/recepcionista/dashboard",
  "/atendente/dashboard",
  "/enfermeira/dashboard",
]

// Rotas específicas para cada tipo de usuário
const adminRoutes = ["/admin/dashboard"]
const doctorRoutes = ["/medico/dashboard"]
const patientRoutes = ["/paciente/dashboard"]
const staffRoutes = ["/funcionario/dashboard"]
const receptionistRoutes = ["/recepcionista/dashboard"]
const attendantRoutes = ["/atendente/dashboard"]
const nurseRoutes = ["/enfermeira/dashboard"]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const authToken = request.cookies.get("authToken")?.value
  const userRole = request.cookies.get("userRole")?.value

  // Verificar se a rota requer autenticação
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Se for uma rota protegida e não houver token de autenticação, redirecionar para o login
  if (isProtectedRoute && !authToken) {
    const loginUrl = new URL("/auth/login", request.url)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Verificar permissões baseadas em papel (role)
  if (authToken && userRole) {
    // Verificar se um usuário está tentando acessar rotas para as quais não tem permissão
    if (userRole === "admin" && !pathname.startsWith("/admin/dashboard")) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
    }

    if (userRole === "doctor" && !pathname.startsWith("/medico/dashboard")) {
      return NextResponse.redirect(new URL("/medico/dashboard", request.url))
    }

    if (userRole === "patient" && !pathname.startsWith("/paciente/dashboard")) {
      return NextResponse.redirect(new URL("/paciente/dashboard", request.url))
    }

    if (userRole === "staff" && !pathname.startsWith("/funcionario/dashboard")) {
      return NextResponse.redirect(new URL("/funcionario/dashboard", request.url))
    }

    if (userRole === "receptionist" && !pathname.startsWith("/recepcionista/dashboard")) {
      return NextResponse.redirect(new URL("/recepcionista/dashboard", request.url))
    }

    if (userRole === "attendant" && !pathname.startsWith("/atendente/dashboard")) {
      return NextResponse.redirect(new URL("/atendente/dashboard", request.url))
    }

    if (userRole === "nurse" && !pathname.startsWith("/enfermeira/dashboard")) {
      return NextResponse.redirect(new URL("/enfermeira/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/paciente/:path*",
    "/medico/:path*",
    "/funcionario/:path*",
    "/recepcionista/:path*",
    "/atendente/:path*",
    "/enfermeira/:path*",
  ],
}

