import { useState } from "react";
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi";
import { Container, Form, Avatar} from "./styles";


import { useAuth } from "../../hooks/auth";
import { useNavigate } from "react-router-dom";

import avaterPlaceholder from '../../assets/avatar_placeholder.svg'

import { api } from "../../services/api";

import { Input  } from '../../components/Input'
import { Button } from '../../components/button'


export function Profile(){
    const navigate = useNavigate()

    const {user, updateProfile} = useAuth()

    const [name, setName ] = useState(user.name)
    const [email, setEmail ] = useState(user.email)
    const [passwordOld, setPasswordOld] = useState()
    const [passwordNew, setPasswordNew] = useState()

    const avaterUrl = user.avater ?  `${api.defaults.baseURL}/files/${user.avater}` : avaterPlaceholder

    const [ avater, setAvater ] = useState(avaterUrl)
    const [avaterFile, setAvaterFile ] = useState(null)

    function handleBack(){
        navigate(-1)
    }

    async function handleUpdateProfile(){
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }
        const userUpdated = Object.assign(user, updated)
        await updateProfile({user: userUpdated, avaterFile})
    }

    function handleChangeAvater(event){
        const file  = event.target.files[0]
        setAvaterFile(file)

        const imagePreview = URL.createObjectURL(file)
        setAvater(imagePreview)
    }

    return (
        <Container>
            <header>
                <button onClick={handleBack}>
                    <FiArrowLeft/> 
                </button>
            </header>

            <Form>

                <Avatar>
                    <img src={avater} 
                    alt="Imagen do usuário" />

                    <label htmlFor="avatar">
                        <FiCamera/>

                        <input
                            id="avatar"
                            type="file"
                            onChange={handleChangeAvater}
                        />
                    </label>

                </Avatar>

                <Input
                    placeholder="Nome"
                    type="text"
                    icon={FiUser}
                    value={name}
                    onChange={e => setName(e.target.value)}
                />

                <Input
                    placeholder="E-mail"
                    type="text"
                    icon={FiMail}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />

                <Input
                    placeholder="Senha Atual"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordOld(e.target.value)}
                />

                <Input
                    placeholder="Nova Senha"
                    type="password"
                    icon={FiLock}
                    onChange={e => setPasswordNew(e.target.value)}
                />

                <Button title={"Salvar"} onClick={handleUpdateProfile}/>

            </Form>

        </Container>
    )
}