import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { $plugins } from "@/lib/plugins";
import { useStore } from "@nanostores/react";

export default function Home() {
  const plugins = useStore($plugins);
  return (
    <div className="flex flex-col items-center w-full pt-16">
      <h1 className="font-bold text-5xl">Bunker </h1>

      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {plugins.map((plugin, index) => {
          if (!plugin.tile) return;
          if (plugin.disabled) return;
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{plugin.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <plugin.tile />
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
