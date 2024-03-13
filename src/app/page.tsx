'use client';
import { Button } from '@/components/ui/button';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const organization = useOrganization();
  const user = useUser();

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const gifts = useQuery(api.gifts.getGifts, orgId ? { orgId } : 'skip');
  const createGift = useMutation(api.gifts.createGift);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {gifts?.map((gift) => {
        return <div key={gift._id}>{gift.name}</div>;
      })}

      <Button
        onClick={() => {
          if (!orgId) return;
          createGift({ name: 'my first gift', orgId });
        }}
      >
        Click me
      </Button>
    </main>
  );
}
