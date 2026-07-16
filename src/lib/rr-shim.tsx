// Shim for react-router-dom → @tanstack/react-router
// Only implements what the imported components need.
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { Link as TanstackLink, useRouterState } from "@tanstack/react-router";

type LinkProps = {
  to: string;
  children?: ReactNode;
  className?: string;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { to, children, ...rest },
  ref,
) {
  // Preserve hash-only or in-page anchor links using a native <a>
  if (to.startsWith("#") || to.includes("#")) {
    return (
      <a ref={ref} href={to} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <TanstackLink ref={ref} to={to as never} {...rest}>
      {children}
    </TanstackLink>
  );
});

export const NavLink = Link;

export function useLocation() {
  const location = useRouterState({ select: (s) => s.location });
  return location;
}

export function useNavigate() {
  return (to: string) => {
    if (typeof window !== "undefined") window.location.href = to;
  };
}
