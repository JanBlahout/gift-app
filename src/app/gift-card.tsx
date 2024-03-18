import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { Doc } from '../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';
import { GiftIcon, MoreVertical, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useToast } from '@/components/ui/use-toast';

type GiftCardProps = {
  gift: Doc<'gifts'>;
};

function GiftCardActions({ gift }: { gift: Doc<'gifts'> }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const deleteGift = useMutation(api.gifts.deleteGift);
  const { toast } = useToast();
  return (
    <>
      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteGift({ giftId: gift._id });

                toast({
                  variant: 'default',
                  title: 'Gift deleted',
                  // description: 'Gift is now available in the list',
                });
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => setIsConfirmOpen(true)}
            className="flex gap-1 items-center text-red-700 cursor-pointer"
          >
            <TrashIcon className="w-4 h-4" /> Delete
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-1 items-center">
            <GiftIcon className="w-4 h-4" /> Mark as bought
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

function GiftCard(props: GiftCardProps) {
  const { gift } = props;
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle>{gift.for}</CardTitle>
        <div className="absolute top-2 right-2">
          <GiftCardActions gift={gift} />
        </div>
        <CardDescription>{gift.price}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="font-bold">{gift.name}</p>
        <p>{gift.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        {gift.url && (
          <a href={gift.url} target="_blank">
            <Button variant={'outline'}>Link</Button>
          </a>
        )}
        <Button>Marked as bought</Button>
      </CardFooter>
    </Card>
  );
}

export default GiftCard;
