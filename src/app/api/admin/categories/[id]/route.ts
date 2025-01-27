import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
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

    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
        code,
        parentId,
        sort,
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
    console.error("更新分类失败:", error);
    return NextResponse.json({ code: 1, msg: "更新分类失败" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);

    // 检查是否有子分类
    const hasChildren = await prisma.category.findFirst({
      where: { parentId: id },
    });

    if (hasChildren) {
      return NextResponse.json(
        { code: 1, msg: "该分类下有子分类，无法删除" },
        { status: 400 }
      );
    }

    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      code: 0,
      msg: "success",
    });
  } catch (error) {
    console.error("删除分类失败:", error);
    return NextResponse.json({ code: 1, msg: "删除分类失败" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
