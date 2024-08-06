// htb/src/app/api/components/route.ts
import { type NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';
import { getServerAuthSession } from '../../../server/auth';
import { z } from 'zod';

const prisma = new PrismaClient();

// Define a Zod schema for input validation
const ComponentRequestSchema = z.object({
  name: z.string(),
  categories: z.array(z.string()),
  description: z.string().optional(),
  tags: z.array(z.string()),
  code: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerAuthSession();

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id;
    if (typeof userId !== 'string') {
      throw new Error('Invalid user ID');
    }

    const rawBody = await req.json() as unknown;

    // Validate and parse the input
    const body = ComponentRequestSchema.parse(rawBody);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    const newComponent = await prisma.component.create({
      data: {
        name: body.name,
        categories: body.categories,
        description: body.description,
        tags: body.tags,
        code: body.code,
        createdById: userId,
      },
    });

    return NextResponse.json(newComponent, { status: 201 });
  } catch (error) {
    console.error('Error creating component:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input', details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        return NextResponse.json(
          { error: 'Foreign key constraint failed on the field: `Component_createdById_fkey`' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json({ error: 'Error creating component' }, { status: 500 });
  }
}
