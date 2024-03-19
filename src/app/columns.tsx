'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Doc } from '../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Doc<'gifts'>>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'for',
    header: 'for',
  },
  {
    header: 'URL',
    cell: ({ row }) => {
      if (row.original.url)
        return (
          <a href={row.original.url} target="_blank">
            <Button variant="outline">Link</Button>
          </a>
        );
      return <p>No link</p>;
    },
  },
];
