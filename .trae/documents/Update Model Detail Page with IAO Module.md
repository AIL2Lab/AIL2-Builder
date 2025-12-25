I have successfully updated the `ModelDetail.tsx` component to match your requested design:

1.  **Removed Components**: Removed `MintingCard` and `PayTokenInfo` components.
2.  **Added Components**: Integrated `AgentInfo`, `IaoPool`, `TokenInfoCard`, and `ConversationStarter`.
3.  **Layout Update**:
    *   Implemented a 2-column layout (Left: Agent Info & Chat, Right: IAO Pool & Token Info).
    *   Added responsive behavior for `IaoPool` (shows at top on mobile, right column on desktop).
4.  **Data Logic**:
    *   Adapted the existing `useQuery` data fetching to work with the new components.
    *   Added logic for `iaoTimeRemain` calculation.
    *   Updated imports to point to the correct component locations in `src/app/[locale]/models/detail/[id]/components/`.

The page should now reflect the new design with the IAO module and updated agent details.