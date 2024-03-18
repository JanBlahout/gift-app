'use client';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UploadButton } from './upload-button';
import GiftCard from './gift-card';

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  // const generateUploadUrl = useMutation(api.gifts.generateUploadUrl);

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const gifts = useQuery(api.gifts.getGifts, orgId ? { orgId } : 'skip');

  return (
    <main className="container pt-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold ">Gifts</h1>
        <UploadButton />
      </div>

      <div className="grid grid-cols-4 gap-4">
        {gifts?.map((gift) => {
          return <GiftCard key={gift._id} gift={gift} />;
        })}
      </div>
    </main>
  );
}
