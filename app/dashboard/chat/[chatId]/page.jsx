import React from 'react'
import SenderMessageCard from "@/components/chat/SenderMessageCard"
import ReceiverMessageCard from "@/components/chat/ReceiverMessageCard"

function ChattingPage({params:{chatId}}) {
  return (
    <div>
        <SenderMessageCard />
        <ReceiverMessageCard />
    </div>
  )
}

export default ChattingPage