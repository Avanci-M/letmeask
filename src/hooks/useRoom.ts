import userEvent from "@testing-library/user-event";
import { useEffect, useState } from "react";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseQuestions = Record <string, {
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered:boolean;
  isHighlighted: boolean;
  likes: Record<string,{
    authorId: string;
  }>
}>

type QuestionType = {
  id:string;
  author:{
    name: string;
    avatar: string;
  }
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
} 

export function useRoom(roomId: string){
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuestionType[]>([])
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef = database.ref(`room/${roomId}`);

    const unsubscribeRoomListener = roomRef.on('value', room => {
      const databaseRoom = room.val();
      const firebaseQuestions:FirebaseQuestions = databaseRoom.questions;

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value])=>{
        return{
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered,
          likeCount: Object.values(value.likes ?? {}).length,
          hasLiked: Object.values(value.likes ?? {}).find(([key,like]) => like.authorId === user?.id)?.[0],
        }
      })

      setTitle(databaseRoom.title);
      setQuestions(parsedQuestions);
    })

    return() => {
      roomRef.off('value');
    }
    },[roomId, user?.id]);

  return{ questions, title }
}