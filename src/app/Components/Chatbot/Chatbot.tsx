'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'
import { Bot, X, Send, Minimize2, Maximize2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="z-50 fixed bottom-[5vh] right-[5vw]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="bg-white text-gray-800 hover:bg-gray-100 rounded-full px-6 py-3 flex items-center gap-2 shadow-lg border border-gray-200"
        >
          <Bot className="w-5 h-5" />
          <span className="font-medium">Parler avec Vincent Machado Da Luz</span>
        </Button>
      ) : (
        <Card className={`w-[400px] shadow-xl transition-all duration-300 ${isMinimized ? 'h-[60px]' : 'h-[600px]'}`}>
          <CardHeader className="border-b p-4 flex flex-row items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>VM</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">Vincent Machado Da Luz</h2>
                <p className="text-sm text-muted-foreground">VMDL Law Firm</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-4 h-[440px]">
                <ScrollArea className="h-full">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-2">
                      <Bot className="h-8 w-8 text-muted-foreground" />
                      <p className="text-muted-foreground">
                        Bonjour! Comment puis-je vous aider aujourd&apos;hui?
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                          }`}
                        >
                          <div
                            className={`rounded-lg px-4 py-2 max-w-[80%] ${
                              message.role === 'user'
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            {message.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
              </CardContent>

              <CardFooter className="border-t p-4">
                <form
                  onSubmit={handleSubmit}
                  className="flex w-full items-center gap-2"
                >
                  <Input
                    placeholder="Écrivez votre message..."
                    value={input}
                    onChange={handleInputChange}
                    className="flex-1"
                  />
                  <Button type="submit" size="icon">
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Envoyer</span>
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  )
}

