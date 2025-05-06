import { Request, Response } from "express";


export const createGame = async (req: Request, res: Response): Promise<void> => {
  try {
    if(!req.user?._id){
      throw new Error ("Not authorized");
    }

    const developer = req.user?._id.toString();
    const game = await req.context!.services!.game!.addOne({...req.body, developer, stars: 0});

    res.status(201).json({message:"Game added", game});
    return;

  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal server error"});
    return;
  }
}

export const getAllGames = async (req: Request, res: Response): Promise<void>  => {
  try {

    const games = await req.context!.services!.game!.getAll();
    
    if(!games){
      res.status(404).json({message: "No games found"});
      return;
    }

    res.status(200).json({message: "Games found", games});
    return;
    
  } catch (error) {
    console.log(error);
    res.status(500).json({message: "Internal server error"});
    return;
  }
}