export default function StatCard({
  title,
  value,
}) {
  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        p-6
      "
    >
      <p className="text-zinc-400">
        {title}
      </p>

      <h2
        className="
          text-4xl
          font-bold
          mt-2
          text-white
        "
      >
        {value}
      </h2>
    </div>
  );
}