import Navbar from "@/components/Navbar";

export default function PagesLayout({ children }) {
  return (
    <div className="flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}
