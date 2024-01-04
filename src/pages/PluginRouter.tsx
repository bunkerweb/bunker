import { Plugin } from "@/lib/pluginloader";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function PluginRouter({ loadedPlugins } : { loadedPlugins: Plugin[]}) {
  const [selectedPlugin, setSelectedPlugin] = useState(null)
  const { plugin } = useParams()
  return <div>{selectedPlugin}</div>
}