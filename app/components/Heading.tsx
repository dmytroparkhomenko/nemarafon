export default function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-10 md:mb-16 text-2xl md:text-4xl">{children}</h2>;
}
