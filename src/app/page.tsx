'use client';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { UploadButton } from './upload-button';
import GiftCard from './gift-card';
import Image from 'next/image';

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
      {gifts && gifts?.length === 0 && (
        <div className="flex flex-col gap-4 w-full items-center mt-24">
          <Image
            alt="picture of a gift and a woman"
            width="400"
            height="400"
            src="/no_gifts.svg"
          />
          <h3 className="text-2xl">There are no gifts on the wishlist 😥</h3>
          <UploadButton />
        </div>
      )}

      {gifts && gifts.length > 0 && (
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold ">Gifts</h1>
          <UploadButton />
        </div>
      )}
      <div className="grid grid-cols-4 gap-4">
        {gifts?.map((gift) => {
          return <GiftCard key={gift._id} gift={gift} />;
        })}
      </div>
    </main>
  );
}
