import { useCallback, useEffect } from "react";
import { useDemoWidget } from "@/config/demoWidgetState";

/** Shared client-page integration: select the correct agent and expose a CTA. */
export function useClientDemoWidget(industry: string) {
  const openWidget = useDemoWidget((state) => state.openWidget);

  const openClientWidget = useCallback(() => {
    openWidget(industry);
  }, [industry, openWidget]);

  useEffect(() => {
    openClientWidget();
    window.scrollTo(0, 0);
  }, [openClientWidget]);

  return openClientWidget;
}
