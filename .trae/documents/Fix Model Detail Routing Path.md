I have corrected the routing path as per your request:

1.  **Updated `ModelTable.tsx`**: Changed the link destination from `/models/${model.id}` to `/models/detail/${model.id}`.
2.  **Updated `ModelCard.tsx`**: Changed the link destination from `/models/${model.id}` to `/models/detail/${model.id}`.

This ensures that clicking "View Details" (查看详情) now navigates to the correct URL structure (e.g., `http://localhost:3000/zh/models/detail/c4e8f371...`).