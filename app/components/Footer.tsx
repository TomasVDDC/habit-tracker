import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex gap-6 flex-wrap items-center justify-center row-start-2 mb-16">
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://github.com/TomasVDDC/habit-tracker"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/code_icon.svg"
          alt="Code icon"
          width={16}
          height={16}
        />
        See the code
      </a>
    </footer>
  );
} 