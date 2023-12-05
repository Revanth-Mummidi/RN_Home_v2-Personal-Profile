import React, { useState, useEffect } from 'react';
import { useRef } from 'react';
import { View, SafeAreaView, Text,Button, KeyboardAvoidingView,TouchableOpacity } from 'react-native';
// import { event } from 'react-native-reanimated';
import { RTCView, mediaDevices, RTCPeerConnection, RTCSessionDescription, RTCIceCandidate,MediaStream } from 'react-native-webrtc';
import { io } from 'socket.io-client';
export default function CreateRoom() {
  const localStream=useRef(null)
  const remoteStream=useRef(null)
  const [isCallActive, setIsCallActive] = useState(true);
  const[webcamStarted, setWebcamStarted] = useState(false);
  const peerConnection=useRef(null)
  const socket = useRef(null);
  const roomId=1111;
// const startWebcam = async () => {

//   try {
//     const stream = await mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });

//     setWebcamStarted(true);
//     setLocalStream(stream);

//     stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));
//     } catch (error) {
//     console.error(error);
//     }

//     // const offer = await peerConnection.createOffer();
//     // //console.log('offer',offer)
//     // await peerConnection.setLocalDescription(offer);
    
//     //   send({
//     //       event: "offer",
//     //       data: peerConnection.localDescription
//     //     });
//     }


  const handleCallUser = () => {
   socket.current=io('http://192.168.0.105:4000/video');
    let isFront = true; 
    
    mediaDevices.enumerateDevices().then(sourceInfos =>{
      // console.log(sourceInfos.length);
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind === 'videoinput' &&
          sourceInfo.facing === (isFront ? 'user' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
          // console.log('videoSourceId: ', videoSourceId);
        }
      }
      
      mediaDevices
        .getUserMedia({
          audio: true,
          video: {
            mandatory: {
              minWidth: 60, 
              minHeight: 30,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
          },
        })
        .then(stream => {
          // Got stream!
          console.log("1) stream: ",stream)
         
        localStream.current=stream;
        socket.current.emit("join",{roomId,creator:"True"})
        socket.current.on("room_created", async (roomId) => {
          console.log("2) room created with ID", roomId);
        })
        // setWebcamStarted(true);
   setIsCallActive(false);

       })
        .catch(error => {
          console.error('stream error', error);
        });
    });
socket.current.on("start_call",async (event)=>{
  // console.log("peerConnection with IceServers: ",peerConnection.current)
peerConnection.current=new RTCPeerConnection({
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' },
    { urls: 'stun:stun2.l.google.com:19302' },
    { urls: 'stun:stun3.l.google.com:19302' },
    { urls: 'stun:stun4.l.google.com:19302' },
  ],
})
  //adding LocalStream to RTCpeerConnection
  localStream.current.getTracks().forEach(track => peerConnection.current.addTrack(track, localStream.current))
  console.log("3) Added Local Stream to RTCpeerConnection: ",peerConnection.current)


  //onTrack triggers after localStream is added to RTCpeerConnection 
peerConnection.current.ontrack = (event) => {
  // const remoteStream = new MediaStream();
  
  // event.streams[0].getTracks().forEach((track) => {
  //     remoteStream.addTrack(track);
  // });
  console.log("onTrack: ",event.streams[0])

   remoteStream.current = event.streams[0]
 };

  //onicecandidate triggers after offerCreated and sdp is added to RTCpeerConnection 
 peerConnection.current.onicecandidate=(event)=>{
  // console.log("oniceCandidate EventCANDIDATE: ",event.candidate)
  if (event.candidate) {
  // console.log("oniceCandidate EventCANDIDATE: ",event.candidate)

    socket.current.emit('webrtc_ice_candidate', {
      roomId:roomId,
      label: event.candidate.sdpMLineIndex,
      candidate: event.candidate.candidate,
      mid:event.candidate.sdpMid
    })
   console.log("5) ICEcandidates sent: ",event.candidate);
  }
 }

 peerConnection.current.createOffer().then((event)=>{
  peerConnection.current.setLocalDescription(event)
  // console.log("Local-sdp: ",event)
  const sdp=event;

  //offer is sharing sdp with other peers in same room
  socket.current.emit("webrtc_offer", {
    type: "webrtc_offer",
    sdp: sdp,
    roomId: roomId,
    Name:"Revanth&Uday"  //we need to change to userName
  });
  console.log("4) offer sent",peerConnection.current)
 })
})

//other peers iceCnadidate and sdp are used to addIcecandidate to peerConnection , sharing icecandidates and sdp are done here
socket.current.on("webrtc_ice_candidate", (event) => {
  console.log("6) CreateRoom on webrtc_ice_candidate event : ",event)
  try{
    const candidate = new RTCIceCandidate({
      sdpMLineIndex: event.label,
      candidate: event.candidate,
      sdpMid:event.mid
    });
  
    peerConnection.current.addIceCandidate(candidate);
    // console.log("7) iceCandidate Added: ",peerConnection.current)
    // console.log("iceCandidate Added: ",peerConnection.current)
  }catch(err){
    console.log("CreateRoom on iceCandidate error: ",err)
  }
  console.log("7) Peerconnection for CreateRoom on webrtc_ice_candidate: ")
  //,peerConnection.current)
})

socket.current.on("webrtc_answer", (event) => {
  // console.log("Socket event callback: webrtc_answer: ",event);
  peerConnection.current.setRemoteDescription(
    new RTCSessionDescription(event)
  );
});

};
const endCall=()=>{
  // peerConnection.current.removeTrack(localStream.current);
  localStream.current.getTracks().forEach((track) => track.stop());
   localStream.current=null;
   remoteStream.current=null;
   socket.current.disconnect();
  //  setWebcamStarted(false);
   setIsCallActive(true);
console.log("clicked")
 }


 return (
  <KeyboardAvoidingView style={styles.body} behavior="position">
    <SafeAreaView>
    <RTCView
        streamURL={remoteStream.current?.toURL()}
        style={styles.remoteStream}
        objectFit="cover"
        mirror={false}
      />
      <RTCView
        streamURL={localStream.current?.toURL()}
        style={styles.localStream}
        objectFit="cover"
        mirror
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isCallActive ? 'green' : 'red' }]}
          onPress={isCallActive ? handleCallUser : endCall}
        >
          <Text style={styles.buttonText}>
            {isCallActive ? 'Call' : 'End'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  </KeyboardAvoidingView>
);
 }

 const styles = {
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localStream: {
    width: 100,
    height: 150,
    bottom:110,
    right:10,
    position:'absolute'
  },
  remoteStream: {
    width: 350,
    height: 600,
    
  },
  buttons: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'green', 
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, 
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
};
