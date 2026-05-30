export default function DataTable({
  columns,
  data,
  renderActions,
}) {
  return (
    <div
      className="
        bg-zinc-900
        border
        border-zinc-800
        rounded-2xl
        overflow-hidden
      "
    >
      <table className="w-full">

        <thead
          className="
            bg-zinc-800
            text-zinc-300
          "
        >
          <tr>

            {columns.map((col) => (
              <th
                key={col}
                className="
                  text-left
                  p-4
                "
              >
                {col}
              </th>
            ))}

            {renderActions && (
              <th className="p-4">
                Ações
              </th>
            )}

          </tr>
        </thead>

        <tbody>

          {data.map((row) => (
            <tr
              key={row.id}
              className="
                border-t
                border-zinc-800
                hover:bg-zinc-800/40
              "
            >

              {columns.map((col) => (
                <td
                  key={col}
                  className="
                    p-4
                    text-zinc-200
                  "
                >
                  {row[col]}
                </td>
              ))}

              {renderActions && (
                <td className="p-4">
                  <div className="flex gap-2">
                    {renderActions(row)}
                  </div>
                </td>
              )}

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}