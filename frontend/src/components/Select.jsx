export default function Select(props) {
  return (
    <select
      {...props}
      className="
        bg-zinc-900
        border
        border-zinc-700
        rounded-xl
        px-4
        py-3
        text-white
        outline-none
        focus:border-blue-500
      "
    />
  );
}