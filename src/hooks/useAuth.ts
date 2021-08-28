import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContexts';

export function useAuth(){
  const value = useContext (AuthContext)

  return value; 
}

//quando se usa algo não visual (funcional) em mais de um lugar no projeto cria um hook 