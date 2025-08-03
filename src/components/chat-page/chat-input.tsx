"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, Plus, Wrench, Settings, Palette, Globe, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function ChatInput({ 
  onSendMessage, 
  placeholder = "Herhangi bir şey sor",
  disabled = false 
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [selectedModel, setSelectedModel] = useState("gpt-4");
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-3xl mx-auto">
      <div className="keyboard-open:fixed keyboard-open:bottom-[var(--screen-keyboard-height,0)] keyboard-open:start-3 keyboard-open:end-3 keyboard-open:z-50 keyboard-open:w-auto keyboard-open:-translate-y-2 
                      bg-white dark:bg-[#303030] flex w-full flex-col items-center justify-center overflow-clip bg-clip-padding 
                      shadow-lg rounded-[28px] border border-black/10 dark:border-white/10">
      
      {/* Main container */}
      <div className="relative flex w-full items-end px-3 py-3">
        <div className="relative flex w-full flex-auto flex-col">
          
          {/* Simplified text input area */}
          <div className="relative w-full">
            <div className="text-black dark:text-white max-h-[25dvh] max-h-52 overflow-auto [scrollbar-width:thin] min-h-12 pb-12">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={placeholder}
                disabled={disabled}
                className="text-black dark:text-white placeholder:text-black/50 dark:placeholder:text-white/50 
                          block w-full resize-none border-0 bg-transparent px-3 py-3 ring-0 
                          focus:outline-none text-[15px] font-medium leading-[1.4] tracking-[0.01em] antialiased
                          min-h-[48px] max-h-[200px] disabled:opacity-50"
                name="prompt-textarea"
                data-virtualkeyboard="true"
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = target.scrollHeight + 'px';
                }}
                onKeyDown={handleKeyDown}
                rows={1}
              />
            </div>
          </div>
        </div>

        {/* Action buttons overlay */}
        <div className="absolute left-3 right-3 bottom-3 z-10 flex items-center">
          <div className="w-full">
            <div className="flex items-center justify-between">
              
              {/* Left side action buttons */}
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  className="p-0 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 
                            transition-all duration-200 w-9 h-9 flex items-center justify-center cursor-pointer"
                  aria-label="Fotoğraf ve dosya ekle"
                >
                  <Plus className="w-10 h-10" strokeWidth="1.5" />
                </Button>

                {/* Separator */}
                <div className="h-4 w-px bg-black/20 dark:bg-white/20"></div>

                {/* Tools Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="p-0 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-black dark:text-white hover:text-black/80 dark:hover:text-white/80 
                                transition-all duration-200 w-9 h-9 flex items-center justify-center cursor-pointer"
                      aria-label="Araçlar"
                    >
                      <Wrench className="w-6 h-6" strokeWidth="2.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    className="z-50 max-w-xs rounded-2xl popover bg-white dark:bg-[#353535] shadow-long will-change-[opacity,transform] 
                              py-1.5 max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto select-none"
                    align="start"
                  >
                    <div className="__menu-label px-3 py-1.5 text-[13px] font-medium text-black/60 dark:text-white/60">
                      Araçlar
                    </div>
                    <div role="group">
                      <DropdownMenuItem 
                        className="group __menu-item flex min-w-0 items-center gap-1.5 px-3 py-2 text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer outline-none"
                        onClick={() => setSelectedTool("agent")}
                      >
                        <div className="flex items-center justify-center group-disabled:opacity-50 group-data-disabled:opacity-50 icon">
                          <Settings width="20" height="20" className="icon" />
                        </div>
                        <div className="flex min-w-0 grow items-center gap-2.5">
                          <div className="truncate">Agent Mode</div>
                        </div>
                        <div className="trailing">
                          <div className="icon group-radix-state-checked:hidden"></div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="group __menu-item flex min-w-0 items-center gap-1.5 px-3 py-2 text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer outline-none"
                        onClick={() => setSelectedTool("canvas")}
                      >
                        <div className="flex items-center justify-center group-disabled:opacity-50 group-data-disabled:opacity-50 icon">
                          <Palette width="20" height="20" className="icon" />
                        </div>
                        <div className="flex min-w-0 grow items-center gap-2.5">
                          <div className="truncate">Canvas Mode</div>
                        </div>
                        <div className="trailing">
                          <div className="icon group-radix-state-checked:hidden"></div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        className="group __menu-item flex min-w-0 items-center gap-1.5 px-3 py-2 text-black dark:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-colors cursor-pointer outline-none"
                        onClick={() => setSelectedTool("web-search")}
                      >
                        <div className="flex items-center justify-center group-disabled:opacity-50 group-data-disabled:opacity-50 icon">
                          <Globe width="20" height="20" className="icon" />
                        </div>
                        <div className="flex min-w-0 grow items-center gap-2.5">
                          <div className="truncate">Web Search</div>
                        </div>
                        <div className="trailing">
                          <div className="icon group-radix-state-checked:hidden"></div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Selected Tool Button */}
                {selectedTool && (
                  <Button
                    variant="ghost"
                    className="px-2 py-1 rounded-full text-blue-500 hover:text-blue-600 
                              transition-all duration-200 h-9 flex items-center justify-center gap-1.5 cursor-pointer text-[14px] font-medium"
                    onClick={() => setSelectedTool(null)}
                    aria-label="Seçili aracı kaldır"
                  >
                    <span>
                      {selectedTool === "agent" && "Agent Mode"}
                      {selectedTool === "canvas" && "Kanvas"}
                      {selectedTool === "web-search" && "Web Arama"}
                    </span>
                    <X className="w-4 h-4" strokeWidth="2" />
                  </Button>
                )}

              </div>

              {/* Send button - positioned on the right */}
              <div className="flex items-center">
                <Button
                  onClick={handleSend}
                  disabled={!message.trim() || disabled}
                  className="p-0 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 
                            disabled:bg-black/20 dark:disabled:bg-white/20 disabled:text-white/50 dark:disabled:text-black/50
                            transition-all duration-200 w-8 h-8 flex items-center justify-center cursor-pointer"
                  aria-label="Mesaj gönder"
                >
                  <ArrowUp className="w-4 h-4" strokeWidth="2.5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      
      {/* Warning Message - Outside the main panel */}
      <div className="text-[13px] text-black/60 dark:text-white/60 text-center my-2">
        Derfas hata yapabilir. Cevapları kontrol edin.
      </div>
    </div>
  );
} 