import prismaDb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    const { name, billboardId, icon } = body;

    if (!name) {
      return new NextResponse("Name is required.", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard ID is required.", { status: 400 });
    }
    if (!icon) {
      return new NextResponse("Icon is required.", { status: 400 });
    }

    const storeByUserId = await prismaDb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("UnAuthorization", { status: 405 });
    }

    const category = await prismaDb.category.create({
      data: {
        name,
        billboardId,
        storeId: params.storeId,
        icon,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log(`[CATEGORIES_POST]`, error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse("Store ID is required.", { status: 400 });
    }

    const categories = await prismaDb.category.findMany({
      where: {
        storeId: params.storeId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("[CATEGORIES_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
