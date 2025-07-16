
import { FaPaperPlane, FaUserCircle, FaSmile, FaPaperclip, FaUserTie } from "react-icons/fa";

const SupportPopup = ({ open }) => {
  const messages = [
    { from: "user", text: "Xin chào" },
    { from: "user", text: "Làm thế nào để xem các sản phẩm" },
    { from: "admin", text: "Chào bạn" },
    { from: "admin", text: "Bạn có thể vào mục Shop để xem các sản phẩm" },
  ]


  return open ? (
    <div className="fixed bottom-[150px] right-6 sm:w-[350px] sm:h-[450px] w-[250px] h-[400px] bg-white rounded-2xl shadow-xl flex flex-col overflow-hidden z-50 italic">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex justify-between items-center">
        <h3 className="font-semibold text-lg text-black">Customer Support</h3>
        <button
          className="text-gray-500 hover:text-gray-700 text-sm"
        >
          Let's Chat App
        </button>
      </div>

      {/* Message list */}
      <div className="flex-1 px-4 py-2 overflow-y-auto space-y-2 bg-gray-50">
        {messages.map((msg, idx) =>
          msg.from === "user" ? (
            <div key={idx} className="text-right">
              <div className="inline-block bg-blue-500 text-white text-sm px-3 py-2 rounded-lg">
                {msg.text}
              </div>
            </div>
          ) : (
            <div key={idx} className="flex items-start gap-2">
              <FaUserTie className="text-2xl text-gray-400 min-w-7" />
              <div className="bg-gray-100 text-gray-700 text-sm px-3 py-2 rounded-lg">
                <span className="font-semibold">ADMIN: </span>
                {msg.text}
              </div>
            </div>
          )
        )}
      </div>

      {/* Input */}
      <div className="flex items-center px-3 py-2 border-t bg-white gap-2 text-black">
        <FaUserCircle className="text-2xl text-gray-400" />
        <input
          type="text"
          placeholder="Enter Message!"
          className="flex-1 text-sm border-0 px-3 py-2  rounded-lg outline-none"
        />
        <FaSmile className="text-gray-500 cursor-pointer" />
        <FaPaperclip className="text-gray-500 cursor-pointer" />
        <button className="text-blue-600 text-lg">
          <FaPaperPlane />
        </button>
      </div>
    </div>
  ) : null;
}
export default SupportPopup
