"use client"

import { useCallback, useMemo, useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { PanelRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Page() {
  const [isRightOpen, setIsRightOpen] = useState(false)
  const toggleRight = useCallback(() => setIsRightOpen((v) => !v), [])

  const symbols = useMemo(
    () => ["XU100", "XU030", "THYAO", "AKBNK", "SISE", "BIMAS"],
    []
  )
  const [favoriteSet, setFavoriteSet] = useState<Set<string>>(new Set())
  const toggleFavorite = useCallback((sym: string) => {
    setFavoriteSet((prev) => {
      const next = new Set(prev)
      if (next.has(sym)) next.delete(sym)
      else next.add(sym)
      return next
    })
  }, [])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset
        style={
          isRightOpen
            ? {
                right: `calc(2rem + 8px)`, // 32px icon + padding
              }
            : { right: "0" }
        }
        className="transition-[margin-left,right] duration-300 ease-in-out"
      >
        <header className="flex h-16 shrink-0 items-center gap-2 justify-between">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
          </div>
          <div className="flex items-center gap-2 px-4">
            <Separator
              orientation="vertical"
              className="ml-2 data-[orientation=vertical]:h-4"
            />
            <Button
              variant="ghost"
              size="icon"
              className="size-7 -mr-1"
              onClick={toggleRight}
              aria-pressed={isRightOpen}
              aria-label="Toggle right panel"
            >
              <PanelRight />
              <span className="sr-only">Panel</span>
            </Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col pt-0 min-h-0">
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="w-full max-w-md space-y-4">
              <div className="text-center">
                <h1 
                  className="text-3xl font-bold mb-2" 
                  style={{ 
                    fontFamily: 'var(--font-geist-sans)', 
                    fontSize: '1.875rem', 
                    lineHeight: '2.25rem', 
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    color: 'var(--foreground)'
                  }}
                >
                  Hisse Analizi
                </h1>
                <p className="text-muted-foreground mb-6">Hisse senedi kodunu girin</p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Hisse kodu girin (örn: THYAO, AKBNK)"
                  className="w-full px-4 py-3 border border-input bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>

      {/* Right Inset-like Sidebar */}
      <div
        data-slot="sidebar-inset-right"
        aria-hidden={!isRightOpen}
        className={`fixed inset-y-0 right-0 z-10 hidden md:flex h-svh w-fit transform transition-transform duration-300 ease-in-out p-2 pl-0 ${
          isRightOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-sidebar text-sidebar-foreground flex flex-col h-full w-fit py-2">
          <ul className="flex flex-col gap-1 items-center">
            {symbols.map((sym) => {
              const isFav = favoriteSet.has(sym)
              return (
                <li key={sym}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-8"
                    onClick={() => toggleFavorite(sym)}
                    title={sym}
                    aria-label={sym}
                  >
                    <Star
                      className={isFav ? "text-yellow-500" : "text-muted-foreground"}
                      {...(isFav ? { fill: "currentColor" } : {})}
                    />
                  </Button>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </SidebarProvider>
  )
}
