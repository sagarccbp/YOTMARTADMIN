import React, { useEffect, useState, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";

import {
  API_SERVER,
  chatList,
  messagesList,
  sendMessage,
} from "../../rest/ApiService.js";
import { format } from "date-fns";

import io from "socket.io-client";

var socket;

export default function ChatBox() {
  const [chatBox, setChatBox] = useState([]);
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");
  const [selectedChat, setChat] = useState({});
  const [istyping, setIsTyping] = useState(false);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const [btnState, setBtnState] = useState(false);

  const getChatList = () => {
    chatList(result => {
      setChatBox(result);
      if (
        result &&
        result.length > 0 &&
        (!selectedChat || Object.keys(selectedChat).length <= 0)
      ) {
        setSelectedChat(result[0]);
      }
    });
  };

  useEffect(() => {
    getChatList();
    socket = io(API_SERVER);
    const user = {
      _id: localStorage.getItem("userId"),
      name: localStorage.getItem("name"),
    };
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("Connected");
      setSocketConnected(true);
    });
    socket.on("typing", () => {
      setIsTyping(true);
      console.log("Typing...");
    });
    socket.on("stop typing", () => {
      console.log("Stop typing..");
      setIsTyping(false);
    });
  }, []);

  useEffect(() => {
    socket.on("message recieved", newMessageRecieved => {
      if (!selectedChat && selectedChat._id !== newMessageRecieved.chat._id) {
        getChatList();
      } else {
        console.log("Message recieved..", newMessageRecieved);
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  useEffect(() => {
    if (!selectedChat) return;
    socket.emit("join chat", selectedChat._id);
  }, [selectedChat]);

  const setSelectedChat = data => {
    setBtnState(btnState => !btnState);
    const chatId = data._id;
    setChat(data);
    messagesList(chatId, result => {
      setMessages(result);
    });
  };

  let toggleClassCheck = btnState ? " active" : "";
  const changeHandler = event => {
    const value = event.target.value;
    setContent(value);
    if (!socketConnected) return;
    if (!typing) {
      setTyping(true);
      console.log("Selected chat id: ", selectedChat._id);
      socket.emit("typing", selectedChat._id);
    }
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
        console.log("Stop typing.. after timerLength ");
      }
    }, timerLength);
  };

  const updateMessageList = () => {
    socket.emit("stop typing", selectedChat._id);
    sendMessage(selectedChat._id, content, result => {
      setMessages([...messages, result]);
      setContent("");
      socket.emit("new message", result);
    });
  };

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      updateMessageList();
    }
  };

  function getFormattedDate(date) {
    const cdate = new Date(`${date}`);
    return format(cdate, "hh:mm");
  }

  return (
    <div className="main-content">
      <section className="section">
        <div className="section-header ">
          <h1>Chat Box</h1>
          <div className="section-header-breadcrumb">
            <div className="breadcrumb-item active">
              <a href="#">Dashboard</a>
            </div>

            <div className="breadcrumb-item">Chat Box</div>
          </div>
        </div>

        <div className="section-body">
          <div className="row" style={{ top: "0" }}>
            <div className="col-4 col-sm-4 col-xs-4 col-lg-4 pr-0">
              <div className="card">
                <div className="card-header" style={{ position: "relative" }}>
                  <h4>Chats</h4>
                </div>
                <div
                  className="card-body p-2"
                  style={{
                    height: "450px",
                    overflow: "hidden",
                    overflowY: "auto",
                    scrollbarWidth: "thin",
                  }}
                >
                  <ul className="list-unstyled list-unstyled-border d-none d-sm-block d-sm-none d-md-block d-md-none d-lg-block">
                    {chatBox.map((chat, index) => (
                      <li
                        className={`media ${toggleClassCheck}`}
                        onClick={e => setSelectedChat(chat)}
                        key={index}
                      >
                        <img
                          alt={
                            chat && chat.users[0] && chat.users[0].fullName
                              ? chat.users[0].fullName
                              : ""
                          }
                          className="mr-3 rounded-circle img-fluid"
                          width="50"
                          src={
                            chat && chat.users[0] && chat.users[0].image
                              ? chat.users[0].image
                              : "../assets/img/avatar/avatar-4.png"
                          }
                        />
                        <div className="media-body">
                          <div className="mt-0 mb-1 d-flex justify-content-between">
                            <div className="font-weight-bold">
                              {chat && chat.users[0] && chat.users[0].fullName
                                ? chat.users[0].fullName
                                : ""}
                            </div>
                            <div
                              className="font-600-bold"
                              style={{ fontSize: "12px" }}
                            >
                              {getFormattedDate(
                                `${chat.latestMessage.updatedAt}`
                              )}
                            </div>
                          </div>
                          <div className="text-default text-small font-600-bold">
                            <i className="fa fa-angle-double-right"></i>{" "}
                            {chat &&
                            chat.latestMessage &&
                            chat.latestMessage.content
                              ? chat.latestMessage.content > 50
                                ? chat.latestMessage.content.substring(0, 21) +
                                  "..."
                                : chat.latestMessage.content
                              : ""}
                          </div>
                        </div>
                      </li>
                    ))}
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle"
                        width="50"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle"
                        width="50"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle"
                        width="50"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle img-fluid"
                        width="50"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul className="list-unstyled list-unstyled-border d-block d-sm-none p-0">
                    {chatBox.map((chat, index) => (
                      <li
                        className={`media ${toggleClassCheck}`}
                        onClick={e => setSelectedChat(chat)}
                        key={index}
                      >
                        <img
                          alt={
                            chat && chat.users[0] && chat.users[0].fullName
                              ? chat.users[0].fullName
                              : ""
                          }
                          className="mr-1 rounded-circle"
                          height="100%"
                          width="20px"
                          src={
                            chat && chat.users[0] && chat.users[0].image
                              ? chat.users[0].image
                              : "../assets/img/avatar/avatar-4.png"
                          }
                        />
                        <div className="media-body">
                          <div className="mt-0 mb-1 d-flex justify-content-between">
                            <div
                              className="font-weight-bold"
                              style={{ fontSize: "12px" }}
                            >
                              {/* {chat && chat.users[0] && chat.users[0].fullName
                                ? chat.users[0].fullName
                                : ""} */}
                              {chat && chat.users[0] && chat.users[0].fullName
                                ? chat.users[0].fullName > 2
                                  ? chat.users[0].fullName.substring(0, 2) +
                                    "..."
                                  : chat.users[0].fullName
                                : ""}
                            </div>
                            {/* <div
                              className="font-600-bold"
                              style={{ fontSize: "10px" }}
                            >
                              {getFormattedDate(
                                `${chat.latestMessage.updatedAt}`
                              )}
                            </div> */}
                          </div>
                          <div className="text-default text-small font-600-bold">
                            <i className="fa fa-angle-double-right"></i>{" "}
                            {chat &&
                            chat.latestMessage &&
                            chat.latestMessage.content
                              ? chat.latestMessage.content > 50
                                ? chat.latestMessage.content.substring(0, 21) +
                                  "..."
                                : chat.latestMessage.content
                              : ""}
                          </div>
                        </div>
                      </li>
                    ))}
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle"
                        height="20"
                        width="100%"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle"
                        width="50"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle"
                        width="50"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                    <li className="media">
                      <img
                        alt="image"
                        className="mr-3 rounded-circle img-fluid"
                        width="50"
                        src="../assets/img/avatar/avatar-4.png"
                      />
                      <div className="media-body">
                        <div className="mt-0 mb-1 font-weight-bold">
                          Rizal Fakhri
                        </div>
                        <div className="text-small font-weight-600 text-success">
                          <i className="fas fa-circle"></i> Online
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-8 col-sm-8 col-lg-8 pl-0">
              <div className="card chat-box ">
                <div className="card-header">
                  <h4>
                    <i
                      className="fas fa-circle text-success mr-2"
                      title="Online"
                      data-toggle="tooltip"
                    ></i>
                    {messages && messages.length > 0
                      ? messages[0].sender.fullName
                      : "UnNamed"}
                  </h4>
                </div>
                <div
                  className="card-body chat-content"
                  style={{ height: "400px" }}
                  ref={messagesEndRef}
                >
                  <ScrollableFeed>
                    {console.log("chat-messages", messages)}
                    {messages && messages.length > 0
                      ? messages.map((message, index) => {
                          if (message.sender && message.sender._id) {
                            if (
                              message.sender._id ===
                              localStorage.getItem("userId")
                            ) {
                              // Left message..
                              return (
                                <div
                                  className="chat-item chat-right"
                                  key={index}
                                >
                                  <img
                                    src={
                                      message &&
                                      message.sender &&
                                      message.sender.fullName
                                        ? message.sender.fullName
                                        : "../assets/img/avatar/avatar-4.png"
                                    }
                                  />

                                  <div className="chat-details">
                                    <div className="chat-text">
                                      {message.content}
                                    </div>
                                    <div className="chat-time">
                                      {getFormattedDate(
                                        `${message.chat.createdAt}`
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            } else {
                              return (
                                <div
                                  className="chat-item chat-left"
                                  key={index}
                                >
                                  <img
                                    src={
                                      message &&
                                      message.sender &&
                                      message.sender.fullName
                                        ? message.sender.fullName
                                        : "../assets/img/avatar/avatar-4.png"
                                    }
                                  />
                                  <div className="chat-details">
                                    <div className="chat-text">
                                      {message.content}
                                    </div>
                                    <div className="chat-time">
                                      {getFormattedDate(
                                        `${message.chat.createdAt}`
                                      )}
                                    </div>
                                  </div>
                                </div>
                              );
                            }
                          }
                        })
                      : ""}
                    {istyping ? (
                      <div className="chat-item chat-left chat-typing">
                        {" "}
                        <img src="" />
                        <div className="chat-details">
                          <div className="chat-text"></div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </ScrollableFeed>
                </div>
                <div className="card-footer chat-form">
                  <div id="chat-form">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type a message"
                      onChange={changeHandler}
                      value={content}
                      onKeyDown={handleKeyPress}
                    />
                    <button
                      onClick={updateMessageList}
                      className="btn btn-primary"
                    >
                      <i className="far fa-paper-plane"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
