import Link from "next/link";

export default function HomePage() {
  return (
    <main className="landing-page">
      <section className="landing-card">
        <span className="eyebrow">UPSC Preparation Platform</span>
        <h1>SAMBHAV UPSC</h1>
        <p>Practice PYQs, write Mains answers and build your preparation workflow in one place.</p>
        <div className="actions">
          <Link href="/login" className="button">Login</Link>
          <Link href="/register" className="button secondary">Create account</Link>
        </div>
      </section>
    </main>
  );
}
