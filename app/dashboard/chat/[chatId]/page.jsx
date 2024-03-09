"use client";
import React from 'react';
import SenderMessageCard from "@/components/chat/SenderMessageCard";
import ReceiverMessageCard from "@/components/chat/ReceiverMessageCard";
import ChatInputCard from "@/components/chat/ChatInput";

function ChattingPage({ params: { chatId } }) {
  return (
    <div className='flex flex-col h-full'>
      <div className="flex-1 overflow-y-auto">
        {/* Content that can scroll */}
        <SenderMessageCard />
        <ReceiverMessageCard />
        <SenderMessageCard />
        <ReceiverMessageCard />
        <SenderMessageCard />
        <ReceiverMessageCard />
        <SenderMessageCard />
        <ReceiverMessageCard />
      </div>
      <ChatInputCard />
    </div>
  );
}

export default ChattingPage;
