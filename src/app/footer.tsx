import Link from 'next/link';

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center">
      <div className="container flex justify-between items-center">
        <div>Gifty</div>
        <Link
          className="text-blue-400 hover:text-blue-700 transition-all"
          href="/privacy"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-blue-400 hover:text-blue-700 transition-all"
          href="/privacy"
        >
          Privacy Policy
        </Link>
        <Link
          className="text-blue-400 hover:text-blue-700 transition-all"
          href="/privacy"
        >
          Privacy Policy
        </Link>
      </div>
    </div>
  );
}
