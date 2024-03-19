import { Button } from '@/components/ui/button';
import {
  OrganizationSwitcher,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { Github } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <div className="border-b py-4 bg-gray-50 relative z-10">
      <div className="container flex justify-between items-center">
        <Link href="/">
          <Image src="/logo.png" width="50" height="50" alt="gift" />
        </Link>
        <div className="flex gap-4 items-center">
          <a href="https://github.com/JanBlahout">
            <Button variant="outline">
              <Github className="w-6 h-6" />
            </Button>
          </a>

          <SignedIn>
            <Link href={'/gifts'}>
              <Button variant={'outline'}>Gifts</Button>
            </Link>
          </SignedIn>
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
