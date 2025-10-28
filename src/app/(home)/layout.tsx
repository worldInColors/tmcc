import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchModal from "@/components/SearchModal";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="pb-[71px] md:pb-0">
      <SearchModal />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
