import React from 'react'

function ReceiverMessageCard({content, document, time}) {
  return (
    <div className='flex'>
            <div className='bg-primary  text-lg text-primary-light w-fit max-w-[50%] mr-auto rounded-lg m-4 p-2'>
                <div className='p-2'>{content}</div>
                {document && <img src={document.path} />}
            </div>
    </div>
  )
}

export default ReceiverMessageCard