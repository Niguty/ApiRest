import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { CreateCardDto } from "../dto/create-card.dto";
import { Model } from "mongoose";
import { Card } from "../entities/card.entity";

@Injectable()
export class CardsRepository {
  constructor(@InjectModel('cards') private readonly cardModel: Model<Card>) {}

  async pegarCard(): Promise<Card[]> {
    return this.cardModel.find().exec();
  }

  async pegarCardId(idCards: string): Promise<Card> {
    return this.cardModel.findById(idCards).exec();
  }

  async salvarCard(newCard: CreateCardDto): Promise<Card> {
    const newCardEntity = new this.cardModel(newCard);
    return await newCardEntity.save();
  }

  async deletarCard(idCards: string): Promise<string> {
    const card = await this.cardModel.findByIdAndDelete(idCards);
    return `Card with id ${card.id} was deleted`;
  }
}
