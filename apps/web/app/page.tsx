import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <h1>SAMBHAV UPSC</h1>

      <p>
        UPSC preparation, practice and AI-assisted answer evaluation.
      </p>

      <div>
        <Link href="/login">Login</Link>
      </div>
    </main>
  );
}
