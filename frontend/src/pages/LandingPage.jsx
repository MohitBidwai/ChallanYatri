import { useEffect, useState } from 'react'
import { CircleCheck, CircleX, LoaderCircle } from 'lucide-react'
import api from '../api/axios'

export default function LandingPage() {
  const [connection, setConnection] = useState('checking')

  useEffect(() => {
    let isMounted = true

    api.get('/health')
      .then(() => isMounted && setConnection('connected'))
      .catch(() => isMounted && setConnection('unavailable'))

    return () => {
      isMounted = false
    }
  }, [])

  const status = {
    checking: {
      icon: <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />,
      label: 'Checking backend connection…',
      classes: 'bg-blue-50 text-blue-800',
    },
    connected: {
      icon: <CircleCheck className="size-5" aria-hidden="true" />,
      label: 'Backend connection verified',
      classes: 'bg-emerald-50 text-emerald-800',
    },
    unavailable: {
      icon: <CircleX className="size-5" aria-hidden="true" />,
      label: 'Backend is unavailable. Start it on localhost:8080.',
      classes: 'bg-amber-50 text-amber-900',
    },
  }[connection]

  return (
    <main className="mx-auto flex min-h-screen max-w-md items-center px-6 py-12">
      <section className="w-full rounded-xl border border-emerald-950/10 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold tracking-wide text-[#0D5E47]">CHALLANYATRI</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#17332a]">Project initialization complete</h1>
        <p className="mt-4 text-base leading-7 text-slate-700">
          The frontend and backend are ready for the approved next development phase.
        </p>
        <p className="mt-5 text-sm leading-6 text-slate-600">
          Independent prototype · Not an official government service
        </p>
        <div className={`mt-8 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium ${status.classes}`} role="status">
          {status.icon}
          <span>{status.label}</span>
        </div>
      </section>
    </main>
  )
}
