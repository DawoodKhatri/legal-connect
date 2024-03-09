import React from 'react'
import SenderMessageCard from "@/components/chat/SenderMessageCard"
import ReceiverMessageCard from "@/components/chat/ReceiverMessageCard"
import ChatInputCard from "@/components/chat/ChatInput"

function ChattingPage({params:{chatId}}) {
  return (
    <div>
        <SenderMessageCard />
        <ReceiverMessageCard />
        <ChatInputCard />
    </div>
  )
}

export default ChattingPage