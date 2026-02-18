import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl">
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-lg font-semibold">Page not found</div>
          <div className="mt-2 text-sm text-zinc-400">
            That route doesn’t exist in this console.
          </div>
          <div className="mt-6">
            <Link to="/">
              <Button>Back to Dashboard</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
