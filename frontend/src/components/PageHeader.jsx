export default function PageHeader({
  title,
}) {
  return (
    <div className="mb-6">

      <h1
        className="
          text-4xl
          font-bold
          text-white
          mb-2
        "
      >
        {title}
      </h1>

      <div
        className="
          h-[1px]
          bg-zinc-800
        "
      />

    </div>
  );
}