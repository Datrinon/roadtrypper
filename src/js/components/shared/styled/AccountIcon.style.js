import styled from 'styled-components';

export const Icon = styled.div`
    background-color: navy;
    border-radius: 50%;
    border: 1px solid black;
    width: 32px;
    height: 32px;
    position: relative;
    cursor: pointer;
    display: inline-block;
    float: right;
`

export const IconText = styled.p`
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    top: 8%;
    /* bottom: 25%; */
    text-transform: capitalize;
    color: white;
    font-weight: 700;
    font-size: 24px;
    user-select: none;
`

export const IconDropdownList = styled.ul`
    margin: 4px;

    & li:not(.account-info) {
        height: 1.5rem;
        font-size: 90%;
        border-radius: 2px;
        padding: 3px;
    }
    
    & li > * {
        all: unset;
        width: 100%;
        height: 100%;
        display: block;
    }

    & li:hover:not(.account-info) {
        background-color: #dddddd;
    }

    & .sign-out-button {
        font-weight: 600;
    }
`

export const AccBullet = styled.li`
    cursor: default;
    font-size: 75%;
    padding-bottom: 4px;
    border-bottom: 1px solid #b3a9a9;

    & span {
        font-weight: 600;
        font-size: inherit;
    }

    &:hover {
        background-color: initial;
    }
`