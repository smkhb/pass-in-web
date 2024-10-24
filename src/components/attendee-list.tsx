import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table-row"
import { useState } from "react"
import { attendees } from "../data/attendees"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import 'dayjs/locale/pt-br'

dayjs.extend(relativeTime).locale('pt-br')

export function Attendee() {
  
  const [search, setSearch] = useState('') 
  function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value)
  }
  
  const totalPages = attendees.length / 10
  const [page, setPage] = useState(1)
  function nextPage() {
    setPage(page + 1)
    if (page >= totalPages) {
      setPage(totalPages)
    }
  }
  function lastPage() {
    setPage(totalPages)
  }
  function previousPage() {
    setPage(page - 1)
    if (page <= 1) {
      setPage(1)
    }
  }
  function firstPage() {
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center ">
      <h1 className="text-2xl font-bold">Participantes</h1>
      <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
        <Search className="size-4 text-emerald-300"/>
        <input onChange={onSearchChange} className="bg-transparent flex-1 outline-none border-0 p-0 text-sm" placeholder="Buscar participante..." />
      </div>
      </div>
      {search}

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/10" />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>
        <tbody>
          {attendees.slice((page - 1)* 10, page * 10).map((attendee) =>{
            return ( 
            <TableRow key={attendee.id} >
              <TableCell>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/5" />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1  ">
                  <span className="font-semibold text-white">{attendee.name}</span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>{dayjs().to(attendee.createdAt)}</TableCell>
              <TableCell>{dayjs().to(attendee.checkedInAt)}</TableCell>
              <TableCell>
                <IconButton transparent>
                  <MoreHorizontal className="size-4"/>
                </IconButton>
              </TableCell>
            </TableRow>
            )
          })}
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando 10 de {totalPages} participantes
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>Página {page} de {Math.ceil(totalPages)}</span>
                <div className="flex gap-1.5">
                  <IconButton onClick={firstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4"/>
                  </IconButton>
                  <IconButton onClick={previousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4"/>
                  </IconButton>
                  <IconButton onClick={nextPage} disabled={page === totalPages}>
                    <ChevronRight className="size-4"/>
                  </IconButton>
                  <IconButton onClick={lastPage} disabled={page === totalPages}>
                    <ChevronsRight className="size-4"/>
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}