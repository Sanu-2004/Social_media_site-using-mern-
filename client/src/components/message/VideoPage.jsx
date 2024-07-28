import React, { useEffect, useMemo, useRef, useState } from "react";
import { useConversationContext } from "../../Context/ConversationContext";
import { MdOutlineCallEnd } from "react-icons/md";
import { useSocketContext } from "../../Context/SocketContext";
import { VideoCallHook } from "../../Hooks/VideoCallHook";

const VideoPage = () => {
  const { videoCall, setVideoCall } = useConversationContext();
  const myVideo = useRef();
  const remoteVideo = useRef();
  const { peer, peerMap } = useSocketContext();
  const {EndCall} = VideoCallHook();
  var Call

  const handleEndCall = () => {
    EndCall();
    setVideoCall(null);
  };


  const getcall = () => {
    peer.on("call", function (call) {
      console.log("answering call");
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          call.answer(stream);
          myVideo.current.srcObject = stream || null;
          call.on("stream", (remoteStream) => {
            if (remoteStream) {
              remoteVideo.current.srcObject = remoteStream;
            }
          });
        });
    });
  };


  useEffect(() => {

      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          myVideo.current.srcObject = stream || null;
          Call = peer.call(peerMap[videoCall], stream);
          Call.on("stream", (remoteStream) => {
            if (remoteStream) {
              remoteVideo.current.srcObject = remoteStream;
            }
          });
        });
    
    
    getcall();
  }, [videoCall]);

  window.addEventListener("beforeunload", () => {
    Call.close();
    handleEndCall();
  });

  return (
    <div className="flex flex-col justify-center items-start h-full p-4 py-6">
      <div className="h-[40%] w-full bg-base-300 rounded-t-3xl">
        <video
          className=" rounded-t-3xl object-cover h-full w-full"
          ref={myVideo}
          autoPlay
        >

        </video>
      </div>
      <div className="h-[40%] w-full bg-base-300">
        <video
          className="object-cover h-full w-full"
          ref={remoteVideo}
          autoPlay
        >

        </video>
      </div>
      <div className="h-[14%] w-full bg-base-300 flex justify-around items-center rounded-b-3xl">
        <button
          className="btn btn-error rounded-full text-3xl"
          onClick={handleEndCall}
        >
          <MdOutlineCallEnd />
        </button>
      </div>
    </div>
  );
};

export default VideoPage;
