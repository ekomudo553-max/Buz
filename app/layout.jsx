import "./globals.css";

export const metadata = {
  title: "BizLink",
  description: "Local Business Directory",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
