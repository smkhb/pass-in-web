// src/components/table/table-cell.tsx
import { twMerge } from "tailwind-merge";
function TableCell(props) {
  return /* @__PURE__ */ React.createElement("td", { ...props, className: twMerge("py-3 px-4 text-sm text-zinc-300", props.className) });
}

export {
  TableCell
};
