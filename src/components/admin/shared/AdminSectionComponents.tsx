import { type ReactNode } from 'react';
import { Eye } from 'lucide-react';

/** Card with a title and a small "appears on: X page" hint */
export const SectionCard = ({
  title,
  page,
  hint,
  children,
}: {
  title: string;
  page: string;
  hint?: string;
  children: ReactNode;
}) => (
  <div className="admin-card space-y-4">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 border-b border-border pb-3">
      <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full w-fit">
        <Eye className="w-3 h-3" />
        <span>Appears on: <strong className="text-foreground">{page}</strong></span>
      </div>
    </div>
    {hint && (
      <p className="text-xs text-muted-foreground bg-accent/5 border border-accent/20 rounded-lg px-3 py-2">
        💡 {hint}
      </p>
    )}
    {children}
  </div>
);

export const Field = ({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) => (
  <div>
    <label className="form-label">{label}</label>
    {hint && <p className="text-xs text-muted-foreground mb-1">{hint}</p>}
    {children}
  </div>
);
