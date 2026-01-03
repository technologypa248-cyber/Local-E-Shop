export function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="container flex h-14 items-center justify-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} E-SHOP. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
