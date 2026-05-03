import { Leaf, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Header = () => {
  return (
    <header className="sticky flex w-full shrink-0 justify-between items-center py-md">
      <h1 className="text-primary text-lg font-semibold leading-none inline-flex items-center">
        <span className="inline-flex items-center gap-2">
          <Leaf className="size-5 shrink-0 text-primary" />
          Mindful Moments
        </span>
      </h1>
      <span className="inline-flex items-center gap-2 font-semibold leading-none">
        <Button variant="icon" size="icon">
          <Settings className="size-5 shrink-0 text-primary" />
        </Button>
      </span>
    </header>
  );
};
