import Link from "next/link";

export function Footer() {
  return (
    <div className="h-40 bg-gray-100 mt-12 flex items-center
    ">
      <div className="container mx-auto lg:flex lg:justify-between items-center
      grid grid-cols-2 justify-center text-center gap-y-4 sm:px-3
      max-w-[99.5%] sm:max-w-[87.5%] mx-auto">
        <div>FileDrive</div>

        <Link className="text-blue-900 hover:text-blue-500" href="/privacy">
          Privacy Policy
        </Link>
        <Link
          className="text-blue-900 hover:text-blue-500"
          href="/terms-of-service"
        >
          Terms of Service
        </Link>
        <Link className="text-blue-900 hover:text-blue-500" href="/about">
          About
        </Link>
      </div>
    </div>
  );
}