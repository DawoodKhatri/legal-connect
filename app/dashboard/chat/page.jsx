"use client";
import React, { useEffect } from 'react';
import ChatCard from "@/components/chat/ChatCard";
import { useState } from 'react';
import httpRequest from '@/utils/httpRequest'
import { HTTP_METHODS } from '@/constants/httpMethods';
import Link from 'next/link';


function ChatsPage() {
  const [chats,setChats] = useState([]);
  const getAllChats = async () => {
    const { success, message, data } = await httpRequest("/api/chats", HTTP_METHODS.GET);
    if (success) {
      setChats(data.chats);
      console.log(data.chats)
    } else {
      alert(message);
    }
  }

  useEffect(()=>{
    getAllChats()
  },[])

  return (
    <div>
      {chats.map(({_id,user},i)=>
      <Link key={i} href={`/dashboard/chat/${_id}`}>
        <ChatCard {...user} />
      </Link>
       )}
        
    </div>
  )
}

export default ChatsPage