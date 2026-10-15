import "./promotion.css";
import { lazy, Suspense, useEffect, useState } from "react";
import LiveMotion from "./LiveMotion";

const DesktopPage = lazy(() => import("./generated/DesktopPage"));
const TabletPage = lazy(() => import("./generated/TabletPage"));
const MobilePage = lazy(() => import("./generated/MobilePage"));

type Viewport = "mobile" | "tablet" | "desktop";

function getViewport(): Viewport {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1200) return "tablet";
  return "desktop";
}

export default function App() {
  const [viewport, setViewport] = useState<Viewport>(getViewport);

  useEffect(() => {
    const updateViewport = () => setViewport(getViewport());
    window.addEventListener("resize", updateViewport);
    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  return (
    <Suspense fallback={<div className="min-h-dvh bg-white" />}>
      <LiveMotion key={viewport}>
        {viewport === "mobile" && <MobilePage />}
        {viewport === "tablet" && <TabletPage />}
        {viewport === "desktop" && <DesktopPage />}
      </LiveMotion>
    </Suspense>
  );
}
