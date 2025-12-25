I have resolved the issues regarding the double loading indicators and the missing translation key:

1.  **Fixed Double Loading Indicators**:
    *   In `src/app/[locale]/models/page.tsx`, I modified the condition for the bottom infinite scroll loader.
    *   Previously, it would show whenever `isLoading` was true, causing it to appear simultaneously with the initial page loader (which shows when `isLoading && page === 1`).
    *   I updated the bottom loader condition to `{isLoading && page > 1 && (...)}`. This ensures it only appears when loading subsequent pages, not the initial page.

2.  **Added Missing Translation**:
    *   I identified that the key `Creator.noMoreModels` was missing from the translation files, causing the raw key to be displayed (as seen in your screenshot).
    *   I added `"noMoreModels": "没有更多模型了"` to `messages/zh.json`.
    *   I added `"noMoreModels": "No more models"` to `messages/en.json`.

Now, you should only see one large loading spinner when the page first loads, and a smaller spinner at the bottom only when scrolling down to load more items. The text "Creator.noMoreModels" will now correctly display as "没有更多模型了" (in Chinese).