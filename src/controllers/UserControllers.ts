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
        const isPasswordCorrect = await bcrypt.compare(password,String(existingUser.password));
        if(isPasswordCorrect) return res.status(400).json({message:"Invalid password"});

        const token = jwt.sign({email: existingUser.email, id: existingUser.id}, 'test', {expiresIn: '1h'});

        res.status(200).json({message: "User signed in succesfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}
export const signup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const userData = req.body;
        const {email,password} = userData;

        //To check whether user exists
        const existingUser = await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(existingUser) return res.status(404).json({
            message:"User already exists"
        });

        const hashedPassword = await bcrypt.hash(password,12);

        const user = await prisma.user.create({
            data: userData
        })
        user.password=hashedPassword

        const token = jwt.sign({
            email: user.email,
            id: user.id
        },
        'test',
        {expiresIn: '1h'}
        )

        res.status(201).json({
            message:"User created succesfully",
            user: user, token
        })
    }catch(error){
        console.log(error);
    }
}

export const googleSignin = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email} = req.body;

        const existingUser = await prisma.user.findUnique({
            where:{
                email: email
            }
        })

        //Checks whether user exists
        if(!existingUser) return res.status(404).json({
            message:"User does not exist"
        })

        const token = jwt.sign({email: email}, 'test', {expiresIn: '1h'});

        res.status(200).json({message: "User signed in succesfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

export const googleSignup = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const {email} = req.body;

        const userData = req.body;

        //Checks whether user already exists
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
            id: user.id},'test',{expiresIn: '1h'})

        res.status(201).json({
            message:"User created succesfully",
            user: user,
            token
        })
    }catch(error){
        console.log(error);
    }
}

export const getAllUsers = async (req: Request,res: Response, next: NextFunction) => {
    try{
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(400).json({message:"Could not fetch users."});
    }

}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const email = req.params.id;
        const updatedUser = await prisma.user.update({
            where: {
                email: email,
            },
            data: req.body
        })
        res.status(200).json({message:"Updated user succesfully."});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"User was not updated"});
    }
}




