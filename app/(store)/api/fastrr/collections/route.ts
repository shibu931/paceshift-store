import { toFastrrCollection } from "@/features/category/dto/category.mapper";
import categoryService from "@/features/category/service/category.service";
import { NextRequest } from "next/server";


export async function GET(
  request: NextRequest
) {
  try {
    const searchParams =
      request.nextUrl.searchParams;

    const pageParam =
      Number(
        searchParams.get("page") || "1"
      );

    const limitParam =
      Number(
        searchParams.get("limit") || "100"
      );

    const page = Math.max(
      1,
      pageParam
    );

    const limit = Math.min(
      100,
      Math.max(
        1,
        limitParam
      )
    );

    const result =
      await categoryService.getFastrrCollections(
        page,
        limit
      );

    return Response.json({
      data: {
        total:
          result.total,

        collections:
          result.categories.map(
            toFastrrCollection
          ),
      },
    });
  } catch (error) {
    console.error(
      "Fastrr collections API error:",
      error
    );

    return Response.json(
      {
        error:
          "Failed to fetch collections",
      },
      {
        status: 500,
      }
    );
  }
}