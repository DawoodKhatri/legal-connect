import { useState } from 'react';

const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '' || (selectedFiles && selectedFiles.length > 0)) {
      console.log('Sending Message:', message);

      if (selectedFiles) {
        console.log('Sending Documents:', selectedFiles.map(file => file.name));
      }

      // Clear the input fields after sending
      setMessage('');
      setSelectedFiles([]);
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
          multiple
        />

        {/* Display selected file names */}
        {selectedFiles.length > 0 && (
          <div className="text-sm mt-1">
            <span>Selected Files:</span>
            <ul className="list-disc pl-4">
              {selectedFiles.map(file => (
                <li key={file.name}>{file.name}</li>
              ))}
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
