import { Button } from '@/components/ui/button';
import {
  OrganizationSwitcher,
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

export function Header() {
  return (
    <div className="border-b py-4 bg-gray-50 ">
      <div className="container mx-auto flex justify-between items-center">
        <div>GIFTY</div>
        <div className="flex gap-2">
          <OrganizationSwitcher />
          <UserButton />
          <SignedOut>
            <SignInButton>
              <Button>Sign In</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <SignOutButton>
              <Button>Sign Out</Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
