// src/components/SvgIcons.tsx

import React from "react";

export const SvgIcons = {
  Check: () => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.293 5.293L9 16.586L4.707 12.293L3.293 13.707L9 19.414L21.707 6.707L20.293 5.293Z"
        fill="#4CAF50"
      />
    </svg>
  ),
  Circle: () => (
    <svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#4CAF50" />
    </svg>
  ),
};
