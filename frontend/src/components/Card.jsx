export default function Card({
  title,
  value,
}) {
  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        p-6
        rounded-2xl
        shadow-lg
        min-w-[220px]
      "
    >
      <h3
        className="
          text-zinc-400
          text-sm
          mb-2
        "
      >
        {title}
      </h3>

      <h1
        className="
          text-3xl
          font-bold
          text-white
        "
      >
        {value}
      </h1>
    </div>
  );
}