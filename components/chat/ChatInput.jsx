import { HTTP_METHODS } from '@/constants/httpMethods';
import httpRequest from '@/utils/httpRequest';
import { useState } from 'react';

const ChatInput = ({chatId, refresh}) => {
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState();

  const handleFileChange = (e) => {
    const files = e.target.files[0];
    setSelectedFile(files);
  };

  const handleSendMessage = async () => {
    if (message.trim() !== '' || (selectedFile)) {
      console.log('Sending Message:', message);
      const formData = new FormData()
      if (message){
          formData.append("content",message)
        }
        if(selectedFile) {
          formData.append("document",selectedFile)
      }
      

      const { success, message:responseMessage, data } = await httpRequest(`/api/chats/${chatId}`, HTTP_METHODS.PUT, formData, true);
            if (success) {
                refresh()
            } else {
            alert(responseMessage);
        }

     
      // Clear the input fields after sending
      setMessage('');
      setSelectedFile();
    }
  };

  return (
    <div className="sticky bottom-0 z-10 bg-white">
      <div className="flex items-center p-4">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 border mr-2 rounded-lg border-primary-navy"
        />

        {/* Hidden file input triggered by label */}
        <label htmlFor="fileInput" className="cursor-pointer text-2xl w-6 m-auto">
          📎
        </label>
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept='image/*'
        />

        {/* Display selected file names */}
        {selectedFile && (
          <div className="text-sm mt-1">
            <ul className="list-disc pl-4">
                <li key={selectedFile.name}>{selectedFile.name}</li>
            </ul>
          </div>
        )}

        <button onClick={handleSendMessage} className="bg-primary-navy text-primary-light p-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
