import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taxwise | เครื่องคำนวณภาษี",
  description: "วางแผนภาษีเงินได้บุคคลธรรมดาแบบขั้นบันได",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
