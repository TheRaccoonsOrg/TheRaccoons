import AdminNavigation from '@/components/layout/AdminNavBar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { InterFont } from '@/lib/fonts';
import '@/app/admin.css';
import { Toaster } from '@/components/ui/sonner';
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <body className={`${InterFont.className}  bg-background `}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <AdminNavigation />
        <div className="pt-20 px-4">{children}</div>
        <Toaster className="text-black" />
      </ThemeProvider>
    </body>
  );
};
export default AdminLayout;
