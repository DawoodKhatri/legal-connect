import React from 'react'

function ChatCard(props) {
  return (
    <div>
        <div className='flex bg-primary-navy text-primary-light p-4 mt-2'>
            {/* Image container */}
            <div className='rounded-full overflow-hidden mr-4'>
                <img className='w-12 h-12 object-cover' src="https://nadeemdev.netlify.app/static/media/img3edit.3659381b284a5bb9e966.png" alt="Profile" />
            </div>

            {/* Name and Last Message container */}
            <div className='flex-1  '>
                <div className='font-bold'>Name</div>
                <div>Last Message</div>
            </div>

            {/* Time container */}
            <div className='text-right'>
                <div>12:24 AM</div>
            </div>
        </div>
    </div>
  )
}

export default ChatCard