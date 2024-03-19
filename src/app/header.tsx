import { Button } from '@/components/ui/button';
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Link from 'next/link';

export function Header() {
  return (
    <div className="border-b py-4 bg-gray-50 relative z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">GIFTY</Link>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </div>
  );
}
