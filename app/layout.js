import "./globals.css";

export const metadata = {
  title: "Psych Exam Review",
  description: "Flashcards for Psychology exam - History, Perspectives & Research Methods",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
