import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href={"/"}>
        <h2 className="text-2xl font-extrabold text-white pt-10 pl-20">
          Datacense
        </h2>
      </Link>
    </div>
  );
}
