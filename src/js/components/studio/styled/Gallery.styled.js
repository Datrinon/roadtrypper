import styled from "styled-components";
import { appear } from "../../styled/anim.style";

export const GalleryButton = styled.button`
  all: unset;
  color: white;
  font-size: 1.5em;
  cursor: pointer;
  padding: 4px 4px;
  border-radius: 50%;
  transition: background-color 300ms, color 300ms;
  position: relative;
  width: 28px;
  margin-top: 20px;
  
  & span {
    display: block;
    text-align: center;
  }

  &:hover:not([disabled]) {
    background-color: rgba(255,255,255,0.25);
  }

  &:hover:not([disabled])::after{ 
    position: absolute;
    content: attr(data-tip);
    border-radius: 10px;
    background-color: rgb(27 27 27 / 72%);
    padding: 8px;
    color: beige;
    top: 100%;
    left: 0;
    font-size: 1rem;
    animation: ${appear} 300ms;
  }

  &:disabled {
    color: grey;
  }
`

export const Gallery = styled.section`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 1);
  z-index: 9;
`

export const GalleryViewWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`

export const GalleryHeader = styled.header`
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  max-width: 400px;
  display: flex;
  justify-content: space-around;

  // plus sign in header
  & .add-photo-button .plus, .change-photo-button .edit {
    position: absolute;
    color: #5395f8;
    top: 50%;
    left: 45%;
    font-size: 70%;
  }

  &:disabled .plus, .edit {
    color: grey;
  }
`

export const GalleryViewContainer = styled.div`
  border: 1px solid fuchsia;
  position: relative;
  width: 100%;
  height: 100%;
`

export const Photo = styled.img`
  border: 1px solid orange;
`

export const PhotoCaption = styled.figcaption`
  color: white;
`

export const GalleryFigure = styled.figure`
  /* height: 100%; */
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 55vh;
  width: 100vw;

  & .photo {
    width: auto;
    height: auto;
    display: block;
    margin: 0 auto;
    max-height: 100%;
    max-width: 100%;
  }

  & .caption {
    display: block;
    margin: 0 auto;
    text-align: center;
    padding: 1rem;
    font-size: 110%;
  }
`

export const GalleryModal = styled.div`

  & .photo-upload {
    font-family: inherit;
    font-size: 100%;
    background-color: white;
    padding: 1em 0;
  }

  & .photo-description .label {
    display: block;
    padding: 3px;
    font-size: 110%;
    font-weight: 600;
    font-variant-caps: all-petite-caps;
  }

  & .photo-description .text-area {
    width: 100%;
    resize: none;
    height: 10em;
    font-family: inherit;
    font-size: 100%;
  }

  & .photo-description .char-rem {
    display: block;
    text-align: end;
  }
`