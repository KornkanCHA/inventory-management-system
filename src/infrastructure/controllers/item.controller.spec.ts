import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { ItemController } from './item.controller';
import { CreateItemUseCase } from 'src/application/item/use-cases/create-item.use-case';
import { UpdateItemUseCase } from 'src/application/item/use-cases/update-item.use-case';
import { GetItemsUseCase } from 'src/application/item/use-cases/find-items.use-case';
import { GetItemByIdUseCase } from 'src/application/item/use-cases/find-item-by-id.use-case';
import { DeleteItemUseCase } from 'src/application/item/use-cases/delete-item.use-case';
import { SearchItemUseCase } from 'src/application/item/use-cases/search-item.use-case';
import { BorrowItemUseCase } from 'src/application/item/use-cases/borrow-item.use-case';
import { ReturnItemUseCase } from 'src/application/item/use-cases/return-item.use-case';
import { CreateItemDto } from 'src/application/item/dto/create-item.dto';
import { UpdateItemDto } from 'src/application/item/dto/update-item.dto';
import { BorrowItemDto } from 'src/application/item/dto/borrow-item.dto';
import { ReturnItemDto } from 'src/application/item/dto/return-item.dto';

describe('ItemController (Integration Test)', () => {
  let app: INestApplication;
  let createItemUseCase: CreateItemUseCase;
  let getItemsUseCase: GetItemsUseCase;
  let getItemByIdUseCase: GetItemByIdUseCase;
  let updateItemUseCase: UpdateItemUseCase;
  let deleteItemUseCase: DeleteItemUseCase;
  let searchItemUseCase: SearchItemUseCase;
  let borrowItemUseCase: BorrowItemUseCase;
  let returnItemUseCase: ReturnItemUseCase;

  const mockItem = {
    item_id: 'd9b1e2ab-9f45-45b1-89b5-820f7243002b',
    name: 'Item 1',
    description: 'A sample item description.',
    quantity: 10,
    borrowedQuantity: 3,
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ItemController],
      providers: [
        { provide: CreateItemUseCase, useValue: { execute: jest.fn().mockResolvedValue(mockItem) } },
        { provide: GetItemsUseCase, useValue: { execute: jest.fn().mockResolvedValue([mockItem]) } },
        { provide: GetItemByIdUseCase, useValue: { execute: jest.fn().mockResolvedValue(mockItem) } },
        { provide: UpdateItemUseCase, useValue: { execute: jest.fn().mockResolvedValue(mockItem) } },
        { provide: DeleteItemUseCase, useValue: { execute: jest.fn().mockResolvedValue({}) } },
        { provide: SearchItemUseCase, useValue: { execute: jest.fn().mockResolvedValue([mockItem]) } },
        { provide: BorrowItemUseCase, useValue: { execute: jest.fn().mockResolvedValue(mockItem) } },
        { provide: ReturnItemUseCase, useValue: { execute: jest.fn().mockResolvedValue(mockItem) } },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();

    createItemUseCase = moduleRef.get<CreateItemUseCase>(CreateItemUseCase);
    getItemsUseCase = moduleRef.get<GetItemsUseCase>(GetItemsUseCase);
    getItemByIdUseCase = moduleRef.get<GetItemByIdUseCase>(GetItemByIdUseCase);
    updateItemUseCase = moduleRef.get<UpdateItemUseCase>(UpdateItemUseCase);
    deleteItemUseCase = moduleRef.get<DeleteItemUseCase>(DeleteItemUseCase);
    searchItemUseCase = moduleRef.get<SearchItemUseCase>(SearchItemUseCase);
    borrowItemUseCase = moduleRef.get<BorrowItemUseCase>(BorrowItemUseCase);
    returnItemUseCase = moduleRef.get<ReturnItemUseCase>(ReturnItemUseCase);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('GET /items', () => {
    it('should fetch all items', async () => {
      const response = await request(app.getHttpServer()).get('/items').expect(200);
      expect(response.body).toEqual({
        status: true,
        statusCode: 200,
        path: '/items',
        result: [mockItem],
      });
    });
  });

  describe('GET /items/:id', () => {
    it('should fetch item by ID', async () => {
      const response = await request(app.getHttpServer())
        .get(`/items/${mockItem.item_id}`)
        .expect(200);
      expect(response.body).toEqual({
        status: true,
        statusCode: 200,
        path: `/items/${mockItem.item_id}`,
        result: mockItem,
      });

      expect(getItemByIdUseCase.execute).toHaveBeenCalledWith(mockItem.item_id);
    });
  });

  describe('POST /items', () => {
    it('should create a new item', async () => {
      const createItemDto: CreateItemDto = { name: 'Item 1', quantity: 10, description: 'A new item' };
      const response = await request(app.getHttpServer())
        .post('/items')
        .send(createItemDto)
        .expect(201);
      expect(response.body).toEqual({
        status: true,
        statusCode: 201,
        path: '/items',
        result: mockItem,
      });
      expect(createItemUseCase.execute).toHaveBeenCalledWith(createItemDto);
    });
  });

  describe('PATCH /items/:id', () => {
    it('should update an item', async () => {
      const updateItemDto: UpdateItemDto = { name: 'Updated Item', quantity: 15 };
      const response = await request(app.getHttpServer())
        .patch(`/items/${mockItem.item_id}`)
        .send(updateItemDto)
        .expect(200);
      expect(response.body).toEqual({
        status: true,
        statusCode: 200,
        path: `/items/${mockItem.item_id}`,
        result: mockItem,
      });
      expect(updateItemUseCase.execute).toHaveBeenCalledWith(
        mockItem.item_id,
        updateItemDto,
      );
    });
  });

  describe('DELETE /items/:id', () => {
    it('should delete an item', async () => {
      const response = await request(app.getHttpServer())
        .delete(`/items/${mockItem.item_id}`)
        .expect(200);
      expect(response.body).toEqual({
        status: true,
        statusCode: 200,
        path: `/items/${mockItem.item_id}`,
        result: {},
      });
      expect(deleteItemUseCase.execute).toHaveBeenCalledWith(mockItem.item_id);
    });
  });

  describe('GET /items/search', () => {
    it('should search items by query', async () => {
      const response = await request(app.getHttpServer())
        .get('/items/search')
        .query({ query: 'Item', sortBy: 'quantity', order: 'ASC' })
        .expect(200);
      expect(response.body).toEqual({
        status: true,
        statusCode: 200,
        path: '/items/search?query=Item&sortBy=quantity&order=ASC',
        result: [mockItem],
      });
      expect(searchItemUseCase.execute).toHaveBeenCalledWith('Item', 'quantity', 'ASC');
    });
  });

  describe('PATCH /items/:id/borrow', () => {
    it('should borrow an item', async () => {
      const borrowItemDto: BorrowItemDto = { quantity: 5 };
      const response = await request(app.getHttpServer())
        .patch(`/items/${mockItem.item_id}/borrow`)
        .send(borrowItemDto)
        .expect(200);
      expect(response.body).toEqual({
        status: true,
        statusCode: 200,
        path: `/items/${mockItem.item_id}/borrow`,
        result: mockItem,
      });
      expect(borrowItemUseCase.execute).toHaveBeenCalledWith(
        mockItem.item_id,
        borrowItemDto,
      );
    });
  });

  describe('PATCH /items/:id/return', () => {
    it('should return a borrowed item', async () => {
      const returnItemDto: ReturnItemDto = { quantity: 5 };
      const response = await request(app.getHttpServer())
        .patch(`/items/${mockItem.item_id}/return`)
        .send(returnItemDto)
        .expect(200);
      expect(response.body).toEqual({
        status: true,
        statusCode: 200,
        path: `/items/${mockItem.item_id}/return`,
        result: mockItem,
      });
      expect(returnItemUseCase.execute).toHaveBeenCalledWith(
        mockItem.item_id,
        returnItemDto,
      );
    });
  });
});
