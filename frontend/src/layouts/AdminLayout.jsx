import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: "20px",
          background: "#f5f5f5",
        }}
      >
        {children}
      </main>
    </div>
  );
}