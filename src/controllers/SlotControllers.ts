import prisma from '../app';
import Slot from '@prisma/client'
import {Request, Response} from 'express';

export const CreateSlot = async (req: Request, res: Response) =>{
    try{
        const slotData = req.body;
        const slot = await prisma.slot.create({
            data: slotData
        })
        res.status(201).json(slot);
    }catch(error){
        console.log(error);
        res.status(500).json({message:" Sorry could not create slot"});
    }
}