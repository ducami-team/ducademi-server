import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

    public async create(categoryNames : string[]): Promise<Category[]>{
        const category = Promise.all(
            categoryNames.map(
                async(name)=>{
                    let category = await this.categoryRepository.findOne({where : {name}});
                    if(!category){
                        category = await this.categoryRepository.save({name});
                    }
                    return category;
                }
            )
        )
        return category;
    }
}
