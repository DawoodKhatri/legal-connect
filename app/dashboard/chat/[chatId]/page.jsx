"use client";
import SenderMessageCard from "@/components/chat/SenderMessageCard";
import ReceiverMessageCard from "@/components/chat/ReceiverMessageCard";
import ChatInputCard from "@/components/chat/ChatInput";
import React, { useEffect } from 'react';
import { useState } from 'react';
import httpRequest from '@/utils/httpRequest'
import { HTTP_METHODS } from '@/constants/httpMethods';

function ChattingPage({ params: { chatId } }) {
  const [messages,setMessage] = useState([]);
  const getAllMessages = async () => {
    const { success, message, data } = await httpRequest(`/api/chats/${chatId}`, HTTP_METHODS.GET);
    if (success) {
      setMessage(data.chat.messages);
      console.log(data.chat.messages)
    } else {
      alert(message);
    }
  }

  useEffect(()=>{
    getAllMessages()
  },[])

  return (
    <div className='flex flex-col h-full'>
      <div className="flex-1 overflow-y-auto">
        {messages.map(({type,...message}) => type=="sent"?<SenderMessageCard {...message}/>:<ReceiverMessageCard {...message}/>)}
      </div>
      <ChatInputCard chatId={chatId} refresh={()=>getAllMessages()}/>
    </div>
  );
}

export default ChattingPage;
