import { MapPin, Mail, Phone } from "lucide-react";

type InfoProps = {
  label: string;
  value?: string | number | undefined;
  icon?: React.ReactNode;
};

export function Info({ label, value, icon }: InfoProps) {
  return (
    <div className="flex items-start gap-3 py-2">
      <div className="mt-0.5 text-gray-600">{icon}</div>

      <div>
        <p className="text-xs text-gray-500">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value ?? "—"}</p>
      </div>
    </div>
  );
}
