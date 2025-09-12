import type React from "react";
import PageTransition from "./PageTransition";

export default function WithPageTransition(Component: React.ComponentType) {
  return function Wrapped() {
    return (
      <PageTransition>
        <Component />
      </PageTransition>
    );
  };
}
