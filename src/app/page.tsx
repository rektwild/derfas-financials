"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Send } from "lucide-react"

interface Message {
  id: string
  text: string
  isUser: boolean
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
    }

    setMessages(prev => [...prev, newMessage])
    setInputValue("")

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Bu bir örnek AI yanıtıdır. Mesajınızı aldım: " + inputValue,
        isUser: false,
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    AI Agent Chatbot
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Sohbet</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {/* Chat Messages Area */}
          <div className="flex-1 flex flex-col justify-center items-center">
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <h2 className="text-2xl font-bold mb-2">AI Asistanınıza Hoş Geldiniz</h2>
                <p>Bir mesaj yazarak sohbete başlayın</p>
              </div>
            ) : (
              <div className="w-full max-w-2xl space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg px-4 py-2 ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Fixed Input Area */}
          <div className="bg-muted/50 rounded-xl p-4">
            <div className="max-w-2xl mx-auto flex gap-2">
              <Input
                placeholder="Mesajınızı yazın..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
