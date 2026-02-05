import "./globals.css";

export const metadata = {
  title: "Psych Exam Review",
  description: "Flashcards for Psychology exam - History, Perspectives & Research Methods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
