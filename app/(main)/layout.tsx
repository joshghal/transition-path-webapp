import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Floating Navbar */}
      <Navbar />

      <main>{children}</main>

      {/* Footer - hidden on search page */}
      <Footer />
    </div>
  );
}
