'use client';
import { Button } from '@/components/ui/button';
import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  useSession,
} from '@clerk/nextjs';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export default function Home() {
  const createGift = useMutation(api.gifts.createGift);
  const gifts = useQuery(api.gifts.getGifts);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignedIn>
        <SignOutButton>
          <Button>Sign out</Button>
        </SignOutButton>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal">
          <Button>Sign in</Button>
        </SignInButton>
        <h1>you are not signed in</h1>
      </SignedOut>
      {gifts?.map((gift) => {
        return <div key={gift._id}>{gift.name}</div>;
      })}

      <Button
        onClick={() => {
          createGift({ name: 'my first gift' });
        }}
      >
        Click me
      </Button>
    </main>
  );
}
