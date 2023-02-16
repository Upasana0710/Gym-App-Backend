import prisma from '../app';
import User from '@prisma/client'
import {NextFunction, Response} from 'express'
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const signin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email,password} = req.body;
        const existingUser = await prisma.user.findUnique({
            where:{
                email: email
            }
        })

        //Checks whether user exists
        if(!existingUser) return res.status(404).json({
            message:"User does not exist"
        })

        //checks whether password is correct
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid password"});

        const token = jwt.sign({email: existingUser.email, id: existingUser.id}, 'test', {expiresIn: '1h'});

        res.status(200).json({message: "User signed in succesfully"});
    }catch(error){
        res.status(500).json({message:"Something went wrong"});
    }
}
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userData = req.body;
        const {email} = userData;

        //To check whether user exists
        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(existingUser) return res.status(404).json({
            message:"User already exists"
        });

        const user = await prisma.user.create({
            data: userData
        })

        const token = jwt.sign({
            email: user.email,
            id: user.id
        },
        'test',
        {expiresIn: '1h'}
        )

        res.status(201).json({
            message:"User created succesfully",
            user: user,
            token
        })
    }catch(error){
        console.log(error);
    }
}