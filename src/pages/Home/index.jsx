import { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { Container, Brand, Menu, Search, Content, NewNote } from './styles'

import { api } from '../../services/api'
import { useNavigate } from 'react-router-dom'

import { Note } from '../../components/Note'
import { Header } from '../../components/Header'
import { ButtonText } from '../../components/ButtonText'
import { Section } from '../../components/Section'
import { Input } from '../../components/Input'

export function Home(){
    const [seach, setSeach ] = useState("")
    const [ tags, setTags ] = useState([])
    const [tagsSelected, setTagsSelected ] = useState([])
    const [ notes, setNotes ] = useState([])

    const navigate = useNavigate()

    function handleTagsSelected(tagName){
        const alredySelected = tagsSelected.includes(tagName)

        if(tagName === "All"){
            return setTagsSelected([])
        }
        
        if(alredySelected){
            const filteredTags = tagsSelected.filter(tag => tag !== tagName)
            setTagsSelected(filteredTags)
        }else{
            setTagsSelected(prevState => [...prevState, tagName])
        }
    }

    function handleDetais(id){
        navigate(`/details/${id}`)
    }

    useEffect(() => {
        async function fetchTags(){
            const response = await api.get("/tags/")
            setTags(response.data)
        }

        fetchTags()
    },[])

    useEffect(() => {
        async function fatchNotes(){
            const response = await api.get(`/notes?title=${seach}&tags=${tagsSelected}`)
            setNotes(response.data)
        }

        fatchNotes()
    },[tagsSelected, seach])

    return (
        <Container>
            <Brand>
               <h1>RocketNotes</h1>
            </Brand>

            <Header/>

            <Menu>
                <li>
                    <ButtonText 
                    title="Todos" 
                    onClick={()=> handleTagsSelected("All")}
                    isActive={tagsSelected.length === 0}
                    />
                </li>
                {
                    tags && tags.map( tag =>(
                        <li key={String(tag.id)}>
                            <ButtonText 
                            title={tag.name}
                            onClick={()=> handleTagsSelected(tag.name)}
                            isActive={tagsSelected.includes(tag.name)}
                            />
                        </li>
                    ))
                }
            </Menu>

            <Search>
                <Input 
                placeholder="Pesquisar pelo titulo"
                onChange={ (e)=> setSeach(e.target.value)}
                />
            </Search>

            <Content>
                <Section title="Minhas notas"> 
                  {
                    notes.map(note =>(
                        <Note
                        key={String(note.id)}
                        data={note}
                        onClick={() => handleDetais(note.id)}
                        />
                    ))
                  }
                </Section>
            </Content>

            <NewNote to ="/new">
                <FiPlus/>
                 Criar nota
            </NewNote>
        </Container>
    )
}