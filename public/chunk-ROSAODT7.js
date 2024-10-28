import {
  TableRow
} from "./chunk-4FYINQIP.js";
import {
  TableCell
} from "./chunk-ORINVLXP.js";
import {
  TableHeader
} from "./chunk-OQ7SN2VT.js";
import {
  Table
} from "./chunk-WOSC3RRG.js";
import {
  IconButton
} from "./chunk-YALIX3EV.js";

// src/components/attendee-list.tsx
import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react";
import { useEffect, useState } from "react";
import "dayjs/locale/pt-br";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime).locale("pt-br");
function Attendee() {
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("search")) {
      return url.searchParams.get("search") ?? "";
    }
    return "";
  });
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString());
    if (url.searchParams.has("page")) {
      return Number(url.searchParams.get("page"));
    }
    return 1;
  });
  const [attendees, setAttendees] = useState([]);
  const [totalAttendees, setTotalAttendees] = useState(1);
  const totalPages = Math.ceil(totalAttendees / 10);
  useEffect(() => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/events/${import.meta.env.VITE_EVENT_ID}/attendees`);
    url.searchParams.set("pageIndex", String(page - 1));
    if (search.length > 0) {
      url.searchParams.set("query", search);
    }
    fetch(url, {
      headers: { "x-api-key": import.meta.env.VITE_API_KEY || "" }
    }).then((response) => response.json()).then((data) => {
      setAttendees(data.attendees);
      setTotalAttendees(data.total);
      setIsLoading(false);
    });
  }, [page, search]);
  function setCurrentSearch(search2) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(1));
    url.searchParams.set("search", search2);
    window.history.pushState({}, "", url);
    setSearch(search2);
  }
  function setCurrentPage(page2) {
    const url = new URL(window.location.toString());
    url.searchParams.set("page", String(page2));
    window.history.pushState({}, "", url);
    setPage(page2);
  }
  function onSearchChange(event) {
    setCurrentSearch(event.target.value);
    setPage(1);
  }
  function nextPage() {
    setCurrentPage(page + 1);
  }
  function lastPage() {
    setCurrentPage(totalPages);
  }
  function previousPage() {
    setCurrentPage(page - 1);
  }
  function firstPage() {
    setCurrentPage(1);
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex gap-3 items-center " }, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-bold" }, "Participantes"), /* @__PURE__ */ React.createElement("div", { className: "px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Search, { className: "size-4 text-emerald-300" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      onChange: onSearchChange,
      value: search,
      className: "bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0",
      placeholder: "Buscar participante..."
    }
  ))), /* @__PURE__ */ React.createElement(Table, null, /* @__PURE__ */ React.createElement("thead", null, /* @__PURE__ */ React.createElement("tr", { className: "border-b border-white/10" }, /* @__PURE__ */ React.createElement(TableHeader, { style: { width: 48 } }, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "size-4 bg-black/20 rounded border border-white/10" })), /* @__PURE__ */ React.createElement(TableHeader, null, "C\xF3digo"), /* @__PURE__ */ React.createElement(TableHeader, null, "Participante"), /* @__PURE__ */ React.createElement(TableHeader, null, "Data de inscri\xE7\xE3o"), /* @__PURE__ */ React.createElement(TableHeader, null, "Data do check-in"), /* @__PURE__ */ React.createElement(TableHeader, { style: { width: 64 } }))), /* @__PURE__ */ React.createElement("tbody", null, isLoading ? Array.from({ length: 10 }).map((_, index) => /* @__PURE__ */ React.createElement(TableRow, { key: index }, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "size-4 bg-black/20 rounded border border-white/5" })), /* @__PURE__ */ React.createElement(TableCell, { className: "text-zinc-400" }, "Carregando..."), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-1  " }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-zinc-400" }, "Carregando..."), /* @__PURE__ */ React.createElement("span", { className: "text-zinc-400" }, "Carregando..."))), /* @__PURE__ */ React.createElement(TableCell, { className: "text-zinc-400" }, "Carregando..."), /* @__PURE__ */ React.createElement(TableCell, { className: "text-zinc-400" }, "Carregando..."), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(IconButton, { disabled: page === 1 }, /* @__PURE__ */ React.createElement(MoreHorizontal, { className: "size-4" }))))) : attendees.map((attendee) => {
    return /* @__PURE__ */ React.createElement(TableRow, { key: attendee.id }, /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("input", { type: "checkbox", className: "size-4 bg-black/20 rounded border border-white/5" })), /* @__PURE__ */ React.createElement(TableCell, null, attendee.id), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-1  " }, /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-white" }, attendee.name), /* @__PURE__ */ React.createElement("span", null, attendee.email))), /* @__PURE__ */ React.createElement(TableCell, null, dayjs().to(attendee.createAt)), /* @__PURE__ */ React.createElement(TableCell, null, attendee.checkInAt === null ? /* @__PURE__ */ React.createElement("span", { className: "text-zinc-400" }, "N\xE3o fez check-in") : dayjs().to(attendee.checkInAt)), /* @__PURE__ */ React.createElement(TableCell, null, /* @__PURE__ */ React.createElement(IconButton, { transparent: true }, /* @__PURE__ */ React.createElement(MoreHorizontal, { className: "size-4" }))));
  })), /* @__PURE__ */ React.createElement("tfoot", null, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement(TableCell, { colSpan: 3 }, "Mostrando ", attendees.length, " de ", totalAttendees, " participantes"), /* @__PURE__ */ React.createElement(TableCell, { className: "text-right", colSpan: 3 }, /* @__PURE__ */ React.createElement("div", { className: "inline-flex items-center gap-8" }, /* @__PURE__ */ React.createElement("span", null, "P\xE1gina ", page, " de ", totalPages), /* @__PURE__ */ React.createElement("div", { className: "flex gap-1.5" }, /* @__PURE__ */ React.createElement(IconButton, { onClick: firstPage, disabled: page === 1 }, /* @__PURE__ */ React.createElement(ChevronsLeft, { className: "size-4" })), /* @__PURE__ */ React.createElement(IconButton, { onClick: previousPage, disabled: page === 1 }, /* @__PURE__ */ React.createElement(ChevronLeft, { className: "size-4" })), /* @__PURE__ */ React.createElement(IconButton, { onClick: nextPage, disabled: page === totalPages }, /* @__PURE__ */ React.createElement(ChevronRight, { className: "size-4" })), /* @__PURE__ */ React.createElement(IconButton, { onClick: lastPage, disabled: page === totalPages }, /* @__PURE__ */ React.createElement(ChevronsRight, { className: "size-4" })))))))));
}

export {
  Attendee
};
