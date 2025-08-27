interface GreeterProps {
  person: string;
}

export default function Greeter({ person }: GreeterProps) {
  return <h1 className="text-lg text-orange-600">Hello {person}!!!</h1>;
}
