import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { ok: false, reason: "not_authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const fbp = typeof body.fbp === "string" ? body.fbp : "";
    const fbc = typeof body.fbc === "string" ? body.fbc : "";

    await prisma.user.update({
      where: { email: session.user.email },
      data: { fbp: fbp || null, fbc: fbc || null },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[save-meta-ids] Erro ao salvar fbp/fbc:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
