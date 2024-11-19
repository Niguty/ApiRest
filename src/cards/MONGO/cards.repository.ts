import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCardDto } from "../dto/create-card.dto";
import { Model } from "mongoose";
import { Card } from "../entities/card.entity";

@Injectable()
export class CardsRepository {
    constructor(@InjectModel('cards') private readonly  cardModel: Model<Card>){}

    async salvarCard(newCard: CreateCardDto): Promise<Card>{
        const pegarCard = new this.cardModel(newCard);
        return await pegarCard.save();
    }

    async pegarCard(): Promise<Card[]>{
        return await this.cardModel.find({},{_v: false}).sort({commander : +1}).exec();
    }

    async pegarCardId(idCards: string): Promise<Card>{
        return await this.cardModel.findById(idCards, {__v:false});
    }

    async deletarCard(idCards: string): Promise<string> {
        const cardsId = await this.cardModel.findByIdAndDelete(idCards);
        return `this ${cardsId} was deleted`;
    }
}
