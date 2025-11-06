import Link from "next/link";

export default function HoverDropdownMenu({ loading, allPage }) {
  return (
    <div className="hover-dpdn-menu">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {allPage.slice(0, 5).map((page) => (
            <li key={page._id}>
              <Link href={`/page/${page.path}`} passHref>
                {page.name.length > 20 ? (page.name).substring(0, 20) + "..." : page.name}
              </Link>
            </li>
          ))}

          {allPage.length > 5 && (
            <li className="view-more">
              <Link href="/all-pages/1" passHref> 
                View More
              </Link>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
