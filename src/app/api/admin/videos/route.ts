import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Video, VideoCreateInput } from "@/types/video";

// GET 处理器
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("pageSize")) || 10;
  const keyword = searchParams.get("keyword");
  const categoryId = searchParams.get("categoryId");
  const status = searchParams.get("status");

  try {
    const where = {
      ...(keyword
        ? {
            OR: [
              { name: { contains: String(keyword) } },
              { subTitle: { contains: String(keyword) } },
            ],
          }
        : {}),
      ...(categoryId ? { categoryId: Number(categoryId) } : {}),
      ...(status ? { status: Number(status) } : {}),
    };

    const [total, videos] = await Promise.all([
      prisma.video.count({ where }),
      prisma.video.findMany({
        where,
        select: {
          id: true,
          name: true,
          subTitle: true,
          status: true,
          pic: true,
          hits: true,
          score: true,
          timeHits: true,
          category: {
            select: {
              id: true,
              name: true,
              code: true,
            },
          },
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: {
          timeHits: "desc",
        },
      }),
    ]);

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: {
        list: videos,
        pagination: {
          current: page,
          pageSize,
          total,
        },
      },
    });
  } catch (error) {
    console.error("获取视频列表失败:", error);
    return NextResponse.json(
      { code: 1, msg: "获取视频列表失败" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// POST 处理器
export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as Video;

    // 验证必填字段
    if (!data.name || !data.categoryId) {
      return NextResponse.json(
        { code: 1, msg: "视频名称和分类为必填项" },
        { status: 400 }
      );
    }

    // 创建视频
    const video = await prisma.video.create({
      data: {
        ...data,
        timeAdd: Date.now(),
        time: Date.now(),
      },
    });

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: video,
    });
  } catch (error) {
    console.error("创建视频失败:", error);
    return NextResponse.json({ code: 1, msg: "创建视频失败" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// PUT 处理器
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();
    const id = Number(data.id);

    if (!id) {
      return NextResponse.json(
        { code: 1, msg: "视频ID不能为空" },
        { status: 400 }
      );
    }

    // 更新视频
    const video = await prisma.video.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: video,
    });
  } catch (error) {
    console.error("更新视频失败:", error);
    return NextResponse.json({ code: 1, msg: "更新视频失败" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE 处理器
export async function DELETE(req: NextRequest) {
  try {
    const id = Number(req.nextUrl.pathname.split("/").pop());

    if (!id) {
      return NextResponse.json(
        { code: 1, msg: "视频ID不能为空" },
        { status: 400 }
      );
    }

    // 删除视频
    await prisma.video.delete({
      where: { id },
    });

    return NextResponse.json({
      code: 0,
      msg: "success",
      data: null,
    });
  } catch (error) {
    console.error("删除视频失败:", error);
    return NextResponse.json({ code: 1, msg: "删除视频失败" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
