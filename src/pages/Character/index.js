import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { useLocation, useParams } from 'react-router-dom';

import api from '../../services/api';

import {
    Container,
    ComicsList,
    ComicItem,
    WrapperComicItem,
    Avatar,
    Title,
    Cover,
    Description,
} from './styles';

export default function Character() {
    const location = useLocation();
    const { id } = useParams();
    const character = location.state.detail;
    const { auth } = useSelector(state => state.characters);
    const [comics, setComics] = useState([]);

    console.log(character);

    useEffect(() => {
        async function loadComics() {
            const response = await api.get(`characters/${id}/comics`, {
                params: {
                    apikey: auth.publicKey,
                    hash: auth.hash,
                },
            });
            setComics(response.data.data.results);
            // console.log(comics);
            console.log('eae', response.data.data.results);
        }
        loadComics();
    }, [auth.hash, auth.publicKey, id]);

    return (
        <Container>
            <img
                src={
                    `${character.thumbnail.path}.${character.thumbnail.extension}` ||
                    'https://api.adorable.io/avatars/100/abott@adorable.png'
                }
                alt=""
            />
            <strong>{character.name}</strong>
            <span>{character.description}</span>

            <ComicsList>
                <h3>Fascículos</h3>
                {comics.map(comic => (
                    <ComicItem key={comic.id}>
                        <WrapperComicItem>
                            <Avatar>
                                <img
                                    src={
                                        `${comic.thumbnail.path}.${comic.thumbnail.extension}` ||
                                        'https://api.adorable.io/avatars/100/abott@adorable.png'
                                    }
                                    alt=""
                                />
                            </Avatar>
                            <Title>{comic.title}</Title>
                            <Cover>{comic.digitalId}</Cover>
                            <Description>{comic.description}</Description>
                        </WrapperComicItem>
                    </ComicItem>
                ))}
            </ComicsList>
        </Container>
    );
}
