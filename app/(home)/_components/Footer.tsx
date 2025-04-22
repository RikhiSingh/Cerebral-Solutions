import Link from "next/link";
import { BrainCircuitIcon } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <Link
            rel="noreferrer noopener"
            href="/"
            className="font-bold text-xl flex"
          >
            <BrainCircuitIcon className="h-6 w-6 mr-2" />
            Cerebral Solutions
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Rikhi Singh</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/rikhisingh"
              target="_blank"
              className="opacity-60 hover:opacity-100"
            >
              GitHub
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/rikhi-singh"
              target="_blank"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Merrick Pilon</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="https://github.com/MerrickPilon7730"
              target="_blank"
              className="opacity-60 hover:opacity-100"
              >
              GitHub
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="https://www.linkedin.com/in/merrick-pilon/"
              target="_blank"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>
        </div><div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Harsh</h3>
          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              target="_blank"
              className="opacity-60 hover:opacity-100"
            >
              GitHub
            </a>
          </div>

          <div>
            <a
              rel="noreferrer noopener"
              href="#"
              target="_blank"
              className="opacity-60 hover:opacity-100"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="container pb-14 text-center">
        <h3>
          &copy; 2025 Cerebral Solutions -{" "}
          <a
            rel="noreferrer noopener"
            target="_blank"
            href="https://www.linkedin.com/in/rikhi-singh"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            RIKHI SINGH🫡
          </a>
        </h3>
      </section>
    </footer>
  );
};
