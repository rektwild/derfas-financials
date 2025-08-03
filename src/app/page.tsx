"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { ChatInput } from "@/components/chat-page/chat-input"
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

interface Message {
  id: string
  text: string
  isUser: boolean
}

export default function Page() {
  const [messages, setMessages] = useState<Message[]>([])

  const handleSendMessage = (message: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      isUser: true,
    }

    setMessages(prev => [...prev, newMessage])

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Bu bir örnek AI yanıtıdır. Mesajınızı aldım: " + message,
        isUser: false,
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
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
        <div className="flex flex-1 flex-col pt-0 min-h-0">
          {/* Chat Messages Area */}
          <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-y-scroll items-center justify-start p-4" style={{scrollbarGutter: 'stable'}}>
            {messages.length === 0 ? (
              <div className="text-center text-muted-foreground">
                <h2 className="text-2xl font-bold mb-2">AI Asistanınıza Hoş Geldiniz</h2>
                <p>Bir mesaj yazarak sohbete başlayın</p>
              </div>
            ) : (
              <div className="w-full max-w-3xl space-y-4">
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
          <div className="px-4 flex justify-center">
            <ChatInput 
              onSendMessage={handleSendMessage}
              placeholder="Mesajınızı yazın..."
            />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
