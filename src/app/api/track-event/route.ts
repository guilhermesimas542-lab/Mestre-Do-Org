import { NextRequest, NextResponse } from "next/server";
import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

interface TrackEventBody {
  eventType?: string;
  eventName?: string;
  userIdHash?: string;
  metadata?: Record<string, unknown>;
}

export async function POST(req: NextRequest) {
  try {
    const body: TrackEventBody = await req.json();
    const eventType = body.eventType ?? body.eventName;
    const { userIdHash, metadata } = body;

    if (!eventType) {
      return NextResponse.json(
        { ok: false, error: "eventType é obrigatório" },
        { status: 400 }
      );
    }

    // IP: prefere o primeiro endereço de x-forwarded-for (cliente real por trás de proxy/Vercel)
    const xForwardedFor = req.headers.get("x-forwarded-for");
    const ip = xForwardedFor
      ? xForwardedFor.split(",")[0].trim()
      : (req.headers.get("x-real-ip") ?? null);

    const userAgent = req.headers.get("user-agent") ?? null;

    const event = await prisma.adminEvent.create({
      data: {
        eventType,
        userIdHash: userIdHash ?? null,
        metadata: (metadata ?? undefined) as Prisma.InputJsonValue | undefined,
        ip,
        userAgent,
        createdAt: new Date(),
      },
    });

    return NextResponse.json({ ok: true, eventId: event.id });
  } catch (error) {
    console.error("[track-event] Erro ao salvar evento:", error);
    return NextResponse.json({ ok: false });
  }
}
