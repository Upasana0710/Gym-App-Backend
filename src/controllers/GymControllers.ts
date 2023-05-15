import prisma from '../app'
import Gym from '@prisma/client'
import {NextFunction, Response, Request} from 'express'

export const CreateGym = async (req: Request, res: Response) => {
    try{
        const gymData = req.body;
        const {email} = req.body;
        const base64Image = req.body.selectedFile;
        console.log(gymData);

        const existingGym = await prisma.gym.findUnique({
            where:{
                email:email
            }
        })
        if(existingGym){
            return res.status(500).json({message: "Gym already exists."})
        }

        // const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, "");
        // const buffer = Buffer.from(base64Data, 'base64');

        

        const gym = await prisma.gym.create({
            data: {
                name: gymData.name,
                email: gymData.email,
                address: gymData.address,
                bio: gymData.bio,
                close_time:gymData.close_time,
                open_time:gymData.open_time,
                description:gymData.description,
                exercise:gymData.exercise,
                price:gymData.price,
                skill:gymData.skill,
            }
        })
        
        res.status(200).json({message: "Gym created succesfully!"});
    }catch(err){
        console.log(err)
    }
}

export const GetGyms = async (req: Request, res: Response) => {
    try{
        const gyms = await prisma.gym.findMany();
        res.status(200).json(gyms);
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Could not fetch gyms"})
    }
}

export const UpdateGym = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const newData = req.body;
        const updatedGym = await prisma.gym.update({
            where: {
                id: id,
            },
            data: newData,
        })
        res.status(200).json(updatedGym);
    }catch(error){
        console.log(error);
        res.status(500).jsonp({message:"Sorry, could not update."});
    }
}

export const DeleteGym = async (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const gym = await prisma.gym.findUnique({
            where:{
                id:id,
            }
        })
        if(!gym) res.status(404).json({message: "Could not find gym!"});
        await prisma.gym.delete({
            where: {
                id: id,
            }
        })
        res.status(200).json({message: "Deleted gym succesfully!"});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Sorry could not delete gym"});
    }
}