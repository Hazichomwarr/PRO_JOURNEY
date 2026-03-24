// app/Page.tsx

import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Container,
  Stack,
} from "@/components/ui";

export default function Page() {
  return (
    <main className="p-10 max-w-xl mx-auto">
      {/* day-2: Button */}
      <Button>Primary</Button>

      <Button variant="secondary">Secondary</Button>

      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>

      {/* day-3: Card */}
      <Card>
        <CardHeader>Leadership Training</CardHeader>

        <CardContent>
          Programs designed to empower women through education and mentorship.
        </CardContent>

        <CardFooter>
          <Button variant="primary">Learn more</Button>
        </CardFooter>
      </Card>

      {/* day-4: Container */}
      <section className="py-16">
        <Container>
          <h2>Title</h2>
        </Container>
      </section>

      {/* day-5: Stack */}
      <section>
        <Container>
          <Stack gap={6} className="max-w-xl">
            <h2>Title</h2>
            <p>Supporting text.</p>
            <Button variant="primary">CTA</Button>
          </Stack>
        </Container>
      </section>
    </main>
  );
}
