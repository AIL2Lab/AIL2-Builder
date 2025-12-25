I have corrected the `Countdown` component imports in the following files:

1.  **IaoActiveView.tsx**: Changed `import { Countdown } from "../ui-custom/countdown"` to `import { Countdown } from "@/components/ui/countdown"`.
2.  **IaoEndedView.tsx**: Changed `import { Countdown } from "@/components/ui-custom/countdown"` to `import { Countdown } from "@/components/ui/countdown"`.

These changes ensure that the `Countdown` component is correctly imported from its actual location at `/home/dayu/DBC/AIL2-Builder/src/components/ui/countdown.tsx`.