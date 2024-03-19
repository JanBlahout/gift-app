'use client';
import { useOrganization, useUser } from '@clerk/nextjs';
import { useQuery } from 'convex/react';
import Image from 'next/image';
import { Grid3X3Icon, Loader2, Rows3Icon, Table2Icon } from 'lucide-react';

import { useState } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { api } from '../../../convex/_generated/api';
import { SearchBar } from './_components/search-bar';
import { UploadButton } from './_components/upload-button';
import GiftCard from './_components/gift-card';
import { DataTable } from './_components/gift-table';
import { columns } from './_components/columns';

export default function Home() {
  const organization = useOrganization();
  const user = useUser();
  const [filter, setFilter] = useState('');

  let orgId: string | undefined = undefined;
  if (organization.isLoaded && user.isLoaded) {
    orgId = organization.organization?.id ?? user.user?.id;
  }

  const gifts = useQuery(api.gifts.getGifts, orgId ? { orgId } : 'skip');
  const isLoading = gifts === undefined;
  const filteredGifts = gifts?.filter((gift) => {
    return (
      gift.name.toLowerCase().includes(filter.toLocaleLowerCase()) ||
      gift.description?.toLowerCase().includes(filter.toLocaleLowerCase()) ||
      gift.for.toLowerCase().includes(filter.toLocaleLowerCase())
    );
  });

  return (
    <main className="container pt-12">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-bold ">Gifts</h1>
        <SearchBar filter={filter} setFilter={setFilter} />
        <UploadButton />
      </div>

      <Tabs defaultValue="grid">
        <TabsList className="mb-8">
          <TabsTrigger value="grid" className="flex gap-2 items-center">
            <Grid3X3Icon />
            Grid
          </TabsTrigger>
          <TabsTrigger value="table" className="flex gap-2 items-center">
            <Rows3Icon />
            Table
          </TabsTrigger>
        </TabsList>
        <TabsContent value="grid">
          <div className="grid grid-cols-4 gap-4">
            {filteredGifts?.map((gift) => {
              return <GiftCard key={gift._id} gift={gift} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="table">
          {!isLoading && filteredGifts && (
            <DataTable columns={columns} data={filteredGifts} />
          )}
        </TabsContent>
      </Tabs>

      {isLoading && (
        <div className="flex flex-col gap-4 w-full items-center mt-24 text-gray-800 ">
          <Loader2 className="animate-spin w-16 h-16 " />
          <div className="text-2xl">Loading...</div>
        </div>
      )}

      {!isLoading && !filter && gifts?.length === 0 && (
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

      {!isLoading && filter && filteredGifts?.length === 0 && (
        <div className="flex flex-col gap-4 w-full items-center mt-24">
          <Image
            alt="picture of a gift and a woman"
            width="400"
            height="400"
            src="/no_results.svg"
          />
          <h3 className="text-2xl">No gifts found with the filter.</h3>
        </div>
      )}
    </main>
  );
}
