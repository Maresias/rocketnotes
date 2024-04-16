import { Container, Profile } from './style'

export function Header(){
    return (
        <Container>
            <Profile>
                <img src="https://github.com/Maresias.png" alt="foto de uma pessoa" />

                <div>
                    <span>Bem-Vindo</span>
                    <strong>Alexandre Correia</strong>
                </div>
            </Profile>
        </Container>
    )
}