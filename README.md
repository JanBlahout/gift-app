# Perfect Present

Perfect Present is an application developed using Next.js, Tailwind CSS, Shadcn, Convex, Clerk, and TypeScript. It serves as a platform for creating gift lists, organizing them within families or organizations, adding members, and sharing gift ideas across them.

### Try it out [HERE- Pefrect Present](https://perfectpresent.vercel.app/)

## Features

- **Gift Lists**: Create and manage gift lists for various occasions.
- **Organization Management**: Organize gift lists within families or organizations.
- **Member Management**: Add and manage members within organizations, facilitating collaboration on gift lists.
- **Sharing**: Share gift lists and ideas across organization members.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn](https://github.com/shadcn)
- [Convex](https://www.convex.dev/)
- [Clerk](https://clerk.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

Clone the repository:

```bash
git clone <repository_url>
cd gift-app
npm install
npm run dev
npx convex dev
```

Create Clerk and Convex accounts, fill in the .env.local

```bash
CONVEX_DEPLOYMENT=dev:your-convex-domain
NEXT_PUBLIC_CONVEX_URL=https://your-convex-domain.convex.cloud
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YOURKEY
CLERK_SECRET_KEY=sk_test_SECRET_KEY
CLERK_DOMAIN=https://yourodmain.clerk.accounts.dev
```
