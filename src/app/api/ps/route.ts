// app/api/ps/route.ts
import { NextResponse } from "next/server";
import { problemsData, ProblemStatement } from "@/data/ps";

export const dynamic = "force-dynamic";

interface PSResponse {
  released: boolean;
  releaseAt?: string;
  problemStatements?: ProblemStatement[];
}

const PS_RELEASE = new Date("2026-02-25T10:00:00+05:30");

export async function GET(): Promise<NextResponse<PSResponse>> {
  const now = new Date();

  if (now < PS_RELEASE) {
    return NextResponse.json({
      released: false,
      releaseAt: PS_RELEASE.toISOString(),
    });
  }

  return NextResponse.json({
    released: true,
    problemStatements: problemsData,
  });
}
