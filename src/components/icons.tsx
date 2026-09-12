type IconProps = Readonly<{ className?: string; title?: string }>;

export function ArrowUpRight({ className, title }: IconProps) {
  return (
    <svg
      aria-hidden={title ? undefined : true}
      className={className}
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      {title ? <title>{title}</title> : null}
      <path d="M5 15 15 5M7 5h8v8" stroke="currentColor" strokeLinecap="round" strokeWidth="1.65" />
    </svg>
  );
}
