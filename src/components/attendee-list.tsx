import { Search, MoreHorizontal, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from "lucide-react"
import { IconButton } from "./icon-button"
import { Table } from "./table/table"
import { TableHeader } from "./table/table-header"
import { TableCell } from "./table/table-cell"
import { TableRow } from "./table-row"
import { useEffect, useState } from "react"
import 'dayjs/locale/pt-br'
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"

dayjs.extend(relativeTime).locale('pt-br')

interface Attendee {
  id: string
  name: string
  email: string
  createAt: string
  checkInAt: string | null
}

export function Attendee() {

  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())
    
    if (url.searchParams.has('search')) {
      return url.searchParams.get('search') ?? ''
    } 
    return ''
  })
  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())
    
    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    } 
    return 1
  })
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [totalAttendees, setTotalAttendees] = useState(1)
  
  const totalPages = Math.ceil(totalAttendees / 10)

  useEffect(() => {
    const url = new URL(`${import.meta.env.VITE_API_URL}/events/${import.meta.env.VITE_EVENT_ID}/attendees`)
    
    url.searchParams.set('pageIndex', String((page - 1)))

    if(search.length > 0){
      url.searchParams.set('query', search)
    }

    fetch(url, {
      headers: {'x-api-key': import.meta.env.VITE_API_KEY || ''}
    })
    .then((response) => response.json())
    .then((data) => {
      setAttendees(data.attendees)
      setTotalAttendees(data.total)
      setIsLoading(false)
    })
  }, [page, search])

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())
    
    url.searchParams.set('page', String(1))
    url.searchParams.set('search', search)

    window.history.pushState({}, '', url)
    setSearch(search)
    setIsLoading(true)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())
    
    url.searchParams.set('page', String(page))

    window.history.pushState({}, '', url)
    setPage(page)
    setIsLoading(true)
  }

  function onSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setPage(1)
  }
  
  function nextPage() {
    setCurrentPage(page + 1)
  }
  function lastPage() {
    setCurrentPage(totalPages)
  }
  function previousPage() {
    setCurrentPage(page - 1)
  }
  function firstPage() {
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-3 items-center ">
      <h1 className="text-2xl font-bold">Participantes</h1>
      <div className="px-3 w-72 py-1.5 border border-white/10 rounded-lg flex items-center gap-3">
        <Search className="size-4 text-emerald-300"/>
        <input 
          onChange={onSearchChange}
          value={search}
          className="bg-transparent flex-1 outline-none border-0 p-0 text-sm focus:ring-0" 
          placeholder="Buscar participante..." 
        />
      </div>
      </div>

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
          {isLoading 
          ? Array.from({length: 10}).map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <input type="checkbox" className="size-4 bg-black/20 rounded border border-white/5" />
              </TableCell>
              <TableCell className="text-zinc-400">Carregando...</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1  ">
                  <span className="font-semibold text-zinc-400">Carregando...</span>
                  <span className="text-zinc-400">Carregando...</span>
                </div>
              </TableCell>
              <TableCell className="text-zinc-400">Carregando...</TableCell>
              <TableCell className="text-zinc-400">Carregando...</TableCell>
              <TableCell>
                <IconButton disabled={page === 1}>
                  <MoreHorizontal className="size-4"/>
                </IconButton>
              </TableCell>
            </TableRow>
          ))
          : attendees.map((attendee) =>{
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
              <TableCell>{dayjs().to(attendee.createAt)}</TableCell>
              <TableCell>
                {attendee.checkInAt === null 
                  ? <span className="text-zinc-400">Não fez check-in</span> 
                  : dayjs().to(attendee.checkInAt)
                }
              </TableCell>
              <TableCell>
                <IconButton transparent>
                  <MoreHorizontal className="size-4"/>
                </IconButton>
              </TableCell>
            </TableRow>
            )
          })
          }
        </tbody>
        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {totalAttendees} participantes
            </TableCell>
            <TableCell className="text-right" colSpan={3}>
              <div className="inline-flex items-center gap-8">
                <span>Página {page} de {(totalPages)}</span>
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
