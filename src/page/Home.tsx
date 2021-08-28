import { useHistory } from 'react-router-dom'

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIconImg from '../assets/images/google-icon.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function Home(){
    const history = useHistory();
    const { user, signInWithGoogle }= useAuth()
    const [roomCode,setRoomCode]= useState('')

    function handleCreaterRoom(){
     if (!user){
         signInWithGoogle()
     }

     history.push('/rooms/new');
    }
    
    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if ( roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if(!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }

        if(roomRef.val()){
            alert('Room does not exist.');
            return; 
        }

        history.push(`/rooms/${roomCode}`);
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={illustrationImg} alt='ilustrações simbolizando perguntas e respostas'/>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>

            <main>
                <div className='main-content'>
                    <img src={logoImg} alt='Letmeask' />  
                    <button onClick={handleCreaterRoom} className='create-room'>
                        <img src={googleIconImg} alt='Logo do Google'/>
                        Crie sua sala com o Google    
                    </button> 
                    <div className='separator'> ou entre em uma sala</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                        type='text'
                        placeholder='Digite o código da sala'
                        onChange={ event => setRoomCode(event?.target.value)}
                        value={roomCode}
                        />
                        <Button type='submit'>
                            Entrar na sala
                        </Button>    
                    </form>
                </div>
            </main>
        </div>
    )
}