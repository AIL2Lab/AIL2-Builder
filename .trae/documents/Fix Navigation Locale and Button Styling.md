I have addressed your feedback regarding the navigation and styling issues:

1.  **Internationalization (i18n) Support**:
    *   Replaced the standard `<a>` tags with the `Link` component from `@/i18n/navigation` in both `ModelTable.tsx` (desktop view) and `ModelCard.tsx` (mobile view).
    *   This ensures that when navigating to the detail page, the current language locale (e.g., `/en`, `/zh`) is preserved in the URL.

2.  **Styling Fixes**:
    *   In `ModelTable.tsx`, I updated the action column container to use `flex justify-center` instead of relying on `text-center` and `inline-block`. This provides more reliable centering for the button.
    *   Removed `inline-block` and `w-full` from the button link itself to let it size naturally based on padding and content, while maintaining the correct button appearance.
    *   Verified `ModelCard.tsx` styles to ensure the button is correctly positioned in the flex header.

These changes should resolve the issue where the language was lost during navigation and improve the visual alignment of the "View Details" button.