// src/components/nav-link.tsx
function NavLink(props) {
  return /* @__PURE__ */ React.createElement("a", { ...props, className: "font-medium text-sm" }, props.children);
}

export {
  NavLink
};
