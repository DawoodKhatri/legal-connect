import React from 'react'

function SenderMessageCard({content, document, time}) {
  return (
    <div className='flex'>
            <div className='bg-primary-navy text-lg text-primary-light w-fit max-w-[50%] ml-auto rounded-lg m-4 p-2'>
                <div className='p-2'>{content}</div>
                {document && <img src={document.path} />}
            </div>
    </div>
  )
}

export default SenderMessageCard