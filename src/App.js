import React, { useEffect, useReducer } from "react";
import io from "socket.io-client";
import { useForm } from "react-hook-form";
import Preview from "./components/Preview";
import ConnectedTo from "./components/ConnectedTo";
const socket = io(`http://localhost:${process.env.PORT || 4321}`);

const initialState = {
  stream: undefined,
  latest: undefined,
  links: [],
};

function reducer(state = initialState, action = { type: "undefined" }) {
  switch (action.type) {
    case "SET_STREAM": {
      return {
        ...state,
        stream: action.payload,
      };
    }
    case "ADD_LINK": {
      return {
        ...state,
        latest: action.payload,
        links: state.latest ? [state.latest, ...state.links] : state.links,
      };
    }
    default:
      return state;
  }
}

const App = () => {
  const [{ stream, latest, links: meta }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const { handleSubmit, register } = useForm();

  const onSubmit = (values) => {
    dispatch({ type: "SET_STREAM", payload: values.channel });
  };

  useEffect(() => {
    if (stream !== undefined) {
      socket.emit("channel", stream);
    }
  }, [stream]);

  const handleMetaData = (link) => {
    dispatch({ type: "ADD_LINK", payload: link });
  };

  useEffect(() => {
    socket.on("message", handleMetaData);
    return () => socket.off(handleMetaData);
  }, []);

  return (
    <div className="app">
      <div className="search">
        <h1>Twitch Links</h1>
        {!stream ? (
          <form onSubmit={handleSubmit(onSubmit)} className="form">
            <input name="channel" ref={register} />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <ConnectedTo stream={stream} />
        )}
      </div>
      <Preview meta={meta} stream={stream} latest={latest} />
    </div>
  );
};

export default App;
