import React from "preact/compat";
import { Router, Route, Link } from "preact-router";

import { WSContextProvider } from "./context/socket";

type Message = {
  type: string;
  data: JSON;
};
/* <button
        onClick={() =>
          socket.send(
            JSON.stringify({
              type: "load-files",
              data: {
                hello: "world",
              },
            })
          )
        }
      >
        Send message
      </button> */

export function App() {
  return (
    <WSContextProvider url="ws://127.0.0.1:3333">
      <Router>
        <Route
          path="/"
          component={() => (
            <div>
              <Link href="/df">
                <h1>homepage</h1>
              </Link>
            </div>
          )}
        />
        <Route
          default
          component={() => (
            <div>
              <Link href="/home">
                <h1>homepage</h1>
              </Link>
            </div>
          )}
        />
      </Router>
    </WSContextProvider>
  );
}
