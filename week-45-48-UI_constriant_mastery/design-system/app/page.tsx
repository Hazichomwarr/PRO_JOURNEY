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
    <main>
      {/* day-6: Feature Section only with primitives */}
      <section className="py-16 bg-neutral-50">
        <Container>
          <Stack gap={12}>
            {/* Header */}
            <Stack gap={4} className="max-w-2xl">
              <h2 className="text-3xl font-bold text-neutral-900">
                Our Programs
              </h2>
              <p className="text-neutral-700">Discover how we empower women.</p>
            </Stack>

            {/* Cards */}
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>Leadership</CardHeader>
                <CardContent>Training programs for future leaders.</CardContent>
                <CardFooter>
                  <Button variant="outline">Learn more</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>Festival</CardHeader>
                <CardContent>Annual cultural celebration.</CardContent>
                <CardFooter>
                  <Button variant="outline">Learn more</Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>Resources</CardHeader>
                <CardContent>Tools and mentorship access.</CardContent>
                <CardFooter>
                  <Button variant="outline">Learn more</Button>
                </CardFooter>
              </Card>
            </div>
          </Stack>
        </Container>
      </section>
    </main>
  );
}
