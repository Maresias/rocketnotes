import styled from 'styled-components'

export const Container = styled.section`
    margin: 5.6rem 0 2.8rem;

    >h2{
        border: 1px solid ${({ theme }) => theme.COLORS.BACKGROUND_700};

        padding-bottom: 1.6rem;
        margin-bottom: 2.4rem;

        color: ${({ theme }) => theme.COLORS.GRAY_100};
        font-size: 2.0rem;
        font-weight: 400;
    }

`