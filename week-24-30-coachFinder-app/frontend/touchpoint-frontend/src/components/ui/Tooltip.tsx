interface Props {
  text: string;
}
export default function Tooltip({ text }: Props) {
  return (
    <span className="absolute left-1/2 -translate-x-1/2 -bottom-8 bg-gray-800 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap">
      {text}
    </span>
  );
}
