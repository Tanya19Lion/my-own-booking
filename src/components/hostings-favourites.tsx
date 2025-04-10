
model Favorite {
    id         Int      @id @default(autoincrement())
    user       User     @relation(fields: [userId], references: [id])
    userId     Int
    hosting    Hosting  @relation(fields: [hostingId], references: [id])
    hostingId  Int
  
    @@unique([userId, hostingId]) // Prevent duplicates
  }

  async function toggleFavorite(userId: number, hostingId: number) {
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_hostingId: { userId, hostingId },
      },
    });
  
    if (existing) {
      await prisma.favorite.delete({
        where: { id: existing.id },
      });
    } else {
      await prisma.favorite.create({
        data: {
          userId,
          hostingId,
        },
      });
    }
  }
  

  //Create the Server Action
  // app/actions/favorite.ts
'use server';

import { prisma } from '@/lib/prisma'; // or wherever your Prisma client is
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth'; // or your custom session config

export async function toggleFavorite(hostingId: number) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  const existing = await prisma.favorite.findUnique({
    where: {
      userId_hostingId: { userId, hostingId },
    },
  });

  if (existing) {
    await prisma.favorite.delete({
      where: { id: existing.id },
    });
  } else {
    await prisma.favorite.create({
      data: { userId, hostingId },
    });
  }

  // Optionally return updated favorite count or status
}

//Use the Action in Your Component
'use client';

import { toggleFavorite } from '@/app/actions/favorite';
import { useTransition } from 'react';
import { Heart } from 'lucide-react';

export function FavoriteButton({ hostingId, isFavorited }: { hostingId: number; isFavorited: boolean }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      onClick={() => {
        startTransition(() => {
          toggleFavorite(hostingId);
        });
      }}
      className="absolute top-4 right-4 z-10"
      disabled={isPending}
    >
      <Heart
        className={`h-6 w-6 transition-all ${
          isFavorited ? 'fill-red-500 stroke-red-500' : 'stroke-white'
        } ${isPending ? 'opacity-50' : ''}`}
      />
    </button>
  );
}

//Update the Hosting Card Props
const isFavorited = hosting.favorites?.some(fav => fav.userId === currentUser.id);

<FavoriteButton hostingId={hosting.id} isFavorited={isFavorited} />
