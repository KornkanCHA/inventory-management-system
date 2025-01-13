import { Injectable } from '@nestjs/common';
import { ItemRepositoryImplement } from 'src/interface-adapters/repositories/item.repository.implement';

@Injectable()
export class GetItemsUseCase {
  constructor(private readonly itemRepository: ItemRepositoryImplement) {}

  async execute() {
    return this.itemRepository.findAll();
  }
}
