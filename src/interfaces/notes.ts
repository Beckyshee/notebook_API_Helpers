import { Request, Response } from 'express';
import Joi from 'joi';

interface Notes {
    id: string;
    title: string;
    content: string;
    createdAt: string;
}

const notes: { [id: string]: Notes } = {
    '1': {
        id: '1',
        title: 'Note 1',
        content: 'This is the content of Note 1',
        createdAt: '2023-11-03 12:00:00',
    },
};

const createNoteSchema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    createdAt: Joi.string().required(),
});


export function displayAllNotes(req: Request, res: Response) {
    const notesArray = Object.values(notes);
    res.status(200).json(notesArray);
}
