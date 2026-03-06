import FocusTrainer from "../components/FocusTrainer";

export default function Page() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-chip">Attention Training Interface</div>
        <h1>AI Focus</h1>
        <p className="hero-copy">
          Hold when instructed. Release on command. Stay calm as the sequence
          tightens.
        </p>
      </section>

      <FocusTrainer />
    </main>
  );
}