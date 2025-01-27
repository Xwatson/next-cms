import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        sort: "asc",
      },
    });

    // 将扁平结构转换为树形结构
    const buildTree = (items: any[], parentId: number | null = null): any[] => {
      return items
        .filter((item) => item.parentId === parentId)
        .map((item) => ({
          ...item,
          children: buildTree(items, item.id),
        }))
        .sort((a, b) => a.sort - b.sort);
    };

    const tree = buildTree(categories);

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: tree,
    });
  } catch (error) {
    console.error("获取分类列表失败:", error);
    return NextResponse.json(
      { code: 1, msg: "获取分类列表失败" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      code,
      parentId,
      sort,
      description,
      seoTitle,
      seoKeywords,
      seoDesc,
    } = body;

    const category = await prisma.category.create({
      data: {
        name,
        code,
        parentId,
        sort: sort || 0,
        description,
        seoTitle,
        seoKeywords,
        seoDesc,
      },
    });

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: category,
    });
  } catch (error) {
    console.error("创建分类失败:", error);
    return NextResponse.json({ code: 1, msg: "创建分类失败" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
