import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./Context/UserContext.jsx";
import { ThemeProvider } from "./Context/ThemeContext.jsx";
import { ConversationProvider } from "./Context/ConversationContext.jsx";
import { MessageProvider } from "./Context/MessageContext.jsx";
import { SocketProvider } from "./Context/SocketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
          <ConversationProvider>
            <MessageProvider>
              <SocketProvider>
                <App />
              </SocketProvider>
            </MessageProvider>
          </ConversationProvider>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
