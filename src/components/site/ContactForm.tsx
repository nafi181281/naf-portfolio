import { useAnimate } from "framer-motion";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { contactForm, profile } from "@/content/portfolio";
import { Magnetic } from "./Magnetic";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  organization: z.string().trim().max(120),
  services: z.string().trim().max(200),
  message: z.string().trim().min(10, "Please write at least a short message").max(2000),
});

type Field = keyof z.infer<typeof schema>;

/** Builds a ready-to-send email in the visitor's mail app from the form answers. */
export function buildMailto(v: z.infer<typeof schema>) {
  const subject = `New project enquiry from ${v.name}`;
  const body = [
    `Name: ${v.name}`,
    `Email: ${v.email}`,
    v.organization ? `Organization: ${v.organization}` : "",
    v.services ? `Services: ${v.services}` : "",
  ]
    .filter(Boolean)
    .concat("", v.message)
    .join("\n");
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** Numbered question form like the reference contact page, with a round "Send it!" button. */
export function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [sent, setSent] = useState(false);
  const [scope, animate] = useAnimate();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const next: Partial<Record<Field, string>> = {};
      for (const issue of parsed.error.issues) next[issue.path[0] as Field] ??= issue.message;
      setErrors(next);
      setSent(false);
      return;
    }
    setErrors({});
    setSent(true);
    window.location.href = buildMailto(parsed.data);
  };

  return (
    <form onSubmit={submit} noValidate className="relative">
      {contactForm.map((f) => (
        <label key={f.name} className="flex gap-6 border-t border-ink-foreground/20 py-10 md:gap-12">
          <span className="pt-1 text-xs text-ink-foreground/50">{f.n}</span>
          <span className="flex-1">
            <span className="block text-xl md:text-2xl">{f.label}</span>
            {f.type === "textarea" ? (
              <textarea
                name={f.name}
                rows={6}
                placeholder={f.placeholder}
                maxLength={2000}
                className="mt-4 w-full resize-none bg-transparent text-lg outline-none placeholder:text-ink-foreground/40 md:text-xl"
              />
            ) : (
              <input
                name={f.name}
                type={f.type}
                placeholder={f.placeholder}
                maxLength={255}
                className="mt-4 w-full bg-transparent text-lg outline-none placeholder:text-ink-foreground/40 md:text-xl"
              />
            )}
            {errors[f.name] && <span className="mt-3 block text-sm text-destructive">{errors[f.name]}</span>}
          </span>
        </label>
      ))}
      <div className="relative border-t border-ink-foreground/20 pb-28 md:pb-24">
        <div className="absolute right-[8%] top-0 -translate-y-1/2">
          <Magnetic>
            <button
              type="submit"
              onMouseEnter={() => animate(scope.current, { top: ["100%", "-25%"] }, { duration: 0.4, ease: "easeIn" })}
              onMouseLeave={() => animate(scope.current, { top: "-150%" }, { duration: 0.4, ease: "easeOut" })}
              className="relative grid h-36 w-36 place-items-center overflow-hidden rounded-full bg-brand text-lg text-brand-foreground md:h-44 md:w-44"
            >
              <span
                ref={scope}
                aria-hidden
                className="absolute left-1/2 top-full h-[150%] w-[125%] -translate-x-1/2 rounded-[50%] bg-tile-4"
              />
              <span className="relative z-10">Send it!</span>
            </button>
          </Magnetic>
        </div>
        {sent && (
          <p role="status" className="max-w-[55%] pt-8 text-sm text-ink-foreground/70">
            Your email app is opening with the message ready — just press send.
          </p>
        )}
      </div>
    </form>
  );
}
