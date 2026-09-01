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

export function Mark({ className }: Readonly<{ className?: string }>) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 42 42" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 3v36M3 21h36" stroke="currentColor" strokeWidth="1" />
      <circle cx="21" cy="21" fill="currentColor" r="5" />
      <circle cx="21" cy="21" r="11" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
