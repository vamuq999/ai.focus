import FocusOrb from "../components/FocusOrb";

export default function Page() {
  return (
    <main className="page">
      <h1>AI Focus</h1>

      <p className="subtitle">
        Measure the stability of your attention.
      </p>

      <FocusOrb />
    </main>
  );
}