import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
  return (
    <nav className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 dark:border-gray-700 dark:bg-gray-800 sm:rounded-b-lg">
      {links.map((link) => (
        <Link
          preserveScroll
          key={link.label}
          href={link.url || " "}
          className={
            "inline-block py-2 px-3 rounded-lg text-gray-200 text-xs " +
            (link.active ? "bg-gray-900 " : "bg-gray-800 ") +
            " hover:bg-gray-700 " +
            (link.url ? "cursor-pointer" : "cursor-not-allowed")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}
